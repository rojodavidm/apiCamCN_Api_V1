import looger from "../utils/looger";
import { getconnection, sql } from "./funciones";

const getdatos = async() => {

    try {
        const pool = await getconnection();
        const result = await pool.request().query ("SELECT TOP 2 * FROM WEB_CV_Auditoria  ORDER BY CodigoAuditoria DESC");
        console.log(result);
        console.table(result.recordset);
    } catch (error) {
        looger.error(error);
    }
}

const adddatos = async () =>{
    try {
        const pool = await getconnection();
        const result = await pool.request()
        .input("campo1",sql.VarChar,"")
        .input("campo2",sql.VarChar,"")
        .input("campo3",sql.VarChar,"")
        .input("campo4",sql.VarChar,"").query ("INSERT INTO WEB_CV_Auditoria (campo1,campo2,campo3,campo4) "
            + "VALUES (@campo1,@campo2,@campo3,@campo4)");
        console.log(result);
        console.table(result.recordset);
    } catch (error) {
        looger.error(error);
    }
}