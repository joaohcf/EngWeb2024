# TPC6 - Compositores e Períodos com Express e MongoDB

## Objetivo

- Criação de rotas importantes:
    - `/compositores`: lista de compositores;
    - `/compositores/{id}`: informação de um determinado compositor;
    - `/compositores?periodo={periodo}`: lista de compositores de um determinado período;
    - `/periodos`: lista de períodos;
    - `/periodos/{id}`: informação de um determinado período;
- Implementar serviço com operações CRUD.

## Resumo

O website que fará pedidos a um servidor API. (É utilizado o website do TPC5)

O servidor API que responderá a pedidos recebidos. Este servidor comunica com a base de dados para obter a informação.

É utilizado MongoDB para persistir informação de compositores e períodos.