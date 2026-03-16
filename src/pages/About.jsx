// src/pages/About.jsx
import React from 'react';
import { Star, Award, Heart, Shield, Truck, Leaf, Sparkles, Gem } from 'lucide-react';

function About() {
  // Team/Founder cards
  const teamMembers = [
    {
      id: 1,
      name: "Sophia Reynolds",
      role: "Founder & Creative Director",
      image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg",
      bio: "Former beauty editor with 15 years of industry experience.",
      icon: <Sparkles size={20} color="#b76e79" />
    },
    {
      id: 2,
      name: "Isabella Chen",
      role: "Head of Product Development",
      image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg",
      bio: "Cosmetic chemist passionate about clean ingredients.",
      icon: <Gem size={20} color="#b76e79" />
    },
    {
      id: 3,
      name: "Olivia Martinez",
      role: "Brand Ambassador",
      image: "https://images.pexels.com/photos/1036622/pexels-photo-1036622.jpeg",
      bio: "Makeup artist to the stars with 10+ years of experience.",
      icon: <Star size={20} color="#b76e79" />
    },
    {
      id: 4,
      name: "Emma Williams",
      role: "Customer Experience Lead",
      image: "https://images.pexels.com/photos/712513/pexels-photo-712513.jpeg",
      bio: "Dedicated to making every customer feel special.",
      icon: <Heart size={20} color="#b76e79" />
    }
  ];

  // Brand values cards
  const values = [
    {
      id: 1,
      title: "Clean Beauty",
      description: "Formulated without parabens, sulfates, or harmful chemicals.",
      icon: <Leaf size={32} color="#b76e79" />
    },
    {
      id: 2,
      title: "Cruelty Free",
      description: "Never tested on animals. Certified by PETA.",
      icon: <Heart size={32} color="#b76e79" />
    },
    {
      id: 3,
      title: "Premium Quality",
      description: "Sourced from the finest ingredients around the world.",
      icon: <Award size={32} color="#b76e79" />
    },
    {
      id: 4,
      title: "Free Shipping",
      description: "On all orders over $50. Fast and reliable delivery.",
      icon: <Truck size={32} color="#b76e79" />
    }
  ];

  // Milestone cards
  const milestones = [
    {
      id: 1,
      year: "2020",
      title: "The Beginning",
      description: "GlowAura Beauty was founded with a simple mission: create luxury cosmetics that are good for you and the planet.",
      image: "https://images.pexels.com/photos/3768916/pexels-photo-3768916.jpeg"
    },
    {
      id: 2,
      year: "2021",
      title: "First Collection",
      description: "Launched our debut lip collection, which sold out within 48 hours and received rave reviews.",
      image: "https://images.pexels.com/photos/2533266/pexels-photo-2533266.jpeg"
    },
    {
      id: 3,
      year: "2022",
      title: "Expansion",
      description: "Expanded to skincare and eye makeup, earning a spot in major beauty publications.",
      image: "https://images.pexels.com/photos/6621367/pexels-photo-6621367.jpeg"
    },
    {
      id: 4,
      year: "2023",
      title: "Global Reach",
      description: "Now shipping to over 30 countries with a community of 100K+ happy customers.",
      image: "https://images.pexels.com/photos/4620873/pexels-photo-4620873.jpeg"
    },
    {
      id: 5,
      year: "2024",
      title: "Award Winning",
      description: "Recognized as 'Best Clean Beauty Brand' by Beauty Awards 2024.",
      image: "https://images.pexels.com/photos/10390405/pexels-photo-10390405.jpeg"
    }
  ];

  // Testimonial cards
  const testimonials = [
    {
      id: 1,
      name: "Jessica Parker",
      role: "Beauty Editor",
      text: "The quality of GlowAura products is unmatched. Their lipsticks are my absolute favorite.",
      rating: 5,
      image: "https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg"
    },
    {
      id: 2,
      name: "Michelle Lee",
      role: "Skincare Enthusiast",
      text: "I've tried countless serums, but the Vitamin C one from GlowAura actually transformed my skin.",
      rating: 5,
      image: "https://images.pexels.com/photos/712513/pexels-photo-712513.jpeg"
    },
    {
      id: 3,
      name: "Amanda Clark",
      role: "Makeup Artist",
      text: "I use GlowAura products on all my celebrity clients. They're photogenic and long-lasting.",
      rating: 5,
      image: "https://images.pexels.com/photos/1036622/pexels-photo-1036622.jpeg"
    },
    {
      id: 4,
      name: "Rachel Green",
      role: "Loyal Customer",
      text: "The customer service is exceptional and the products are worth every penny.",
      rating: 5,
      image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg"
    }
  ];

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <span key={i} style={{color: i < rating ? '#d4af37' : '#ddd'}}>★</span>
      );
    }
    return stars;
  };

  return (
    <div style={styles.container}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Poppins:wght@300;400;500;600&display=swap');
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* Hero Section - Simple */}
      <div style={styles.hero}>
        <h1 style={styles.heroTitle}>About GlowAura</h1>
        <p style={styles.heroSubtitle}>Luxury beauty, thoughtfully crafted</p>
      </div>

      {/* Story Card */}
      <div style={styles.storyCard}>
        <div style={styles.storyContent}>
          <span style={styles.storyTag}>Our Story</span>
          <h2 style={styles.storyTitle}>Beauty with a Purpose</h2>
          <p style={styles.storyText}>
            GlowAura Beauty was born from a simple idea: that luxury cosmetics should be 
            good for you, good for the planet, and accessible to everyone. What started 
            as a small collection of lip products has grown into a comprehensive beauty 
            brand loved by thousands worldwide.
          </p>
          <p style={styles.storyText}>
            Every product is meticulously formulated with clean, high-performance ingredients 
            that deliver visible results without compromise. We believe that when you look 
            good, you feel good—and that's the true essence of beauty.
          </p>
        </div>
        <img 
          src="https://images.pexels.com/photos/3768916/pexels-photo-3768916.jpeg" 
          alt="GlowAura Studio" 
          style={styles.storyImage}
        />
      </div>

      {/* Values Section Title */}
      <h2 style={styles.sectionTitle}>Our Values</h2>

      {/* Values Cards */}
      <div style={styles.cardGrid}>
        {values.map(value => (
          <div key={value.id} style={styles.card}>
            <div style={styles.cardIcon}>{value.icon}</div>
            <h3 style={styles.cardTitle}>{value.title}</h3>
            <p style={styles.cardText}>{value.description}</p>
          </div>
        ))}
      </div>

      {/* Team Section Title */}
      <h2 style={styles.sectionTitle}>Meet the Team</h2>

      {/* Team Cards */}
      <div style={styles.cardGrid}>
        {teamMembers.map(member => (
          <div key={member.id} style={styles.profileCard}>
            <img src={member.image} alt={member.name} style={styles.profileImage} />
            <div style={styles.profileIcon}>{member.icon}</div>
            <h3 style={styles.cardTitle}>{member.name}</h3>
            <p style={styles.profileRole}>{member.role}</p>
            <p style={styles.profileBio}>{member.bio}</p>
          </div>
        ))}
      </div>

      {/* Milestones Section Title */}
      <h2 style={styles.sectionTitle}>Our Journey</h2>

      {/* Milestone Cards */}
      <div style={styles.cardGrid}>
        {milestones.map(milestone => (
          <div key={milestone.id} style={styles.milestoneCard}>
            <img src={milestone.image} alt={milestone.title} style={styles.milestoneImage} />
            <div style={styles.milestoneYear}>{milestone.year}</div>
            <h3 style={styles.cardTitle}>{milestone.title}</h3>
            <p style={styles.cardText}>{milestone.description}</p>
          </div>
        ))}
      </div>

      {/* Testimonials Section Title */}
      <h2 style={styles.sectionTitle}>Kind Words</h2>

      {/* Testimonial Cards */}
      <div style={styles.cardGrid}>
        {testimonials.map(testimonial => (
          <div key={testimonial.id} style={styles.testimonialCard}>
            <div style={styles.testimonialHeader}>
              <img src={testimonial.image} alt={testimonial.name} style={styles.testimonialImage} />
              <div>
                <h3 style={styles.testimonialName}>{testimonial.name}</h3>
                <p style={styles.testimonialRole}>{testimonial.role}</p>
              </div>
            </div>
            <div style={styles.testimonialRating}>
              {renderStars(testimonial.rating)}
            </div>
            <p style={styles.testimonialText}>"{testimonial.text}"</p>
          </div>
        ))}
      </div>

      {/* Simple Footer Note */}
      <div style={styles.footerNote}>
        <p>✨ Crafted with love in small batches ✨</p>
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
  storyCard: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '3rem',
    background: 'white',
    borderRadius: '24px',
    overflow: 'hidden',
    marginBottom: '4rem',
    boxShadow: '0 4px 20px rgba(183, 110, 121, 0.08)',
    border: '1px solid rgba(183, 110, 121, 0.1)',
  },
  storyContent: {
    padding: '3rem',
  },
  storyTag: {
    display: 'inline-block',
    background: '#fce4e8',
    color: '#b76e79',
    padding: '0.3rem 1rem',
    borderRadius: '30px',
    fontSize: '0.8rem',
    fontWeight: 600,
    marginBottom: '1rem',
  },
  storyTitle: {
    fontFamily: "'Playfair Display', serif",
    fontSize: '2rem',
    color: '#b76e79',
    marginBottom: '1.5rem',
  },
  storyText: {
    fontSize: '1rem',
    color: '#666',
    lineHeight: 1.8,
    marginBottom: '1rem',
  },
  storyImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  sectionTitle: {
    fontFamily: "'Playfair Display', serif",
    fontSize: '2rem',
    color: '#b76e79',
    textAlign: 'center',
    marginBottom: '2rem',
    marginTop: '3rem',
  },
  cardGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '2rem',
    marginBottom: '2rem',
  },
  card: {
    background: 'white',
    padding: '2rem',
    borderRadius: '20px',
    textAlign: 'center',
    transition: 'all 0.3s ease',
    border: '1px solid rgba(183, 110, 121, 0.1)',
    boxShadow: '0 4px 15px rgba(183, 110, 121, 0.05)',
  },
  cardIcon: {
    marginBottom: '1.5rem',
  },
  cardTitle: {
    fontFamily: "'Playfair Display', serif",
    fontSize: '1.2rem',
    color: '#b76e79',
    marginBottom: '0.8rem',
    fontWeight: 600,
  },
  cardText: {
    fontSize: '0.9rem',
    color: '#666',
    lineHeight: 1.6,
  },
  profileCard: {
    background: 'white',
    borderRadius: '20px',
    overflow: 'hidden',
    textAlign: 'center',
    padding: '2rem',
    border: '1px solid rgba(183, 110, 121, 0.1)',
    boxShadow: '0 4px 15px rgba(183, 110, 121, 0.05)',
    position: 'relative',
  },
  profileImage: {
    width: '120px',
    height: '120px',
    borderRadius: '50%',
    objectFit: 'cover',
    margin: '0 auto 1rem',
    border: '3px solid #fce4e8',
  },
  profileIcon: {
    position: 'absolute',
    top: '1rem',
    right: '1rem',
    background: 'white',
    width: '36px',
    height: '36px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
  },
  profileRole: {
    fontSize: '0.85rem',
    color: '#b76e79',
    marginBottom: '0.5rem',
    fontWeight: 500,
  },
  profileBio: {
    fontSize: '0.85rem',
    color: '#666',
    lineHeight: 1.5,
  },
  milestoneCard: {
    background: 'white',
    borderRadius: '20px',
    overflow: 'hidden',
    border: '1px solid rgba(183, 110, 121, 0.1)',
    boxShadow: '0 4px 15px rgba(183, 110, 121, 0.05)',
  },
  milestoneImage: {
    width: '100%',
    height: '160px',
    objectFit: 'cover',
  },
  milestoneYear: {
    display: 'inline-block',
    background: '#b76e79',
    color: 'white',
    padding: '0.2rem 1rem',
    borderRadius: '30px',
    fontSize: '0.8rem',
    fontWeight: 600,
    margin: '1rem 0 0 1rem',
  },
  testimonialCard: {
    background: 'white',
    borderRadius: '20px',
    padding: '2rem',
    border: '1px solid rgba(183, 110, 121, 0.1)',
    boxShadow: '0 4px 15px rgba(183, 110, 121, 0.05)',
  },
  testimonialHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    marginBottom: '1rem',
  },
  testimonialImage: {
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    objectFit: 'cover',
  },
  testimonialName: {
    fontSize: '1rem',
    color: '#b76e79',
    fontWeight: 600,
    marginBottom: '0.2rem',
  },
  testimonialRole: {
    fontSize: '0.8rem',
    color: '#999',
  },
  testimonialRating: {
    marginBottom: '1rem',
    fontSize: '1rem',
  },
  testimonialText: {
    fontSize: '0.95rem',
    color: '#666',
    lineHeight: 1.7,
    fontStyle: 'italic',
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

export default About;