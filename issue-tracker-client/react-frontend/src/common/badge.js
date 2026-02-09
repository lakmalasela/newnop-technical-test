   export const getPriorityBadgeClass = (priority) => {
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

     export  const getStatusBadgeClass = (status) => {
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