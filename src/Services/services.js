import axios from "axios";

// const SERVER_URL = 'http://localhost:9000'
const SERVER_URL = 'https://acoustic-amber-patio.glitch.me'

// description get all contacts
// route get http://localhost:9000/contacts
export const getAllContacts = () => {
    const url = `${SERVER_URL}/contacts`
    return axios.get(url)
}

// description get all groups
// route get http://localhost:9000/groups
export const getAllGroups = () => {
    const url = `${SERVER_URL}/groups`
    return axios.get(url)
}

// description get all groups
// route get http://localhost:9000/groups
export const getGroup = (id) => {
    const url = `${SERVER_URL}/groups/${id}`
    return axios.get(url)
}

// description get a contact
// route get http://localhost:9000/contacts/:contactId
export const getContact = (contactId) => {
    const url = `${SERVER_URL}/contacts/${contactId}`
    return axios.get(url)
}

// description create a contact
// route get http://localhost:9000/contacts
export const createContact = (contact) => {
    const url = `${SERVER_URL}/contacts`
    return axios.post(url,contact)
}

// description edit a contact
// route get http://localhost:9000/contacts/:contactId
export const updateContact = (contactId,contact) => {
    const url = `${SERVER_URL}/contacts/${contactId}`
    return axios.put(url, contact)
}

// description delete a contact
// route get http://localhost:9000/contacts/:contactId
export const deleteContact = (contactId) => {
    const url = `${SERVER_URL}/contacts/${contactId}`
    return axios.delete(url)
}