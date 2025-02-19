const express = require("express");
const router  = express.Router();
const path    = require("path");
const { buffer } = require("stream/consumers");
const unired_post = require("../script/funciones.js");
const unired_get  = require("../script/funciones.js");
var https = require('follow-redirects').https;
const looger = require ('./../utils/looger.js');
//var express = require('express');
var xmlparser = require('express-xml-bodyparser');
var tiP;
var IdtiP;
var xmlRequ;
var app = express();
router.use(xmlparser());

router.post('/unired',(req,res) =>{

//console.log('Raw XML: ' + req.rawBody);
  var postData = req.rawBody;
  var ticket = new RegExp("<IdTicket>(.*?)</IdTicket?>", "gmi");
  var IdTicket = new RegExp("<IdTicketEncriptado>(.*?)</IdTicketEncriptado?>", "gmi");

  //console.log('Datos : '+postData);
  var options = {
    'method': 'POST',
    'hostname': process.env.URL_API_,
    'path': process.env.SERVICE_,
    'headers': {
      'Content-Type': 'application/xml'
    },
    'maxRedirects': 20
  }

  var req = https.request(options, function (res) {

    var chunks = [];
    res.on("data", function (chunk) {
      chunks.push(chunk);
    });

    res.on("end", function (chunk) {
      var body = Buffer.concat(chunks);
      var xml = body.toString();
      var ti = ticket.exec(xml);
      var Idti = IdTicket.exec(xml);
      tiP =ti[1];
      IdtiP =Idti[1];

      xmlRequ= body.toString();
      looger.info(xmlRequ)
      console.log('------------------------------     Recibo un POST Delphi     ------------------------------')
      console.log('     Metodo            => ' + options.method);
      console.log('     Url               => ' + options.hostname + options.path);
      console.log('     Mensaje Respuesta => ' + res.statusMessage);
      console.log('     Código  Respuesta => ' + res.statusCode);
      console.log('     Ticket            => ' + tiP);
      console.log('     Id Ticket Encrip  => ' + IdtiP);
      console.log('---------------------------------------------------------------------------------')
      console.log('     Respuesta         => ' + body.toString());


    });
    res.on("error", function (error) {
      looger.error(error);
    });
  });
  
  
  req.write(postData); 
//  res.json({Respuesta: +xmlRequ});
  req.end();
  res.json({ servicio: "Unired", status: "OK", methodo: "GET", Messagge: +tiP, xmlRequ});
  
})

router.get('/unired', (req, res) => {
var options = {
  'method': 'GET',
  'hostname': process.env.URL_API_,
  'path': process.env.ENDPOINT_
}
console.log('***************************     Recibo un Get Delphi     ***************************')
console.log('     Metodo            => ' + options.method);
console.log('     Url               => ' + options.hostname + options.path);
console.log('------------------------------------------------------------------------------------')
res.json({ servicio: "Unired", status: "OK", methodo: "GET", Messagge: "200"});
});


router.get('/', (req, res) => {
  looger.info('Servidor Disponible..'+process.env.SERVER_);
  res.json({ Messagge: 'Servidor Disponible' })
});

router.post('/', (req, res) => {
  looger.info('Servidor Disponible..'+process.env.SERVER_);
  res.json({ Messagge: 'Servidor Disponible' })
});

router.get('*', (req, res) => {
looger.info('Ruta no ecnontrada. GET');
  res.json({ status: "Nok", Messagge: '¡Error 404!' })
});

router.post('*', (req, res) => {
  looger.info('Ruta no ecnontrada. POST');
  res.json({ status: "Nok", Messagge: '¡Error 404!' })
});


module.exports = router;