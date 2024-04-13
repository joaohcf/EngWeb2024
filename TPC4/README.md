# TPC4 - Compositores e Períodos

## Objetivo

- Processar e corrigir o ficheiro JSON fornecido;
- Criação de rotas importantes:
    - `/compositores`: lista de compositores;
    - `/compositores/{id}`: informação de um determinado compositor;
    - `/compositores?periodo={periodo}`: lista de compositores de um determinado período;
    - `/periodos`: lista de períodos;
    - `/periodos/{id}`: informação de um determinado período;
- Implementar serviço com operações CRUD.

## Resumo

Através do `script.py`, processamos e corrigimos o ficheiro ´compositores.json´. O ficheiro resultante `new_compositores.json`, terá informação sobre os compositores e informação sobre períodos. É depois utilizado um JSON Server com o ficheiro resultante para gerir a informação.

Com o ficheiro `server.js`, é criado um website onde é possível fazer operações CRUD ao JSON Server. As páginas são criadas dinamicamente através de javascript.

## Instruções de uso

1. Correr `script.py` para processar e corrigir o ficheiro `compositores.json`
2. Inicializar o servidor JSON: `json-server new_compositores.json --watch --port 8000`
3. Inicializar o servidor NodeJS: `node server.js`
4. Aceder à página `http://localhost:3000/`