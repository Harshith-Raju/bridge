// src/LoginPage.js
import React from 'react';
import { useNavigate } from 'react-router-dom'; // Change this line

const LoginPage = () => {
    const navigate = useNavigate(); // Change this line

    const handleCompanyLogin = () => {
        // Redirect to company login path
        navigate('/login'); // Change this line
    };

    const handleInvestorLogin = () => {
        // Redirect to investor login path
        navigate('/login'); // Change this line
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Welcome to Our Platform</h1>
            <div style={styles.buttonContainer}>
                <button style={styles.button} onClick={handleCompanyLogin}>
                    Company Login
                </button>
                <button style={styles.button} onClick={handleInvestorLogin}>
                    Investor Login
                </button>
            </div>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: '#f4f4f4',
        fontFamily: 'Arial, sans-serif',
    },
    title: {
        marginBottom: '20px',
        color: '#333',
    },
    buttonContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
    },
    button: {
        padding: '10px 20px',
        fontSize: '16px',
        color: '#fff',
        backgroundColor: '#007bff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
    },
};

export default LoginPage;