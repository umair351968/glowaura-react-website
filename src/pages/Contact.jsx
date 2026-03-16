// src/pages/Contact.jsx
import React, { useState } from 'react';
import { 
  Mail, Phone, MapPin, Clock, Send, MessageCircle, 
  Instagram, Facebook, Twitter, Youtube, Heart,
  Headphones, Sparkles, CheckCircle, AlertCircle
} from 'lucide-react';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState({ submitted: false, success: false, message: '' });
  const [activeFaq, setActiveFaq] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate form submission
    setFormStatus({
      submitted: true,
      success: true,
      message: 'Thank you for reaching out! We\'ll get back to you within 24 hours.'
    });
    setFormData({ name: '', email: '', subject: '', message: '' });
    
    // Reset status after 5 seconds
    setTimeout(() => {
      setFormStatus({ submitted: false, success: false, message: '' });
    }, 5000);
  };

  // Contact information cards
  const contactInfo = [
    {
      id: 1,
      icon: <Mail size={24} />,
      title: "Email Us",
      details: ["support@glowaura.com", "press@glowaura.com"],
      action: "Send a message",
      color: "#b76e79"
    },
    {
      id: 2,
      icon: <Phone size={24} />,
      title: "Call Us",
      details: ["+1 (800) 555-0123", "+1 (800) 555-4567"],
      action: "Mon-Fri, 9am-6pm EST",
      color: "#d4af37"
    },
    {
      id: 3,
      icon: <MapPin size={24} />,
      title: "Visit Us",
      details: ["123 Beauty Avenue", "New York, NY 10001"],
      action: "Get directions",
      color: "#8a6d8b"
    },
    {
      id: 4,
      icon: <Clock size={24} />,
      title: "Business Hours",
      details: ["Monday - Friday: 9am - 6pm", "Saturday: 10am - 4pm"],
      action: "Closed Sunday",
      color: "#c49a9c"
    }
  ];

  // FAQ cards
  const faqs = [
    {
      id: 1,
      question: "How long does shipping take?",
      answer: "Standard shipping takes 3-5 business days within the US. Express shipping is available for 1-2 business days."
    },
    {
      id: 2,
      question: "What is your return policy?",
      answer: "We offer a 30-day return policy for unused products in original packaging. Visit our Returns page for more details."
    },
    {
      id: 3,
      question: "Do you ship internationally?",
      answer: "Yes! We ship to over 30 countries. International shipping typically takes 7-14 business days."
    },
    {
      id: 4,
      question: "Are your products cruelty-free?",
      answer: "Absolutely! All GlowAura products are 100% cruelty-free and never tested on animals."
    },
    {
      id: 5,
      question: "How can I track my order?",
      answer: "Once your order ships, you'll receive a tracking number via email. You can also track orders in your account dashboard."
    },
    {
      id: 6,
      question: "Do you offer samples?",
      answer: "Yes! We include free samples with every order over $50. You can also purchase sample sets in our shop."
    }
  ];

  // Support team cards
  const supportTeam = [
    {
      id: 1,
      name: "Jessica Lee",
      role: "Customer Support Lead",
      image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg",
      expertise: "Orders & Shipping",
      icon: <Headphones size={18} color="#b76e79" />
    },
    {
      id: 2,
      name: "Amanda Chen",
      role: "Beauty Consultant",
      image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg",
      expertise: "Product Recommendations",
      icon: <Sparkles size={18} color="#b76e79" />
    },
    {
      id: 3,
      name: "Michelle Rodriguez",
      role: "Returns Specialist",
      image: "https://images.pexels.com/photos/1036622/pexels-photo-1036622.jpeg",
      expertise: "Returns & Refunds",
      icon: <Heart size={18} color="#b76e79" />
    },
    {
      id: 4,
      name: "Sarah Williams",
      role: "VIP Support",
      image: "https://images.pexels.com/photos/712513/pexels-photo-712513.jpeg",
      expertise: "Loyalty Program",
      icon: <MessageCircle size={18} color="#b76e79" />
    }
  ];

  return (
    <div style={styles.container}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Poppins:wght@300;400;500;600&display=swap');
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slideIn {
          from { transform: translateX(-20px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
      `}</style>

      {/* Hero Section */}
      <div style={styles.hero}>
        <h1 style={styles.heroTitle}>Get in Touch</h1>
        <p style={styles.heroSubtitle}>We'd love to hear from you</p>
      </div>

      {/* Contact Info Cards */}
      <div style={styles.cardGrid}>
        {contactInfo.map(info => (
          <div key={info.id} style={styles.infoCard}>
            <div style={{...styles.infoIcon, color: info.color}}>
              {info.icon}
            </div>
            <h3 style={styles.infoTitle}>{info.title}</h3>
            {info.details.map((detail, idx) => (
              <p key={idx} style={styles.infoDetail}>{detail}</p>
            ))}
            <span style={{...styles.infoAction, color: info.color}}>{info.action}</span>
          </div>
        ))}
      </div>

      {/* Form and Map Section */}
      <div style={styles.formMapSection}>
        {/* Contact Form Card */}
        <div style={styles.formCard}>
          <h2 style={styles.formTitle}>Send us a Message</h2>
          <p style={styles.formSubtitle}>We'll respond within 24 hours</p>
          
          {formStatus.submitted && (
            <div style={{
              ...styles.alert,
              backgroundColor: formStatus.success ? '#e8f5e9' : '#ffebee',
              color: formStatus.success ? '#2e7d32' : '#c62828',
              borderColor: formStatus.success ? '#a5d6a7' : '#ef9a9a'
            }}>
              {formStatus.success ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
              <span>{formStatus.message}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} style={styles.form}>
            <div style={styles.formRow}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Your Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  style={styles.input}
                  required
                />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  style={styles.input}
                  required
                />
              </div>
            </div>
            
            <div style={styles.formGroup}>
              <label style={styles.label}>Subject</label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="What is this about?"
                style={styles.input}
                required
              />
            </div>
            
            <div style={styles.formGroup}>
              <label style={styles.label}>Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="How can we help you?"
                style={styles.textarea}
                rows="5"
                required
              />
            </div>
            
            <button type="submit" style={styles.submitBtn}>
              <Send size={18} />
              Send Message
            </button>
          </form>
        </div>

        {/* Map Card */}
        <div style={styles.mapCard}>
          <h2 style={styles.formTitle}>Visit Our Store</h2>
          <p style={styles.formSubtitle}>Come say hello at our flagship location</p>
          
          <div style={styles.mapContainer}>
            <img 
              src="https://images.pexels.com/photos/4484072/pexels-photo-4484072.jpeg"
              alt="Store Location"
              style={styles.mapImage}
            />
            <div style={styles.mapOverlay}>
              <MapPin size={24} color="white" />
              <span style={styles.mapAddress}>123 Beauty Avenue, New York</span>
            </div>
          </div>
          
          <div style={styles.storeHours}>
            <Clock size={18} color="#b76e79" />
            <div>
              <p style={styles.hoursText}>Monday - Friday: 9am - 8pm</p>
              <p style={styles.hoursText}>Saturday: 10am - 6pm</p>
              <p style={styles.hoursText}>Sunday: 12pm - 5pm</p>
            </div>
          </div>
        </div>
      </div>

      {/* Support Team Section Title */}
      <h2 style={styles.sectionTitle}>Our Support Team</h2>

      {/* Support Team Cards */}
      <div style={styles.cardGrid}>
        {supportTeam.map(member => (
          <div key={member.id} style={styles.teamCard}>
            <img src={member.image} alt={member.name} style={styles.teamImage} />
            <div style={styles.teamIcon}>{member.icon}</div>
            <h3 style={styles.teamName}>{member.name}</h3>
            <p style={styles.teamRole}>{member.role}</p>
            <span style={styles.teamExpertise}>{member.expertise}</span>
          </div>
        ))}
      </div>

      {/* FAQ Section Title */}
      <h2 style={styles.sectionTitle}>Frequently Asked Questions</h2>

      {/* FAQ Cards */}
      <div style={styles.faqGrid}>
        {faqs.map(faq => (
          <div 
            key={faq.id} 
            style={styles.faqCard}
            onClick={() => setActiveFaq(activeFaq === faq.id ? null : faq.id)}
          >
            <div style={styles.faqQuestion}>
              <span style={styles.faqNumber}>0{faq.id}</span>
              <h3 style={styles.faqQuestionText}>{faq.question}</h3>
            </div>
            {activeFaq === faq.id && (
              <div style={styles.faqAnswer}>
                <p>{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Social Media Cards */}
      <div style={styles.socialSection}>
        <h2 style={styles.sectionTitle}>Connect With Us</h2>
        <div style={styles.socialGrid}>
          <a href="#" style={styles.socialCard}>
            <Instagram size={24} color="#b76e79" />
            <span>Instagram</span>
            <span style={styles.socialHandle}>@glowaura</span>
          </a>
          <a href="#" style={styles.socialCard}>
            <Facebook size={24} color="#b76e79" />
            <span>Facebook</span>
            <span style={styles.socialHandle}>/glowaura</span>
          </a>
          <a href="#" style={styles.socialCard}>
            <Twitter size={24} color="#b76e79" />
            <span>Twitter</span>
            <span style={styles.socialHandle}>@glowaura</span>
          </a>
          <a href="#" style={styles.socialCard}>
            <Youtube size={24} color="#b76e79" />
            <span>YouTube</span>
            <span style={styles.socialHandle}>/glowaura</span>
          </a>
        </div>
      </div>

      {/* Simple Footer Note */}
      <div style={styles.footerNote}>
        <p>✨ We typically respond within 24 hours ✨</p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    background: '#fff9f9',
    minHeight: '100vh',
    fontFamily: "'Poppins', sans-serif",
    padding: '2rem 5%',
  },
  hero: {
    textAlign: 'center',
    marginBottom: '3rem',
    animation: 'fadeIn 0.8s ease',
  },
  heroTitle: {
    fontFamily: "'Playfair Display', serif",
    fontSize: '3rem',
    color: '#b76e79',
    marginBottom: '0.5rem',
    fontWeight: 600,
  },
  heroSubtitle: {
    fontSize: '1.1rem',
    color: '#666',
  },
  cardGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
    gap: '2rem',
    marginBottom: '3rem',
  },
  infoCard: {
    background: 'white',
    padding: '2rem',
    borderRadius: '20px',
    textAlign: 'center',
    border: '1px solid rgba(183, 110, 121, 0.1)',
    boxShadow: '0 4px 15px rgba(183, 110, 121, 0.05)',
    transition: 'all 0.3s ease',
    ':hover': {
      transform: 'translateY(-5px)',
      boxShadow: '0 8px 25px rgba(183, 110, 121, 0.1)',
    },
  },
  infoIcon: {
    marginBottom: '1rem',
  },
  infoTitle: {
    fontFamily: "'Playfair Display', serif",
    fontSize: '1.2rem',
    color: '#b76e79',
    marginBottom: '1rem',
    fontWeight: 600,
  },
  infoDetail: {
    fontSize: '0.9rem',
    color: '#666',
    lineHeight: 1.6,
    marginBottom: '0.2rem',
  },
  infoAction: {
    display: 'inline-block',
    marginTop: '1rem',
    fontSize: '0.85rem',
    fontWeight: 500,
    cursor: 'pointer',
  },
  formMapSection: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '2rem',
    marginBottom: '3rem',
  },
  formCard: {
    background: 'white',
    padding: '2.5rem',
    borderRadius: '24px',
    border: '1px solid rgba(183, 110, 121, 0.1)',
    boxShadow: '0 4px 20px rgba(183, 110, 121, 0.08)',
  },
  formTitle: {
    fontFamily: "'Playfair Display', serif",
    fontSize: '1.5rem',
    color: '#b76e79',
    marginBottom: '0.5rem',
  },
  formSubtitle: {
    fontSize: '0.9rem',
    color: '#999',
    marginBottom: '2rem',
  },
  alert: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '1rem',
    borderRadius: '12px',
    marginBottom: '1.5rem',
    border: '1px solid',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
  },
  formRow: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '1rem',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  label: {
    fontSize: '0.9rem',
    color: '#5a4e4a',
    fontWeight: 500,
  },
  input: {
    padding: '0.8rem 1rem',
    borderRadius: '12px',
    border: '1px solid rgba(183, 110, 121, 0.2)',
    fontSize: '0.95rem',
    outline: 'none',
    transition: 'all 0.3s ease',
    ':focus': {
      borderColor: '#b76e79',
      boxShadow: '0 0 0 3px rgba(183, 110, 121, 0.1)',
    },
  },
  textarea: {
    padding: '0.8rem 1rem',
    borderRadius: '12px',
    border: '1px solid rgba(183, 110, 121, 0.2)',
    fontSize: '0.95rem',
    outline: 'none',
    resize: 'vertical',
    fontFamily: "'Poppins', sans-serif",
    ':focus': {
      borderColor: '#b76e79',
      boxShadow: '0 0 0 3px rgba(183, 110, 121, 0.1)',
    },
  },
  submitBtn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    padding: '1rem',
    background: 'linear-gradient(135deg, #b76e79, #d4af37)',
    color: 'white',
    border: 'none',
    borderRadius: '50px',
    fontSize: '1rem',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    marginTop: '1rem',
    ':hover': {
      transform: 'translateY(-2px)',
      boxShadow: '0 8px 20px rgba(183, 110, 121, 0.3)',
    },
  },
  mapCard: {
    background: 'white',
    padding: '2.5rem',
    borderRadius: '24px',
    border: '1px solid rgba(183, 110, 121, 0.1)',
    boxShadow: '0 4px 20px rgba(183, 110, 121, 0.08)',
  },
  mapContainer: {
    position: 'relative',
    borderRadius: '16px',
    overflow: 'hidden',
    marginBottom: '1.5rem',
    height: '200px',
  },
  mapImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  mapOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)',
    color: 'white',
    padding: '1.5rem 1rem 1rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  mapAddress: {
    fontSize: '0.9rem',
    fontWeight: 500,
  },
  storeHours: {
    display: 'flex',
    gap: '1rem',
    padding: '1rem',
    background: '#fce4e8',
    borderRadius: '12px',
  },
  hoursText: {
    fontSize: '0.9rem',
    color: '#5a4e4a',
    lineHeight: 1.6,
  },
  sectionTitle: {
    fontFamily: "'Playfair Display', serif",
    fontSize: '2rem',
    color: '#b76e79',
    textAlign: 'center',
    marginBottom: '2rem',
    marginTop: '3rem',
  },
  teamCard: {
    background: 'white',
    padding: '2rem',
    borderRadius: '20px',
    textAlign: 'center',
    border: '1px solid rgba(183, 110, 121, 0.1)',
    boxShadow: '0 4px 15px rgba(183, 110, 121, 0.05)',
    position: 'relative',
  },
  teamImage: {
    width: '100px',
    height: '100px',
    borderRadius: '50%',
    objectFit: 'cover',
    margin: '0 auto 1rem',
    border: '3px solid #fce4e8',
  },
  teamIcon: {
    position: 'absolute',
    top: '1rem',
    right: '1rem',
    background: 'white',
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
  },
  teamName: {
    fontSize: '1.1rem',
    color: '#b76e79',
    marginBottom: '0.3rem',
    fontWeight: 600,
  },
  teamRole: {
    fontSize: '0.85rem',
    color: '#666',
    marginBottom: '0.5rem',
  },
  teamExpertise: {
    display: 'inline-block',
    background: '#fce4e8',
    color: '#b76e79',
    padding: '0.3rem 1rem',
    borderRadius: '30px',
    fontSize: '0.75rem',
    fontWeight: 600,
  },
  faqGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
    gap: '1.5rem',
    marginBottom: '3rem',
  },
  faqCard: {
    background: 'white',
    padding: '1.5rem',
    borderRadius: '16px',
    border: '1px solid rgba(183, 110, 121, 0.1)',
    boxShadow: '0 4px 15px rgba(183, 110, 121, 0.05)',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    ':hover': {
      borderColor: '#b76e79',
    },
  },
  faqQuestion: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  },
  faqNumber: {
    fontSize: '1.2rem',
    fontWeight: 600,
    color: '#d4af37',
    opacity: 0.5,
  },
  faqQuestionText: {
    fontSize: '1rem',
    color: '#5a4e4a',
    fontWeight: 500,
  },
  faqAnswer: {
    marginTop: '1rem',
    paddingTop: '1rem',
    borderTop: '1px dashed rgba(183, 110, 121, 0.2)',
    color: '#666',
    fontSize: '0.9rem',
    lineHeight: 1.6,
  },
  socialSection: {
    marginBottom: '3rem',
  },
  socialGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '1.5rem',
  },
  socialCard: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '2rem',
    background: 'white',
    borderRadius: '16px',
    border: '1px solid rgba(183, 110, 121, 0.1)',
    boxShadow: '0 4px 15px rgba(183, 110, 121, 0.05)',
    textDecoration: 'none',
    color: '#5a4e4a',
    transition: 'all 0.3s ease',
    ':hover': {
      transform: 'translateY(-5px)',
      boxShadow: '0 8px 25px rgba(183, 110, 121, 0.1)',
    },
  },
  socialHandle: {
    fontSize: '0.85rem',
    color: '#b76e79',
    fontWeight: 500,
  },
  footerNote: {
    textAlign: 'center',
    marginTop: '4rem',
    padding: '2rem 0',
    color: '#b76e79',
    fontSize: '1rem',
    borderTop: '1px solid rgba(183, 110, 121, 0.1)',
  },
};

export default Contact;