import React from 'react'
import { CadastroCard } from '../../components/CadastroCard'
import { LoginCard } from '../../components/LoginCard'

export const Home = () => {
  return (
    <>
    <div style={{display: 'flex', background: '#d4d4d4', height:"100vh", justifyContent: 'center', alignItems: 'center', gap: '15px'}}>
        <CadastroCard/>
        <LoginCard/>
    </div>
        
    </>
  )
}
