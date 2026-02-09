import { getStatusBadgeClass, getPriorityBadgeClass } from "../../common/badge";

const ViewIssue = ({ issue, onClose, show }) => {
    if (!show || !issue) return null;

    return (
        <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }} tabIndex="-1" role="dialog">
            <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Issue Details</h5>
                        <button type="button" className="btn-close" onClick={onClose} aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <div className="row">
                            <div className="col-md-12">
                                <h4 className="mb-3">{issue.title}</h4>
                            </div>
                        </div>
                        
                        <div className="row mb-3">
                            <div className="col-md-4">
                                <strong>Status:</strong>
                                <span className={`badge ms-2 ${getStatusBadgeClass(issue.status)}`}>
                                    {issue.status}
                                </span>
                            </div>
                            <div className="col-md-4">
                                <strong>Priority:</strong>
                                <span className={`badge ms-2 ${getPriorityBadgeClass(issue.priority)}`}>
                                    {issue.priority}
                                </span>
                            </div>
                            <div className="col-md-4">
                                 <div className="col-md-12">
                                <strong>Description:</strong>
                                <p className="">{issue.description}</p>
                            </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-6">
                                <strong>Created At:</strong>
                                <p className="text-muted">
                                    {issue.createdAt ? new Date(issue.createdAt).toLocaleString() : 'N/A'}
                                </p>
                            </div>
                            <div className="col-md-6">
                                <strong>Updated At:</strong>
                                <p className="text-muted">
                                    {issue.updatedAt ? new Date(issue.updatedAt).toLocaleString() : 'N/A'}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={onClose}>Close</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewIssue;