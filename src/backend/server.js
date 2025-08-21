const express = require ('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const dotenv = require('dotenv')
const path = require('path')

dotenv.config({ path: path.join(__dirname, '.env') })

const routes = require("./routes");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: "https://projetoMensagens.netlify.app",
  methods: ["GET", "POST"]
}));
app.use(bodyParser.json());

app.use(routes);
app.use(express.static(path.join(__dirname, '/public')));

app.listen(PORT, () => {
    console.log(`✅ Servidor rodando em http://localhost:${PORT}`);
});
