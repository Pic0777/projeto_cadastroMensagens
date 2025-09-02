const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const path = require('path')



const routes = require("./routes");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());

// Rotas da API
app.use('/api', routes);

// Servir React build
app.use(express.static(path.join(__dirname, '../../build')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../build', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`✅ Servidor rodando em http://localhost:${PORT}`);
});
