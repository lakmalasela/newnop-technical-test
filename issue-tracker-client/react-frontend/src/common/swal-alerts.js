import Swal from 'sweetalert2';

// Confirmation Dialog Component
export const showConfirmDialog = async (options = {}) => {
    const defaultOptions = {
        title: 'Are you sure?',
        text: 'You won\'t be able to revert this!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#28a745',
        cancelButtonColor: '#dc3545',
        confirmButtonText: 'Yes, proceed!'
    };

    const finalOptions = { ...defaultOptions, ...options };
    
    return await Swal.fire(finalOptions);
};

// Success Alert Component
export const showSuccessAlert = (title, text = '') => {
    return Swal.fire({
        icon: 'success',
        title: title || 'Success!',
        text: text,
        confirmButtonColor: '#00bcd4'
    });
};

// Error Alert Component
export const showErrorAlert = (title, text = '') => {
    return Swal.fire({
        icon: 'error',
        title: title || 'Error!',
        text: text,
        confirmButtonColor: '#00bcd4'
    });
};

// Info Alert Component
export const showInfoAlert = (title, text = '') => {
    return Swal.fire({
        icon: 'info',
        title: title || 'Information',
        text: text,
        confirmButtonColor: '#00bcd4'
    });
};

// Warning Alert Component
export const showWarningAlert = (title, text = '') => {
    return Swal.fire({
        icon: 'warning',
        title: title || 'Warning!',
        text: text,
        confirmButtonColor: '#ffc107'
    });
};

// Loading Alert Component
export const showLoadingAlert = (title = 'Loading...') => {
    return Swal.fire({
        title: title,
        allowOutsideClick: false,
        didOpen: () => {
            Swal.showLoading();
        }
    });
};

// Close Loading Alert
export const closeLoadingAlert = () => {
    Swal.close();
};

// Toast Notification Component
export const showToast = (title, icon = 'success', position = 'top-end') => {
    const Toast = Swal.mixin({
        toast: true,
        position: position,
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    });

    return Toast.fire({
        icon: icon,
        title: title
    });
};

// Specific confirmations for common actions
export const confirmResolveIssue = async () => {
    return await showConfirmDialog({
        title: 'Resolve Issue?',
        text: 'Are you sure you want to mark this issue as resolved?',
        icon: 'question',
        confirmButtonText: 'Yes, resolve it!'
    });
};

export const confirmCloseIssue = async () => {
    return await showConfirmDialog({
        title: 'Close Issue?',
        text: 'Are you sure you want to close this issue?',
        icon: 'question',
        confirmButtonText: 'Yes, close it!'
    });
};

export const confirmDeleteIssue = async () => {
    return await showConfirmDialog({
        title: 'Delete Issue?',
        text: 'Are you sure you want to delete this issue? This action cannot be undone!',
        icon: 'warning',
        confirmButtonText: 'Yes, delete it!'
    });
};

export const confirmUpdateIssue = async () => {
    return await showConfirmDialog({
        title: 'Update Issue?',
        text: 'Are you sure you want to update this issue?',
        icon: 'question',
        confirmButtonText: 'Yes, update it!'
    });
};

export const confirmLogout = async () => {
    return await showConfirmDialog({
        title: 'Are you sure?',
        text: "Do you want to logout from your account?",
        icon: 'warning',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, logout!'
    });
};
