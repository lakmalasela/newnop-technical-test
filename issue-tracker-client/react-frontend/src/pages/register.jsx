import { use, useState } from "react";
import { registerUser } from "../api/auth";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'Yup';
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
const Register = () => {

   
    const roles = [{id:1,name:'GUEST'},{id:2,name:'ADMIN'}];
    
    const navigate = useNavigate();

    return (
        <div className="container">
            <div className="row mb-4">
                <div className="col-md-12">
                    <h2>Register User</h2>
                </div>
            </div>


            <Formik

                initialValues={{ email: '', password: '', role: roles[0].name }}
                validationSchema={Yup.object({
                    email: Yup.string().email("Please enter a valid email address").required("Email is required"),
                    password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),

                })}

                onSubmit={async (values, { setSubmitting, resetForm }) => {
                    try {
                        
                        const response = await registerUser(values);
                        
                        if (response.data && response.message && response.status === 200) {
                            Swal.fire({
                                icon: 'success',
                                title: 'User Created Successfully',
                                text: response.message,
                                showConfirmButton: false,
                                timer: 1500
                            });
                        } else {
                            Swal.fire({
                                icon: 'success',
                                title: 'User Created Successfully',
                                text: 'The user has been created successfully!',
                                showConfirmButton: false,
                                timer: 1500
                            });
                        }
                        resetForm();
                    } catch (error) {
                        console.error("Registration error:", error);
                        console.error("Error response:", error.response);
                        
                        Swal.fire({
                            icon: 'error',
                            title: 'User Creation Failed',
                            text: error.response?.data?.message || 'Create User Failed',
                            confirmButtonColor: '#00bcd4'
                        });
                    }
                    setSubmitting(false);
                    navigate('/login')
                }}

            >
                <Form>
                    <div className="row">
                        <div className="col-md-12">
                            <label htmlFor="email">Email</label>
                            <Field type="email" name="email" id="" className='form-control form-control-lg' />
                            <ErrorMessage name="email" component="div" className="text-danger" />
                        </div>
                    </div>
                    <div className="row mt-4">
                        <div className="col-md-12">
                            <label htmlFor="password">Password</label>
                            <Field type="password" name="password" id="" className='form-control form-control-lg' />
                            <ErrorMessage name="password" component="div" className="text-danger" />
                        </div>
                    </div>
                    <div className="row mt-4">
                        <div className="col-md-12">
                            <label htmlFor="role">Role</label>
                            <Field as="select" name="role" id="" className='form-control form-control-lg'>
                                {
                                    roles.map((role) => (
                                        <option key={role.id} value={role.id}>{role.name}</option> 
                                    ))
                                }
                            </Field>

                        </div>
                    </div>
                    <div className="row mt-4">
                        <div className="col-md-12">
                            <button className="btn btn-info" type="submit">Register User</button>

                        </div>
                    </div>

                </Form>



            </Formik>

        </div>
       
    )

}
export default Register;