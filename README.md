# Modo Foco para YouTube / Focus Mode for YouTube

Extensão para Chrome que esconde o que distrai no YouTube, com uma chave para cada item e um Modo foco que esconde tudo de uma vez.

Chrome extension that hides what distracts on YouTube, with a switch for each item and a Focus mode that hides everything at once.

## O que esconde / What it hides

- **Shorts:** prateleiras, item no menu lateral e Shorts soltos nas listas e na busca / Shorts shelves, sidebar entry and Shorts in lists and search.
- **Página inicial:** as recomendações; a busca continua / home page recommendations; search stays.
- **Sugestões ao lado do vídeo** / suggestions next to the video.
- **Comentários** / comments.
- **Sugestões do fim do vídeo** e cartões sobre o vídeo / end-of-video suggestions and cards.
- **Chat ao vivo** das lives e das reprises / live chat on streams and replays.
- **Modo foco:** uma chave que esconde tudo / one switch that hides everything.

Sem coleta de dados, sem servidor, sem código remoto / No data collection, no server, no remote code.

## Como funciona

`content.js` liga atributos `data-ytf-*` no `<html>` conforme as opções (`chrome.storage.sync`); `content.css` esconde os elementos quando o atributo está presente. Não há script rodando continuamente nem acesso à rede. A única permissão é `storage`.

### O chat ao vivo e o layout

Esconder só o chat deixa um buraco, porque o YouTube reserva o espaço dele:

- **Layout normal:** o chat fica em `#secondary`; a coluna inteira é escondida (só em páginas com `ytd-watch-flexy[live-chat-present-and-expanded]`) e o vídeo ocupa a largura toda.
- **Modo teatro:** o chat fica em `#panels-full-bleed-container`, um contêiner de ~520 px fixos ao lado do player, e o player encolhe (`squeezeback`). Esse contêiner também é escondido; o player volta a ocupar a largura toda (conferido: 1385 -> 1905 px).

Efeito colateral: as sugestões que ficam na coluna lateral, quando existem, somem junto com o chat.

## Instalar para testar / Load for testing

1. Abra `chrome://extensions` e ative o **Modo do desenvolvedor**.
2. Clique em **Carregar sem compactação** e escolha esta pasta.

## Estrutura / Layout

| Arquivo | Função |
|---|---|
| `manifest.json` | Manifest V3; só a permissão `storage` e acesso a youtube.com |
| `content.css` | Seletores que escondem cada item |
| `content.js` | Liga os atributos `data-ytf-*` no `<html>` |
| `defaults.js` | Opções padrão, lista de itens e links de apoio |
| `popup.html` / `popup.js` | Popup com as chaves |
| `_locales/` | Textos em pt-BR e en |

## Manutenção

O YouTube muda o código da página de tempos em tempos e os seletores em `content.css` podem parar de funcionar. Para consertar, inspecione o elemento no YouTube (F12) e ajuste o seletor.

Seletores conferidos no YouTube real (05/10/2026): Shorts na busca (`grid-shelf-view-model` com `ytm-shorts-lockup-view-model`), Shorts no menu lateral, sugestões ao lado do vídeo, comentários, chat de lives (layout normal e modo teatro), fim do vídeo e grade da página inicial. **Não conferidos** (precisam de conta logada ou outra tela): prateleira de Shorts da página inicial, menu lateral compacto e Shorts em páginas de canal.

## Estado

Protótipo testado localmente. Ainda sem material para a Chrome Web Store.

Esta extensão não é afiliada, endossada nem patrocinada pelo YouTube ou pelo Google. / This extension is not affiliated with, endorsed by or sponsored by YouTube or Google. YouTube is a trademark of Google LLC.
