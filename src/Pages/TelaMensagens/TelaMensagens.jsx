import React, { use, useEffect, useState } from "react";

export const TelaMensagens = () => {
  const [mensagem, setMensagem] = useState("");
  const [mensagens, setMensagens] = useState([]);

  const sair = () => {
    localStorage.removeItem("userID");
    localStorage.removeItem("userName");
    window.location.reload();
  };

  useEffect(() => {
    const interval = setInterval(async () => {
      const res = await fetch("http://localhost:3001/mensagens");
      const data = await res.json();
      setMensagens(data);
    }, 2000); 

    return () => clearInterval(interval);
  }, []);

  const enviarMensagem = async (e) => {
    const userID = localStorage.getItem("userID");
    try {
      const res = await fetch("http://localhost:3001/mensagens", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mensagem, userID }),
      });

      const data = await res.json();

      if (res.status === 201) {
        setMensagens([
          ...mensagens,
          {
            mensagem_id: data.mensagem_id,
            conteudo_mensagem: data.conteudo_mensagem,
            usuario_id: data.usuario_id,
            usuario_nome: data.usuario_nome,
          },
        ]);
        setMensagem("");
      }
    } catch (error) {
      console.log("erro ao enviar mensagem:", error);
    }
  };

  return (
    <>
      <div
        style={{
          textAlign: "center",
          background: "#a7a7a7ff",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h1 style={{ margin: 0 }}>Tela de mensagens</h1>
        <div style={{ backgroundColor: "white", height: "70vh", width: "60%" }}>
          <ul style={{listStyle: 'none'}}>
            {mensagens.map((msg) => (
              <li key={msg.id}>
                <b>{msg.usuario_nome}</b>: {msg.conteudo_mensagem}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <input
            value={mensagem}
            onChange={(e) => setMensagem(e.target.value)}
            id="barraMensagens"
            style={{ width: "600px" }}
          ></input>
          <button onClick={() => enviarMensagem()}>enviar</button>
        </div>

        {localStorage.getItem("userName")}
        <button onClick={() => sair()}>sair</button>
      </div>
    </>
  );
};
