const Temperaments =  ({temperaments, onClick, setMostrarComponente}) => {



            return(
                <>
                    <div className="buttonsList">
                        <ul className='menu menu-grid'>
                            {
                            temperaments.map(temperament => {
                                return <li data-value={temperament.name} onClick={onClick}  className="home-li" id={temperament.name}>{temperament.name}</li>
                            })
                            }
                        </ul>
                    </div>
                </>
            )
    
}
export default Temperaments;