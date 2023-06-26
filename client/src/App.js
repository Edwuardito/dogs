import './App.css';
import React from 'react';
import LandingPage from './components/LandingPage/LandingPage';
import Home from './components/Home/Home'
import { Routes, Route} from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import { addDogs } from './redux/actions';
import Detail from './components/Detail/Detail';
import Form from './components/Formulario/Form';
import Error from './components/Error/Error';

function App() {
  const dispatch = useDispatch()
  const URL = 'http://localhost:3001/dogs'
  const URLTEMPERAMENTS = 'http://localhost:3001/temperaments'
  const [dogs, setDogs] = useState([]);
  const [dogsOrder, setDogsOrder] = useState('')
  const dogsDTApage = useSelector(state => state.dogs)
  const [page, setPage] = useState(1)
  const [temperaments, setTemperaments] = useState([])
  const [mostrarComponente, setMostrarComponente] = useState(false);
  const [mostrarComponenteOrigin, setMostrarComponenteOrigin] = useState(false);

  const toggleComponente = () => {
    setMostrarComponente(!mostrarComponente);
    if(mostrarComponenteOrigin)setMostrarComponenteOrigin(!mostrarComponenteOrigin)
  };

  const toggleComponenteOrigin = () => {
    setMostrarComponenteOrigin(!mostrarComponenteOrigin);
    if(mostrarComponente)setMostrarComponente(!mostrarComponente)
  };



  /// CREATED DATA FUNCTION
  const createData = async () => {
    const { data } = await axios(`${URL}`)
    const lastIdFromApi = data.dataAPI[data.dataAPI.length - 1].id
    let newId = lastIdFromApi

    const setNewIdFromDB = data.dataDtaBse.map(el => {
      newId++
      return {
        age:el.age,
        height:el.height,
        id:newId,
        image:el.image,
        name:el.name,
        temperaments:el.temperaments,
        weight:el.weight,
        oldID:el.id
      }
    })
    console.log(setNewIdFromDB)
    return [...data.dataAPI , ...setNewIdFromDB]
  }
  /// CREATED DATA

  useEffect(async () => {
    const allData = await createData()
    console.log(allData)
    const firstPage = allData.slice(0, 8)
    dispatch(addDogs(firstPage))
    setDogs(firstPage)

    const dataTemperaments = await axios(`${URLTEMPERAMENTS}`)
    const newData = dataTemperaments.data
    setTemperaments(newData)
}, []);
  //// SEACH DOG BY NAME
  const onSearchDogs = async(nameId) =>{

    try {
      if(nameId){
        const { data } = await axios(`${URL}?name=${nameId}`)

        if(data.length){
          setDogs([])
          data.forEach(el => setDogs((oldDogs) => [...oldDogs, el]) );
        }
      }else{
        setDogs(dogsDTApage)
      }
    } catch (error) {
       alert(`¡el personaje ya fue elegido!`)
    }
  }
  //// CLICK DROPDOWNS TEMPERAMENTS
  const onClick = async (event) => {
    toggleComponente()
    const value = event.target.getAttribute('data-value');
    console.log(value)
    //TEMPERAMENTS FUNCTION
    const data = await createData()
    const searchByTemperaments = data.filter(el => {
      if(el.temperaments == undefined) return false
      if(el.temperaments.includes(value)) return true
      return false
    })
    setDogs(searchByTemperaments)
    //TEMPERAMENTS FUNCTION
  }

  //////NEXT BUTTON
  const next = async () => {

    let data = []
    if(dogsOrder !== ''){
      data = dogsOrder
    }else data = await createData()
    console.log(data)
    const lastDogId = dogs.length*page
    setPage(page + 1)
    const nextDogs = data.slice(lastDogId, lastDogId + 8)
    console.log(nextDogs)
    dispatch(addDogs(nextDogs))
    setDogs(nextDogs)
    
  }
  //////PREVIOUS BUTTON
  const previous = async () => {
    let data = []
    console.log(dogsOrder)
    if(dogsOrder !== ''){
      data = dogsOrder
    }else data = await createData()

    const lastDogId = (8*page) - 16
    setPage(page - 1)
    const nextDogs = data.slice(lastDogId, lastDogId + 8)
    dispatch(addDogs(nextDogs))
    setDogs(nextDogs)
    
  }

  ///////// FILTERS

  const controlWeightHigh = async() => {
    const data = await createData()
    const weight = data.filter(el => el.weight !== "NaN")
    weight.sort((a, b) => {
      return b.weight.split(' - ').pop() - a.weight.split(' - ').pop()
    })
    return weight
  }
  const weightHigh = async() => {
    const data = await controlWeightHigh()
    const firstPage = data.slice(0 , 8)
    dispatch(addDogs(firstPage))
    setDogs(firstPage)
    setPage(1)
    setDogsOrder(data)
  }
  ////WEIGHT LOW
  const controlWeightLow = async() => {
    const data = await createData()
    const weight = data.filter(el => el.weight !== "NaN")
    weight.sort((a, b) => {
    return a.weight.split(' - ').pop() - b.weight.split(' - ').pop() 
    })
    return weight
  }
  const weightLow = async() => {
    const data = await controlWeightLow()
    const firstPage = data.slice(0 , 8)
    dispatch(addDogs(firstPage))
    setDogs(firstPage)
    setPage(1)
    setDogsOrder(data)
  }

  ////AZ
  const controlAZ = async () => {
    const data = await createData()
    data.sort((a, b) => {
      const nameA = a.name.toUpperCase()
      const nameB = b.name.toUpperCase()
      if(nameA < nameB){
        return -1
      }
      if(nameA > nameB){
        return 1
      }
      return 0
    })
    return data
  } 
  const az = async()=> {
    const data = await controlAZ()
    const firstPage = data.slice(0, 8)
    dispatch(addDogs(firstPage))
    setDogs(firstPage)
    setDogsOrder(data)
    setPage(1)
    return data
  }

////ZA
  const controlZA = async () => {
    const data = await createData()
    data.sort((a, b) => {
    const nameA = a.name.toUpperCase()
    const nameB = b.name.toUpperCase()
    if(nameA < nameB){
      return 1
    }
    if(nameA > nameB){
      return -1
    }
    return 0
  })
    return data
  }
  const za = async() => {
  const data = await controlZA()
  const firstPage = data.slice(0, 8)
  dispatch(addDogs(firstPage))
  setDogs(firstPage)
  setDogsOrder(data)
  setPage(1)
  return data
}

  ////API
  const controlApi = async () => {
    const { data } = await axios(`${URL}`)
    return data.dataAPI
  }
  const getApi = async () => {
    toggleComponenteOrigin()
    const data = await controlApi()
    const firstPage = data.slice(0, 8)
    dispatch(addDogs(firstPage))
    setDogs(firstPage)
    setDogsOrder(data)
    setPage(1)
  }

  ///DB
  const controlDb = async () => {
    const { data } = await axios(`${URL}`)
    return data.dataDtaBse
  }
  const getDb = async () => {
    toggleComponenteOrigin()
    const data = await controlDb()
    let firstPage = []
    if(data.length >= 8) firstPage = data.slice(0, 8)
    firstPage = data
    dispatch(addDogs(firstPage))
    setDogs(firstPage)
    setDogsOrder(data)
    setPage(1)
  } 

  return (
  <>
    <div className="App">
    <Routes>
      <Route path='/' element={<LandingPage/>}/>
      <Route path='*' element={<Error/>}/>
      <Route path='/form' element={<Form temperaments={temperaments}/>}/>
      <Route path='/detail/:id' element={<Detail createData={createData}/>}/>
      <Route path='/home' element={<Home onSearchDogs={onSearchDogs}  toggleComponente={toggleComponente} toggleComponenteOrigin={toggleComponenteOrigin} mostrarComponente={mostrarComponente} mostrarComponenteOrigin={mostrarComponenteOrigin} weightHigh={weightHigh} weightLow={weightLow} za={za} az={az} onClick={onClick}dogs={dogs} temperaments={temperaments} next={next} previous={previous} getApi={getApi} getDb={getDb}/>}/>
    </Routes>
    </div>
  </>

  );
}

export default App;
