import { use, useState } from "react";
import { createIssue } from "../../api/issue";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'Yup';
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import NavBar from "../../component/nav-bar";

const Issue = () => {


    const priorities = [{id:1,name:'Low'},{id:2,name:'Medium'},{id:3,name:'High'},{id:4,name:'Critical'}];
    const navigate = useNavigate();

    return (
        <NavBar>
        <div className="container">
            <div className="row mb-4">
                <div className="col-md-12">
                    <h2>Create Issue</h2>
                </div>
            </div>


            <Formik

                initialValues={{ title: '', description: '', priority: priorities[0].id }}
                validationSchema={Yup.object({
                    title: Yup.string().required("Title is required"),
                    description: Yup.string().required("Description is required"),
                    priority: Yup.number().required("Priority is required")

                })}

                onSubmit={async (values, { setSubmitting, resetForm }) => {
                    try {

                        const response = await createIssue(values);

                        if (response.data && response.message && response.status === 200) {
                            Swal.fire({
                                icon: 'success',
                                title: 'Issue Created Successfully',
                                text: response.message,
                                showConfirmButton: false,
                                timer: 1500
                            });
                        } else {
                            Swal.fire({
                                icon: 'success',
                                title: 'Issue Created Successfully',
                                text: 'The issue has been created successfully!',
                                showConfirmButton: false,
                                timer: 1500
                            });
                        }
                        resetForm();
                    } catch (error) {
                        console.error("Issue creation error:", error);
                        console.error("Error response:", error.response);

                        Swal.fire({
                            icon: 'error',
                            title: 'Issue Creation Failed',
                            text: error.response?.data?.message || 'Create Issue Failed',
                            confirmButtonColor: '#00bcd4'
                        });
                    }
                    setSubmitting(false);
                    navigate('/issue-list')
                }}

            >
                <Form>
                    <div className="row">
                        <div className="col-md-12">
                            <label htmlFor="title">Title</label>
                            <Field type="text" name="title" id="" className='form-control form-control-lg' />
                            <ErrorMessage name="title" component="div" className="text-danger" />
                        </div>
                    </div>
                    <div className="row mt-4">
                        <div className="col-md-12">
                            <label htmlFor="description">Description</label>
                            <Field
                                as="textarea"
                                name="description"
                                className="form-control form-control-lg"
                                placeholder="Enter description"
                            />

                            <ErrorMessage name="description" component="div" className="text-danger" />
                        </div>
                    </div>
                    <div className="row mt-4">
                        <div className="col-md-12">
                            <label htmlFor="priority">Priority</label>
                            <Field as="select" name="priority" id="" className='form-control form-control-lg'>
                                {
                                    priorities.map((priority) => (
                                        <option key={priority.id} value={priority.id}>{priority.name}</option>
                                    ))
                                }
                            </Field>

                        </div>
                    </div>
                    <div className="row mt-4">
                        <div className="col-md-12">
                            <button className="btn btn-info" type="submit">Create Issue</button>

                        </div>
                    </div>

                </Form>



            </Formik>

        </div>
        </NavBar>
    );


}
export default Issue;