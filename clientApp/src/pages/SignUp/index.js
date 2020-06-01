import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { useHistory } from 'react-router-dom';
import './styles.css'
import formValidation from './formValidation';
import mainApi, { eps } from '../../services/mainApi';
import { displayAlert, typesAlert } from '../../utils/displayAlert'
import { availablePages } from '../../constants';
import { faEnvelope, faLock, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const steps = {
    one: 1,
    two: 2
}


//TODO: add the logic of api request on form submit.
const SignUp = () => {
    const [error, setError] = useState(false);
    const [step, setStep] = useState(steps.one);
    const history = useHistory();

    const validateStepOne = (email) => {
        if (email !== null && email.length > 5) {
            //TODO: handle request to api to check if email already exists
            setStep(steps.two);
        } else {
            setError("O email não pode ficar vázio.");
        }
    }

    const checkIfPasswordsMatch = (password, repeatPassword) => {
        if (password === repeatPassword) return true
        else return false
    }

    const StepOne = ({ formik }) => (
        <div className="form-group">
            <div className="form-group">
                <FontAwesomeIcon icon={faEnvelope} /><label className="ml-1">Informe um email válido:</label>
                <Field className="form-control" type="email" placeholder="Digite seu email"
                    name="email"
                    onChange={e =>
                        formik.setFieldValue('email', e.target.value)
                    }
                />
                <small className="text-danger mt-1 font-weight-bold">
                    {formik.touched.email && formik.errors.email}
                </small>

            </div>
            <button
                className="btn btn-primary btn-block primary-bg mt-4 mb-3"
                onClick={() => validateStepOne(formik.values.email)}
            >
                Prosseguir
            </button>
        </div>
    );

    const StepTwo = ({ formik }) => (
        <>
            <Form method="post">
                <div className="form-group row">
                    <div className="col-md-12">
                        <FontAwesomeIcon icon={faUser} /><label className="ml-1">Informe um nome:</label>
                        <Field className="form-control col-md-12" type="name" placeholder="Digite seu nome..."
                            name="name"
                            onChange={e =>
                                formik.setFieldValue('name', e.target.value)
                            }
                        />
                        <small className="text-danger mt-1 font-weight-bold">
                            {formik.touched.name && formik.errors.name}
                        </small>
                    </div>
                    <div className="col-md-12 col-sm-12 mt-2">
                        <FontAwesomeIcon icon={faUser} /><label className="ml-1">Informe um sobrenome:</label>
                        <Field className="form-control col-md-12" type="name" placeholder="Digite seu sobrenome..."
                            name="lastName"
                            onChange={e =>
                                formik.setFieldValue('lastName', e.target.value)
                            }
                        />
                        <small className="text-danger mt-1 font-weight-bold">
                            {formik.touched.lastName && formik.errors.lastName}
                        </small>
                    </div>
                    <div className="col-md-12 col-sm-12 mt-2">
                        <FontAwesomeIcon icon={faEnvelope} /><label className="ml-1">Informe um e-mail:</label>
                        <Field className="form-control col-md-12" type="email" placeholder="Digite seu email..."
                            name="email"
                            onChange={e =>
                                formik.setFieldValue('email', e.target.value)
                            }
                        />
                        <small className="text-danger mt-1 font-weight-bold">
                            {formik.touched.email && formik.errors.email}
                        </small>
                    </div>
                    <div className="col-md-12 col-sm-12 mt-2">
                        <FontAwesomeIcon icon={faLock} /><label className="ml-1">Informe uma senha:</label>
                        <Field className="form-control col-md-12" placeholder="Digite sua senha..."
                            name="password"
                            type="password"
                            onChange={e =>
                                formik.setFieldValue('password', e.target.value)
                            }
                        />
                        <small className="text-danger mt-1 font-weight-bold">
                            {formik.touched.password && formik.errors.password}
                        </small>
                    </div>
                    <div className="col-md-12 col-sm-12 mt-2">
                        <FontAwesomeIcon icon={faLock} /><label className="ml-1">Repita sua senha:</label>
                        <Field className="form-control col-md-12" placeholder="Repita sua senha..."
                            name="repeatPassword"
                            type="password"
                            onChange={e =>
                                formik.setFieldValue('repeatPassword', e.target.value)
                            }
                        />
                        <small className="text-danger mt-1 font-weight-bold">
                            {formik.touched.repeatPassword && formik.errors.repeatPassword}
                        </small>
                    </div>
                </div>
                <button
                    className="btn btn-primary btn-block primary-bg"
                    type="submit"
                >
                    Concluir
                </button>

            </Form>
        </>
    );

    return (
        <Formik
            initialValues={{
                name: '',
                email: '',
                lastName: '',
                password: '',
                repeatPassword: ''
            }}
            validationSchema={formValidation}
            onSubmit={(values) => {
                if (!checkIfPasswordsMatch(values.password, values.repeatPassword)) {
                    displayAlert("Senhas não coincidem!", typesAlert.error);
                } else {
                    const user = {
                        firstname: values.name,
                        lastname: values.lastName,
                        email: values.email,
                        password: values.password
                    }
                    console.log(user)

                    mainApi.post(eps.signUp, user).then((res) => {
                        console.log(res.data)
                        if (res.data.success == true) {
                            displayAlert(res.data.message, typesAlert.success);
                            history.push(availablePages.loginPage);
                        } else {
                            displayAlert(res.data.message, typesAlert.error);
                        }
                    })
                }
            }}
        >
            {
                step === steps.one ? formik => (
                    <div class="wrapper fadeInDown mt-5">
                        <h1 class="text-center mb-3 text-light">Realizar cadastro</h1>
                        <div id="formContent">
                            <Form method="post">
                                <StepOne formik={formik} />
                            </Form>
                        </div>
                    </div>
                ) : formik => (
                    <div class="wrapper fadeInDown mt-5">
                        <h1 class="text-center mb-3 text-light">Realizar cadastro</h1>
                        <div id="formContent">
                            <StepTwo formik={formik} />
                        </div>
                    </div>
                )
            }
        </Formik>
    )

}




export default SignUp;
