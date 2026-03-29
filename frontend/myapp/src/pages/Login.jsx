import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const styles = {
    pageBackground: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '80vh',
        backgroundColor: '#f4f7f6',
    },
    container: {
        maxWidth: '400px',
        width: '100%',
        padding: '40px',
        backgroundColor: '#ffffff',
        borderRadius: '12px',
        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.05)',
        textAlign: 'center',
    },
    title: {
        fontSize: '28px',
        fontWeight: 'bold',
        marginBottom: '10px',
        color: '#2c3e50',
    },
    subtitle: {
        fontSize: '14px',
        color: '#718096',
        marginBottom: '30px',
    },
    formGroup: {
        marginBottom: '20px',
        textAlign: 'left',
    },
    label: {
        display: 'block',
        marginBottom: '8px',
        fontSize: '14px',
        fontWeight: '600',
        color: '#4a5568',
    },
    input: {
        width: '100%',
        padding: '12px',
        fontSize: '16px',
        borderRadius: '6px',
        border: '1px solid #e2e8f0',
        boxSizing: 'border-box',
        outline: 'none',
        transition: 'border-color 0.3s',
    },
    button: {
        width: '100%',
        padding: '12px',
        fontSize: '16px',
        fontWeight: 'bold',
        borderRadius: '6px',
        border: 'none',
        backgroundColor: '#27ae60',
        color: '#fff',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
        marginTop: '10px',
    },
    errorMessage: {
        color: '#e74c3c',
        marginTop: '15px',
        fontSize: '14px',
        backgroundColor: '#fff5f5',
        padding: '10px',
        borderRadius: '4px',
        border: '1px solid #feb2b2',
    },
};

function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simple hardcoded admin check
        if (formData.email === 'admin' && formData.password === 'admin123') {
            navigate('/Admin');
        } else {
            setError('Invalid username or password. Please try again.');
        }
    };

    return (
        <div style={styles.pageBackground}>
            <div style={styles.container}>
                <h1 style={styles.title}>Admin Login</h1>
                <p style={styles.subtitle}>Please enter your credentials to access the dashboard.</p>
                
                <form onSubmit={handleSubmit}>
                    <div style={styles.formGroup}>
                        <label style={styles.label}>Username</label>
                        <input
                            type="text"
                            name="email"
                            placeholder="Enter username"
                            value={formData.email}
                            onChange={handleChange}
                            style={styles.input}
                            required
                        />
                    </div>
                    <div style={styles.formGroup}>
                        <label style={styles.label}>Password</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Enter password"
                            value={formData.password}
                            onChange={handleChange}
                            style={styles.input}
                            required
                        />
                    </div>
                    <button 
                        type="submit" 
                        style={styles.button}
                        onMouseOver={(e) => e.target.style.backgroundColor = '#219150'}
                        onMouseOut={(e) => e.target.style.backgroundColor = '#27ae60'}
                    >
                        Sign In
                    </button>
                    {error && <div style={styles.errorMessage}>{error}</div>}
                </form>
            </div>
        </div>
    );
}

export default Login;