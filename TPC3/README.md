# TPC3 - Filmes

## Objetivo

- Processar e corrigir o ficheiro JSON fornecido;
- Criar páginas HTML para cada filme, ator e categoria.

## Resumo

Através do `script.py`, processamos e corrigimos o ficheiro `filmes.json`. 
Neste ficheiro contem informações sobre filmes, atores e categorias.
O ficheiro resultante é depois utilizado num JSON Server.

## Instruções de uso

1. Correr `script.py` para processar e corrigir o ficheiro `filmes.json`
2. Inicializar o servidor JSON: `json-server filmes_normalized.json --port 8000 --watch`
3. Inicializar o servidor NodeJS: `node server.js`
4. Aceder à página `http://localhost:3000/`