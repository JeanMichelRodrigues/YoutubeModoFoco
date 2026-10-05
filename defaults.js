// Configurações padrão, compartilhadas por content.js e popup.js.
const DF_DEFAULTS = {
  focus: false,     // Modo foco: esconde tudo de uma vez, ignorando as chaves abaixo
  shorts: true,     // esconde Shorts (prateleiras, menu lateral, itens nas listas)
  home: false,      // esconde as recomendações da página inicial
  related: false,   // esconde as sugestões ao lado do vídeo
  comments: false,  // esconde os comentários
  endscreen: false, // esconde as sugestões que aparecem no fim e sobre o vídeo
  chat: false,      // esconde o chat ao vivo (e o chat da reprise) das lives
};
// Itens que podem ser escondidos, na ordem em que aparecem no popup: [chave, texto traduzido].
// Cada um liga o atributo data-ytf-<chave> no <html>; o content.css esconde os elementos.
const DF_FEATURES = [
  ["shorts", "featShorts"],
  ["home", "featHome"],
  ["related", "featRelated"],
  ["comments", "featComments"],
  ["endscreen", "featEndscreen"],
  ["chat", "featChat"],
];
// Links de doação do popup, por idioma do navegador (mesmos das outras extensões).
const DF_DONATE_URLS = { pt: "https://livepix.gg/jeanmr", en: "https://ko-fi.com/jeanmr" };
const dfDonateUrl = (lang) => (/^pt/i.test(lang) ? DF_DONATE_URLS.pt : DF_DONATE_URLS.en);
