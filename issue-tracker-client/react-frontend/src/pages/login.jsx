import { useContext, useState } from "react";
import { login } from "../api/auth";
import { Form, Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'Yup';
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth-provider";
import { Link } from "react-router-dom";
import Swal from 'sweetalert2';

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

    const hadleSubmit = async (e) => {
        e.preventDefault();
        try {

            const res = await login(form);
            const token = res.data.access_token;
            localStorage.setItem('token', token)
            setUser({ email: form.email });
            SetMessage("Login Successfully");
            navigate('/dashboard')
        } catch (error) {

            SetMessage(error.response?.data?.message || "Login Unsuccssfully");
        }
    }

    return (
        <div className="container">
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
                        localStorage.setItem('token', token);
                        setUser({ email: res.data.userEmail });
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
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <label htmlFor="email">Email</label>
                                <Field name="email" className="form-control form-control-lg" />
                                <ErrorMessage name="email" component="div" className="text-danger" />

                            </div>
                        </div>

                        <div className="row mt-3">
                            <div className="col-md-12">
                                <label htmlFor="password">Password</label>
                                <Field name="password" type="password" className="form-control form-control-lg" />
                                <ErrorMessage name="password" component="div" className="text-danger" />
                            </div>
                        </div>
                        <div className="row mt-3">
                            <div className="col-md-12">
                                <button className="btn btn-info btn-lg" type="submit">Login</button>
                            </div>
                        </div>
                        <div className="row mt-3">
                            <div className="col-md-12">
                                <Link to="/register">Don't have an account? Register</Link>
                            </div>
                        </div>

                    </div>
                </Form>
            </Formik>

            {/* <form onSubmit={hadleSubmit}>
                <div className="row">
                    <div className="col-md-12">
                        <input type="email" name="email" onChange={handleChange} id="emaidId" />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <input type="password" name="password" onChange={handleChange} id="" />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <button className="btn btn-info">Login</button>
                    </div>
                </div>
            </form> */}
        </div>
    )
}
export default Login;