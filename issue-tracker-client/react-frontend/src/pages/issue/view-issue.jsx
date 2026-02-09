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
                                <h4 className="mb-4 text-primary">{issue.title}</h4>
                            </div>
                        </div>
                        
                        <div className="table-responsive mb-4">
                            <table className="table table-bordered table-sm">
                                <tbody>
                                    <tr>
                                        <th className="bg-light" style={{width: '30%'}}>Status:</th>
                                        <td>
                                            <span className={`badge ${getStatusBadgeClass(issue.status)}`}>
                                                {issue.status}
                                            </span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th className="bg-light">Priority:</th>
                                        <td>
                                            <span className={`badge ${getPriorityBadgeClass(issue.priority)}`}>
                                                {issue.priority}
                                            </span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th className="bg-light align-top">Description:</th>
                                        <td className="text-muted">
                                            {issue.description || 'No description provided'}
                                        </td>
                                    </tr>
                                    <tr>
                                        <th className="bg-light">Created At:</th>
                                        <td className="text-muted">
                                            <i className="bi bi-calendar-plus me-1"></i>
                                            {issue.createdAt ? new Date(issue.createdAt).toLocaleString() : 'N/A'}
                                        </td>
                                    </tr>
                                    <tr>
                                        <th className="bg-light">Updated At:</th>
                                        <td className="text-muted">
                                            <i className="bi bi-calendar-check me-1"></i>
                                            {issue.updatedAt ? new Date(issue.updatedAt).toLocaleString() : 'N/A'}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
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