import { Link } from "react-router-dom"
const Nav =  ({pathname, nameButtonByPathName}) => {



            return(
                <div className="nav">
                    <div className="btns-container">
                        <Link to={pathname}>
                            <button className='btns-nav'>
                                {nameButtonByPathName}
                            </button>
                        </Link>
                        <Link to={`/`} >
                            <button className='btns-nav logout'>
                                Log Out
                            </button>
                        </Link>
                    </div>
                </div>
            )
    
}
export default Nav;