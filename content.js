// Liga/desliga atributos no <html> conforme as opções; o content.css esconde os elementos.
function apply(s) {
  const root = document.documentElement;
  DF_FEATURES.forEach(([key]) => root.toggleAttribute("data-ytf-" + key, !!(s.focus || s[key])));
}

chrome.storage.sync.get(DF_DEFAULTS, apply);
chrome.storage.onChanged.addListener(() => chrome.storage.sync.get(DF_DEFAULTS, apply));
