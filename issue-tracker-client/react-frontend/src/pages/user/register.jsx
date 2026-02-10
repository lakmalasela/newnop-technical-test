import { use, useState } from "react";
import { registerUser } from "../../api/auth";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'Yup';
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import issueTrackerImage from '../../img/issue-tracker.jpg';   
const Register = () => {

   
    const roles = [{id:1,name:'GUEST'},{id:2,name:'ADMIN'}];
    
    const navigate = useNavigate();

    return (
        <div className="container-fluid min-vh-100 p-0">
            <div className="row g-0 min-vh-100">
                {/* Cover Image Section */}
                <div className="col-lg-6 d-none d-lg-block">
                    <div 
                        className="h-100 d-flex align-items-center justify-content-center"
                        style={{
                            backgroundImage: `url(${issueTrackerImage})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat',
                            position: 'relative'
                        }}
                    >
                        <div 
                            className="position-absolute top-0 start-0 w-100 h-100"
                            style={{
                                background: 'linear-gradient(135deg, rgba(0,123,255,0.8) 0%, rgba(0,75,162,0.9) 100%)'
                            }}
                        ></div>
                        <div className="position-relative text-center text-white p-5">
                            <h1 className="display-4 fw-bold mb-3">Join Issue Tracker</h1>
                            <p className="lead mb-4">Create your account and start managing your projects efficiently</p>
                            <div className="d-flex justify-content-center gap-4">
                                <div className="text-center">
                                    <h3 className="fw-bold">Create</h3>
                                    <p>Set up your account</p>
                                </div>
                                <div className="text-center">
                                    <h3 className="fw-bold">Collaborate</h3>
                                    <p>Work with your team</p>
                                </div>
                                <div className="text-center">
                                    <h3 className="fw-bold">Track</h3>
                                    <p>Monitor progress</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* Register Form Section */}
                <div className="col-lg-6 d-flex align-items-center justify-content-center bg-light">
                    <div className="w-100" style={{ maxWidth: '450px', padding: '2rem' }}>
                        <div className="text-center mb-4">
                            <h2 className="fw-bold text-dark">Create Account</h2>
                            <p className="text-muted">Join us to start managing your issues</p>
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
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label fw-semibold">Email Address</label>
                                    <Field type="email" name="email" className="form-control form-control-lg" placeholder="Enter your email" />
                                    <ErrorMessage name="email" component="div" className="text-danger mt-1" />
                                </div>
                                
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label fw-semibold">Password</label>
                                    <Field type="password" name="password" className="form-control form-control-lg" placeholder="Enter your password" />
                                    <ErrorMessage name="password" component="div" className="text-danger mt-1" />
                                </div>
                                
                                <div className="mb-4">
                                    <label htmlFor="role" className="form-label fw-semibold">Role</label>
                                    <Field as="select" name="role" className="form-control form-control-lg">
                                        {
                                            roles.map((role) => (
                                                <option key={role.id} value={role.name}>{role.name}</option> 
                                            ))
                                        }
                                    </Field>
                                </div>
                                
                                <div className="mb-3">
                                    <button className="btn btn-primary btn-lg w-100" type="submit">Create Account</button>
                                </div>
                                
                                <div className="text-center">
                                    <span className="text-muted">Already have an account? </span>
                                    <a href="/login" className="text-decoration-none text-primary">Sign in here</a>
                                </div>
                            </Form>
                        </Formik>
                    </div>
                </div>
            </div>
        </div>
      
    )

}
export default Register;