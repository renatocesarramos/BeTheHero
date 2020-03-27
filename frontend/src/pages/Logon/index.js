import React, {useState} from 'react';
import {FiLogIn} from 'react-icons/fi'
import {Link, useHistory} from 'react-router-dom'
import api from '../../services/api'

import './styles.css'
import heroesImg from '../../assets/heroes.png'
import logoImg from '../../assets/logo.svg'

export default function Logon(){

  const [id, setID] = useState('')
  const history = useHistory()

  async function handleLogin (event){
    event.preventDefault()

    try{
      const response = await api.post('/sessions', { id })

      localStorage.setItem('ongId', id)
      localStorage.setItem('ongName', response.data.name)

      document.querySelector('.loading').style.color = 'green'
      document.querySelector('.loading').textContent = 'Login Efetuado com Sucesso. Entrando...'

      setTimeout(() => {
        history.push('/profile')
      }, 1500);

    } catch (err){
      alert('Falha no login. tente novamente!')
    }
  }

  return (
    <div className="logon-container">
      <section className="form">
        <img src={logoImg} alt="Be The Hero"/>
        <form onSubmit={handleLogin}>
          <h1>Faça seu logon</h1>

          <input type="text" placeholder="Sua ID" value={id} onChange={event => setID(event.target.value)}/>
          <button type="submit" className="button">Entrar</button>
          <p className="loading"></p>

          <Link to="/register" className="back-link">
            <FiLogIn size={16} color="#E02041"/>
            Não tenho cadastro
          </Link>
        </form>
      </section>
      <img src={heroesImg} alt="Heroes" />
    </div>
  )
}