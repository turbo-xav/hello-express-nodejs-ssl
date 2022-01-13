const express = require("express");
const https = require("https");
const path = require("path");
const fs = require("fs");

const app = express();

app.use("/", (req, res, next) => {
  res.send("Hello from SSL server");
});

const sslServer = https.createServer(
  {
    // Auto signé
    key: fs.readFileSync(path.join(__dirname, "cert2", "key.pem")),
    cert: fs.readFileSync(path.join(__dirname, "cert2", "cert.pem")),
    // ou certificat zero ssl pour meteo-back.projets.web.fr
    //key: fs.readFileSync(path.join(__dirname, 'cert2/meteo-back.projets-web.fr', 'private.key')),
    //cert: fs.readFileSync(path.join(__dirname, 'cert2/meteo-back.projets-web.fr', 'certificate.crt')),
  },
  app
);

sslServer.listen(3443, () => console.log("Secure server 🚀🔑 on port 3443"));
