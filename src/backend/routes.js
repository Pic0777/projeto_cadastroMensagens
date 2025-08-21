const express = require('express')
const router = express.Router()
const db = require("./db")

router.post("/register",(req,res)=>{
    const {email,nome,senha} = req.body;

    if (!email || !nome || !senha){
        return res.status(400).json({error: "Todos os campos precisam estar preenchidos!"});
    }

    let query = 'INSERT INTO usuarios (email,nome,senha) VALUES(?,?,?)';

    db.query(query, [email,nome,senha], (err, result)=>{
        if (err) {
            console.error("Erro ao inserir usuário:", err)

            if(err.code === 'ER_DUP_ENTRY') {
                return res.status(409).json({error: 'Email já cadastrado!'})
            }

            return res.status(500).json({error: "Erro ao cadastrar o usuário!"})
        }

        res.status(201).json({ message: "usuário cadastrado com sucesso!" })
    })

})

router.post("/login",(req,res)=>{
    const {emailLogin,senhaLogin} = req.body;

    const query = "SELECT usuario_id,nome,senha FROM usuarios WHERE email = ? ;"

    db.query(query,[emailLogin],(err,results)=>{
        if(err) {
            console.error("Erro ao encontrar usuário:",err)
            return res.status(500).json({error: "Erro no servidor"});
        }
        if(!emailLogin || !senhaLogin){
            return res.status(401).json({error:"Preencha todos os campos!"})
        }
        if (results.length===0){
            return res.status(401).json({error: "Email ou senha incorretos!"})
        }
        

        const user = results[0]

        if(user.senha !== senhaLogin){
            return res.status(401).json({error: "usuário ou senha incorretos!"})
        }

        res.status(201).json({ message: `Olá ${user.usuario_id}!`, id: user.usuario_id, nome: user.nome })
    })
})

router.post("/mensagens",(req,res)=>{
    const {mensagem, userID} = req.body;

    if (!mensagem || mensagem.trim() === "") return res.status(204).send();
    if (!userID) return res.status(400).json("usuário não encontrado!");

    const query = "INSERT INTO mensagens (conteudo_mensagem, usuario_id) VALUES (?,?)";

    db.query(query, [mensagem, userID], (err, result) => {
        if (err) {
            console.error("Erro ao salvar mensagem:", err);
            return res.status(500).json({ erro: "Erro no servidor ao salvar a mensagem." });
        }

        // Buscar o nome do usuário após inserir
        const selectQuery = "SELECT nome FROM usuarios WHERE usuario_id = ?";
        db.query(selectQuery, [userID], (err2, userResult) => {
            if (err2) {
                console.error("Erro ao buscar usuário:", err2);
                return res.status(500).json({ erro: "Erro ao buscar usuário." });
            }

            const usuario_nome = userResult[0]?.nome || "Desconhecido";

            // Retorna a mensagem completa com id e nome
            res.status(201).json({ 
                mensagem_id: result.insertId, 
                conteudo_mensagem: mensagem, 
                usuario_id: userID,
                usuario_nome 
            });
        });
    });
});


// rota GET para buscar mensagens com nome do usuário
router.get("/mensagens", (req, res) => {
    const query = `
        SELECT m.mensagem_id, m.conteudo_mensagem, m.usuario_id, u.nome AS usuario_nome
        FROM mensagens m
        JOIN usuarios u ON m.usuario_id = u.usuario_id
        ORDER BY m.mensagem_id ASC
    `;
    db.query(query, (err, results) => {
        if (err) {
            console.error("Erro ao buscar mensagens:", err);
            return res.status(500).json({ erro: "Erro no servidor ao buscar mensagens." });
        }
        res.json(results);
    });
});



module.exports = router