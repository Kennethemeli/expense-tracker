const mysql = require("mysql2")

const db =async ()=>{
    return mysql.createPool({
        host:"localhost",
        database:"expense_tracker",
        user:"root",
        password:""
        // database:"cfreysba_expense",
        // user:"root",
        // password:"Dq&P&Gq]MmYc"
    }).promise();
}

module.exports = {
    connectDb:()=>(db())
}
