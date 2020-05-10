import * as yup from 'yup';

export default yup.object().shape({
    name: yup
        .string()
        .min(3, 'O nome está muito curto, digite ao menos 4 caracteres.')
        .max(32, 'O nome está muito grande, digite no máximo 32 caracteres.')
        .required('Preencha este campo...'),
    lastName: yup
        .string()
        .min(3, 'O sobrenome está muito curto, digite ao menos 4 caracteres.')
        .max(32, 'O sobrenome está muito grande, digite no máximo 32 caracteres.')
        .required('Preencha este campo...'),
    email: yup
        .string()
        .max(64, 'O email está muito grande, digite no máximo 64 caracteres.')
        .min(4, 'O email está muito curto, digite ao menos 4 caracteres.')
        .email('Formato incorreto, informe um email correto...')
        .required('Preencha este campo...'),
    password: yup
        .string()
        .min(4, 'A senha está muito curta, digite ao menos 4 caracteres.')
        .max(20, 'A senha está muito grande, digite no máximo 20 caracteres.')
        .required('Preencha este campo...'),
    repeatPassword: yup
        .string()
        .min(4, 'A senha está muito curta, digite ao menos 4 caracteres.')
        .max(20, 'A senha está muito grande, digite no máximo 20 caracteres.')
        .required('Preencha este campo...'),
});
