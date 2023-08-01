import {Link} from "react-router-dom";
import {COMMENT, GREEN, PURPLE} from "../../Helpers/color";
import {Spinner} from "../index";
import {useContext} from "react";
import {ContactContext} from "../../Context/ContactContext";
import { Formik, Form, ErrorMessage, Field} from "formik";
import {contactSchema} from "../../Validations/ContactValidiation";


const AddContact = ({submitNewContact}) => {
    let {loading, groups} = useContext(ContactContext)
    return (
        <>
            {loading ? (
                <Spinner/>
            ) : (
                <>
                    <section className="p-3">
                        <img
                            src={require("../../Assets/man-taking-note.png")}
                            height="400px"
                            style={{
                                position: "absolute",
                                zIndex: "-1",
                                top: "130px",
                                right: "100px",
                                opacity: "50%",
                            }}
                         alt={'avatar'}/>
                        <div className="container">
                            <div className="row">
                                <div className="col">
                                    <p
                                        className="h4 fw-bold text-center"
                                        style={{color: GREEN}}
                                    >
                                        Create New Contact
                                    </p>
                                </div>
                            </div>
                            <hr style={{backgroundColor: GREEN}}/>
                            <div className="row mt-5">
                                <div className="col-md-4">
                                    <Formik initialValues={{
                                        fullname: '',
                                        photo: '',
                                        mobile: '',
                                        email: '',
                                        job: '',
                                        group: '',
                                    }}
                                            validationSchema={contactSchema}
                                            onSubmit={(values) => {
                                                submitNewContact(values)
                                            }}>
                                        <Form>

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
                                                    value="Create"
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
                            </div>
                        </div>
                    </section>
                </>
            )}
        </>
    );
};

export default AddContact;
