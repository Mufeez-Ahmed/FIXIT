import axios from 'axios';
import { ArcElement, Chart, Legend, Tooltip } from 'chart.js';
import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';

Chart.register(ArcElement, Tooltip, Legend);

const styles = {
    mainContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        padding: '30px',
        backgroundColor: 'var(--bg-primary)',
        minHeight: '100vh',
        transition: 'all 0.4s ease',
    },
    container: {
        width: '65%',
        backgroundColor: 'var(--card-bg)',
        padding: '25px',
        borderRadius: '12px',
        boxShadow: '0 10px 25px rgba(0,0,0,0.05)',
        border: '1px solid var(--border-color)',
    },
    chartContainer: {
        width: '30%',
        height: '400px',
        backgroundColor: 'var(--card-bg)',
        borderRadius: '15px',
        boxShadow: '0 10px 25px rgba(0,0,0,0.05)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px',
        position: 'sticky',
        top: '20px',
        border: '1px solid var(--border-color)',
    },
    complaintItem: {
        marginBottom: '20px',
        padding: '20px',
        border: '1px solid var(--border-color)',
        borderRadius: '10px',
        backgroundColor: 'var(--bg-primary)',
        color: 'var(--text-main)',
        transition: 'transform 0.2s',
    },
    badge: {
        padding: '5px 12px',
        borderRadius: '20px',
        fontSize: '12px',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        float: 'right',
    },
    buttonContainer: {
        marginTop: '15px',
        display: 'flex',
        gap: '10px',
    },
    button: {
        padding: '8px 20px',
        fontSize: '14px',
        fontWeight: '600',
        cursor: 'pointer',
        border: 'none',
        borderRadius: '6px',
        transition: 'opacity 0.2s',
    },
    acceptButton: { backgroundColor: '#27ae60', color: '#fff' },
    rejectButton: { backgroundColor: '#e74c3c', color: '#fff' },
    complaintType: { fontSize: '18px', fontWeight: 'bold', marginBottom: '10px' },
    detailText: { margin: '5px 0', color: 'var(--text-muted)', fontSize: '14px' }
};

function Admin() {
    const [complaints, setComplaints] = useState([]);
    const [statusCounts, setStatusCounts] = useState({ accepted: 0, rejected: 0, pending: 0 });

    // 1. Fetch all complaints from Backend
    const fetchComplaints = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/complaints/all`);
            setComplaints(response.data);
            calculateStats(response.data);
        } catch (error) {
            console.error('Error fetching complaints:', error);
        }
    };

    useEffect(() => {
        fetchComplaints();
    }, []);

    // 2. Logic to update status in Database
    const updateStatusOnServer = async (id, newStatus) => {
        try {
            // This sends { "status": "accepted" } to match the Backend Map
            await axios.put(`${import.meta.env.VITE_API_BASE_URL}/api/complaints/update-status/${id}`, {
                status: newStatus
            });
            
            // Refresh data from server to update UI and Chart
            fetchComplaints(); 
        } catch (error) {
            console.error('Update failed:', error);
            alert("Could not update status. Is the backend running?");
        }
    };

    // 3. Helper to update the Pie Chart numbers
    const calculateStats = (list) => {
        const counts = { accepted: 0, rejected: 0, pending: 0 };
        list.forEach((c) => {
            const s = c.status?.toLowerCase() || 'pending';
            if (s === 'accepted') counts.accepted++;
            else if (s === 'rejected') counts.rejected++;
            else counts.pending++;
        });
        setStatusCounts(counts);
    };

    const chartData = {
        labels: ['Accepted', 'Rejected', 'Pending'],
        datasets: [{
            data: [statusCounts.accepted, statusCounts.rejected, statusCounts.pending],
            backgroundColor: ['#27ae60', '#e74c3c', '#f1c40f'],
            borderWidth: 0,
        }],
    };

    return (
        <div style={styles.mainContainer}>
            <div style={styles.container}>
                <h2 style={{ color: 'var(--text-main)', marginBottom: '25px' }}>Administrator Dashboard</h2>
                
                {complaints.length === 0 ? (
                    <p style={{color: 'var(--text-muted)'}}>No grievances reported yet.</p>
                ) : (
                    complaints.map((c) => (
                        <div key={c.id} style={styles.complaintItem}>
                            <span style={{
                                ...styles.badge,
                                backgroundColor: c.status === 'accepted' ? '#e6fffa' : c.status === 'rejected' ? '#fff5f5' : '#fffaf0',
                                color: c.status === 'accepted' ? '#27ae60' : c.status === 'rejected' ? '#e74c3c' : '#d69e2e',
                            }}>
                                {c.status || 'pending'}
                            </span>
                            <p style={styles.complaintType}>{c.type || "General Inquiry"}</p>
                            <p style={styles.detailText}><strong>Citizen:</strong> {c.name}</p>
                            <p style={styles.detailText}><strong>Location:</strong> {c.address}</p>
                            <p style={styles.detailText}><strong>Description:</strong> {c.description}</p>
                            
                            {/* Show buttons only if status is pending */}
                            {(c.status?.toLowerCase() !== 'accepted' && c.status?.toLowerCase() !== 'rejected') && (
                                <div style={styles.buttonContainer}>
                                    <button 
                                        style={{ ...styles.button, ...styles.acceptButton }} 
                                        onClick={() => updateStatusOnServer(c.id, 'accepted')}
                                        onMouseOver={(e) => e.target.style.opacity = '0.8'}
                                        onMouseOut={(e) => e.target.style.opacity = '1'}
                                    >
                                        Approve
                                    </button>
                                    <button 
                                        style={{ ...styles.button, ...styles.rejectButton }} 
                                        onClick={() => updateStatusOnServer(c.id, 'rejected')}
                                        onMouseOver={(e) => e.target.style.opacity = '0.8'}
                                        onMouseOut={(e) => e.target.style.opacity = '1'}
                                    >
                                        Reject
                                    </button>
                                </div>
                            )}
                        </div>
                    ))
                )}
            </div>

            <div style={styles.chartContainer}>
                <h3 style={{ color: 'var(--text-main)', marginBottom: '20px' }}>Grievance Statistics</h3>
                <div style={{ width: '100%', height: '250px' }}>
                    <Pie data={chartData} options={{ maintainAspectRatio: false }} />
                </div>
                <div style={{ marginTop: '20px', textAlign: 'center', fontSize: '14px', color: 'var(--text-muted)' }}>
                    Total Complaints: {complaints.length}
                </div>
            </div>
        </div>
    );
}

export default Admin;