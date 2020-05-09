import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
    email: Yup
        .string()    
        .email('Email inválido')
        .required('Campo obrigatório')
        .max(32),
    password: Yup
        .string()
        .required('Campo obrigatório')
        .max(32)
})