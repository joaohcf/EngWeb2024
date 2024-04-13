# TPC5 - Compositores e Períodos com Express

## Objetivo

- Criação de rotas importantes:
    - `/compositores`: lista de compositores;
    - `/compositores/{id}`: informação de um determinado compositor;
    - `/compositores?periodo={periodo}`: lista de compositores de um determinado período;
    - `/periodos`: lista de períodos;
    - `/periodos/{id}`: informação de um determinado período;
- Implementar serviço com operações CRUD.

## Resumo

É utilizado um JSON Server com o ficheiro `new_compositores.json` para gerir a informação. (ficheiro resultante do TPC4)

Com o ficheiro `server.js`, é criado um website onde é possível fazer operações CRUD ao JSON Server. Este website é gerenciado pela utilização do `Express`, sendo as páginas criadas em formato `.pug`.

## Instruções de uso

1. Inicializar o servidor JSON: `json-server new_compositores.json --watch --port 8000`
2. Inicializar o servidor NodeJS: `node server.js`
3. Aceder à página `http://localhost:3000/`