import React from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import '../css/Home.css';

//Home Page
function Home() {
    const navigate = useNavigate();

    return (
        <div className="home-container">
            <h1>Welcome to User Management System</h1>
            <div className="button-container">
                {/* Button to navigate the AddUser page */}
                <Button variant="primary" onClick={() => navigate('/add-user')}>
                    Add User
                </Button>
                {/* Button to navigate the ListUser page */}
                <Button variant="success" onClick={() => navigate('/list-user')}>
                    List Users
                </Button>
            </div>
        </div>
    );
}

export default Home;