const bodyParser = require('body-parser');
require('body-parser-xml')(bodyParser);
var https = require('follow-redirects').https;
//var fs = require('fs');

var options = {
  'method': 'POST',
  'hostname': 'servicioboton.unired.cl',
  'path': '/ServicioBotonPago.svc/SolicitaTicket',
  'headers': {
    'Content-Type': 'application/xml'
  },
  'maxRedirects': 20
};

var req = https.request(options, function (res) {
  var chunks = [];

  res.on("data", function (chunk) {
    chunks.push(chunk);
  });

  res.on("end", function (chunk) {
    var body = Buffer.concat(chunks);
//  
    console.log('     Metodo            => '+options.method);
    console.log('     Url               => '+options.hostname+options.path);
    console.log('     Mensaje Respuesta => '+res.statusMessage);
    console.log('     Código  Respuesta => '+res.statusCode);
    console.log('     Respuesta         => '+body.toString());
  });

  res.on("error", function (error) {
    console.error(error);
  });
});

var postData =  "<AllPagos xmlns=\"http://schemas.datacontract.org/2004/07/ServicioPago.Models\"><EmailComprobante>carlos.eduar.14@gmail.com</EmailComprobante><IdTransaccionEPS>UNR0000010325494</IdTransaccionEPS><UrlExito>https://www.costaneranorte.cl/convenios.dll/ExitoUNIRED?CodigoSesion=UNR0000010325494</UrlExito><UrlFracaso>https://www.costaneranorte.cl/convenios.dll/FracasoUNIRED?CodigoSesion=UNR0000010325494</UrlFracaso><IdCanal>BTNCNO</IdCanal><Pagos><Pago><CodigoServicio>CNORTE</CodigoServicio><Identificadores><Identificador><Valor>25674417-1</Valor><Codigo>RUTCLI</Codigo></Identificador></Identificadores><TotalPagos>1</TotalPagos><TotalMontos>54618</TotalMontos><Detalles><Detalle><Identificadores><Identificador><Valor>184533787</Valor><Codigo>NCOBRO</Codigo></Identificador><Identificador><Valor>ARTURO JOSE BERRIOS ROJAS</Valor><Codigo>RSOCIA</Codigo></Identificador><Identificador><Valor>20250128</Valor><Codigo>FECEMI</Codigo></Identificador><Identificador><Valor>20250128</Valor><Codigo>FCVENC</Codigo></Identificador><Identificador><Valor>54618</Valor><Codigo>MONTO</Codigo></Identificador><Identificador><Valor>00100256744171001</Valor><Codigo>NCONVE</Codigo></Identificador><Identificador><Valor>28-01-2025</Valor><Codigo>FECAUX</Codigo></Identificador></Identificadores></Detalle></Detalles></Pago></Pagos></AllPagos>";

req.write(postData);

req.end();