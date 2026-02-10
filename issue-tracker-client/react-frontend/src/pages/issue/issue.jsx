import { useState, useEffect } from "react";
import { createIssue, updateIssue, getIssueById } from "../../api/issue";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'Yup';
import { useNavigate, useParams } from "react-router-dom";
import Swal from 'sweetalert2';
import { confirmUpdateIssue } from "../../common/swal-alerts";
import NavBar from "../../component/nav-bar";

const Issue = () => {
    const { id } = useParams();
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [initialValues, setInitialValues] = useState({ title: '', description: '', priority: 1 });
    
    const priorities = [{id:1,name:'Low'},{id:2,name:'Medium'},{id:3,name:'High'},{id:4,name:'Critical'}];
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            setIsEditing(true);
            fetchIssueData();
        }
    }, [id]);

    const fetchIssueData = async () => {
        setLoading(true);
        try {
            const response = await getIssueById(id);
            if (response.data && response.data.data) {
                const issue = response.data.data;
                setInitialValues({
                    title: issue.title || '',
                    description: issue.description || '',
                    priority: issue.priority || 1
                });
            }
        } catch (error) {
            console.error('Error fetching issue:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Failed to fetch issue data'
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <NavBar>
        <div className="container">
            <div className="row mb-4">
                <div className="col-md-12">
                    <h2>{isEditing ? 'Edit Issue' : 'Create Issue'}</h2>
                </div>
            </div>

            {loading ? (
                <div className="text-center">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            ) : (
            <Formik
                initialValues={initialValues}
                enableReinitialize={true}
                validationSchema={Yup.object({
                    title: Yup.string().required("Title is required"),
                    description: Yup.string().required("Description is required"),
                    priority: Yup.number().required("Priority is required")
                })}
                onSubmit={async (values, { setSubmitting, resetForm }) => {
                    try {
                        let response;
                        
                        // Show confirmation dialog only for editing
                        if (isEditing) {
                            const result = await confirmUpdateIssue();
                            if (!result.isConfirmed) {
                                setSubmitting(false);
                                return;
                            }
                            response = await updateIssue(values, id);
                        } else {
                            response = await createIssue(values);
                        }

                        if (response.data && response.message && response.status === 200) {
                            Swal.fire({
                                icon: 'success',
                                title: isEditing ? 'Issue Updated Successfully' : 'Issue Created Successfully',
                                text: response.message,
                                showConfirmButton: false,
                                timer: 1500
                            });
                        } else {
                            Swal.fire({
                                icon: 'success',
                                title: isEditing ? 'Issue Updated Successfully' : 'Issue Created Successfully',
                                text: isEditing ? 'Issue has been updated.' : 'Issue has been created.',
                                showConfirmButton: false,
                                timer: 1500
                            });
                        }
                        
                        resetForm();
                        navigate('/issue-list');
                    } catch (error) {
                        console.error('Error saving issue:', error);
                        Swal.fire({
                            icon: 'error',
                            title: 'Error',
                            text: isEditing ? 'Failed to update issue' : 'Failed to create issue'
                        });
                    } finally {
                        setSubmitting(false);
                    }
                }}
            >
                <Form>
                    <div className="row">
                        <div className="col-md-12">
                            <label htmlFor="title">Title</label>
                            <Field type="text" name="title" className='form-control form-control-lg' />
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
                            <Field as="select" name="priority" className='form-control form-control-lg'>
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
                            <button className="btn btn-info" type="submit">
                                {isEditing ? 'Update Issue' : 'Create Issue'}
                            </button>
                        </div>
                    </div>
                </Form>
            </Formik>
            )}
        </div>
        </NavBar>
    );
};
export default Issue;