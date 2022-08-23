const http = require("http");
const fs = require("fs").promises;

const hostname = "localhost";
const port = 3000;

const server = http.createServer(trataReq);

function trataReq(req, res) {
  if (req.url === "/fizzbuzz") {
    for (let i = 1; i <= 20; i++) {
      const mensagem = fizzbuzz(i);
      res.write(mensagem);
    }
    res.end();
  } else {
    fs.readFile("./index.html", "utf-8").then((texto) => {
      res.statusCode = 200;
      res.setHeader("Content-Type", "text/html");
      res.write(texto);
      res.end();
    });
  }
}

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
