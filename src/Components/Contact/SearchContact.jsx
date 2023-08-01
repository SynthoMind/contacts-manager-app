import {PURPLE} from "../../Helpers/color";
import {useContext} from "react";
import {ContactContext} from "../../Context/ContactContext";


const SearchContact = () => {
    const { searchContacts} = useContext(ContactContext)

    return (
        <div className="input-group mx-2 w-75">
                            <span className="input-group-text" id="basic-addon1" style={{backgroundColor: PURPLE}}>
                                <i className="fas fa-search"></i>
                            </span>
        <input type="text"
               onChange={event => searchContacts(event.target.value)}
               className={'form-control'}
               placeholder={'Search for contacts'}
               aria-label="Search"
               aria-describedby={'basic-addon1'}
        />
    </div>
    )
}
export default SearchContact