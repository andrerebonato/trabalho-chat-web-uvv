import React from 'react';
import './login.css';
import {Field, Form, Formik } from 'formik';
import { validationSchema } from './validation';
import { faEnvelope, faUnlock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const Login = () => {

    return(
        <Formik
            initialValues={{
                email: '',
                password: ''
            }}
            onSubmit={(values) => {
                alert(values)
            }}
            validationSchema={validationSchema}
        >  
            {
                formik => (
                    <div className="az-body smoke">
                        <div className="az-signin-wrapper az-body">
                            <div className="az-card-signin gradient">
                                <div className="az-signin-header">
                                    <h2 className="mt-2 text-center font-weight-bold">Bem-vindo de volta!</h2>
                                    <Form method="post">

                                        <div className="form-group">
                                        <FontAwesomeIcon icon={faEnvelope}/><label className="ml-1 font-weight-bold">Email:</label>
                                            <Field
                                                name="email"
                                                className="form-control"
                                                placeholder="Insira seu email..."
                                                onChange={(e) => {
                                                    formik.setFieldValue('email', e.target.values);
                                                }}
                                            />
                                            <small className="text-danger font-weight-bold">
                                                {formik.touched.email && formik.errors.email}
                                            </small>
                                        </div>
                        
                                        <div className="form-group">
                                        <FontAwesomeIcon icon={faUnlock}/><label className="ml-1 font-weight-bold"> Senha:</label>
                                            <Field
                                                name="password"
                                                type="password"
                                                className="form-control"
                                                placeholder="Insira sua senha..."
                                                onChange={(e) => {
                                                    formik.setFieldValue('password', e.target.values);
                                                }}
                                            />
                                            <small className="text-danger font-weight-bold">
                                                {formik.touched.password && formik.errors.password}
                                            </small>
                                        </div>

                                        <button className="btn-block btn btn-login mr-2 primary-bg" type="submit">Entrar</button>
                                    </Form>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        </Formik>
    )
}

export default Login;