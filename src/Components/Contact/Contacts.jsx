import {CURRENTLINE, ORANGE, PINK} from "../../Helpers/color";
import Contact from "./Contact";
import Spinner from "../Spinner";
import {Link} from "react-router-dom";
import {useContext} from "react";
import {ContactContext} from "../../Context/ContactContext";

const Contacts = () => {
    const {filterContacts, loading} = useContext(ContactContext)
    return (
        <>
            <section className="container">
                <div className="grid">
                    <div className="row">
                        <div className="col">
                            <p className="h3">
                                <Link to={'/add'} className="btn mx-2" style={{backgroundColor: PINK}}>
                                    Create New Contact
                                    <i className="fa fa-plus-circle mx-2"/>
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            {loading ? <Spinner/> :(            <section className="container">
                <div className="row">
                    {filterContacts.length > 0 ? filterContacts.map(c => <Contact key={c.id} contact={c} />):
                        (
                            <div className="text-center py-5" style={{backgroundColor: CURRENTLINE}}>
                                <p className="h3" style={{color:ORANGE}}>
                                    Contact not found...
                                </p>
                                <img src={require('../../Assets/no-found.gif')} alt="not find" className="w-25"/>
                            </div>
                        )
                    }
                </div>
            </section>)}
        </>
    )
}
export default Contacts