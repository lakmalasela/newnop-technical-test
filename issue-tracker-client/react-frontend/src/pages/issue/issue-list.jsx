import { useState, useEffect } from "react";
import { issueList } from "../../api/issue";
import Swal from 'sweetalert2';

const IssueList = () => {
    const [issues, setIssues] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [search, setSearch] = useState('');
    const limit = 10;

    const fetchIssues = async (page = 1, searchQuery = '') => {
        setLoading(true);
        try {
            const response = await issueList(searchQuery, page, limit);
            if (response.data && response.data.data) {
                setIssues(response.data.data.data || []);
                const total = response.data.data.total || 0;
                setTotalPages(Math.ceil(total / limit));
                setCurrentPage(response.data.data.page || 1);
            }
        } catch (error) {
            console.error("Error fetching issues:", error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Failed to fetch issues',
                confirmButtonColor: '#00bcd4'
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchIssues(currentPage, search);
    }, [currentPage, search]);

    const handleSearch = (e) => {
        e.preventDefault();
        setCurrentPage(1);
        fetchIssues(1, search);
    };

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const getStatusBadgeClass = (status) => {
        switch (status?.toLowerCase()) {
            case 'open':
                return 'bg-success';
            case 'closed':
                return 'bg-danger';
            case 'in progress':
                return 'bg-warning';
            default:
                return 'bg-secondary';
        }
    };

    const getPriorityBadgeClass = (priority) => {
        switch (priority?.toLowerCase()) {
            case 'high':
                return 'bg-danger';
            case 'medium':
                return 'bg-warning';
            case 'low':
                return 'bg-info';
            case 'critical':
                return 'bg-dark';
            default:
                return 'bg-secondary';
        }
    };

    return (
        <div className="container">
            <div className="row mb-4">
                <div className="col-md-12">
                    <h2>Issue List</h2>
                </div>
            </div>

            <div className="row mb-4">
                <div className="col-md-6">
                    <form onSubmit={handleSearch} className="d-flex">
                        <input
                            type="text"
                            className="form-control me-2"
                            placeholder="Search issues..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <button type="submit" className="btn btn-primary">Search</button>
                    </form>
                </div>
            </div>

            <div className="row">
                <div className="col-md-12">
                    {loading ? (
                        <div className="text-center">
                            <div className="spinner-border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </div>
                    ) : (
                        <>
                            <div className="table-responsive">
                                <table className="table table-striped table-hover">
                                    <thead>
                                        <tr>
                                            <th>Title</th>
                                            <th>Description</th>
                                            <th>Status</th>
                                            <th>Priority</th>
                                            <th>Created At</th>
                                            <th>Updated At</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {issues.length > 0 ? (
                                            issues.map((issue) => (
                                                <tr key={issue.id}>
                                                    <td>{issue.title}</td>
                                                    <td>{issue.description}</td>
                                                    <td>
                                                        <span className={`badge ${getStatusBadgeClass(issue.status)}`}>
                                                            {issue.status}
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <span className={`badge ${getPriorityBadgeClass(issue.priority)}`}>
                                                            {issue.priority}
                                                        </span>
                                                    </td>
                                                    <td>
                                                        {issue.createdAt ? new Date(issue.createdAt).toLocaleString() : 'N/A'}
                                                    </td>
                                                    <td>
                                                        {issue.updatedAt ? new Date(issue.updatedAt).toLocaleString() : 'N/A'}
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="6" className="text-center">
                                                    No issues found
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>

                            {totalPages > 1 && (
                                <nav aria-label="Page navigation">
                                    <ul className="pagination justify-content-center">
                                        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                            <button 
                                                className="page-link" 
                                                onClick={() => handlePageChange(currentPage - 1)}
                                                disabled={currentPage === 1}
                                            >
                                                Previous
                                            </button>
                                        </li>
                                        {[...Array(totalPages)].map((_, index) => (
                                            <li key={index + 1} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                                                <button 
                                                    className="page-link" 
                                                    onClick={() => handlePageChange(index + 1)}
                                                >
                                                    {index + 1}
                                                </button>
                                            </li>
                                        ))}
                                        <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                                            <button 
                                                className="page-link" 
                                                onClick={() => handlePageChange(currentPage + 1)}
                                                disabled={currentPage === totalPages}
                                            >
                                                Next
                                            </button>
                                        </li>
                                    </ul>
                                </nav>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default IssueList;