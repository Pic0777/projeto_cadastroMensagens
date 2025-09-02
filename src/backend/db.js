const mysql = require('mysql2')
const dotenv = require('dotenv')

dotenv.config()
console.log("🟢 Variáveis carregadas:", {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME
});

const connection = mysql.createConnection(process.env.MYSQL_URL);

connection.connect((err)=>{
    if (err){
        console.error('❌ Erro ao conectar ao banco de dados:', err);
        return
    }
    console.log("'✅ Conectado ao MySQL com sucesso!'")
})

module.exports = connection;