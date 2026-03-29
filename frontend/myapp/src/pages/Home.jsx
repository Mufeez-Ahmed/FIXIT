import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

const styles = {
  container: {
    backgroundColor: 'var(--bg-primary)', // Linked to theme
    fontFamily: "'Inter', sans-serif",
    overflowX: 'hidden',
    transition: 'all 0.4s ease',
  },
  wrapper: {
    background: 'var(--bg-wrapper)', // Linked to theme
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
    padding: '0 20px',
    perspective: '1500px',
  },
  contentBox: {
    maxWidth: '900px',
    padding: '70px 40px',
    background: 'rgba(255, 255, 255, 0.08)',
    backdropFilter: 'blur(20px)',
    borderRadius: '40px',
    border: '1px solid rgba(255,255,255,0.2)',
    boxShadow: '0 40px 100px rgba(0,0,0,0.4)',
    transition: 'all 0.8s cubic-bezier(0.165, 0.84, 0.44, 1)',
  },
  welcomeText: {
    fontFamily: "'Montserrat', sans-serif",
    fontSize: '64px',
    fontWeight: '900',
    marginBottom: '20px',
    color: 'var(--accent)', // Linked to theme
    letterSpacing: '-2px',
    textShadow: '0 5px 15px rgba(0,0,0,0.2)',
  },
  categorySection: {
    padding: '120px 20px',
    textAlign: 'center',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
    gap: '30px',
    marginTop: '60px',
    perspective: '1200px',
  },
  categoryCard: {
    padding: '50px 40px',
    backgroundColor: 'var(--card-bg)', // Linked to theme
    borderRadius: '24px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
    border: '1px solid var(--border-color)', // Linked to theme
    transition: 'all 0.6s cubic-bezier(0.23, 1, 0.32, 1)',
    cursor: 'pointer',
    transformStyle: 'preserve-3d',
    textAlign: 'center',
  },
  iconWrapper: {
    fontSize: '40px',
    color: 'var(--accent)', // Linked to theme
    marginBottom: '25px',
    display: 'block',
  },
  button: {
    padding: '20px 50px',
    fontSize: '18px',
    backgroundColor: 'var(--accent)', // Linked to theme
    color: '#fff',
    border: 'none',
    borderRadius: '12px',
    cursor: 'pointer',
    fontWeight: '700',
    textDecoration: 'none',
    display: 'inline-block',
    marginTop: '30px',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    boxShadow: '0 15px 30px rgba(16, 185, 129, 0.3)',
    transition: 'all 0.3s ease',
  },
  statNumber: {
    color: 'var(--accent)', // Linked to theme
    fontSize: '50px', 
    fontWeight: '800', 
    marginBottom: '10px',
    fontFamily: "'Montserrat', sans-serif",
  },
  commitmentSection: {
    padding: '120px 20px', 
    textAlign: 'center', 
    background: 'var(--text-main)', // Darker in light mode, lighter in dark mode
    color: 'var(--bg-primary)', // Inverts for contrast
    transition: 'all 0.4s ease',
  }
};

const CATEGORIES_DATA = [
  { icon: "🚧", title: "Roads & Potholes", desc: "Report road damage and dangerous potholes.", val: "Potholes" },
  { icon: "💡", title: "Streetlight Outage", desc: "Fix dark zones and malfunctioning street lamps.", val: "Streetlight" },
  { icon: "🚰", title: "Water & Leaks", desc: "Report pipe bursts or water shortage issues.", val: "Water" },
  { icon: "🌊", title: "Drainage Overflow", desc: "Sewerage blockages and drainage maintenance.", val: "Drainage" },
  { icon: "🗑️", title: "Waste Management", desc: "Illegal dumping and garbage collection requests.", val: "Waste" },
  { icon: "⚡", title: "Electricity Issues", desc: "Transformer failures and frequent power cuts.", val: "Electricity" }
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
          html { scroll-behavior: smooth; }
        `}
      </style>

      <div style={styles.wrapper}>
        
        {/* HERO SECTION */}
        <section style={styles.heroSection}>
          <div 
            style={{
              ...styles.contentBox, 
              opacity: showContent ? 1 : 0, 
              transform: showContent ? 'rotateX(0deg) translateY(0)' : 'rotateX(15deg) translateY(50px)' 
            }}
          >
            <h1 style={styles.welcomeText}>Transparent Governance.</h1>
            <p style={{fontSize: '22px', marginBottom: '40px', fontWeight: '400', color: '#cbd5e1', lineHeight: '1.6'}}>
              The #1 platform to bridge the gap between citizens and administration.<br/>Professional, Secure, and Efficient.
            </p>
            <Link 
                to="/complaint" 
                style={styles.button}
                onMouseOver={(e) => {
                    e.target.style.transform = 'translateY(-5px)';
                    e.target.style.boxShadow = '0 20px 40px rgba(16, 185, 129, 0.4)';
                }}
                onMouseOut={(e) => {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = '0 15px 30px rgba(16, 185, 129, 0.3)';
                }}
            >
                Submit New Grievance
            </Link>
            
            <div style={{maxWidth: '500px', margin: '40px auto 0'}}>
              <Slider {...settings}>
                <div style={{padding: '10px'}}><h3 style={{color: '#fff'}}>Verified tracking IDs for every user</h3></div>
                <div style={{padding: '10px'}}><h3 style={{color: '#fff'}}>Direct routing to department heads</h3></div>
                <div style={{padding: '10px'}}><h3 style={{color: '#fff'}}>Secured with reCAPTCHA v3</h3></div>
              </Slider>
            </div>
          </div>
        </section>

        {/* STATS SECTION */}
        <section style={{padding: '100px 20px', display: 'flex', justifyContent: 'center', gap: '60px', flexWrap: 'wrap', backgroundColor: 'rgba(var(--accent-rgb), 0.1)'}}>
          <div style={{textAlign: 'center'}}>
            <h2 style={styles.statNumber}>1,200+</h2>
            <p style={{fontWeight: '700', color: 'var(--text-muted)'}}>Complaints Resolved</p>
          </div>
          <div style={{textAlign: 'center'}}>
            <h2 style={styles.statNumber}>4.9/5</h2>
            <p style={{fontWeight: '700', color: 'var(--text-muted)'}}>User Satisfaction</p>
          </div>
          <div style={{textAlign: 'center'}}>
            <h2 style={styles.statNumber}>24hrs</h2>
            <p style={{fontWeight: '700', color: 'var(--text-muted)'}}>Avg. Response Time</p>
          </div>
        </section>

        {/* CATEGORIES SECTION */}
        <section style={styles.categorySection}>
          <h2 style={{fontFamily: "'Montserrat', sans-serif", fontSize: '42px', fontWeight: '900', color: 'var(--text-main)', transition: 'color 0.4s'}}>How can we help you?</h2>
          <p style={{fontSize: '18px', color: 'var(--text-muted)', marginBottom: '40px', transition: 'color 0.4s'}}>Select a category to route your grievance to the expert department.</p>
          
          <div style={styles.grid}>
            {CATEGORIES_DATA.map((cat, i) => (
              <div 
                key={i} 
                style={styles.categoryCard} 
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-15px) rotateY(10deg) translateZ(50px)';
                  e.currentTarget.style.boxShadow = '0 30px 60px rgba(0,0,0,0.1)';
                  e.currentTarget.style.borderColor = 'var(--accent)';
                }} 
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0) rotateY(0deg) translateZ(0)';
                  e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.03)';
                  e.currentTarget.style.borderColor = 'var(--border-color)';
                }}
              >
                <span style={styles.iconWrapper}>{cat.icon}</span>
                <h3 style={{fontSize: '22px', color: 'var(--text-main)', marginBottom: '12px', fontWeight: '700', transition: 'color 0.4s'}}>{cat.title}</h3>
                <p style={{color: 'var(--text-muted)', fontSize: '15px', lineHeight: '1.6', transition: 'color 0.4s'}}>{cat.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* OUR COMMITMENT SECTION */}
        <section style={styles.commitmentSection}>
            <h2 style={{fontFamily: "'Montserrat', sans-serif", fontSize: '42px', fontWeight: '800', color: 'inherit', marginBottom: '20px'}}>Our Commitment</h2>
            <p style={{maxWidth: '700px', margin: '0 auto', fontSize: '19px', opacity: 0.9, lineHeight: '1.8'}}>
                FIXIT is more than a portal; it is a promise of accountability. 
                We leverage technology to ensure every citizen in the community experiences 
                the excellence they deserve.
            </p>
        </section>

        <footer style={{ padding: '60px 20px', textAlign: 'center', borderTop: '1px solid var(--border-color)', transition: 'all 0.4s ease' }}>
          <p style={{ fontSize: '15px', color: 'var(--text-muted)', fontWeight: '700' }}>
            © 2026 FIXIT | CMS Portal. Dedicated to community excellence.
          </p>
        </footer>
      </div>
    </div>
  );
}

export default Home;