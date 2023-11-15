import * as Yup from 'yup';

export const loginSchema = Yup.object().shape({
    username: Yup
        .string()
        .max(16, 'Username length must less than 16 characters!')
        .min(5, 'Username length must more than 5 characters!')
        .required('Required!'),
    password: Yup
        .string()
        .max(18, ('Password length must less than 18 characters'))
        .min(8, 'Password length must more than 8 characters!')
        .required('Required!'),
});
