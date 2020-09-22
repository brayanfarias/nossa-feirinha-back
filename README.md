# Projeto Nossa Feirinha (Backend)

# O que o projeto utiliza na stack?
     - Framework Expressjs [para subir e êxpor as APIs]
     - Linguagem TypeScript [ um 'javascript' onde podemos definir os tipos (tipar) de variáveis, por exemplo]
     - Nodejs [Para execução do código em javascript quando transpilado]
     - TypeORM [Uma biblioteca que facilita a comunicação da aplicação com o banco de dados, sem precisar ficar escrevendo as queries na mão]
     
# Com qual database essa aplicação se comunica?
    -PostgreSQL

# Como rodar a aplicaçao localmente?

    - Instalar o PostgreSQL [na ocasião de desenvolvimento, utilizei a versao 11 @brayan]
    - Instalar o pgadmin (Interface gráfica que acessa/manipula o database) [Na ocasião de desenvolvimento, utilizei a versão 4 @brayan]
    - Dar start no banco e criar um database com nome "NossaFeirinhaDataBase" [Ainda não encontrei forma de auto criar o database ao subir a aplicação]

    - No console, na pasta raiz (./nossa-feirinha-back) rodar o comando `npm i` (pra instalar todas as dependencias que foram usadas no projeto.)
    - No console, rodar o comando npm start
    - A aplicaçao sobe na porta 3000
    - As chamadas REST devem ser feitas contra localhost:3000
    - As rotas (com os paths e os verbos HTTP) estão no arquivo routes.ts

