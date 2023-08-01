import {createContext} from "react";


export const ContactContext = createContext({
    loading: false,
    setLoading: () => {},
    contact: {},
    setContact: () => {},
    contacts: [],
    filterContacts: [],
    groups: [],
    deleteContact: () => {},
    // updateContact: () => {},
    // createContact: () => {},
    searchContacts: () => {},
    forceUpdate: false,
    // setForceUpdate: () => {},
})
