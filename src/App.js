import './App.css';
import {AddContact, Contacts, EditContact, Navbar, ViewContact} from "./Components";

import React, {useEffect, useState} from "react";
import {Navigate, Route, Routes, useNavigate} from "react-router-dom";
import {createContact, deleteContact, getAllContacts, getAllGroups} from "./Services/services";
import {COMMENT, CURRENTLINE, FOREGROUND, PURPLE, YELLOW} from "./Helpers/color";
import {confirmAlert} from 'react-confirm-alert'; // Import
import {ContactContext} from "./Context/ContactContext";
import 'react-toastify/dist/ReactToastify.css';
import {toast, ToastContainer} from "react-toastify";

function App() {
    const navigate = useNavigate()
    const [contacts, setContacts] = useState([]);
    const [filterContacts, setFilterContacts] = useState([]);
    const [contact, setContact] = useState({
        // 'fullname': '', 'photo': '', 'mobile': '', 'email': '', 'job': '', 'group': ''
    });
    const [loading, setLoading] = useState(false);
    const [groups, setGroups] = useState([]);
    const [forceUpdate, setForceUpdate] = useState(false)




    const submitNewContact = async (values) => {
        try {
            const {status, data} = await createContact(values)
            toast.promise(
                Promise.resolve(data),
                {
                    pending: 'Registering contact...',
                    success: 'Contact successfully registered! 👌',
                    error: 'Failed to register contact. 🤯'
                }
            )
            if (status === 201) {
                // toast.success('Contact Registered successfully')
                setContacts(contacts => [...contacts, data]);
                setFilterContacts(contacts => [...contacts, data])
                setContact({});
                navigate('/contacts')
            }
        } catch (error) {
            console.error(error)
        }

    }

    const fetchData = async () => {
        try {
            setLoading(true)
            const {data: ContactsData} = await getAllContacts()
            const {data: GroupsData} = await getAllGroups()
            setContacts(ContactsData)
            setFilterContacts(ContactsData)
            setGroups(GroupsData)
            setLoading(false)
        } catch (error) {
            console.error(error);
            setLoading(false)
        }
    }


    useEffect(() => {
        fetchData()
    }, []);

    const confirmDelete = (contactId, contactFullName) => {
        confirmAlert({
            customUI: ({onClose}) => {
                return (
                    <div style={{
                        backgroundColor: CURRENTLINE,
                        border: `1px solid ${PURPLE}`,
                        borderRadius: '1rm'
                    }} className={'p-4'}>
                        <h1 style={{color: YELLOW}}>Remove the Contact</h1>
                        <p style={{color: FOREGROUND}}>
                            Are you sure to clean {contactFullName}
                        </p>
                        <button onClick={() => {
                            removeContact(contactId)
                            onClose()
                        }} className={'btn mx-2'} style={{backgroundColor: PURPLE}}>Yes, Delete it!
                        </button>
                        <button onClick={onClose} className={'btn'} style={{backgroundColor: COMMENT}}>No</button>
                    </div>
                )
            }
        })
    }

    const removeFromServer = async  (id, copyContacts) => {
        try {
            // const {} = await deleteContact(id)
            toast.promise(
                deleteContact(id),
                {
                    pending: 'Removing contact...',
                    success: 'Contact successfully removed! 👌',
                    error: 'Failed to remove contact. 🤯'
                }
            )

        } catch (error) {
            debugger
            setContacts(copyContacts)
            setFilterContacts(copyContacts)
            console.error(error);
        }
    }
    const removeContact =  (id) => {
        try {
            const copyContacts = contacts;
            removeFromServer(id, copyContacts)
            const newContacts = contacts.filter(contact => contact.id !== id)
            // debugger
            setContacts(newContacts)
            setFilterContacts(newContacts)
        } catch (error) {
            console.error(error);
        }
    }

    const searchContacts = (query) => {
        setFilterContacts( contacts.filter(contact => {
            return contact.fullname.toLowerCase().includes(query.toLowerCase())
        }))
    }

    return (

        <ContactContext.Provider value={{
            loading,
            setLoading,
            contact,
            setContact,
            contacts,
            setContacts,
            filterContacts,
            setFilterContacts,
            groups,
            deleteContact: confirmDelete,
            createContact,
            searchContacts,
            forceUpdate,
            setForceUpdate,

        }}>
            <div className="App">

                <h3>Contact Management</h3>
                <Navbar/>
                <Routes >
                    <Route path={'/'} exact element={<Navigate to={'/contacts'}/>}/>
                    <Route path={'/contacts'} exact element={<Contacts/>}/>
                    <Route path={'/add'} element={<AddContact submitNewContact={submitNewContact}/>}/>
                    <Route path={'/contacts/:contactId'} element={<ViewContact/>}/>
                    <Route path={'/contacts/edit/:contactId'} element={<EditContact/>}/>
                </Routes>


            </div>
            <ToastContainer theme="dark"/>
        </ContactContext.Provider>);
}

export default App;
