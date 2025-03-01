import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Alert, Modal } from 'react-bootstrap'; // Added Modal for pop-up
import { useNavigate } from 'react-router-dom';
import '../css/AddUser.css';
import { useFormValidation } from '../component/FormValidation'; // Import the custom hook

function AddUser() {
    // State for form data
    const [formData, setFormData] = useState({
        userName: '',
        firstName: '',
        lastName: '',
        email: '',
        password: '',
    });

    // State for form errors
    const [errors, setErrors] = useState({});

    // State for messages (success/error)
    const [message, setMessage] = useState('');

    // State for loading indicator
    const [isLoading, setIsLoading] = useState(false);

    // State for pop-up visibility
    const [showPopup, setShowPopup] = useState(false);

    // State for pop-up content
    const [popupContent, setPopupContent] = useState({
        status: '',
        userId: null,
    });

    const navigate = useNavigate();
    const { validateForm } = useFormValidation(); // Use the custom hook for form validation

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate the form using the custom hook
        const validationErrors = validateForm(formData);
        setErrors(validationErrors);

        // If there are no validation errors, proceed with form submission
        if (Object.keys(validationErrors).length === 0) {
            setIsLoading(true);
            setMessage('');

            try {
                // Step 1: Authenticate and get the JWT token
                const firstResponse = await axios.post(
                    'http://localhost:8080/auth',
                    { userName: 'admin', password: 'password' } // Replace with actual credentials
                );

                const token = firstResponse.data.token;

                // Step 2: Add the user using the token
                const secondResponse = await axios.post(
                    'http://localhost:8080/users',
                    formData,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                // Set pop-up content for success
                setPopupContent({
                    status: 'User added successfully!',
                    userId: secondResponse.data.userId, // Assuming the backend returns userId
                });

                // Clear the form
                setFormData({
                    userName: '',
                    firstName: '',
                    lastName: '',
                    email: '',
                    password: '',
                });
            } catch (error) {
                // Set pop-up content for error
                setPopupContent({
                    status: error.response?.data?.message || 'Error processing request',
                    userId: null,
                });
            } finally {
                setIsLoading(false);
                setShowPopup(true); // Show the pop-up
            }
        } else {
            setMessage('Please fix the errors in the form.');
        }
    };

    // Close the pop-up
    const handleClosePopup = () => {
        setShowPopup(false);
    };

    return (
        <div className="add-user-container">
            <h2>Add User</h2>
            <Form onSubmit={handleSubmit}>
                {/* Username Field */}
                <Form.Group>
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        type="text"
                        value={formData.userName}
                        onChange={(e) => setFormData({ ...formData, userName: e.target.value })}
                        isInvalid={!!errors.userName}
                       
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.userName}
                    </Form.Control.Feedback>
                </Form.Group>

                {/* First Name Field */}
                <Form.Group>
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                        type="text"
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        isInvalid={!!errors.firstName}
                       
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.firstName}
                    </Form.Control.Feedback>
                </Form.Group>

                {/* Last Name Field */}
                <Form.Group>
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                        type="text"
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        isInvalid={!!errors.lastName}
                        
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.lastName}
                    </Form.Control.Feedback>
                </Form.Group>

                {/* Email Field */}
                <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        isInvalid={!!errors.email}
                        
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.email}
                    </Form.Control.Feedback>
                </Form.Group>

                {/* Password Field */}
                <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        isInvalid={!!errors.password}
                        
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.password}
                    </Form.Control.Feedback>
                </Form.Group>

                {/* Submit Button */}
                <Button type="submit" disabled={isLoading}>
                    {isLoading ? 'Adding User...' : 'Add User'}
                </Button>
            </Form>

            {/* Display success/error message */}
            {message && (
                <Alert variant={message.includes('success') ? 'success' : 'danger'} className="mt-3">
                    {message}
                </Alert>
            )}

            {/* Back to Home Button */}
            <Button variant="secondary" onClick={() => navigate('/')} className="mt-3">
                Back to Home
            </Button>

            {/* Pop-up for status and userId */}
            <Modal show={showPopup} onHide={handleClosePopup}>
                <Modal.Header closeButton>
                    <Modal.Title>Status</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p><strong>Status:</strong> {popupContent.status}</p>
                    {popupContent.userId && (
                        <p><strong>User ID:</strong> {popupContent.userId}</p>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClosePopup}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default AddUser;