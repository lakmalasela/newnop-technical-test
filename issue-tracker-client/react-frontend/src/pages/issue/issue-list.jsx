import { useState, useEffect } from "react";
import { issueList } from "../../api/issue";
import Swal from 'sweetalert2';
import { getPriorityBadgeClass, getStatusBadgeClass } from "../../common/badge";
import { useNavigate } from "react-router-dom";


const IssueList = () => {
    const [issues, setIssues] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [search, setSearch] = useState('');
    const limit = 5;

    const navigate = useNavigate();

    const fetchIssues = async (page = 1, searchQuery = '') => {
        setLoading(true);
        try {
            const response = await issueList(searchQuery, page, limit);
            if (response.data && response.data.data) {
                setIssues(response.data.data.data || []);
                const total = response.data.data.total || 0;
                const calculatedTotalPages = Math.ceil(total / limit);
                console.log('Total items:', total, 'Limit:', limit, 'Calculated totalPages:', calculatedTotalPages);
                setTotalPages(calculatedTotalPages);
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

    const handleViewIssue = (issueId) => {
        console.log("View issue:", issueId);
    };

    const handleResolveIssue = (issueId) => {
        console.log("Resolve issue:", issueId);
    };

    const handleCloseIssue = (issueId) => {
        console.log("Close issue:", issueId);
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
                        <div className="d-flex">
                            <button type="submit" className="btn btn-primary">
                                <i className="bi bi-search me-2"></i>Search
                            </button>
                            <button type="button" className="btn btn-success ms-3" onClick={() => navigate('/issue')}>
                                <i className="bi bi-plus-circle me-2"></i>Create Issue
                            </button>
                        </div>
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
                                            <th>Actions</th>
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
                                                    <td>
                                                        <button className="btn btn-sm btn-primary" onClick={() => handleViewIssue(issue.id)}>View</button>
                                                        <button className="btn btn-sm btn-warning" onClick={() => handleResolveIssue(issue.id)}>Resolve</button>
                                                        <button className="btn btn-sm btn-danger" onClick={() => handleCloseIssue(issue.id)}>Close</button>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="7" className="text-center">
                                                    No issues found
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>

                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <div>
                                    <small className="text-muted">
                                        Showing {issues.length} of {totalPages * limit} items | Page {currentPage} of {totalPages}
                                    </small>
                                </div>
                            </div>

                            {totalPages >= 1 && (
                                <nav aria-label="Page navigation example">
                                    <ul className="pagination">
                                        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                            <a 
                                                className="page-link" 
                                                href="#"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    handlePageChange(currentPage - 1);
                                                }}
                                            >
                                                Previous
                                            </a>
                                        </li>
                                        {[...Array(totalPages)].map((_, index) => (
                                            <li key={index + 1} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                                                <a 
                                                    className="page-link" 
                                                    href="#"
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        handlePageChange(index + 1);
                                                    }}
                                                >
                                                    {index + 1}
                                                </a>
                                            </li>
                                        ))}
                                        <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                                            <a 
                                                className="page-link" 
                                                href="#"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    handlePageChange(currentPage + 1);
                                                }}
                                            >
                                                Next
                                            </a>
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