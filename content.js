let settings = {};

// Liga/desliga atributos no <html> conforme as opções; o content.css esconde os elementos.
function apply(s) {
  settings = s;
  const root = document.documentElement;
  DF_FEATURES.forEach(([key]) => root.toggleAttribute("data-ytf-" + key, !!(s.focus || s[key])));
  ensureTheater();
}

// Modo Teatro: ao abrir um vídeo, clica no botão de tamanho do player (uma vez por vídeo)
// se o player ainda não estiver em modo teatro. Se o usuário sair do teatro depois, não insistimos.
let theaterDoneFor = null;
let theaterTimer = null;

function ensureTheater() {
  clearInterval(theaterTimer);
  if (!settings.theater || location.pathname !== "/watch") return;
  const id = new URLSearchParams(location.search).get("v");
  if (!id || id === theaterDoneFor) return;
  // Confere de tempos em tempos (até ~30 s) e só dá por concluído quando o teatro foi confirmado:
  // o clique pode não pegar se o player ainda não estiver pronto ou se a aba abriu em segundo plano.
  let ticks = 0, clicks = 0, lastClick = 0, okStreak = 0;
  theaterTimer = setInterval(() => {
    if (++ticks > 60 || clicks >= 3 && okStreak === 0 && Date.now() - lastClick > 3000) return clearInterval(theaterTimer);
    if (new URLSearchParams(location.search).get("v") !== id) return clearInterval(theaterTimer);
    const flexy = document.querySelector("ytd-watch-flexy");
    const btn = document.querySelector(".ytp-size-button");
    if (!flexy || !btn || document.hidden || document.fullscreenElement) return;
    if (flexy.hasAttribute("theater")) {
      // Duas leituras seguidas em teatro: confirmado (ou o usuário já estava assim).
      if (++okStreak >= 2) { theaterDoneFor = id; clearInterval(theaterTimer); }
      return;
    }
    okStreak = 0;
    if (Date.now() - lastClick < 1500) return;
    lastClick = Date.now();
    clicks++;
    btn.click();
  }, 500);
}

chrome.storage.sync.get(DF_DEFAULTS, apply);
chrome.storage.onChanged.addListener(() => chrome.storage.sync.get(DF_DEFAULTS, apply));
document.addEventListener("yt-navigate-finish", ensureTheater);
// Aba aberta em segundo plano: tenta de novo quando ela ficar visível.
document.addEventListener("visibilitychange", () => { if (!document.hidden) ensureTheater(); });
