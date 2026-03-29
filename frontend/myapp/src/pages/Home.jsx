import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

const styles = {
  container: {
    backgroundColor: 'var(--bg-primary)',
    fontFamily: "'Inter', sans-serif",
    overflowX: 'hidden',
    transition: 'all 0.4s ease',
  },
  wrapper: {
    background: 'var(--bg-wrapper)',
    backgroundSize: '400% 400%',
    animation: 'gradientAnimation 15s ease infinite',
    transition: 'all 0.4s ease',
  },
  heroSection: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    background: 'linear-gradient(rgba(15, 23, 42, 0.7), rgba(15, 23, 42, 0.8)), url(https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069) center/cover no-repeat',
    textAlign: 'center',
    color: '#fff',
    padding: '20px', // Mobile-friendly padding
    perspective: '1500px',
  },
  contentBox: {
    width: '100%',
    maxWidth: '900px',
    padding: 'clamp(40px, 10vh, 70px) clamp(20px, 5vw, 40px)', // Fluid padding
    background: 'rgba(255, 255, 255, 0.08)',
    backdropFilter: 'blur(20px)',
    borderRadius: '30px',
    border: '1px solid rgba(255,255,255,0.2)',
    boxShadow: '0 40px 100px rgba(0,0,0,0.4)',
    transition: 'all 0.8s cubic-bezier(0.165, 0.84, 0.44, 1)',
  },
  welcomeText: {
    fontFamily: "'Montserrat', sans-serif",
    fontSize: 'clamp(32px, 8vw, 64px)', // Fluid font: shrinks on mobile, grows on desktop
    fontWeight: '900',
    marginBottom: '20px',
    color: 'var(--accent)',
    letterSpacing: '-1px',
    lineHeight: '1.1',
    textShadow: '0 5px 15px rgba(0,0,0,0.2)',
  },
  heroSubtitle: {
    fontSize: 'clamp(16px, 4vw, 22px)',
    marginBottom: '30px',
    fontWeight: '400',
    color: '#cbd5e1',
    lineHeight: '1.6',
    maxWidth: '700px',
    margin: '0 auto 40px'
  },
  categorySection: {
    padding: 'clamp(60px, 10vw, 120px) 20px',
    textAlign: 'center',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  grid: {
    display: 'grid',
    // Automatically handles columns: 1 on mobile, 2 on tablets, 3 on desktop
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
    gap: '20px',
    marginTop: '40px',
    perspective: '1200px',
  },
  categoryCard: {
    padding: '40px 30px',
    backgroundColor: 'var(--card-bg)',
    borderRadius: '24px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
    border: '1px solid var(--border-color)',
    transition: 'all 0.5s cubic-bezier(0.23, 1, 0.32, 1)',
    cursor: 'pointer',
    textAlign: 'center',
  },
  iconWrapper: {
    fontSize: '40px',
    color: 'var(--accent)',
    marginBottom: '20px',
    display: 'block',
  },
  button: {
    padding: '18px 40px',
    fontSize: 'clamp(14px, 3vw, 18px)',
    backgroundColor: 'var(--accent)',
    color: '#fff',
    border: 'none',
    borderRadius: '12px',
    cursor: 'pointer',
    fontWeight: '700',
    textDecoration: 'none',
    display: 'inline-block',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    boxShadow: '0 15px 30px rgba(16, 185, 129, 0.3)',
    transition: 'all 0.3s ease',
  },
  statNumber: {
    color: 'var(--accent)',
    fontSize: 'clamp(32px, 6vw, 50px)', 
    fontWeight: '800', 
    marginBottom: '5px',
    fontFamily: "'Montserrat', sans-serif",
  },
  commitmentSection: {
    padding: 'clamp(60px, 8vw, 120px) 20px', 
    textAlign: 'center', 
    background: 'var(--text-main)', 
    color: 'var(--bg-primary)', 
    transition: 'all 0.4s ease',
  }
};

const CATEGORIES_DATA = [
  { icon: "🚧", title: "Roads & Potholes", desc: "Report road damage and dangerous potholes." },
  { icon: "💡", title: "Streetlight Outage", desc: "Fix dark zones and malfunctioning street lamps." },
  { icon: "🚰", title: "Water & Leaks", desc: "Report pipe bursts or water shortage issues." },
  { icon: "🌊", title: "Drainage Overflow", desc: "Sewerage blockages and drainage maintenance." },
  { icon: "🗑️", title: "Waste Management", desc: "Illegal dumping and garbage collection requests." },
  { icon: "⚡", title: "Electricity Issues", desc: "Transformer failures and frequent power cuts." }
];

function Home() {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    setShowContent(true);
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false, // Cleaner on mobile
  };

  return (
    <div style={styles.container}>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=Montserrat:wght@800;900&display=swap');
          
          @keyframes gradientAnimation {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }

          /* Global smooth scroll */
          html { scroll-behavior: smooth; }

          /* Mobile Tweaks */
          @media (max-width: 768px) {
            .stats-container {
              gap: 30px !important;
              padding: 60px 20px !important;
            }
            .category-card:hover {
              transform: translateY(-8px) !important; /* Simpler hover for touch */
            }
          }
        `}
      </style>

      <div style={styles.wrapper}>
        
        {/* HERO SECTION */}
        <section style={styles.heroSection}>
          <div 
            style={{
              ...styles.contentBox, 
              opacity: showContent ? 1 : 0, 
              transform: showContent ? 'translateY(0)' : 'translateY(30px)' 
            }}
          >
            <h1 style={styles.welcomeText}>Transparent Governance.</h1>
            <p style={styles.heroSubtitle}>
              The #1 platform to bridge the gap between citizens and administration. Professional, Secure, and Efficient.
            </p>
            <Link 
                to="/complaint" 
                style={styles.button}
                onMouseOver={(e) => {
                    e.target.style.transform = 'translateY(-3px)';
                    e.target.style.boxShadow = '0 20px 40px rgba(16, 185, 129, 0.4)';
                }}
                onMouseOut={(e) => {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = '0 15px 30px rgba(16, 185, 129, 0.3)';
                }}
            >
                Submit New Grievance
            </Link>
            
            <div style={{maxWidth: '100%', width: '300px', margin: '40px auto 0'}}>
              <Slider {...settings}>
                <div><h4 style={{color: '#fff', fontWeight: '500'}}>Verified tracking IDs</h4></div>
                <div><h4 style={{color: '#fff', fontWeight: '500'}}>Direct routing</h4></div>
                <div><h4 style={{color: '#fff', fontWeight: '500'}}>Secured with reCAPTCHA</h4></div>
              </Slider>
            </div>
          </div>
        </section>

        {/* STATS SECTION */}
        <section className="stats-container" style={{
            padding: '80px 20px', 
            display: 'flex', 
            justifyContent: 'center', 
            gap: '60px', 
            flexWrap: 'wrap', 
            backgroundColor: 'rgba(var(--accent-rgb), 0.05)'
        }}>
          <div style={{textAlign: 'center', minWidth: '150px'}}>
            <h2 style={styles.statNumber}>1,200+</h2>
            <p style={{fontWeight: '700', color: 'var(--text-muted)', fontSize: '14px'}}>Complaints Resolved</p>
          </div>
          <div style={{textAlign: 'center', minWidth: '150px'}}>
            <h2 style={styles.statNumber}>4.9/5</h2>
            <p style={{fontWeight: '700', color: 'var(--text-muted)', fontSize: '14px'}}>User Satisfaction</p>
          </div>
          <div style={{textAlign: 'center', minWidth: '150px'}}>
            <h2 style={styles.statNumber}>24hrs</h2>
            <p style={{fontWeight: '700', color: 'var(--text-muted)', fontSize: '14px'}}>Avg. Response Time</p>
          </div>
        </section>

        {/* CATEGORIES SECTION */}
        <section style={styles.categorySection}>
          <h2 style={{fontFamily: "'Montserrat', sans-serif", fontSize: 'clamp(28px, 5vw, 42px)', fontWeight: '900', color: 'var(--text-main)'}}>How can we help?</h2>
          <p style={{fontSize: 'clamp(14px, 3vw, 18px)', color: 'var(--text-muted)', marginBottom: '40px'}}>Select a category to route your grievance.</p>
          
          <div style={styles.grid}>
            {CATEGORIES_DATA.map((cat, i) => (
              <div 
                key={i} 
                className="category-card"
                style={styles.categoryCard} 
                onMouseEnter={(e) => {
                  if (window.innerWidth > 768) {
                    e.currentTarget.style.transform = 'translateY(-12px) rotateY(5deg)';
                    e.currentTarget.style.borderColor = 'var(--accent)';
                  }
                }} 
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0) rotateY(0deg)';
                  e.currentTarget.style.borderColor = 'var(--border-color)';
                }}
              >
                <span style={styles.iconWrapper}>{cat.icon}</span>
                <h3 style={{fontSize: '20px', color: 'var(--text-main)', marginBottom: '10px', fontWeight: '700'}}>{cat.title}</h3>
                <p style={{color: 'var(--text-muted)', fontSize: '14px', lineHeight: '1.5'}}>{cat.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* COMMITMENT SECTION */}
        <section style={styles.commitmentSection}>
            <h2 style={{fontFamily: "'Montserrat', sans-serif", fontSize: 'clamp(28px, 5vw, 42px)', fontWeight: '800', color: 'inherit', marginBottom: '20px'}}>Our Commitment</h2>
            <p style={{maxWidth: '800px', margin: '0 auto', fontSize: 'clamp(16px, 3vw, 19px)', opacity: 0.9, lineHeight: '1.8'}}>
                FIXIT is more than a portal; it is a promise of accountability. We leverage technology to ensure every citizen experiences the excellence they deserve.
            </p>
        </section>

        <footer style={{ padding: '40px 20px', textAlign: 'center', borderTop: '1px solid var(--border-color)' }}>
          <p style={{ fontSize: '14px', color: 'var(--text-muted)', fontWeight: '600' }}>
            © 2026 FIXIT | CMS Portal. Dedicated to community excellence.
          </p>
        </footer>
      </div>
    </div>
  );
}

export default Home;