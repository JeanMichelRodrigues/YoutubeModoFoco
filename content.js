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
  let tries = 0;
  theaterTimer = setInterval(() => {
    const flexy = document.querySelector("ytd-watch-flexy");
    const btn = document.querySelector(".ytp-size-button");
    if (flexy && btn) {
      clearInterval(theaterTimer);
      // Pequena espera para o YouTube aplicar a própria preferência antes de decidirmos.
      setTimeout(() => {
        theaterDoneFor = id;
        if (!flexy.hasAttribute("theater") && !document.fullscreenElement) btn.click();
      }, 600);
    } else if (++tries > 60) {
      clearInterval(theaterTimer);
    }
  }, 250);
}

chrome.storage.sync.get(DF_DEFAULTS, apply);
chrome.storage.onChanged.addListener(() => chrome.storage.sync.get(DF_DEFAULTS, apply));
document.addEventListener("yt-navigate-finish", ensureTheater);
