import {Link, useNavigate, useParams} from "react-router-dom";
import {COMMENT, GREEN, PURPLE} from "../../Helpers/color";
import {Spinner} from "../index";
import {useContext, useEffect} from "react";
import { updateContact} from "../../Services/services";
import {ContactContext} from "../../Context/ContactContext";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {contactSchema} from "../../Validations/ContactValidiation";
import {toast} from "react-toastify";


const EditContact = () => {

    let {
        contacts,
        setContacts,
        contact,
        setContact,
        setFilterContacts,
        loading,
        setLoading,
        groups,
    } = useContext(ContactContext)

    const params = useParams()
    const id = parseInt(params.contactId)
    useEffect(() => {
        const contactData = contacts?.filter(contact => (contact.id === id))
        setLoading(true)
        setContact(contactData[0])
        setLoading(false)
    }, [contacts,id]);




    const navigate = useNavigate()

    const updateData = async (copyContacts,values) => {
        try {
            const {status} =  await updateContact(id, values)
             toast.promise(
                 Promise.resolve(status),
                {
                    pending: 'Updating contact...',
                    success: 'Contact successfully updated! 👌',
                    error: 'Failed to update contact. 🤯'
                }
            )
        } catch (error) {
            console.error(error);
            setContacts(copyContacts)
            setFilterContacts(copyContacts)
        }

    }


    const submitEditContact = (values) => {
        let copyContacts = contacts
        const excludeContactId = contacts.filter(contact => contact.id !== id)
        setContacts([...excludeContactId, values])
        setFilterContacts([...excludeContactId, values])
        updateData(copyContacts, values)

        navigate('/contacts')

    }

    return (<>
        {loading ? (<Spinner/>) : (<>
            <section className="p-3">
                <img
                    src={require("../../Assets/man-taking-note.png")}
                    height="400px"
                    style={{
                        position: "absolute", zIndex: "-1", top: "130px", right: "100px", opacity: "50%",
                    }}
                 alt={'avatar'}/>
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <p
                                className="h4 fw-bold text-center"
                                style={{color: GREEN}}
                            >
                                Edit Contact
                            </p>
                        </div>
                    </div>
                    <hr style={{backgroundColor: GREEN}}/>

                    {Object.keys(contact || {}).length > 0 ? (<div className="row mt-5">
                        <div className="col-md-4">
                            <Formik initialValues={contacts?.filter(contact => (contact.id === id))[0]}
                                    validationSchema={contactSchema}
                                    onSubmit={(values) => {
                                        submitEditContact(values)
                                    }}>
                                <Form>
F
                                    <div className="mb-2">
                                        <Field
                                            name={'fullname'}
                                            type="text"
                                            className="form-control"
                                            placeholder="Full Name"
                                        />
                                        <ErrorMessage name={'fullname'} render={msg => (
                                            <span className={'text-danger'}>{msg}</span>)}/>
                                    </div>
                                    <div className="mb-2">
                                        <Field
                                            name={'photo'}
                                            type="text"
                                            className="form-control"
                                            placeholder="Image URL"
                                        />
                                        <ErrorMessage name={'photo'} render={msg => (
                                            <span className={'text-danger'}>{msg}</span>)}/>
                                    </div>
                                    <div className="mb-2">
                                        <Field
                                            name={'mobile'}
                                            type="number"
                                            className="form-control"
                                            placeholder="Phone Number"
                                        />
                                        <ErrorMessage name={'mobile'} render={msg => (
                                            <span className={'text-danger'}>{msg}</span>)}/>
                                    </div>
                                    <div className="mb-2">
                                        <Field
                                            name={'email'}
                                            type="email"
                                            className="form-control"
                                            placeholder="Email Address"
                                        />
                                        <ErrorMessage name={'email'} render={msg => (
                                            <span className={'text-danger'}>{msg}</span>)}/>
                                    </div>
                                    <div className="mb-2">
                                        <Field
                                            name={'job'}
                                            type="text"
                                            className="form-control"
                                            placeholder="Job"
                                        />
                                        <ErrorMessage name={'job'} render={msg => (
                                            <span className={'text-danger'}>{msg}</span>)}/>
                                    </div>
                                    <div className="mb-2">
                                        <Field
                                            name={'group'}
                                            as={'select'}
                                            className="form-control"
                                        >
                                            <option value="">Select Group</option>
                                            {groups.map((group) => (
                                                <option value={group.id} key={group.id}>{group.name}</option>
                                            ))}
                                        </Field>
                                        <ErrorMessage name={'group'} render={msg => (
                                            <span className={'text-danger'}>{msg}</span>)}/>
                                    </div>
                                    <div className="mx-2">
                                        <input
                                            type="submit"
                                            className="btn"
                                            style={{backgroundColor: PURPLE}}
                                            value="Edit"
                                        />
                                        <Link
                                            to={"/contacts"}
                                            className="btn mx-2"
                                            style={{backgroundColor: COMMENT}}
                                        >
                                            Cancel
                                        </Link>
                                    </div>
                                </Form>


                            </Formik>
                        </div>
                    </div>) : null}
                </div>
            </section>
        </>)}
    </>);
};

export default EditContact;
