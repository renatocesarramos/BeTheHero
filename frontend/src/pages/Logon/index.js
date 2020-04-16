import React, { useState } from 'react';
import { FiLogIn } from 'react-icons/fi'
import { Link, useHistory } from 'react-router-dom'
import api from '../../services/api'

import './styles.css'
import heroesImg from '../../assets/heroes.png'
import logoImg from '../../assets/logo.svg'

export default function Logon() {

    const [id, setID] = useState('')
    const history = useHistory()

    async function handleLogin(event) {
        event.preventDefault()

        try {
            const response = await api.post('/sessions', { id })

            localStorage.setItem('ongId', id)
            localStorage.setItem('ongName', response.data.name)

            document.querySelector('.loading').style.color = 'green'
            document.querySelector('.loading').textContent = 'Login Efetuado com Sucesso. Entrando...'

            setTimeout(() => {
                history.push('/profile')
            }, 1500);

        } catch (err) {
            alert('Falha no login. tente novamente!')
        }
    }

    return (
      <div className="container">
          
      </div> 
    )
}