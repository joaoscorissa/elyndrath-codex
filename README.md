# Bran - O Que Ainda Escuta

Página estática narrativa para apresentar o universo de Elyndrath e seus personagens de RPG de mesa. O projeto foi pensado como um códice medieval interativo, com direção visual dark fantasy celta, foco em leitura, atmosfera e apresentação de personagens.

## Ideia geral

O site não funciona como uma ficha mecânica pura de sistema. A proposta é apresentar o universo e os personagens da campanha em formato de códice: história de Elyndrath, queda do reino, corrupção, sistema próprio e páginas narrativas individuais.

A experiência visual segue o tom de um livro antigo ou códice de mundo: fundo escuro, detalhes em dourado envelhecido, seções em pergaminho, névoa sutil, folhas animadas e uso das artes conceituais do personagem como material central.

## Tecnologias usadas

- HTML5 sem framework.
- CSS puro, sem Bootstrap, Tailwind ou pré-processador.
- JavaScript ES6 sem dependências externas.
- Imagens locais mantidas no pacote de contexto e em `assets/`.
- Trilha sonora local em MP3 com controle próprio de reprodução.
- Fontes web sugeridas: Cinzel e Cormorant Garamond via Google Fonts.

## Rotas

- `/`: visão geral de Elyndrath, o Reino Esquecido.
- `/bran/`: página narrativa de Bran, O Que Ainda Escuta.
- `/thorbem-goldstone/`: página narrativa de Thorbem Goldstone, Espírito da Montanha.
- `/edward-greystone/`: página narrativa de Edward Greystone, IronCloak.

## Estrutura de arquivos

- `index.html`: marcação semântica da página e conteúdo narrativo.
- `bran/index.html`: página dedicada ao Bran.
- `thorbem-goldstone/index.html`: página dedicada ao Thorbem Goldstone.
- `edward-greystone/index.html`: página dedicada ao Edward Greystone.
- `styles.css`: layout responsivo, paleta, atmosfera visual, animações e estados.
- `script.js`: navegação ativa, revelação suave de seções e folhas ambientais.
- `assets/`: imagens compartilhadas e imagens extraídas/geradas para o site.
- `assets/elyndrath-theme.mp3`: trilha sonora de fundo do códice.
- `serve.sh`: script local para subir um webserver estático de teste.
- `.github/workflows/pages.yml`: workflow de deploy automático no GitHub Pages.
- `Chronicles_of_Elyndrath_Context_Pack/`: imagens, lore, regras de estilo e contexto narrativo.

## Compatibilidade com GitHub Pages

O projeto foi criado para publicação direta no GitHub Pages sem etapa de build. Todos os caminhos são relativos à raiz do repositório.

O arquivo `.github/workflows/pages.yml` publica automaticamente o site quando houver push na branch `main` ou `master`. Para usar esse fluxo:

1. Envie a pasta do projeto para um repositório GitHub.
2. Abra `Settings > Pages`.
3. Em `Build and deployment`, selecione `GitHub Actions`.
4. Faça push na branch `main` ou `master`.
5. Salve as configurações.

## Desenvolvimento local

Como o projeto é estático, é possível abrir `index.html` diretamente no navegador. Para simular melhor o GitHub Pages, rode o script local na raiz do projeto:

```bash
./serve.sh
```

Depois acesse:

```text
http://localhost:8000
```

Para usar outra porta:

```bash
./serve.sh 8080
```

## Decisões de implementação

- Sem build para manter o deploy simples.
- Conteúdo principal embutido em HTML para facilitar edição manual.
- CSS organizado por blocos de interface e seções.
- JavaScript usado apenas para melhorias progressivas.
- O conteúdo permanece visível mesmo se o JavaScript estiver desativado.
- Animações respeitam `prefers-reduced-motion`.
- A trilha sonora usa volume baixo por padrão e depende de interação do usuário quando o navegador bloquear autoplay.
