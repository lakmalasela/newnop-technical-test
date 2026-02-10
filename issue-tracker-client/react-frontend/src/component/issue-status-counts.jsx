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
                return 'bi-exclamation-circle';
            case 'In Progress':
                return 'bi-hourglass-split';
            case 'Resolved':
                return 'bi-check-circle';
            default:
                return 'bi-info-circle';
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
        <div className="row">
            <div className="col-md-4 mb-3">
                <div className="card text-center">
                    <div className="card-body">
                        <i className={`bi ${getStatusIcon('Open')} text-danger fs-1 mb-2`}></i>
                        <h5 className="card-title">Open Issues</h5>
                        <h2 className={`text-${getStatusColor('Open')}`}>{statusCounts.Open}</h2>
                    </div>
                </div>
            </div>
            <div className="col-md-4 mb-3">
                <div className="card text-center">
                    <div className="card-body">
                        <i className={`bi ${getStatusIcon('In Progress')} text-warning fs-1 mb-2`}></i>
                        <h5 className="card-title">In Progress</h5>
                        <h2 className={`text-${getStatusColor('In Progress')}`}>{statusCounts['In Progress']}</h2>
                    </div>
                </div>
            </div>
            <div className="col-md-4 mb-3">
                <div className="card text-center">
                    <div className="card-body">
                        <i className={`bi ${getStatusIcon('Resolved')} text-success fs-1 mb-2`}></i>
                        <h5 className="card-title">Resolved</h5>
                        <h2 className={`text-${getStatusColor('Resolved')}`}>{statusCounts.Resolved}</h2>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default IssueStatusCounts;
