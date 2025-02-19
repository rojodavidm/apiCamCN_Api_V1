const sql = require('mssql')
require('dotenv').config();
const looger = require('./../utils/looger.js');

var config = {
  user: process.env.USER_,
  password: process.env.PASS_,
  server: process.env.SERVER_,
  database: process.env.BD_,
  options: {
    trustServerCertificate: true,
    encrypt: true
  }
};

export async function getconnection() {
  try {
    return await sql.connect(config);
  } catch (error) {
    looger.error(error);
  }
}

export { sql };
/*


try {
  sql.connect(config, err => {
    if (err) {
      looger.error("No se pudo conectar a la BBDD :", err,process.env.SERVER_,);
     // throw err;
    }
    looger.info("¡Conexión exitosa!");

    sql.query("SELECT TOP 2 * FROM WEB_CV_Auditoria  ORDER BY CodigoAuditoria DESC", (err, result) => {
      if (err) {
        looger.error("Error al ejecutar la consulta:", err);
      } else {
        looger.info(result.recordset);
        sql.close();
      }
    });
  });

} catch (error) {
  looger.error('ERROR',error);
}
  */