import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';

const styles = {
  container: { 
    maxWidth: '700px', 
    margin: '40px auto', 
    padding: '40px', 
    backgroundColor: 'var(--card-bg)', // Variable
    borderRadius: '16px', 
    boxShadow: '0 15px 35px rgba(0, 0, 0, 0.1)', 
    border: '1px solid var(--border-color)', // Variable
    transition: 'all 0.4s ease' 
  },
  header: { textAlign: 'center', color: 'var(--accent)', marginBottom: '10px', fontSize: '28px', fontWeight: '800' },
  subHeader: { textAlign: 'center', color: 'var(--text-muted)', marginBottom: '30px', fontSize: '15px' },
  formGroup: { marginBottom: '25px', position: 'relative' },
  label: { 
    display: 'block', 
    marginBottom: '8px', 
    fontSize: '12px', 
    fontWeight: '700', 
    color: 'var(--text-main)', // Variable
    textTransform: 'uppercase', 
    letterSpacing: '0.5px' 
  },
  input: { 
    width: '100%', 
    padding: '14px', 
    fontSize: '16px', 
    borderRadius: '8px', 
    border: '2px solid var(--border-color)', // Variable
    boxSizing: 'border-box', 
    outline: 'none', 
    transition: 'all 0.3s ease', 
    backgroundColor: 'var(--bg-primary)', // Variable
    color: 'var(--text-main)' // Variable
  },
  button: { 
    width: '100%', 
    padding: '16px', 
    fontSize: '17px', 
    fontWeight: 'bold', 
    borderRadius: '8px', 
    border: 'none', 
    backgroundColor: 'var(--accent)', // Variable
    color: '#fff', 
    cursor: 'pointer', 
    marginTop: '20px', 
    boxShadow: '0 4px 12px rgba(39, 174, 96, 0.3)', 
    transition: 'all 0.3s' 
  },
  modalOverlay: { 
    position: 'fixed', 
    top: 0, 
    left: 0, 
    width: '100%', 
    height: '100%', 
    backgroundColor: 'rgba(0,0,0,0.8)', 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    zIndex: 2000, 
    backdropFilter: 'blur(8px)' 
  },
  modalContent: { 
    backgroundColor: 'var(--card-bg)', // Variable
    padding: '40px', 
    borderRadius: '24px', 
    textAlign: 'center', 
    maxWidth: '450px', 
    boxShadow: '0 20px 40px rgba(0,0,0,0.4)', 
    border: '1px solid var(--border-color)' 
  },
  ticketBox: { 
    backgroundColor: 'rgba(39, 174, 96, 0.1)', 
    border: '2px dashed var(--accent)', 
    padding: '20px', 
    margin: '20px 0', 
    fontSize: '32px', 
    fontWeight: 'bold', 
    color: 'var(--accent)', 
    borderRadius: '12px' 
  }
};

const TS_DISTRICTS = ["Hyderabad", "Rangareddy", "Medchal-Malkajgiri", "Warangal", "Nizamabad", "Khammam", "Karimnagar","Peddapalli", "Mahabubnagar", "Sangareddy", "Nalgonda", "Suryapet"];

const CATEGORIES = [
  { val: "Potholes", label: "Road Damage / Potholes" },
  { val: "Streetlight", label: "Streetlight Outage" },
  { val: "Water", label: "Water Leakage / Pipe Burst" },
  { val: "Drainage", label: "Drainage Overflow" },
  { val: "Waste", label: "Illegal Garbage Dumping" },
  { val: "Electricity", label: "Power Transformer Issue" }
];

function Complaint() {
  const navigate = useNavigate();
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [formData, setFormData] = useState({ name: '', address: '', zone: '', complaintType: '', phoneNumber: '', emailAddress: '' });
  const [showModal, setShowModal] = useState(false);
  const [generatedId, setGeneratedId] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!executeRecaptcha) {
      alert("ReCAPTCHA not yet available. Please wait.");
      return;
    }
    setIsSubmitting(true);

    try {
      const token = await executeRecaptcha('submit_complaint');
      const payload = {
        name: formData.name,
        address: formData.address,
        zone: formData.zone,
        type: formData.complaintType,
        phone: formData.phoneNumber,
        email: formData.emailAddress,
        status: 'Pending'
      };

      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/complaints/submit`, payload, {
        headers: { 'captcha-token': token }
      });

      setGeneratedId(response.data.id);
      setShowModal(true);
      setFormData({ name: '', address: '', zone: '', complaintType: '', phoneNumber: '', emailAddress: '' });
    } catch (error) {
      console.error(error);
      alert(error.response?.data || 'Submission failed. Please check your backend.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div 
      style={styles.container}
      onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
      onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
    >
      <h1 style={styles.header}>Citizen Portal</h1>
      <p style={styles.subHeader}>Telangana State Grievance Redressal System</p>
      
      <form onSubmit={handleSubmit}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Full Name</label>
          <input type="text" name="name" placeholder="Enter your full name" value={formData.name} onChange={handleChange} 
            style={styles.input} required onFocus={(e) => e.target.style.borderColor = 'var(--accent)'} onBlur={(e) => e.target.style.borderColor = 'var(--border-color)'} />
        </div>
        
        <div style={styles.formGroup}>
          <label style={styles.label}>Location Detail (House No / Landmark)</label>
          <input type="text" name="address" placeholder="e.g., Near Anurag University" value={formData.address} onChange={handleChange} 
            style={styles.input} required onFocus={(e) => e.target.style.borderColor = 'var(--accent)'} onBlur={(e) => e.target.style.borderColor = 'var(--border-color)'}/>
        </div>

        <div style={{ display: 'flex', gap: '15px' }}>
          <div style={{ ...styles.formGroup, flex: 1 }}>
            <label style={styles.label}>District</label>
            <select name="zone" value={formData.zone} onChange={handleChange} style={styles.input} required>
              <option value="" style={{backgroundColor: 'var(--card-bg)'}}>Select District</option>
              {TS_DISTRICTS.map(d => <option key={d} value={d} style={{backgroundColor: 'var(--card-bg)'}}>{d}</option>)}
            </select>
          </div>
          <div style={{ ...styles.formGroup, flex: 1 }}>
            <label style={styles.label}>Complaint Category</label>
            <select name="complaintType" value={formData.complaintType} onChange={handleChange} style={styles.input} required>
              <option value="" style={{backgroundColor: 'var(--card-bg)'}}>Select Problem</option>
              {CATEGORIES.map(c => <option key={c.val} value={c.val} style={{backgroundColor: 'var(--card-bg)'}}>{c.label}</option>)}
            </select>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '15px' }}>
          <div style={{ ...styles.formGroup, flex: 1 }}>
            <label style={styles.label}>Phone Number</label>
            <input type="tel" name="phoneNumber" placeholder="98XXXXXXXX" value={formData.phoneNumber} onChange={handleChange} style={styles.input} required />
          </div>
          <div style={{ ...styles.formGroup, flex: 1 }}>
            <label style={styles.label}>Email Address</label>
            <input type="email" name="emailAddress" placeholder="citizen@example.com" value={formData.emailAddress} onChange={handleChange} style={styles.input} required />
          </div>
        </div>

        <button type="submit" style={{ ...styles.button, opacity: isSubmitting ? 0.7 : 1 }} disabled={isSubmitting}>
          {isSubmitting ? 'Verifying & Submitting...' : 'Submit Grievance'}
        </button>
      </form>

      {showModal && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <div style={{ fontSize: '60px', marginBottom: '15px' }}>✅</div>
            <h2 style={{ color: 'var(--accent)', margin: '0' }}>Grievance Logged!</h2>
            <p style={{ color: 'var(--text-muted)', marginTop: '10px' }}>Please save your Tracking ID to monitor progress.</p>
            <div style={styles.ticketBox}>#{generatedId}</div>
            <button style={styles.button} onClick={() => navigate('/track')}>Go to Track Page</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Complaint;