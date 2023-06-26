import { Link } from "react-router-dom"
const LandingPage = () => {
    return(
        <>
        <div className='landingPage'>
            <Link to={`/home`} >
                <button className='landingPage-btn'>
                    Ingresar
                </button>
            </Link>
        </div>
        </>
    )
}
export default LandingPage