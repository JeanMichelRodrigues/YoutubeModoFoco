# Modo Foco para YouTube / Focus Mode for YouTube

Protótipo de extensão para Chrome que esconde o que distrai no YouTube, com uma chave para cada item.

Prototype Chrome extension that hides what distracts on YouTube, with a switch for each item.

## O que esconde / What it hides

- **Shorts:** prateleiras, item no menu lateral, Shorts soltos nas listas e na busca.
- **Página inicial:** as recomendações (a busca continua).
- **Sugestões ao lado do vídeo.**
- **Comentários.**
- **Sugestões do fim do vídeo** e cartões sobre o vídeo.
- **Chat ao vivo** das lives (e o chat da reprise). Para o vídeo ocupar a largura toda, a coluna lateral inteira também some nessas páginas (conferido: o player passou de 1323 para 1572 px), então as sugestões que ficam nessa coluna somem junto. No **modo teatro** o chat fica em `#panels-full-bleed-container` (largura fixa de ~520 px ao lado do player); esse contêiner também é escondido, e o player volta a ocupar a largura toda (conferido no Chrome do Jean: 1385 -> 1905 px).
- **Modo foco:** uma chave que esconde tudo de uma vez.

## Como funciona

`content.js` liga atributos `data-ytf-*` no `<html>` conforme as opções (`chrome.storage.sync`); `content.css` esconde os elementos quando o atributo está presente. Não há script rodando continuamente nem acesso à rede.

## Instalar para testar / Load for testing

1. Abra `chrome://extensions` e ative o **Modo do desenvolvedor**.
2. Clique em **Carregar sem compactação** e escolha esta pasta.

## Manutenção

O YouTube muda o código da página de tempos em tempos e os seletores em `content.css` podem parar de funcionar. Para consertar, inspecione o elemento no YouTube e ajuste o seletor.

Seletores conferidos no YouTube real (05/10/2026, sem login): Shorts na busca (`grid-shelf-view-model` com `ytm-shorts-lockup-view-model`), Shorts no menu lateral, sugestões ao lado do vídeo, comentários, chat de uma live, fim do vídeo e grade da página inicial. **Não conferidos** (precisam de conta logada ou outra tela): prateleira de Shorts da página inicial, menu lateral compacto e Shorts em listas de canal.

## Estado

Protótipo local, sem git e sem material de loja.

Esta extensão não é afiliada, endossada nem patrocinada pelo YouTube ou pelo Google. / This extension is not affiliated with, endorsed by or sponsored by YouTube or Google. YouTube is a trademark of Google LLC.
