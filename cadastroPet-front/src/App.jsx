import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [nomePet, setNomePet] = useState('')
  const [dataNasci, setDataNasci] = useState('')
  const [dataAd, setDataAd] = useState('')
  const [pets, setPets] = useState([])

  const url = import.meta.env.VITE_BASE_URL

  const cadastroNovoPet = async () => {
    const novoPet = {
      name: nomePet,
      birthday: dataNasci,
      adoptionDate: dataAd
    }

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(novoPet)
      })

      if (!response.ok) {
        console.error('Erro ao cadastrar pet:', response.status)
        return
      }

      setNomePet('')
      setDataNasci('')
      setDataAd('')
      await fetchPet()
    } catch (error) {
      console.error('Erro ao enviar pet:', error)
    }
  }

  const fetchPet = async () => {
    try {
      const response = await fetch(url)

      if (!response.ok) {
        console.error('Erro ao buscar pets:', response.status)
        return
      }

      const data = await response.json()
      setPets(data)
    } catch (error) {
      console.error('Erro ao fazer fetch dos pets:', error)
    }
  }

  useEffect(() => {
    fetchPet()
  }, [])

  return (
    <div className='cadastroPet'>
      <div className='cadastro'>
        <h1>Ficha do pet</h1>
        <div className='campos'>
          <p>Nome do pet:</p>
          <input
            type="text"
            value={nomePet}
            onChange={(e) => setNomePet(e.target.value)}
          />
        </div>

        <div className='campos'>
          <p>Data de nascimento:</p>
          <input
            type="date"
            value={dataNasci}
            onChange={(e) => setDataNasci(e.target.value)}
          />
        </div>

        <div className='campos'>
          <p>Data da adoção:</p>
          <input
            type="date"
            value={dataAd}
            onChange={(e) => setDataAd(e.target.value)}
          />
        </div>

        <button className='primeiroBotao' onClick={cadastroNovoPet}>Cadastrar</button>
      </div>

      <div className='listaDosPets'>
        {pets.length === 0 ? (
          <p>Nenhum pet cadastrado ainda.</p>
        ) : (
          pets.map((pet, index) => (
            <div key={index} className='petInfo'>
              <p>🐾 Nome: {pet.name}</p>
              <p>🎂 Nascimento: {pet.birthday}</p>
              <p>🏠 Adoção: {pet.adoptionDate}</p>
              <hr />
            </div>
          ))
        )}
      </div>

      <p>Nome do pet digitado: {nomePet}</p>
      <p>Data da adoção digitada: {dataAd}</p>
      <button>Deletar</button>
    </div>
  )
}

export default App