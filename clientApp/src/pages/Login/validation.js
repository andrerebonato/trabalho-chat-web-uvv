import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
    email: Yup
        .string()
        .email('Formato incorreto, informe um email correto...')
        .required('Preencha este campo...')
        .max(32),
    password: Yup
        .string()
        .required('Preencha este campo...')
        .max(32)
})