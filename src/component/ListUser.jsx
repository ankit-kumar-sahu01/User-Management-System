import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Form, Button, Alert, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import '../css/ListUser.css';

// List of Users Page where users can be searched by firstName, lastName, email, and userName
function ListUser() {
    // State to store the list of users fetched from the backend
    const [users, setUsers] = useState([]);

    // State to store messages (success or error)
    const [message, setMessage] = useState('');

    // State to manage loading state (e.g., when fetching data)
    const [isLoading, setIsLoading] = useState(false);

    // State to store the search term entered by the user
    const [search, setSearch] = useState('');

    // Hook to navigate between pages
    const navigate = useNavigate();

    // Function to fetch users from the backend
    const fetchUsers = async () => {
        setIsLoading(true); // Set loading state to true
        setMessage(''); // Clear any previous messages

        try {
            // Step 1: Authenticate and get the JWT token
            const firstResponse = await axios.post(
                'http://localhost:8080/auth',
                { userName: 'admin', password: 'password' } // Replace with actual credentials
            );

            const token = firstResponse.data.token; // Extract the token from the response

            // Step 2: Fetch users based on the search term
            const secondResponse = await axios.post(
                'http://localhost:8080/users/search',
                { searchTerm: search }, // Send the search term to the backend
                {
                    headers: {
                        Authorization: `Bearer ${token}`, // Include the token in the request headers
                        'Content-Type': 'application/json',
                    },
                }
            );

            // Update the users state with the fetched data
            setUsers(secondResponse.data);
            setMessage('Users fetched successfully!'); // Set success message
        } catch (error) {
            // Handle errors (e.g., network issues, invalid token, etc.)
            console.error('Error:', error.response?.data);
            setMessage(error.response?.data?.message || 'Error fetching users'); // Set error message
        } finally {
            setIsLoading(false); // Set loading state to false
        }
    };

    // Fetch users when the component mounts
    useEffect(() => {
        fetchUsers();
    }, []); // Empty dependency array ensures this runs only once on mount

    // Filter users based on the search term
    const filteredUsers = users.filter(user => {
        const searchTerm = search.trim().toLowerCase(); // Normalize the search term

        // If the search term is empty, show all users
        if (!searchTerm) return true;

        // Exact match for userName
        if (users.some(u => u.userName?.toLowerCase() === searchTerm)) {
            return user.userName?.toLowerCase() === searchTerm;
        }

        // Combine firstName, lastName, userName, and email into a single string for searching
        const fullName = `${user.firstName || ''} ${user.lastName || ''} ${user.userName || ''} ${user.email || ''}`.toLowerCase();

        // Check if the search term is included in the combined string or email
        return fullName.includes(searchTerm) || user.email?.toLowerCase().includes(searchTerm);
    });

    return (
        <div className="list-user-container">
            <h2>User List</h2>

            {/* Search input field */}
            <Form.Control
                type="text"
                placeholder="Search users..."
                value={search}
                onChange={(e) => setSearch(e.target.value)} // Update the search term as the user types
                className="mb-3"
            />

            {/* Display a spinner while loading */}
            {isLoading ? (
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            ) : (
                <>
                    {/* Table to display the list of users */}
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Email</th>
                                <th>UserName</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* Map through the filtered users and display their details */}
                            {filteredUsers.map(user => (
                                <tr key={user.userId}>
                                    <td>{user.firstName}</td>
                                    <td>{user.lastName}</td>
                                    <td>{user.email}</td>
                                    <td>{user.userName}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>

                    {/* Display success or error messages */}
                    {message && (
                        <Alert variant={message.includes('success') ? 'success' : 'danger'} className="mt-3">
                            {message}
                        </Alert>
                    )}
                </>
            )}

            {/* Button to navigate back to the home page */}
            <Button variant="secondary" onClick={() => navigate('/')} className="mt-3">
                Back to Home
            </Button>
        </div>
    );
}

export default ListUser;