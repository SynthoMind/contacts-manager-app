import {Spinner} from "../index";
import {CURRENTLINE, CYAN, PURPLE} from "../../Helpers/color";
import {Link, useParams} from "react-router-dom";
import {useContext} from "react";
import {ContactContext} from "../../Context/ContactContext";


const ViewContact = () => {
    let {
        loading,
        contacts,
        groups,
    } = useContext(ContactContext)

    const params = useParams()
    const id = parseInt(params.contactId)

    const userData = contacts.filter(contact => contact.id === id)[0]


    return (
        <>
            <section className="view-contact-intro p3">
                <div className="container">
                    <div className="row my-2 text-center">
                        <p className="h3 fw-bold" style={{color: CYAN}}>
                            Contact Information
                        </p>
                    </div>
                </div>
            </section>

            <hr style={{backgroundColor: CYAN}}/>

            {loading ? (
                <Spinner/>
            ) : (
                <>
                    {Object.keys(userData).length > 0 && (
                        <section className="view-contact mt-e">
                            <div
                                className="container p-2"
                                style={{borderRadius: "1em", backgroundColor: CURRENTLINE}}
                            >
                                <div className="row align-items-center">
                                    <div className="col-md-3">
                                        <img
                                            src={userData.photo}
                                            alt=""
                                            className="img-fluid rounded"
                                            style={{border: `1px solid ${PURPLE}`}}
                                        />
                                    </div>
                                    <div className="col-md-9">
                                        <ul className="list-group">
                                            <li className="list-group-item list-group-item-dark">
                                                Full Name :{" "}
                                                <span className="fw-bold">{userData.fullname}</span>
                                            </li>
                                            <li className="list-group-item list-group-item-dark">
                                                Phone Number :{" "}
                                                <span className="fw-bold">{userData.mobile}</span>
                                            </li>
                                            <li className="list-group-item list-group-item-dark">
                                                Email Address : <span className="fw-bold">{userData.email}</span>
                                            </li>
                                            <li className="list-group-item list-group-item-dark">
                                                job : <span className="fw-bold">{userData.job}</span>
                                            </li>
                                            <li className="list-group-item list-group-item-dark">
                                                Groups : <span className="fw-bold">{groups.name}</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="row my-2">
                                    <div className="d-grid gap-2 col-6 mx-auto">
                                        <Link
                                            to={"/contacts"}
                                            className="btn"
                                            style={{backgroundColor: PURPLE}}
                                        >
                                            برگشت به صفحه اصلی
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </section>
                    )}
                </>
            )}
        </>
    );
};

export default ViewContact;
