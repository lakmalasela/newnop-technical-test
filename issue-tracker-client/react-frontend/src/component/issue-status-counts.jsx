import { useState, useEffect } from 'react';
import { issueList } from '../api/issue';
import Swal from 'sweetalert2';

const IssueStatusCounts = () => {
    const [statusCounts, setStatusCounts] = useState({
        Open: 0,
        'In Progress': 0,
        Resolved: 0
    });
    const [loading, setLoading] = useState(false);

    const fetchStatusCounts = async () => {
        setLoading(true);
        try {
            // Fetch all issues to get status counts
            const response = await issueList('', 1, 1000); // Get all issues
            if (response.data && response.data.data) {
                const issues = response.data.data.data || [];
                const counts = {
                    Open: 0,
                    'In Progress': 0,
                    Resolved: 0
                };
                
                issues.forEach(issue => {
                    if (issue.status === 'Open') counts.Open++;
                    else if (issue.status === 'In Progress') counts['In Progress']++;
                    else if (issue.status === 'Resolved') counts.Resolved++;
                });
                
                setStatusCounts(counts);
            }
        } catch (error) {
            console.error("Error fetching status counts:", error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Failed to fetch issue statistics',
                confirmButtonColor: '#00bcd4'
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStatusCounts();
    }, []);

    const getStatusColor = (status) => {
        switch (status) {
            case 'Open':
                return 'danger';
            case 'In Progress':
                return 'warning';
            case 'Resolved':
                return 'success';
            default:
                return 'secondary';
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'Open':
                return 'fa-exclamation-circle';
            case 'In Progress':
                return 'fa-hourglass-half';
            case 'Resolved':
                return 'fa-check-circle';
            default:
                return 'fa-info-circle';
        }
    };

    if (loading) {
        return (
            <div className="text-center">
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="row g-3">
            <div className="col-md-4">
                <div className="card border-0 shadow-sm h-100">
                    <div className="card-body text-center p-3 d-flex flex-column justify-content-center">
                        <div className="mb-2">
                            <div className="rounded-circle bg-danger bg-opacity-10 text-danger d-inline-flex align-items-center justify-content-center" style={{ width: '45px', height: '45px' }}>
                                <i className={`fas ${getStatusIcon('Open')} fs-4`}></i>
                            </div>
                        </div>
                        <h6 className="card-title fw-bold text-dark mb-2 w-100">Open Issues</h6>
                        <h3 className={`text-${getStatusColor('Open')} fw-bold mb-0`}>{statusCounts.Open}</h3>
                    </div>
                </div>
            </div>
            <div className="col-md-4">
                <div className="card border-0 shadow-sm h-100">
                    <div className="card-body text-center p-3 d-flex flex-column justify-content-center">
                        <div className="mb-2">
                            <div className="rounded-circle bg-warning bg-opacity-10 text-warning d-inline-flex align-items-center justify-content-center" style={{ width: '45px', height: '45px' }}>
                                <i className={`fas ${getStatusIcon('In Progress')} fs-4`}></i>
                            </div>
                        </div>
                        <h6 className="card-title fw-bold text-dark mb-2 w-100">In Progress</h6>
                        <h3 className={`text-${getStatusColor('In Progress')} fw-bold mb-0`}>{statusCounts['In Progress']}</h3>
                    </div>
                </div>
            </div>
            <div className="col-md-4">
                <div className="card border-0 shadow-sm h-100">
                    <div className="card-body text-center p-3 d-flex flex-column justify-content-center">
                        <div className="mb-2">
                            <div className="rounded-circle bg-success bg-opacity-10 text-success d-inline-flex align-items-center justify-content-center" style={{ width: '45px', height: '45px' }}>
                                <i className={`fas ${getStatusIcon('Resolved')} fs-4`}></i>
                            </div>
                        </div>
                        <h6 className="card-title fw-bold text-dark mb-2 w-100">Resolved</h6>
                        <h3 className={`text-${getStatusColor('Resolved')} fw-bold mb-0`}>{statusCounts.Resolved}</h3>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default IssueStatusCounts;
