import { Link } from "react-router-dom"
const Card = ({name,image,weight,temperaments,id}) =>{

   return (
      <>
            <div class='cardClass'>
               <div className="cardsComponents">
                  <Link to={`/detail/${id}`} className="txtCard">
                     <h2>{name}</h2>
                     <img class='img-card'src={image}/>
                     <h4>{`${temperaments}`}</h4>
                     <h4>{`${weight} Kg`}</h4>
                  </Link>
               </div>
            </div>
      </>
   )
}

export default Card