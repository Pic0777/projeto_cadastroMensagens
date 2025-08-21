import React from 'react'
import { useState } from 'react'

export const CadastroCard = () => {
    const [email,setEmail] = useState("");
    const [nome,setNome] = useState("");
    const [senha,setSenha] = useState("");
    const [mensagem,setMensagem] = useState("");

    const HandleRegister = async (e)=>{
        e.preventDefault();
    

    try{
        const res = await fetch("http://localhost:3001/register",{
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({email,nome,senha})
        });
        const data = await res.json();
        setMensagem(data.message || data.error);

    } catch(error){
        setMensagem("Erro ao conectar com o servidor!")
    }
    };

  return (
    <>
    <div style={{background: 'white', height: "300px", width: "300px", borderRadius: '10px', padding: '10px', display: 'flex', flexDirection: 'column', textAlign: 'center', justifyContent: 'center'}}>
        <h1>Cadastro de usuário</h1>
        <form onSubmit={HandleRegister} style={{display: 'flex', flexDirection: 'column', gap: '15px'}} >
            <input id='email' placeholder='Email:' type='text' onChange={(e)=>setEmail(e.target.value)}  style={{padding: "10px", borderRadius: '6px', border: '1px solid #ccc'}} ></input>
            <input id='nome' placeholder='Nome:' type='text' onChange={(e)=>setNome(e.target.value)} style={{padding: "10px", borderRadius: '6px', border: '1px solid #ccc'}} ></input>
            <input id='senha' placeholder='Senha:' type='password' onChange={(e)=>setSenha(e.target.value)} style={{padding: "10px", borderRadius: '10x', border: '1px solid #ccc'}} ></input>
            <button style={{width: '50%', padding: "10px", alignSelf: "center", border: 'none', borderRadius: '6px', background: '#4CAF50', color: 'white' }} type='submit'>Cadastrar</button>
        </form>
        {mensagem && <p>{mensagem}</p>}
    </div>
    </>
  )
}
