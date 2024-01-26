# Google Fake (Frontend)

## Descrição

A intenção deste programa é ver como o navegador se comporta utilizando alguns técnicas de varredura de dados, neste caso usei nestJs e GoLang para fazer uma simples pesquisa no google contendo 3 parâmetros (localidade, palavra-chave e frequência).

A resposta é enviada do frontEnd pelo ReactJs para o servidor NestJs (servidor primário) e em seguida é enviada para GoLang (servidor secundário ROBOT) que trata os dados e devolve para o servidor primário que por sua vez devolve uma resposta para o cliente que finalmente remonta a página no google.

Existem jeitos melhores de fazer isso, utilizando Selenium ou um Iframe (que nem sempre funciona devido a restrições do site).

Se isso for útil para você recomendo que use Selenium, entretanto tenha em vista que isso é apenas um material de estudo.

## Instruções de Inicialização

### Server (NestJS)

```bash
# Navegue até o diretório `server`.
cd server

# Instale as dependências.
npm install

# Inicie o servidor NestJs.
npm run start ou nest start
```

### Client (ReactJs)

```bash
# Navegue até o diretório `client`.
cd client

# Instale as dependências.
npm install

# Inicie o servidor ReactJs.
npm run start
```

### Robot (GoLang)

```bash
# Navegue até o diretório `robot`.
cd robot

# Inicie o servidor GoLang.
go run main.go
```
