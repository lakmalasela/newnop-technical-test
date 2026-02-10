import { useContext, useState } from "react";
import { login } from "../../api/auth";
import { Form, Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'Yup';
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth-provider";
import { Link } from "react-router-dom";
import Swal from 'sweetalert2';
import issueTrackerImage from '../../img/issue-tracker.jpg';

const Login = () => {

    const { setUser } = useContext(AuthContext);

    const [form, setForm] = useState({
        email: "",
        password: ""
    });

    const [message, SetMessage] = useState('');

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

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
                            <h1 className="display-4 fw-bold mb-3">Issue Tracker</h1>
                            <p className="lead mb-4">Manage your projects efficiently with our comprehensive issue tracking system</p>
                            <div className="d-flex justify-content-center gap-4">
                                <div className="text-center">
                                    <h3 className="fw-bold">Track</h3>
                                    <p>Monitor issues in real-time</p>
                                </div>
                                <div className="text-center">
                                    <h3 className="fw-bold">Manage</h3>
                                    <p>Organize tasks effectively</p>
                                </div>
                                <div className="text-center">
                                    <h3 className="fw-bold">Resolve</h3>
                                    <p>Close issues faster</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* Login Form Section */}
                <div className="col-lg-6 d-flex align-items-center justify-content-center bg-light">
                    <div className="w-100" style={{ maxWidth: '450px', padding: '2rem' }}>
                        <div className="text-center mb-4">
                            <h2 className="fw-bold text-dark">Welcome Back</h2>
                            <p className="text-muted">Sign in to continue to your account</p>
                        </div>
                        
                        <Formik
                            initialValues={{ email: "", password: "" }}
                            validationSchema={Yup.object({
                                email: Yup.string().email("Please enter a valid email").required("Email is required"),
                                password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required")
                            })}

                            onSubmit={async (value, { setSubmitting, resetForm }) => {

                                try {
                                    const res = await login(value);
                                    const token = res.data.access_token;
                                    const userId = res.data.userId;
                                    const userEmail = res.data.userEmail || value.email;
                                    const userRole = res.data.role || 'GUEST'; // Default to 'User' if role not provided
                                    localStorage.setItem('token', token);
                                    localStorage.setItem('userId', userId);
                                    localStorage.setItem('userEmail', userEmail);
                                    localStorage.setItem('userRole', userRole);
                                    setUser({ email: userEmail, role: userRole });
                                    Swal.fire({
                                        icon: 'success',
                                        title: 'Login Successful',
                                        text: 'You have been logged in successfully!',
                                        showConfirmButton: false,
                                        timer: 1500
                                    });
                                    navigate('/dashboard')

                                } catch (error) {
                                    Swal.fire({
                                        icon: 'error',
                                        title: 'Login Failed',
                                        text: error.response?.data?.message || "Login Failed",
                                        confirmButtonColor: '#00bcd4'
                                    });
                                }
                                setSubmitting(false);
                            }}

                        >
                            <Form>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label fw-semibold">Email Address</label>
                                    <Field name="email" className="form-control form-control-lg" placeholder="Enter your email" />
                                    <ErrorMessage name="email" component="div" className="text-danger mt-1" />
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="password" className="form-label fw-semibold">Password</label>
                                    <Field name="password" type="password" className="form-control form-control-lg" placeholder="Enter your password" />
                                    <ErrorMessage name="password" component="div" className="text-danger mt-1" />
                                </div>
                                
                                <div className="mb-3">
                                    <button className="btn btn-primary btn-lg w-100" type="submit">Sign In</button>
                                </div>
                                
                                <div className="text-center">
                                    <Link to="/register" className="text-decoration-none text-primary">
                                        Don't have an account? Register here
                                    </Link>
                                </div>
                            </Form>
                        </Formik>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Login;