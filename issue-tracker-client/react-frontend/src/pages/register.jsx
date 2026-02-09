import { use, useState } from "react";
import { registerUser } from "../api/auth";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'Yup';
import Swal from 'sweetalert2';
const Register = () => {

    // const[form,setForm] = useState({
    //     email: "",
    //     password: "",
    //     role: "GUEST"
    // });

    // const [message,setMessage] = useState('');
    // const roles = ['GUEST','ADMIN'];
    // const handChange = (e)=>{
    //     setForm({...form,[e.target.name]:e.target.value});
    // }

    // const handleSubmit = async(e)=>{
    //     e.preventDefault();
    //     try{
    //         await registerUser(form);
    //         setMessage('User Create Successfully');
    //     }catch(error){
    //         setMessage(error.response?.data?.message || 'Register Failed');
    //     }
    // }

    // const roles = ['GUEST', 'ADMIN'];



    const roles = [{id:1,name:'GUEST'},{id:2,name:'ADMIN'}];

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
                    email: Yup.string().email().required(),
                    password: Yup.string().required(),

                })}

                onSubmit={async (values, { setSubmitting, resetForm }) => {
                    try {
                        console.log("values are ", values);
                        
                        const response = await registerUser(values);
                        console.log("Response:", response);
                        
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
        // <div className="container">

        //  {message && <div className="alert alert-info">{message}</div>}
        //     <form onSubmit={handleSubmit}>
        //           <div className="row">
        //         <div className="col-md-4">
        //             <input type="email" name="email" value={form.email} onChange={handChange} id="" />
        //         </div>
        //         <div className="col-md-4">
        //             <input type="password" name="password" value={form.password} onChange={handChange} id="" />
        //         </div>
        //         <div className="col-md-4">
        //             <select name="role" value={form.role} onChange ={handChange}>
        //                 {roles.map((role)=>{
        //                     <option key={role} value={role}>{role}</option>
        //                 })}
        //             </select>
        //         </div>
        //     </div>
        //     <div className="row">
        //         <div className="col-md-12">
        //             <button className="btn btn-success">Register</button>
        //         </div>
        //     </div>
        //     </form>
        // </div>
    )

}
export default Register;