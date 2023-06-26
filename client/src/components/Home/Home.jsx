import Card from "../Card/Card.jsx";
import { addDogs} from "../../redux/actions.js"
import { connect} from 'react-redux'
import Nav from "../Nav/Nav.jsx"
import Temperaments from "../Temperaments/Temperaments.jsx";
import img from "../../assets/img/pi-dogs.png"
import { useState } from "react";


const Home = ({dogs, next, previous, onClick, temperaments, za, az, weightHigh, weightLow, getApi, getDb, onSearchDogs, toggleComponente, mostrarComponente, mostrarComponenteOrigin, toggleComponenteOrigin}) => {

  const [nameId,setNameId] = useState('')

  const handleChange = (el) => {
      const value = el.target.value
      setNameId(value)
      onSearchDogs(value)
  }

    return(
      <>
      <div class='home'>

      <div class='container'>
      <Nav pathname={'/form'} nameButtonByPathName={'Create Dog'}/>

        <div class='cards-cont'>
          <img className="home-image" src={img} alt="dogs" />


          <div className="dropdown">
            <div className="buttons">

              <div className="btns-filter_container">
                <button  className="btns-filter btnsHomeFilterMargin" onClick={toggleComponente}>Temperaments</button>
                <button  className="btns-filter btnsHomeFilterMargin" onClick={toggleComponenteOrigin}>Origin</button>
                <button className="btns-filter btnsHomeFilterMargin" onClick={az}>  -A-Z-  </button>
                <button className="btns-filter btnsHomeFilterMargin" onClick={za}>  -Z-A-  </button>
                <button className="btns-filter btnsHomeFilterMargin" onClick={weightHigh}>Weight High</button>
                <button className="btns-filter btnsHomeFilterMargin" onClick={weightLow}>Weight Low</button>
              </div>

              <div className="btn-onSearch_cont">
                  <input className="btn-onSearch" id="input-search" type='search' placeholder="                  Name" onChange={handleChange}/>
                  <button class='btns-filter btn-onSearch' onClick={()=>onSearchDogs(nameId)} >Search</button>
              </div>

            </div>
            { 
            mostrarComponente && <Temperaments temperaments={temperaments} onClick={onClick}/>
            }
            {
              mostrarComponenteOrigin && <div className="api-db-container">
                <ul>
                  <li className="api-db" onClick={getApi}>API</li>
                  <li className="api-db" onClick={getDb}>DB</li> 
                </ul>
              </div>
            }

          </div>


            <div class='cards'>
            {
              dogs.map(dog =>{
                  return <div className="cards-container">
                            <Card
                            id={dog.id}
                              name={dog.name}
                              image={dog.image}
                              height={dog.height}
                              weight={dog.weight}
                              age={dog.age}
                              temperaments={dog.temperaments}
                            />
                          </div>

              } )
            }
            </div>
            <div className="btn-cont">
            <button className="btns-filter btnsHomeFilterMargin " onClick={()=>previous()}> {`<`} </button>
              <button className="btns-filter btnsHomeFilterMargin " onClick={()=>next()}>{`>`}</button>
            </div>
          </div>

      </div>
      </div>
      </>
    )
}
const mapDispatchToProps = (dispatch) => {
  return {
     addDogs:(dogs) => dispatch(addDogs(dogs)),
  }
}

export default connect(
  null,
  mapDispatchToProps
)(Home)