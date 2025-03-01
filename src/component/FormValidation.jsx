export const useFormValidation = () => {
    const validateForm = (formData) => {
        const errors = {};

        // Username validation
        if (!formData.userName.trim()) {
            errors.userName = 'Username is required';
        } else if (!/^[A-Za-z_][A-Za-z0-9_]*$/.test(formData.userName)) {
            errors.userName = 'Username can only contain letters, numbers, and underscores, and cannot start with a number';
        }

        // First Name validation
        if (!formData.firstName.trim()) {
            errors.firstName = 'First Name is required';
        } else if (!/^[A-Z][a-z]*$/.test(formData.firstName)) {
            errors.firstName = 'First Name must start with a capital letter and contain only letters';
        }

        // Last Name validation
        if (!formData.lastName.trim()) {
            errors.lastName = 'Last Name is required';
        } else if (!/^[A-Z][a-z]*$/.test(formData.lastName)) {
            errors.lastName = 'Last Name must start with a capital letter and contain only letters';
        }

        // Email validation
        if (!formData.email.trim()) {
            errors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            errors.email = 'Invalid email address';
        }

        // Password validation
        if (!formData.password.trim()) {
            errors.password = 'Password is required';
        } else if (!/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(formData.password)) {
            errors.password = 'Password must be at least 8 characters long and contain at least one letter, one number, and one special character';
        }

        return errors;
    };

    return { validateForm };
};