import * as Yup from 'yup'

export const contactSchema = Yup.object().shape({
    fullname: Yup.string()
        .required('Full name is required'),

    photo: Yup.string()
        .required('Image URL is required')
        .url('The format of the photo is not acceptable'),

    mobile: Yup.string()
        .required('Mobile is required'),

    email: Yup.string()
        .required('Email is required'),

    job: Yup.string()
        .nullable(),

    group: Yup.string()
        .required('Group selection is required'),
});