import SearchContact from "./Contact/SearchContact";
import {BACKGROUND, PURPLE} from "../Helpers/color";
import {useLocation} from "react-router-dom";

const Navbar = () => {
    const location = useLocation()
    return (
        <nav className="navbar navbar-dark navbar-expand-sm shadow-lg" style={{background: BACKGROUND}}>
            <div className="container">
                <div className="row w-100">
                    <div className="col">
                        <div className="navbar-brand">
                            <i className="fas fa-id-badge" style={{color: PURPLE}}/>
                            {' '}Web Application{' '}
                            <span style={{color: PURPLE}}>Managing Contacts</span>
                        </div>
                    </div>
                    {location.pathname === '/contacts'?(<div className="col">
                        <SearchContact/>
                    </div>):null}

                </div>
            </div>
        </nav>
    )
}
export default Navbar

