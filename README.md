# Sobre

# Requerimentos

- docker e docker-compose
- sequelize-cli

# Tecnologias utilizadas

- Express
- Sequelize ORM

#### Instalando Dependências

```bash
npm install
```

# Inicializando o banco de dados

```bash
docker-compose up -d
```

# Inicializando o projeto

```bash
npm star
```

**Dentro do "npm start" esta sendo executado "docker-compose up -d" e "npx sequelize-cli db:migrate" e "npx sequelize-cli db:seed:all"**

**Aviso caso tenha algum problema com a primeira execução tente executar novamente . Pois a criação do container ainda não terminou**

# Executando testes

```bash
npm run test
```

**Como o "npm start" ele executa uma limpeza de banco junto com inserção de dados e depois executa os testes**

# 🔗 Links

- Documentação JWT https://jwt.io/
- Frameworks NodeJS:

  1. https://expressjs.com/pt-br/
