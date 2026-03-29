import '@fortawesome/fontawesome-free/css/all.min.css';
import React from 'react';

const styles = {
    // 3D Background with animated gradient linked to global theme
    wrapper: {
        minHeight: '100vh',
        background: 'var(--bg-wrapper)', 
        backgroundSize: '400% 400%',
        animation: 'gradientBG 15s ease infinite',
        padding: '60px 20px',
        perspective: '1200px',
        transition: 'all 0.4s ease',
    },
    // Floating 3D Container
    container: {
        maxWidth: '900px',
        margin: '0 auto',
        padding: '50px',
        backgroundColor: 'var(--card-bg)', 
        backdropFilter: 'blur(12px)',
        borderRadius: '24px',
        boxShadow: '0 20px 50px rgba(0, 0, 0, 0.1)',
        border: '1px solid var(--border-color)', 
        transform: 'rotateX(2deg)',
        transition: 'all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1)',
    },
    title: {
        fontSize: '42px',
        fontWeight: '900',
        marginBottom: '25px',
        color: 'var(--text-main)', 
        textAlign: 'center',
        letterSpacing: '-1px'
    },
    accentTitle: { color: 'var(--accent)' }, 
    content: {
        fontSize: '17px',
        lineHeight: '1.9',
        color: 'var(--text-main)', 
        marginBottom: '50px',
        textAlign: 'center',
        padding: '0 20px'
    },
    developerSection: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: '20px',
    },
    developerCard: {
        textAlign: 'center',
        padding: '40px',
        borderRadius: '20px',
        width: '320px',
        backgroundColor: 'var(--bg-primary)', 
        boxShadow: '0 10px 25px rgba(0,0,0,0.05)',
        border: '1px solid var(--border-color)', 
        transition: 'all 0.4s ease',
        color: 'var(--text-main)',
        cursor: 'pointer'
    },
    developerImage: {
        width: '160px',
        height: '160px',
        borderRadius: '50%',
        marginBottom: '20px',
        border: '5px solid var(--accent)', 
        padding: '5px',
        objectFit: 'cover',
        transition: 'transform 0.5s ease',
    },
    socialMediaIcon: {
        fontSize: '24px',
        color: 'var(--accent)', 
        transition: 'all 0.3s',
        margin: '0 10px'
    },
    footerText: {
        marginTop: '60px',
        textAlign: 'center',
        fontSize: '14px',
        color: 'var(--text-muted)', 
        fontWeight: '600'
    }
};

function About() {
    return (
        <div style={styles.wrapper}>
            <div 
                style={styles.container}
                onMouseOver={(e) => {
                    e.currentTarget.style.transform = 'rotateX(0deg) translateY(-10px)';
                    e.currentTarget.style.boxShadow = '0 40px 80px rgba(39, 174, 96, 0.2)';
                }}
                onMouseOut={(e) => {
                    e.currentTarget.style.transform = 'rotateX(2deg) translateY(0)';
                    e.currentTarget.style.boxShadow = '0 20px 50px rgba(0, 0, 0, 0.1)';
                }}
            >
                <h1 style={styles.title}>About <span style={styles.accentTitle}>FIXIT</span></h1>
                
                <div style={styles.content}>
                    <p>
                        <strong>FIXIT</strong> is a next-generation Complaint Management System (CMS) designed to 
                        empower citizens. We bridge the gap between community needs and administrative action, 
                        ensuring that every public grievance is handled with speed and transparency.
                    </p>
                    <p style={{ marginTop: '20px', color: 'var(--text-muted)' }}>
                        Built on a robust Full-Stack architecture, our platform utilizes <strong>Real-time Tracking</strong>, 
                        <strong>reCAPTCHA v3 Security</strong>, and <strong>Automated Workflows</strong> to transform 
                        municipal management into a seamless digital experience.
                    </p>
                </div>

                <h2 style={{...styles.title, fontSize: '28px', marginTop: '40px'}}>
                    The <span style={styles.accentTitle}>Developer</span>
                </h2>
                
                <div style={styles.developerSection}>
                    <div
                        style={styles.developerCard}
                        onMouseEnter={(e) => {
                            // Contrast Swap: Use Text color for BG and BG color for Text
                            e.currentTarget.style.backgroundColor = 'var(--text-main)';
                            e.currentTarget.style.color = 'var(--bg-primary)';
                            
                            // Swap icon colors to match the new text color
                            const icons = e.currentTarget.querySelectorAll('i');
                            icons.forEach(icon => icon.style.color = 'var(--bg-primary)');
                        }}
                        onMouseLeave={(e) => {
                            // Revert to theme defaults
                            e.currentTarget.style.backgroundColor = 'var(--bg-primary)';
                            e.currentTarget.style.color = 'var(--text-main)';
                            
                            const icons = e.currentTarget.querySelectorAll('i');
                            icons.forEach(icon => icon.style.color = 'var(--accent)');
                        }}
                    >
                        <img
                            src="images/mufeez.jpg" 
                            alt="Mufeez Ahmed"
                            style={styles.developerImage}
                        />
                        <div style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '5px' }}>
                            Mufeez Ahmed
                        </div>
                        <div style={{ fontSize: '15px', opacity: 0.8, marginBottom: '20px' }}>
                            Full-Stack Developer | Engineering Student <br/> Anurag University
                        </div>
                        
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <a href="https://www.linkedin.com/in/mufeez-ahmed-3301ab27b/" target="_blank" rel="noopener noreferrer">
                                <i className="fab fa-linkedin" style={styles.socialMediaIcon}></i>
                            </a>
                            <a href="https://github.com/Mufeez-Ahmed" target="_blank" rel="noopener noreferrer">
                                <i className="fab fa-github" style={styles.socialMediaIcon}></i>
                            </a>
                        </div>
                    </div>
                </div>

                <footer style={styles.footerText}>
                    © 2026 FIXIT | CMS Portal. Dedicated to community excellence.
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

export default About;