import React, {useEffect, useState} from 'react'
import LogoImg from '../../assets/logo.svg'
import { Link , useHistory} from 'react-router-dom'
import { FiPower, FiTrash2 } from 'react-icons/fi'

import api from '../../services/api'

import './styles.css'

export default function Profile() {
const ongName = localStorage.getItem('ongName')
const ongId = localStorage.getItem('ongId')
const history = useHistory()

const [incidents, setIncidents] = useState([])

  useEffect(() => {
    api.get('profile', {
      headers:{
        Authorization: ongId,
      }
    }).then( response => {
      setIncidents(response.data)
    })
  },[ongId])

  async function handleDeleteIncident(id){
    try{

      await api.delete(`incidents/${id}`, {
        headers: {
          Authorization: ongId
        }
      })

      setIncidents(incidents.filter(incident => incident.id !== id))

    }catch(err) {
      alert('Erro ao deletar Caso. Tente novamente.')
    }
  }

  function handleLogout() {
    localStorage.clear()

    history.push('/')
  }

  return (
    <div className="profile-container">
      <header>
        <img src={LogoImg} alt="Be The Hero" />
        <span>Bem Vinda, {ongName}</span>

        <Link className="button" to="/incident/new">Cadastrar novo caso</Link>
        <button type="button"><FiPower size={18} color="#E02041" onClick={handleLogout}/></button>
      </header>

      <h1>Casos Cadastrados</h1>

      <ul>
        {incidents.map(incident => (
          <li key={incident.id}>
            <strong>Caso:</strong>
            <p>{incident.title}</p>

            <strong>Descrição</strong>
            <p>{incident.description}</p>

            <strong>valor:</strong>
            <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incident.value)}</p>

            <button><FiTrash2 size={20} color="" onClick={() => handleDeleteIncident(incident.id)}/></button>
          </li>
        ))}
      </ul>

    </div>
  )
}