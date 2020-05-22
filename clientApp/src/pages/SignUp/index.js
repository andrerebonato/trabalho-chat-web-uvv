import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import './styles.css'
import formValidation from './formValidation';
import { displayAlert, typesAlert } from '../../utils/displayAlert'

const steps = {
    one: 1,
    two: 2
}


//TODO: add the logic of api request on form submit.
const SignUp = () => {
    const [error, setError] = useState(false);
    const [step, setStep] = useState(steps.one);

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
        <>
            <h4 className="mt-2 text-center font-weight-bold">{error ? error : "Realizar cadastro"}</h4>
            <div className="form-group">
            <style>{'body { background-color: whitesmoke; }'}</style>
                <Field className="form-control" type="email" placeholder="Digite seu email" style={{ marginTop: 25 }}
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
        </>
    );

    const StepTwo = ({ formik }) => (
        <>
            <h2 className="mt-2 text-center font-weight-bold">Preencha os campos abaixo</h2>
            <Form method="post">
                <div className="form-group row">
                <style>{'body { background-color: whitesmoke; }'}</style>
                    <div className="col-md-12">
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
                    <div className="col-md-12 col-sm-12">
                        <Field className="form-control mt-2 col-md-12" type="name" placeholder="Digite seu sobrenome..."
                            name="lastName"
                            onChange={e =>
                                formik.setFieldValue('lastName', e.target.value)
                            }
                        />
                        <small className="text-danger mt-1 font-weight-bold">
                            {formik.touched.lastName && formik.errors.lastName}
                        </small>
                    </div>
                    <div className="col-md-12 col-sm-12">
                        <Field className="form-control mt-2 col-md-12" type="email" placeholder="Digite seu email..."
                            name="email"
                            onChange={e =>
                                formik.setFieldValue('email', e.target.value)
                            }
                        />
                        <small className="text-danger mt-1 font-weight-bold">
                            {formik.touched.email && formik.errors.email}
                        </small>
                    </div>
                    <div className="col-md-12 col-sm-12">
                        <Field className="form-control mt-2 col-md-12" placeholder="Digite sua senha..."
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
                    <div className="col-md-12 col-sm-12">
                        <Field className="form-control mt-2 col-md-12" placeholder="Repita sua senha..."
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
                    //TODO: add the alert toast component here, showing the message above
                    displayAlert("Senhas não coincidem!", typesAlert.error);
                }
            }}
        >
            {
                step === steps.one ? formik => (
                    <div className="az-body smoke">
                        <div className="az-signin-wrapper az-body">
                            <div className="az-card-signin gradient">
                                <div className="az-signin-header">
                                    <StepOne formik={formik} />
                                </div>
                            </div>
                        </div>
                    </div>
                ) : formik => (
                    <div className="az-body smoke">
                        <div className="az-signin-wrapper az-body">
                            <div className="az-card-signin gradient">
                                <div className="az-signin-header">
                                    <StepTwo formik={formik} />
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        </Formik>
    )

}




export default SignUp;
