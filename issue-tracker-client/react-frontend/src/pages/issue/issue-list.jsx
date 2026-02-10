import { useState, useEffect, useCallback } from "react";
import { issueList, updateIssueStatus } from "../../api/issue";
import { confirmResolveIssue, confirmCloseIssue, showSuccessAlert, showErrorAlert } from "../../common/swal-alerts";
import { getPriorityBadgeClass, getStatusBadgeClass } from "../../common/badge";
import { useNavigate } from "react-router-dom";
import { debounce } from "../../common/utils";
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

    //Fetch issue list
    const fetchIssueList = useCallback(async (page = 1, searchQuery = '') => {
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
            showErrorAlert('Error', 'Failed to fetch issues');
        } finally {
            setLoading(false);
        }
    }, [limit]);

    // Debounced for search
    const debouncedSearch = useCallback(
        debounce((searchValue) => {
            setCurrentPage(1);
            fetchIssueList(1, searchValue);
        }, 500),
        [fetchIssueList]
    );

    useEffect(() => {
        fetchIssueList(currentPage, search);
    }, [currentPage, search, fetchIssueList]);

    //Search issues
    const handleSearch = (e) => {
        e.preventDefault();
        setCurrentPage(1);
        fetchIssueList(1, search);
    };

    // search for with debouncing
    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearch(value);
        debouncedSearch(value);
    };

    //page change
    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    // View issue
    const handleViewIssue = (issueId) => {
        const issue = issues.find(i => i.id === issueId);
        if (issue) {
            setSelectedIssue(issue);
            setShowViewModal(true);
        }
    };

    // Resolve issue
    const handleResolveIssue = async (issueId) => {
        const result = await confirmResolveIssue();

        if (result.isConfirmed) {
            try {
                const response = await updateIssueStatus(issueId, 'Resolved');
                if (response.data) {
                    showSuccessAlert('Success', 'Issue resolved successfully');
                    fetchIssueList(currentPage, search);
                }
            } catch (error) {
                console.error("Error resolving issue:", error);
                showErrorAlert('Error', 'Failed to resolve issue');
            }
        }
    };

    // Close issue  
    const handleCloseIssue = async (issueId) => {
        const result = await confirmCloseIssue();
        
            if (result.isConfirmed) {
            try {
                const response = await updateIssueStatus(issueId, 'Closed');
                if (response.data) {
                    showSuccessAlert('Success', 'Issue closed successfully');
                    fetchIssueList(currentPage, search);
                }
            } catch (error) {
                console.error("Error closing issue:", error);
                showErrorAlert('Error', 'Failed to close issue');
            }
        }
        
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
                            onChange={handleSearchChange}
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
                                                        <button 
                                                            className="btn btn-sm btn-warning"
                                                            onClick={() => handleResolveIssue(issue.id)}
                                                            disabled={issue.status === 'Resolved'}
                                                            style={{ cursor: issue.status === 'Resolved' ? 'not-allowed' : 'pointer' }}
                                                        >Resolve</button>
                                                        <button className="btn btn-sm btn-danger" onClick={() => handleCloseIssue(issue.id)}
                                                            disabled={issue.status === 'Closed'}
                                                            style={{ cursor: issue.status === 'Closed' ? 'not-allowed' : 'pointer' }}
                                                        >Close</button>
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