import React from 'react';

const styles = {
    // 3D Background with animated gradient linked to theme
    wrapper: {
        minHeight: '100vh',
        background: 'var(--bg-wrapper)', // Variable
        backgroundSize: '400% 400%',
        animation: 'gradientBG 15s ease infinite',
        padding: '60px 20px',
        perspective: '1000px',
        transition: 'all 0.4s ease',
    },
    // Glassmorphism card with 3D tilt effect
    page: {
        maxWidth: '850px',
        margin: '0 auto',
        padding: '50px',
        backgroundColor: 'var(--card-bg)', // Variable
        backdropFilter: 'blur(10px)',
        borderRadius: '24px',
        boxShadow: '0 20px 50px rgba(0, 0, 0, 0.15)',
        border: '1px solid var(--border-color)', // Variable
        transform: 'rotateX(2deg)',
        transition: 'all 0.5s ease',
    },
    header: { 
        color: 'var(--accent)', // Variable
        textAlign: 'center', 
        fontSize: '36px', 
        fontWeight: '900',
        marginBottom: '10px',
        textTransform: 'uppercase',
        letterSpacing: '1px'
    },
    subHeader: {
        textAlign: 'center',
        color: 'var(--text-muted)', // Variable
        marginBottom: '40px',
        fontSize: '14px',
        fontWeight: '600'
    },
    sectionTitle: { 
        borderLeft: '6px solid #d32f2f', // Keep red for priority feel
        paddingLeft: '15px', 
        color: 'var(--text-main)', // Variable
        marginTop: '35px',
        fontSize: '20px',
        transition: 'color 0.4s'
    },
    warningBox: {
        backgroundColor: 'rgba(211, 47, 47, 0.1)', // Translucent red
        border: '1px solid #d32f2f',
        padding: '20px',
        borderRadius: '12px',
        marginTop: '20px',
        color: '#ff5252', // Brighter red for visibility
        fontWeight: 'bold'
    },
    text: { 
        color: 'var(--text-main)', // Variable
        lineHeight: '1.8', 
        fontSize: '16px',
        transition: 'color 0.4s'
    },
    ruleList: {
        marginTop: '15px',
        paddingLeft: '20px'
    }
};

export default function CitizenCharter() {
    return (
        <div style={styles.wrapper}>
            <div 
                style={styles.page}
                onMouseOver={(e) => {
                    e.currentTarget.style.transform = 'rotateX(0deg) scale(1.02)';
                    e.currentTarget.style.boxShadow = '0 30px 60px rgba(0,0,0,0.2)';
                }}
                onMouseOut={(e) => {
                    e.currentTarget.style.transform = 'rotateX(2deg) scale(1)';
                    e.currentTarget.style.boxShadow = '0 20px 50px rgba(0, 0, 0, 0.15)';
                }}
            >
                <h1 style={styles.header}>Citizen Charter</h1>
                <p style={styles.subHeader}>OFFICIAL GUIDELINES & LEGAL DISCLOSURE</p>
                
                <h3 style={styles.sectionTitle}>Strict Code of Conduct</h3>
                <p style={styles.text}>
                    The <strong>FIXIT Portal</strong> is a high-priority resource for infrastructure and public utility issues. To ensure efficiency, the following rules are strictly enforced:
                </p>
                <ul style={{ ...styles.text, ...styles.ruleList }}>
                    <li><strong style={{color: 'var(--accent)'}}>Zero Tolerance for Spam:</strong> Submitting multiple identical complaints for the same issue will result in an automatic IP block.</li>
                    <li><strong style={{color: 'var(--accent)'}}>Verified Information:</strong> Providing false names or fabricated locations is a punishable offense.</li>
                    <li><strong style={{color: 'var(--accent)'}}>Evidence Integrity:</strong> Uploaded evidence must be authentic and taken at the site of the grievance.</li>
                </ul>

                <div style={styles.warningBox}>
                    ⚠️ LEGAL NOTICE: Misuse of this portal to provide false information to public authorities may lead to legal action under the relevant sections of the Indian Penal Code (IPC) and IT Act.
                </div>

                <h3 style={styles.sectionTitle}>The Resolution Protocol</h3>
                <p style={styles.text}>
                    Every complaint is processed through an automated hierarchy. Once the <strong>ReCAPTCHA v3</strong> verification is complete, your ticket enters the "Pending" state. 
                    Local authorities in districts like <strong>Hyderabad, Rangareddy, or Medchal</strong> are notified immediately.
                </p>

                <h3 style={styles.sectionTitle}>Effective Reporting</h3>
                <p style={styles.text}>
                    To expedite resolution, clearly mention landmarks near the issue (e.g., "Opposite Anurag University Main Gate"). Precise location data reduces the verification time significantly.
                </p>

                <footer style={{ 
                    marginTop: '60px', 
                    paddingTop: '20px', 
                    borderTop: '1px solid var(--border-color)', 
                    textAlign: 'center' 
                }}>
                    <p style={{ 
                        fontSize: '14px', 
                        color: 'var(--text-muted)', 
                        fontWeight: '600', 
                        letterSpacing: '0.5px' 
                    }}>
                        © 2026 FIXIT | CMS Portal. Dedicated to community excellence.
                    </p>
                </footer>
            </div>

            <style>
                {`
                    @keyframes gradientBG {
                        0% { background-position: 0% 50%; }
                        50% { background-position: 100% 50%; }
                        100% { background-position: 0% 50%; }
                    }
                `}
            </style>
        </div>
    );
}