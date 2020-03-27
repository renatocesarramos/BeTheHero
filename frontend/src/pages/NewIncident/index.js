import React, {useState} from 'react'
import logoImg from '../../assets/logo.svg'
import { Link , useHistory} from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'
import './styles.css'
import api from '../../services/api'

export default function NewIncident (){

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [value, setValue] = useState('')
  const ongId = localStorage.getItem('ongId')
  const history = useHistory()

  async function handleNewIncident(event){
    event.preventDefault()

    if (!title && !description && !value){
      alert('Informe os campos para prosseguir.')
      return;
    }

    const data = {
      title,
      description,
      value
    }

    try {

      await api.post('incidents', data, {
        headers: {
          Authorization: ongId
        }
      })

      alert('Caso cadastrado com sucesso!')
      history.push('/profile')

    } catch(err){
      alert('Erro ao Cadastrar novo caso. Tente novamente!')
    }
  }


  return (
    <div className="new-incident-container">
      <div className="content">

        <section>
            <img src={logoImg} alt="Be The Hero"/>

          <h1>Cadastro</h1>
          <p>Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem os casos da sua ONG.</p>

          <Link to="/profile" className="back-link">
            <FiArrowLeft size={16} color="#E02041" />
            Voltar para a Home
          </Link>
        </section>

        <form action="" onSubmit={handleNewIncident}>
          <input type="text" 
          placeholder="Titulo do Caso"
          value={title}
          onChange={event => setTitle(event.target.value)}/>

          <textarea type="email" 
          placeholder="Descrição"
          value={description}
          onChange={event => setDescription(event.target.value)}></textarea>

          <input type="text" 
          placeholder="Valor em Reais" 
          value={value}
          onChange={event => setValue(event.target.value)}/>


          <button className="button" type="submit">Cadastrar</button>
        </form>

      </div>
    </div>
  )
}