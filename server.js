const http = require('http');

//cria o servidor, indicando a função callback para uma requisição
const servidor = http.createServer(function(req, resp) {
    resp.end(`
    <html>
        <head>
            <meta charset="utf-8">
        </head>
        <body>
            <h1> Casa do Código </h1>
        </body> 
    </html>`);
});

servidor.listen(3000);