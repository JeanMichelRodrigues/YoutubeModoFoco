const $ = (id) => document.getElementById(id);
const t = (key) => chrome.i18n.getMessage(key);

document.documentElement.lang = chrome.i18n.getUILanguage();
document.querySelectorAll("[data-i18n]").forEach((el) => (el.textContent = t(el.dataset.i18n)));

let state = { ...DF_DEFAULTS };

// Uma chave por item que pode ser escondido.
const boxes = DF_FEATURES.map(([key, label]) => {
  const row = document.createElement("label");
  row.className = "chk";
  const input = document.createElement("input");
  input.type = "checkbox";
  const text = document.createElement("span");
  text.textContent = t(label);
  input.onchange = () => {
    state[key] = input.checked;
    chrome.storage.sync.set({ [key]: state[key] });
  };
  row.append(input, text);
  $("list").appendChild(row);
  return { key, input };
});

function render() {
  $("focus").checked = state.focus;
  // Com o Modo foco ligado, tudo fica escondido; as chaves abaixo só valem quando ele está desligado.
  $("list").classList.toggle("dim", state.focus);
  boxes.forEach(({ key, input }) => (input.checked = state.focus || state[key]));
}

$("focus").onchange = () => {
  state.focus = $("focus").checked;
  chrome.storage.sync.set({ focus: state.focus });
  render();
};

const donateUrl = dfDonateUrl(chrome.i18n.getUILanguage());
if (donateUrl) {
  $("donate").href = donateUrl;
  $("donate").hidden = false;
}

chrome.storage.sync.get(DF_DEFAULTS, (s) => {
  state = { ...s };
  render();
});
