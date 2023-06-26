import { useState,useEffect } from "react"
import validation from './validation'
import axios from "axios"
import Nav from "../Nav/Nav"

const Form = ({temperaments}) => {

    const [errSubmit, setErrSubmit] = useState(true)
    const [userData,setUserData] = useState({
        image:'',
        name:'',
        minHeight:'',
        maxHeight:'',
        minWeight:'',
        maxWeight:'',
        minAge:'',
        maxAge:'',
        temperaments:''
    })
    const [errors,setErrors] = useState({})

    useEffect( () => {
        const btn = document.querySelector('.submit')
        btn.disabled = true
        console.log(0)
        if(userData.image&&userData.name&&userData.minHeight&&userData.minWeight&&userData.minAge&&userData.temperaments.length){
            if(!errSubmit) btn.disabled = false
        }
    

        }, [userData]);

    const newDog = {
        dog:{
            image:userData.image,
            name:userData.name,
            height:`${userData.minHeight} - ${userData.maxHeight}`,
            weight:`${userData.minWeight} - ${userData.maxWeight}`,
            age:`${userData.minAge} - ${userData.maxAge} years`,
        },
        temperament:userData.temperaments
    }



    const handleChange = (event)=>{
        const property = event.target.name
        const value =  event.target.value
        setUserData({...userData,[property]:value})
        validation({...userData,[property]:value},setErrors,setErrSubmit)
    }

    const clickDropdown = () => {
        const array = ['select','caret','menu']
        array.forEach(el => {
          const element = document.querySelector(`.${el}`)
          if (el == 'select') element.classList.toggle(`${el}-clicked`)
          else if(el == 'caret') element.classList.toggle(`${el}-rotate`)
          else element.classList.toggle(`${el}-open`)
        })
    }

    const dropdowns = (x) => {
        clickDropdown()
    }

    const onClick = (event) => {
        const value = event.target.getAttribute('data-value');
        const getValueById = temperaments.filter(el => el.name == value)
        const idtemps = getValueById.map(el => el.id).pop()
        const id = document.querySelector(`#${value}`)
        console.log(idtemps)

        if(userData.temperaments.includes(idtemps)){
            const aux = userData.temperaments.filter(el => el !== idtemps)
            setUserData({...userData,temperaments:aux})
            id.classList.remove('active')
            return 
        }

        id.classList.add('active')
        setUserData({...userData,temperaments:[...userData.temperaments,idtemps]})
    }
    const handleSubmit = async (event)=>{
        event.preventDefault()

        const response = await axios({
            url:'http://localhost:3001/dogs',
            method:'POST',
            data:newDog
        })
        setUserData({
            image:'',
            name:'',
            minHeight:'',
            maxHeight:'',
            minWeight:'',
            maxWeight:'',
            minAge:'',
            maxAge:'',
            temperaments:''
        })
        const id = document.querySelectorAll(`.home-li`)
        id.forEach(el => 
            el.classList.remove('active')    
        )
        clickDropdown()
        console.log(response)
        if(response.data.res == "ok") alert('la raza de perro fue creado exitosamente')
        else alert('no ha sido posible crear la raza')
        return response
    }

        return(
            <>
            <Nav pathname={'/home'} nameButtonByPathName={'Home'}/>
            <div className="form-cont">
                <div>
                    <form className="form" onSubmit={handleSubmit}>

                        <div className="form-elements">
                        <label htmlFor="name">Name</label>
                        <input className="input-form" type="name" name='name' value={userData.name} onChange={handleChange}></input>
                        <p className="error-form">{errors.name}</p>
                        </div>

                        <div className="minMax">
                        <div className="form-elements">
                        <label html="min-height">min Height</label>
                        <input className="input-form" type="number" name='minHeight' value={userData.minHeight} onChange={handleChange}></input>
                        <p className="error-form">{errors.minHeight}</p>
                        </div>

                        <div className="form-elements">
                        <label html="max-height">max Height</label>
                        <input className="input-form" type="number" name='maxHeight' value={userData.maxHeight} onChange={handleChange}></input>
                        <p className="error-form">{errors.maxHeight}</p>
                        </div>
                        </div>

                        <div className="minMax">
                        <div className="form-elements">     
                        <label html="min-weight">min Weight</label>
                        <input className="input-form" type="number" name='minWeight' value={userData.minWeight} onChange={handleChange}></input>
                        <p className="error-form">{errors.minWeight}</p>
                        </div>

                        <div className="form-elements">
                        <label html="max-weight">max Weight</label>
                        <input className="input-form" type="number" name='maxWeight' value={userData.maxWeight} onChange={handleChange}></input>
                        <p className="error-form">{errors.maxWeight}</p>
                        </div>
                        </div>

                        <div className="minMax">
                        <div className="form-elements">
                        <label html="min-age">min Age</label>
                        <input className="input-form" type="number" name='minAge' value={userData.minAge} onChange={handleChange}></input>
                        <p className="error-form">{errors.minAge}</p>
                        </div>

                        <div className="form-elements">
                        <label html="max-age">max Age</label>
                        <input className="input-form" type="number" name='maxAge' value={userData.maxAge} onChange={handleChange}></input>
                        <p className="error-form">{errors.maxAge}</p>
                        </div>
                        </div>


                        <div className="form-elements">
                        <label html="image-url">Image URL</label>
                        <input className="input-form" type="text" name='image' value={userData.image} onChange={handleChange}></input>
                        <p className="error-form">{errors.image}</p>
                        </div>

                        <div className="form-elements">

                        <div className='select' onClick={()=>dropdowns()}>
                        <span className="selected">Temperaments</span>
                        <div className='caret'></div>
                        </div>
                        </div>

                        <button className="submit" id="submit">Submit</button>
                    </form>
                </div>
               
                <div>
                    <ul className='menu menu-form'>
                            {
                                temperaments.map(temperament => {
                                    return <li data-value={temperament.name.split(' ').join('')} onClick={onClick} className="home-li" id={temperament.name.split(' ').join('')}>{temperament.name}</li>
                                })
                            }
                    </ul>
                </div>

            </div>
            </>
        )
}
export default Form;