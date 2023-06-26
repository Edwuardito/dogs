import { useParams } from "react-router-dom"
import { useState,useEffect } from "react"
import Nav from "../Nav/Nav"

const Detail = ({createData}) => {
 
    const [character,setCharacter] = useState({})

    const {id} = useParams();

        useEffect(async () => {

            const data = await createData()
            console.log(data)
            const dog = data.filter(el => el.id == id).pop()
            if (dog.name) {
                setCharacter(dog);
            } else {
                window.alert('No hay personajes con ese ID');
            }

            // return setCharacter({});
        }, [id]);

        return(
            <>
                <div className="detail">
                    <Nav pathname={'/home'} nameButtonByPathName={'Home'}/>
                    <div className="detailContainer">
                        <div className="dogDetail containerWithStyle">
                            <div className="detailCenter">
                                <div className="flexDetail">
                                    <h4 className="nameID">{character?.name}</h4>
                                </div>
            
                                <img className="imgDetail" src={character?.image} alt={character?.name}/>
                                
                                <div className="flexDetail">
                                    <h4 className="">{`Temperaments: `}</h4>
                                    <span>
                                    {character?.temperaments}
                                    </span>
                                </div>
                                <div className="heightWeight">
                                    <div className="flexDetail">
                                        <h4 className="">{`Height: `}</h4>
                                        <span>
                                        {character?.height} cm
                                        </span>
                                    </div>
                                    
                                    <div className="flexDetail">
                                        <h4 className="">{`Weight: `}</h4>
                                        <span>
                                        {character?.weight} kg
                                        </span>
                                    </div>
                                </div>
                                
                                <div className="flexDetail">
                                    <h4 className="">{`Age: `}</h4>
                                    <span>
                                    {character?.age}
                                    </span>
                                </div>
                                <div className="idContainer">
                                    <div className="idMargin">
                                        <h4 className="nameID flexDetail">{character?.id}</h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
}
export default Detail;