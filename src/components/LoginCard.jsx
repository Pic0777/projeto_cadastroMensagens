import React, { useState } from 'react'




export const LoginCard = () => {
    const [emailLogin,setEmailLogin] = useState("");
    const [senhaLogin,setSenhaLogin] = useState("");
    const [mensagem, setMensagem] = useState("");

    const handleLogin = async (e)=>{
        e.preventDefault()

        try{
            const res = await fetch("http://localhost:3001/login",{
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({emailLogin, senhaLogin})
            })
            const data = await res.json();
            setMensagem(data.message || data.error);
            
            if(data.id){
                localStorage.setItem("userID",data.id)
                localStorage.setItem("userName",data.nome)
                window.location.reload()
            }
            

        }catch(error){
            console.log("Erro bem aqui")
        }
    }

  return (
    <div style={{background: 'white', height: "300px", width: "300px", borderRadius: '10px', padding: '10px', display: 'flex', flexDirection: 'column', textAlign: 'center', justifyContent: 'center'}} >
        <h1>Login de usuário</h1>
        <form onSubmit={handleLogin} style={{display: 'flex', flexDirection: 'column', gap: '15px'}} >
            <input placeholder='Email:' type='text' onChange={(e)=>setEmailLogin(e.target.value)} style={{padding: "10px", borderRadius: '6px', border: '1px solid #ccc'}} ></input>
            <input placeholder='Senha:' type='password' onChange={(e)=>setSenhaLogin(e.target.value)} style={{padding: "10px", borderRadius: '6px', border: '1px solid #ccc'}} ></input>
            <button type='submit' style={{width: '50%', padding: "10px", alignSelf: "center", border: 'none', borderRadius: '6px', background: '#4CAF50', color: 'white' }} >Login</button>
        </form>
        {mensagem && <p>{mensagem}</p>}
    </div>
  )
}
