import { useState, useEffect } from "react";
import { issueList, updateIssueStatus } from "../../api/issue";
import Swal from 'sweetalert2';
import { getPriorityBadgeClass, getStatusBadgeClass } from "../../common/badge";
import { useNavigate } from "react-router-dom";
import ViewIssue from "./view-issue";
import Layout from "../../component/layout";
import Pagination from "../../component/pagination";
import IssueStatusCounts from "../../component/issue-status-counts";

const IssueList = () => {
    const [issues, setIssues] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [search, setSearch] = useState('');
    const [selectedIssue, setSelectedIssue] = useState(null);
    const [showViewModal, setShowViewModal] = useState(false);
    const limit = 5;

    const navigate = useNavigate();

    const fetchIssueList = async (page = 1, searchQuery = '') => {
        setLoading(true);
        try {
            const response = await issueList(searchQuery, page, limit);
            if (response.data && response.data.data) {
                setIssues(response.data.data.data || []);
                const total = response.data.data.total || 0;
                const calculatedTotalPages = Math.ceil(total / limit);
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
        fetchIssueList(currentPage, search);
    }, [currentPage, search]);

    const handleSearch = (e) => {
        e.preventDefault();
        setCurrentPage(1);
        fetchIssueList(1, search);
    };

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const handleViewIssue = (issueId) => {
        const issue = issues.find(i => i.id === issueId);
        if (issue) {
            setSelectedIssue(issue);
            setShowViewModal(true);
        }
    };

    const handleResolveIssue = async (issueId) => {
        const result = await Swal.fire({
            title: 'Resolve Issue?',
            text: 'Are you sure you want to mark this issue as resolved?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#28a745',
            cancelButtonColor: '#dc3545',
            confirmButtonText: 'Yes, resolve it!'
        });

        if (result.isConfirmed) {
            try {
                const response = await updateIssueStatus(issueId, 'Resolved');
                if (response.data) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Success',
                        text: 'Issue resolved successfully',
                        confirmButtonColor: '#00bcd4'
                    });
                    fetchIssueList(currentPage, search);
                }
            } catch (error) {
                console.error("Error resolving issue:", error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Failed to resolve issue',
                    confirmButtonColor: '#00bcd4'
                });
            }
        }
    };

    const handleCloseIssue = (issueId) => {
        console.log("Close issue:", issueId);
    };

    return (
        <Layout>
        <div className="container">
            <div className="row mb-4">
                <div className="col-md-12">
                    <h2>Issue List</h2>
                </div>
            </div>

                    <div className="row mb-4">
                <div className="col-md-12">
                    <h4>Issue Statistics</h4>
                </div>
            </div>

            <IssueStatusCounts />

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

                            <Pagination 
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onPageChange={handlePageChange}
                                showing={issues.length}
                                total={totalPages * limit}
                                itemName="issues"
                            />
                        </>
                    )}
                </div>
            </div>
            
            <ViewIssue 
                issue={selectedIssue} 
                show={showViewModal} 
                onClose={() => {
                    setShowViewModal(false);
                    setSelectedIssue(null);
                }} 
            />
        </div>
        </Layout>
    );
};

export default IssueList;