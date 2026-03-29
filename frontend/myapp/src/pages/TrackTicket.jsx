import React, { useState } from 'react';
import axios from 'axios';

const styles = {
    container: { 
        maxWidth: '500px', 
        margin: '50px auto', 
        padding: '30px', 
        textAlign: 'center', 
        backgroundColor: 'var(--card-bg)', // Variable
        borderRadius: '16px', 
        boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
        border: '1px solid var(--border-color)', // Variable
        transition: 'all 0.4s ease'
    },
    input: { 
        width: '70%', 
        padding: '12px', 
        borderRadius: '8px 0 0 8px', 
        border: '1px solid var(--border-color)', // Variable
        outline: 'none', 
        fontSize: '16px',
        backgroundColor: 'var(--bg-primary)', // Variable
        color: 'var(--text-main)', // Variable
        transition: 'all 0.3s ease'
    },
    button: { 
        padding: '12px 20px', 
        borderRadius: '0 8px 8px 0', 
        border: 'none', 
        backgroundColor: 'var(--accent)', // Variable
        color: '#fff', 
        cursor: 'pointer', 
        fontWeight: 'bold',
        transition: 'opacity 0.3s'
    },
    resultBox: { 
        marginTop: '30px', 
        padding: '25px', 
        borderRadius: '12px', 
        border: '1px solid var(--border-color)', // Variable
        textAlign: 'left', 
        backgroundColor: 'var(--bg-primary)', // Variable
        transition: 'all 0.3s ease'
    },
    statusBadge: { 
        padding: '6px 14px', 
        borderRadius: '20px', 
        fontWeight: 'bold', 
        fontSize: '12px', 
        textTransform: 'uppercase',
        display: 'inline-block',
        marginTop: '5px'
    }
};

function TrackTicket() {
    const [ticketId, setTicketId] = useState('');
    const [complaint, setComplaint] = useState(null);
    const [error, setError] = useState('');

    const handleSearch = async () => {
        if (!ticketId) return;
        try {
            setError('');
            const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/complaints/${ticketId}`);
            setComplaint(response.data);
        } catch (err) {
            setComplaint(null);
            setError('Ticket ID not found. Please verify the ID and try again.');
        }
    };

    // Logic for dynamic status colors that work in both themes
    const getStatusStyles = (status) => {
        const s = status?.toLowerCase();
        if (s === 'accepted') return { bg: 'rgba(39, 174, 96, 0.2)', text: '#2ecc71', border: '#27ae60' };
        if (s === 'rejected') return { bg: 'rgba(231, 76, 60, 0.2)', text: '#e74c3c', border: '#c0392b' };
        return { bg: 'rgba(241, 196, 15, 0.2)', text: '#f1c40f', border: '#f39c12' };
    };

    const currentStatusStyle = getStatusStyles(complaint?.status);

    return (
        <div style={styles.container}>
            <h2 style={{ color: 'var(--accent)', marginBottom: '10px' }}>Track Your Complaint</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>Enter your unique Ticket ID to check the real-time status.</p>
            
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                <input 
                    type="text" 
                    placeholder="Enter Ticket ID (e.g. 1)" 
                    value={ticketId} 
                    onChange={(e) => setTicketId(e.target.value)}
                    style={styles.input}
                    onFocus={(e) => e.target.style.borderColor = 'var(--accent)'}
                    onBlur={(e) => e.target.style.borderColor = 'var(--border-color)'}
                />
                <button onClick={handleSearch} style={styles.button} onMouseOver={(e) => e.target.style.opacity = '0.8'} onMouseOut={(e) => e.target.style.opacity = '1'}>
                    Search
                </button>
            </div>

            {error && <p style={{ color: '#e74c3c', marginTop: '20px', fontWeight: '500' }}>{error}</p>}

            {complaint && (
                <div style={styles.resultBox}>
                    <h3 style={{ marginBottom: '15px', color: 'var(--text-main)', borderBottom: '1px solid var(--border-color)', paddingBottom: '10px' }}>
                        {complaint.type || "General Inquiry"}
                    </h3>
                    
                    <div style={{ color: 'var(--text-main)', lineHeight: '1.8' }}>
                        <p style={{ margin: '5px 0' }}><strong style={{ color: 'var(--text-muted)' }}>Filed By:</strong> {complaint.name}</p>
                        <p style={{ margin: '5px 0' }}><strong style={{ color: 'var(--text-muted)' }}>Location:</strong> {complaint.address}</p>
                        <p style={{ margin: '5px 0' }}><strong style={{ color: 'var(--text-muted)' }}>Zone:</strong> {complaint.zone}</p>
                        
                        <div style={{ marginTop: '15px' }}>
                            <strong style={{ color: 'var(--text-muted)' }}>Current Status: </strong><br/>
                            <span style={{
                                ...styles.statusBadge,
                                backgroundColor: currentStatusStyle.bg,
                                color: currentStatusStyle.text,
                                border: `1px solid ${currentStatusStyle.border}`
                            }}>
                                {complaint.status || "PENDING"}
                            </span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default TrackTicket;