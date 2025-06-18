# PokeAPI Ionic App

Este projeto é um aplicativo web mobile desenvolvido com Ionic + Angular que consome a [PokeAPI](https://pokeapi.co/) para exibir uma lista de Pokémons, seus detalhes e gerenciar favoritos.

## Funcionalidades
- Listagem paginada de Pokémons com nome e imagem.
- Marcação e visualização de Pokémons favoritos.
- Página de detalhes de cada Pokémon (em desenvolvimento).
- Interface responsiva e adaptada para mobile.
- Navegação simples entre lista e favoritos.

## Estrutura do Projeto
- `src/app/pokemon-list/`: Página principal de listagem e busca dos Pokémons.
- `src/app/favorites/`: Página que exibe apenas os Pokémons marcados como favoritos.
- `src/app/pokemon-detail/`: Página de detalhes do Pokémon (estrutura pronta para expansão).
- `src/app/services/pokeapi.service.ts`: Serviço responsável por consumir a PokeAPI.

## Estilo e Padrões
- Utilização de Angular Services para injeção de dependência e compartilhamento de dados.
- Favoritos persistidos via `localStorage` para experiência offline simples.
- Componentes standalone e módulos organizados por feature.
- Código limpo, modular e com navegação intuitiva.

## Como rodar
1. Instale as dependências:
   ```bash
   npm install
   ```
2. Rode o app em modo desenvolvimento:
   ```bash
   ionic serve
   ```

## Melhorias Futuras
- Tela de detalhes completa com mais informações e imagens.
- Testes unitários.
- Documentação técnica detalhada.
- Deploy como PWA ou app nativo.

---

Tentando desenvolver seguindo boas práticas de código, modularização e usabilidade. Sinta-se à vontade para contribuir!
