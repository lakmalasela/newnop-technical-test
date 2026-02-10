import { useState, useEffect } from "react";
import { createIssue, updateIssue, getIssueById } from "../../api/issue";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'Yup';
import { useNavigate, useParams } from "react-router-dom";
import Swal from 'sweetalert2';
import { confirmUpdateIssue } from "../../common/swal-alerts";
import NavBar from "../../component/nav-bar";
import issueTrackerImage from '../../img/issue-tracker.jpg';

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
                            <h1 className="display-4 fw-bold mb-3">{isEditing ? 'Edit Issue' : 'Create Issue'}</h1>
                            <p className="lead mb-4">{isEditing ? 'Update your issue details and track progress' : 'Report and track issues efficiently to keep your projects on track'}</p>
                            <div className="d-flex justify-content-center gap-4">
                                <div className="text-center">
                                    <h3 className="fw-bold">Report</h3>
                                    <p>Document issues</p>
                                </div>
                                <div className="text-center">
                                    <h3 className="fw-bold">Track</h3>
                                    <p>Monitor progress</p>
                                </div>
                                <div className="text-center">
                                    <h3 className="fw-bold">Resolve</h3>
                                    <p>Complete tasks</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* Form Section */}
                <div className="col-lg-6 d-flex align-items-start justify-content-center bg-light" style={{ paddingTop: '3rem' }}>
                    <div className="w-100" style={{ maxWidth: '500px', padding: '2rem' }}>
                        <div className="text-center mb-4">
                            <h2 className="fw-bold text-dark">{isEditing ? 'Update Issue' : 'Create New Issue'}</h2>
                            <p className="text-muted">{isEditing ? 'Modify the issue details below' : 'Fill in the details to report a new issue'}</p>
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
                                    <div className="mb-4">
                                        <label htmlFor="title" className="form-label fw-semibold">Issue Title</label>
                                        <Field type="text" name="title" className='form-control form-control-lg shadow-sm' placeholder="Enter issue title" />
                                        <ErrorMessage name="title" component="div" className="text-danger mt-1" />
                                    </div>
                                    
                                    <div className="mb-4">
                                        <label htmlFor="description" className="form-label fw-semibold">Description</label>
                                        <Field
                                            as="textarea"
                                            name="description"
                                            className="form-control form-control-lg shadow-sm"
                                            placeholder="Provide detailed description of the issue"
                                            rows="4"
                                        />
                                        <ErrorMessage name="description" component="div" className="text-danger mt-1" />
                                    </div>
                                    
                                    <div className="mb-4">
                                        <label htmlFor="priority" className="form-label fw-semibold">Priority Level</label>
                                        <Field as="select" name="priority" className='form-select form-select-lg shadow-sm'>
                                            {
                                                priorities.map((priority) => (
                                                    <option key={priority.id} value={priority.id}>{priority.name}</option>
                                                ))
                                            }
                                        </Field>
                                        <ErrorMessage name="priority" component="div" className="text-danger mt-1" />
                                    </div>
                                    
                                    <div className="mb-4">
                                        <button className="btn btn-primary btn-lg w-100" type="submit">
                                            <i className="bi bi-plus-circle me-2"></i>
                                            {isEditing ? 'Update Issue' : 'Create Issue'}
                                        </button>
                                    </div>
                                    
                                    <div className="text-center">
                                        <button type="button" className="btn btn-outline-secondary" onClick={() => navigate('/issue-list')}>
                                            <i className="bi bi-arrow-left me-2"></i>
                                            Back to Issues
                                        </button>
                                    </div>
                                </Form>
                            </Formik>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Issue;