import React from 'react';
import './login.css';
import { Field, Form, Formik } from 'formik';
import { validationSchema } from './validation';
import { faEnvelope, faUnlock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { availablePages } from '../../constants/index';
import { useHistory } from 'react-router-dom';
import { displayAlert, typesAlert } from '../../utils/displayAlert'
import { handleLogin } from '../../services/authJwt';
import mainApi, { eps } from '../../services/mainApi';

const Login = () => {
    const history = useHistory();
    return (
        <Formik
            initialValues={{
                email: '',
                password: ''
            }}
            onSubmit={(values) => {
                mainApi.post(eps.signIn, values).then((res) => {
                    console.log(res.data)
                    if (res.data.success) {
                        displayAlert(res.data.message, typesAlert.success);
                        handleLogin(res.data.token, res.data.user._id);
                        history.push(availablePages.chatPage, { user: res.data.user });
                    } else {
                        displayAlert(res.data.message, typesAlert.error);
                    }
                })
            }}
            validationSchema={validationSchema}
        >
            {
                formik => (
                    <>
                        <div class="wrapper fadeInDown mt-5">
                            <h1 class="text-center mb-3 text-light">Acessar chat</h1>
                            <div id="formContent">
                                <Form method="post">
                                    <div className="form-group">
                                        <div className="form-group">
                                            <FontAwesomeIcon icon={faEnvelope} /><label className="ml-1">Email:</label>
                                            <Field
                                                name="email"
                                                className="form-control"
                                                placeholder="Insira seu email..."
                                                onChange={(e) => {
                                                    formik.setFieldValue('email', e.target.value);
                                                }}
                                            />
                                            <small className="text-danger font-weight-bold">
                                                {formik.touched.email && formik.errors.email}
                                            </small>
                                        </div>
                                        <div className="form-group">
                                            <FontAwesomeIcon icon={faUnlock} /><label className="ml-1"> Senha:</label>
                                            <Field
                                                name="password"
                                                type="password"
                                                className="form-control"
                                                placeholder="Insira sua senha..."
                                                onChange={(e) => {
                                                    formik.setFieldValue('password', e.target.value);
                                                }}
                                            />
                                            <small className="text-danger font-weight-bold">
                                                {formik.touched.password && formik.errors.password}
                                            </small>
                                        </div>
                                        <button className="btn-block btn btn-primary mr-2 primary-bg" type="submit">Entrar</button>
                                        <button className="btn btn-link text-muted" type="button"
                                            onClick={() => {
                                                history.push(availablePages.signUpPage)
                                            }}
                                        >
                                            Ainda não tem uma conta? Clique aqui.
                                    </button>
                                    </div>
                                </Form>
                            </div>
                        </div>
                    </>
                )
            }
        </Formik>
    )
}

export default Login;
