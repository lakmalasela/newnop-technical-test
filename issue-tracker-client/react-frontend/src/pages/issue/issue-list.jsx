import { useState, useEffect, useCallback } from "react";
import { issueList, updateIssueStatus } from "../../api/issue";
import { confirmResolveIssue, confirmCloseIssue, showSuccessAlert, showErrorAlert } from "../../common/swal-alerts";
import { getPriorityBadgeClass, getStatusBadgeClass } from "../../common/badge";
import { useNavigate } from "react-router-dom";
import { debounce, exportToCSV, exportToJSON } from "../../common/utils";
import ViewIssue from "./view-issue";
import NavBar from "../../component/nav-bar";   
import Pagination from "../../component/pagination";
import IssueStatusCounts from "../../component/issue-status-counts";
import issueTrackerImage from '../../img/issue-tracker.jpg';

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

    const handleEditIssue = (issueId) => {
        navigate(`/issue/${issueId}`);
    };

    // Export issues to CSV
    const handleExportCSV = async () => {
        try {
            // Fetch all issues 
            const response = await issueList('', 1, 1000); // Fetch up to 1000 issues
            if (response.data && response.data.data && response.data.data.data.length > 0) {
                const allIssues = response.data.data.data;
                const exportData = allIssues.map(issue => ({
                    id: issue.id,
                    title: issue.title,
                    description: issue.description,
                    status: issue.status,
                    priority: issue.priority,
                    createdAt: issue.createdAt ? new Date(issue.createdAt).toLocaleString() : 'N/A',
                    updatedAt: issue.updatedAt ? new Date(issue.updatedAt).toLocaleString() : 'N/A'
                }));
                
                const filename = `issues_export_${new Date().toISOString().split('T')[0]}`;
                exportToCSV(exportData, filename);
                showSuccessAlert('Success', 'All issues exported to CSV successfully');
            } else {
                showErrorAlert('No Data', 'No issues available to export');
            }
        } catch (error) {
            console.error('Error exporting CSV:', error);
            showErrorAlert('Error', 'Failed to export issues to CSV');
        }
    };

    // Export issues to JSON
    const handleExportJSON = async () => {
        try {
            // Fetch all issues without pagination
            const response = await issueList('', 1, 1000); // Fetch up to 1000 issues
            if (response.data && response.data.data && response.data.data.data.length > 0) {
                const allIssues = response.data.data.data;
                const exportData = allIssues.map(issue => ({
                    id: issue.id,
                    title: issue.title,
                    description: issue.description,
                    status: issue.status,
                    priority: issue.priority,
                    createdAt: issue.createdAt,
                    updatedAt: issue.updatedAt
                }));
                
                const filename = `issues_export_${new Date().toISOString().split('T')[0]}`;
                exportToJSON(exportData, filename);
                showSuccessAlert('Success', 'All issues exported to JSON successfully');
            } else {
                showErrorAlert('No Data', 'No issues available to export');
            }
        } catch (error) {
            console.error('Error exporting JSON:', error);
            showErrorAlert('Error', 'Failed to export issues to JSON');
        }
    };

    return (
        <NavBar>
        <div className="container-fluid min-vh-100 p-0">
            <div className="row g-0 min-vh-100">
                {/* Cover Image Section */}
                <div className="col-lg-4 d-none d-lg-block">
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
                            <h1 className="display-4 fw-bold mb-3">Issue List</h1>
                            <p className="lead mb-4">Manage and track all your issues in one place</p>
                            <div className="d-flex justify-content-center gap-4">
                                <div className="text-center">
                                    <h3 className="fw-bold">Monitor</h3>
                                    <p>Track progress</p>
                                </div>
                                <div className="text-center">
                                    <h3 className="fw-bold">Manage</h3>
                                    <p>Organize tasks</p>
                                </div>
                                <div className="text-center">
                                    <h3 className="fw-bold">Resolve</h3>
                                    <p>Complete issues</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* Content Section */}
                <div className="col-lg-8 d-flex align-items-start justify-content-center bg-light" style={{ paddingTop: '2rem' }}>
                    <div className="w-100" style={{ maxWidth: '900px', padding: '1rem' }}>
                        <div className="text-center mb-4">
                            <h2 className="fw-bold text-dark">Issue Management</h2>
                            <p className="text-muted">View, search, and manage all issues efficiently</p>
                        </div>

                        {/* Issue Statistics */}
                        <div className="mb-4">
                            <h4 className="fw-semibold mb-3">Issue Statistics</h4>
                            <IssueStatusCounts />
                        </div>

                        {/* Search and Actions */}
                        <div className="mb-4">
                            <form onSubmit={handleSearch} className="d-flex align-items-center flex-wrap gap-2">
                                <input
                                    type="text"
                                    className="form-control shadow-sm"
                                    style={{ minWidth: '250px', maxWidth: '350px' }}
                                    placeholder="Search issues..."
                                    value={search}
                                    onChange={handleSearchChange}
                                />
                                <button type="submit" className="btn btn-primary shadow-sm">
                                    <i className="bi bi-search me-1"></i>Search
                                </button>
                                <button type="button" className="btn btn-success shadow-sm" onClick={() => navigate('/issue')}>
                                    <i className="bi bi-plus-circle me-1"></i>Create
                                </button>
                                <button type="button" className="btn btn-outline-success shadow-sm" onClick={handleExportCSV} disabled={issues.length === 0}>
                                    <i className="bi bi-file-earmark-spreadsheet me-1"></i>CSV
                                </button>
                                <button type="button" className="btn btn-outline-success shadow-sm" onClick={handleExportJSON} disabled={issues.length === 0}>
                                    <i className="bi bi-file-earmark-code me-1"></i>JSON
                                </button>
                            </form>
                        </div>

                        {/* Issues Table */}
                        <div className="card shadow-sm">
                            <div className="card-body p-0">
                                {loading ? (
                                    <div className="text-center py-5">
                                        <div className="spinner-border" role="status">
                                            <span className="visually-hidden">Loading...</span>
                                        </div>
                                    </div>
                                ) : (
                                    <>
                                        <div className="table-responsive">
                                            <table className="table table-hover mb-0">
                                                <thead className="table-light">
                                                    <tr>
                                                        <th>Title</th>
                                                        <th>Description</th>
                                                        <th>Status</th>
                                                        <th>Priority</th>
                                                        <th>Created</th>
                                                        <th>Updated</th>
                                                        <th>Actions</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {issues.length > 0 ? (
                                                        issues.map((issue) => (
                                                            <tr key={issue.id}>
                                                                <td className="fw-medium">{issue.title}</td>
                                                                <td className="text-truncate" style={{ maxWidth: '120px' }}>{issue.description}</td>
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
                                                                <td className="text-muted small">
                                                                    {issue.createdAt ? new Date(issue.createdAt).toLocaleDateString() : 'N/A'}
                                                                </td>
                                                                <td className="text-muted small">
                                                                    {issue.updatedAt ? new Date(issue.updatedAt).toLocaleDateString() : 'N/A'}
                                                                </td>
                                                                <td>
                                                                    <div className="d-flex gap-1">
                                                                        <button className="btn btn-sm btn-outline-primary" onClick={() => handleViewIssue(issue.id)} title="View">
                                                                            <i className="bi bi-eye"></i>
                                                                        </button>
                                                                        <button 
                                                                            className="btn btn-sm btn-outline-warning"
                                                                            onClick={() => handleResolveIssue(issue.id)}
                                                                            disabled={issue.status === 'Resolved'}
                                                                            title="Resolve"
                                                                        >
                                                                            <i className="bi bi-check-circle"></i>
                                                                        </button>
                                                                        <button 
                                                                            className="btn btn-sm btn-outline-danger"
                                                                            onClick={() => handleCloseIssue(issue.id)}
                                                                            disabled={issue.status === 'Closed'}
                                                                            title="Close"
                                                                        >
                                                                            <i className="bi bi-x-circle"></i>
                                                                        </button>
                                                                        <button className="btn btn-sm btn-outline-info" onClick={() => handleEditIssue(issue.id)} title="Edit">
                                                                            <i className="bi bi-pencil"></i>
                                                                        </button>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        ))
                                                    ) : (
                                                        <tr>
                                                            <td colSpan="7" className="text-center py-4 text-muted">
                                                                No issues found
                                                            </td>
                                                        </tr>
                                                    )}
                                                </tbody>
                                            </table>
                                        </div>

                                        {/* Pagination */}
                                        <div className="p-3 border-top">
                                            <Pagination 
                                                currentPage={currentPage}
                                                totalPages={totalPages}
                                                onPageChange={handlePageChange}
                                                showing={issues.length}
                                                total={totalPages * limit}
                                                itemName="issues"
                                            />
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
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
        </NavBar>
    );
};

export default IssueList;