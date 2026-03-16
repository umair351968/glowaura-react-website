// src/components/Navbar.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  User, Heart, ShoppingBag, Menu, X, 
  ChevronDown, Search // Added Search import
} from 'lucide-react';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(3);
  const [wishlistCount, setWishlistCount] = useState(2);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const navLinks = [
    { name: 'Home', path: '/' },
    { 
      name: 'Shop', 
      path: '/shop',
      dropdown: [
        { name: 'All Products', path: '/shop' },
        { name: 'Lip Collection', path: '/shop?category=lips' },
        { name: 'Eye Makeup', path: '/shop?category=eyes' },
        { name: 'Face Makeup', path: '/shop?category=face' },
        { name: 'Skincare', path: '/shop?category=skincare' },
        { name: 'Nail Collection', path: '/shop?category=nails' },
      ]
    },
   
    { name: 'New Arrivals', path: '/new-arrivals' },
    { name: 'Sale', path: '/sale' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
    setActiveDropdown(null);
  }, [location]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Poppins:wght@300;400;500;600&display=swap');

        .navbar {
          position: sticky;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          padding: 1.5rem 5%;
          background: transparent;
        }

        .navbar.scrolled {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          box-shadow: 0 4px 30px rgba(0, 0, 0, 0.05);
          padding: 1rem 5%;
        }

        .navbar-container {
          max-width: 1400px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        /* Logo Styles */
        .logo-container {
          cursor: pointer;
          z-index: 1001;
        }

        .logo {
          font-family: 'Playfair Display', serif;
          font-size: 2rem;
          display: flex;
          gap: 0.3rem;
          line-height: 1;
        }

        .logo-glow {
          color: #000000;
          font-weight: 700;
          transition: all 0.3s ease;
        }

        .logo-beauty {
          color: #d4af37;
          font-weight: 400;
        }

        /* Desktop Navigation */
        .nav-links {
          display: flex;
          gap: 2rem;
          align-items: center;
        }

        .nav-item {
          position: relative;
        }

        .nav-link {
          color: #000000;
          text-decoration: none;
          font-weight: 500;
          font-size: 0.95rem;
          padding: 0.5rem 0;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 0.3rem;
          cursor: pointer;
          background: none;
          border: none;
          font-family: 'Poppins', sans-serif;
        }

        .nav-link:hover {
          color: #d4af37;
        }

        .nav-link.active {
          color: #d4af37;
          position: relative;
        }

        .nav-link.active::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 2px;
          background: linear-gradient(90deg, #b76e79, #d4af37);
          border-radius: 2px;
        }

        /* Dropdown Menu */
        .dropdown-menu {
          position: absolute;
          top: 100%;
          left: 50%;
          transform: translateX(-50%) translateY(10px);
          background: white;
          border-radius: 12px;
          padding: 1rem 0;
          min-width: 220px;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
          opacity: 0;
          visibility: hidden;
          transition: all 0.3s ease;
          border: 1px solid rgba(0, 0, 0, 0.05);
          z-index: 100;
        }

        .nav-item:hover .dropdown-menu {
          opacity: 1;
          visibility: visible;
          transform: translateX(-50%) translateY(0);
        }

        .dropdown-item {
          display: block;
          padding: 0.7rem 1.5rem;
          color: #333333;
          text-decoration: none;
          font-size: 0.9rem;
          transition: all 0.3s ease;
          white-space: nowrap;
        }

        .dropdown-item:hover {
          background: #f5f5f5;
          color: #b76e79;
          padding-left: 2rem;
        }

        /* Action Icons */
        .action-icons {
          display: flex;
          gap: 1.5rem;
          align-items: center;
        }

        .icon-wrapper {
          position: relative;
          cursor: pointer;
          color: #000000;
          transition: all 0.3s ease;
          background: none;
          border: none;
          padding: 0;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .icon-wrapper:hover {
          color: #d4af37;
          transform: scale(1.1);
        }

        .badge {
          position: absolute;
          top: -8px;
          right: -8px;
          background: linear-gradient(135deg, #b76e79, #d4af37);
          color: white;
          font-size: 0.65rem;
          padding: 2px 6px;
          border-radius: 50%;
          min-width: 18px;
          text-align: center;
          font-weight: 600;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        }

        /* Mobile Menu Button */
        .menu-btn {
          display: none;
          background: none;
          border: none;
          color: #000000;
          cursor: pointer;
          z-index: 1001;
          transition: all 0.3s ease;
        }

        .menu-btn:hover {
          color: #d4af37;
          transform: scale(1.1);
        }

        /* Mobile Menu */
        .mobile-menu-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          backdrop-filter: blur(5px);
          z-index: 999;
          opacity: 0;
          visibility: hidden;
          transition: all 0.3s ease;
        }

        .mobile-menu-overlay.open {
          opacity: 1;
          visibility: visible;
        }

        .mobile-menu {
          position: fixed;
          top: 0;
          right: -100%;
          width: 85%;
          max-width: 400px;
          height: 100vh;
          background: white;
          z-index: 1000;
          padding: 6rem 2rem 2rem;
          transition: right 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: -10px 0 40px rgba(0, 0, 0, 0.1);
          overflow-y: auto;
        }

        .mobile-menu.open {
          right: 0;
        }

        .mobile-menu-header {
          position: absolute;
          top: 1.5rem;
          left: 2rem;
          right: 2rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .mobile-menu-header h2 {
          font-family: 'Playfair Display', serif;
          color: #b76e79;
          font-size: 1.5rem;
        }

        .mobile-menu-close {
          background: none;
          border: none;
          color: #333333;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .mobile-menu-close:hover {
          color: #b76e79;
          transform: rotate(90deg);
        }

        .mobile-nav-item {
          margin-bottom: 0.5rem;
        }

        .mobile-nav-link {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1rem 0;
          color: #333333;
          text-decoration: none;
          font-size: 1.2rem;
          font-weight: 500;
          border-bottom: 1px solid rgba(0, 0, 0, 0.05);
          transition: all 0.3s ease;
          cursor: pointer;
          background: none;
          border: none;
          width: 100%;
          text-align: left;
          font-family: 'Poppins', sans-serif;
        }

        .mobile-nav-link:hover {
          color: #b76e79;
          padding-left: 1rem;
        }

        .mobile-dropdown {
          padding-left: 1rem;
          margin-bottom: 1rem;
          display: none;
        }

        .mobile-dropdown.open {
          display: block;
        }

        .mobile-dropdown-item {
          display: block;
          padding: 0.8rem 1rem;
          color: #666;
          text-decoration: none;
          font-size: 1rem;
          transition: all 0.3s ease;
          border-radius: 8px;
        }

        .mobile-dropdown-item:hover {
          background: #f5f5f5;
          color: #b76e79;
          padding-left: 1.5rem;
        }

        .mobile-action-icons {
          display: flex;
          justify-content: space-around;
          margin-top: 3rem;
          padding-top: 2rem;
          border-top: 1px solid rgba(0, 0, 0, 0.05);
        }

        .mobile-icon-wrapper {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
          color: #333333;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .mobile-icon-wrapper:hover {
          color: #b76e79;
          transform: translateY(-3px);
        }

        .mobile-icon-wrapper span {
          font-size: 0.8rem;
          font-weight: 500;
        }

        .mobile-search {
          margin: 2rem 0;
          position: relative;
        }

        .mobile-search-input {
          width: 100%;
          padding: 1rem 1rem 1rem 3rem;
          border-radius: 50px;
          border: 1px solid rgba(0, 0, 0, 0.1);
          font-size: 1rem;
          outline: none;
          background: white;
          color: #333333;
        }

        .mobile-search-input:focus {
          border-color: #b76e79;
          box-shadow: 0 0 0 3px rgba(183, 110, 121, 0.1);
        }

        .mobile-search-icon {
          position: absolute;
          left: 1rem;
          top: 50%;
          transform: translateY(-50%);
          color: #b76e79;
        }

        /* Responsive */
        @media (max-width: 1024px) {
          .nav-links {
            display: none;
          }

          .menu-btn {
            display: block;
          }
        }

        @media (max-width: 768px) {
          .action-icons {
            gap: 1rem;
          }

          .logo {
            font-size: 1.6rem;
          }
        }

        @media (max-width: 480px) {
          .navbar {
            padding: 1rem 5%;
          }

          .action-icons {
            gap: 0.8rem;
          }

          .icon-wrapper svg {
            width: 20px;
            height: 20px;
          }

          .badge {
            font-size: 0.6rem;
            min-width: 16px;
            padding: 1px 4px;
          }
        }
      `}</style>

      <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="navbar-container">
          {/* Logo */}
          <div className="logo-container" onClick={() => navigate('/')}>
            <h1 className="logo">
              <span className="logo-glow">GlowAura</span>
              <span className="logo-beauty">Beauty</span>
            </h1>
          </div>

          {/* Desktop Navigation */}
          <div className="nav-links">
            {navLinks.map((link, index) => (
              <div key={index} className="nav-item">
                {link.dropdown ? (
                  <>
                    <button 
                      className={`nav-link ${location.pathname.includes(link.path) ? 'active' : ''}`}
                      onClick={() => navigate(link.path)}
                    >
                      {link.name}
                      <ChevronDown size={16} />
                    </button>
                    <div className="dropdown-menu">
                      {link.dropdown.map((item, idx) => (
                        <a
                          key={idx}
                          href={item.path}
                          className="dropdown-item"
                          onClick={(e) => {
                            e.preventDefault();
                            navigate(item.path);
                          }}
                        >
                          {item.name}
                        </a>
                      ))}
                    </div>
                  </>
                ) : (
                  <a
                    href={link.path}
                    className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
                    onClick={(e) => {
                      e.preventDefault();
                      navigate(link.path);
                    }}
                  >
                    {link.name}
                  </a>
                )}
              </div>
            ))}
          </div>

          {/* Right Section */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            {/* Action Icons */}
            <div className="action-icons">
              <button className="icon-wrapper" onClick={() => navigate('/account')}>
                <User size={22} />
              </button>
              <button className="icon-wrapper" onClick={() => navigate('/wishlist')}>
                <Heart size={22} />
                {wishlistCount > 0 && <span className="badge">{wishlistCount}</span>}
              </button>
              <button className="icon-wrapper" onClick={() => navigate('/cart')}>
                <ShoppingBag size={22} />
                {cartCount > 0 && <span className="badge">{cartCount}</span>}
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button className="menu-btn" onClick={() => setIsMenuOpen(true)}>
              <Menu size={28} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div 
        className={`mobile-menu-overlay ${isMenuOpen ? 'open' : ''}`}
        onClick={() => setIsMenuOpen(false)}
      />

      {/* Mobile Menu */}
      <div className={`mobile-menu ${isMenuOpen ? 'open' : ''}`}>
        <div className="mobile-menu-header">
          <h2>Menu</h2>
          <button className="mobile-menu-close" onClick={() => setIsMenuOpen(false)}>
            <X size={24} />
          </button>
        </div>

        {/* Mobile Search */}
        <div className="mobile-search">
          <Search className="mobile-search-icon" size={20} />
          <input
            type="text"
            placeholder="Search products..."
            className="mobile-search-input"
          />
        </div>

        {/* Mobile Navigation */}
        {navLinks.map((link, index) => (
          <div key={index} className="mobile-nav-item">
            {link.dropdown ? (
              <>
                <button 
                  className="mobile-nav-link"
                  onClick={() => setActiveDropdown(activeDropdown === index ? null : index)}
                >
                  {link.name}
                  <ChevronDown 
                    size={20} 
                    style={{ 
                      transform: activeDropdown === index ? 'rotate(180deg)' : 'rotate(0)',
                      transition: 'transform 0.3s ease'
                    }} 
                  />
                </button>
                <div className={`mobile-dropdown ${activeDropdown === index ? 'open' : ''}`}>
                  {link.dropdown.map((item, idx) => (
                    <a
                      key={idx}
                      href={item.path}
                      className="mobile-dropdown-item"
                      onClick={(e) => {
                        e.preventDefault();
                        navigate(item.path);
                        setIsMenuOpen(false);
                      }}
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
              </>
            ) : (
              <a
                href={link.path}
                className="mobile-nav-link"
                onClick={(e) => {
                  e.preventDefault();
                  navigate(link.path);
                  setIsMenuOpen(false);
                }}
              >
                {link.name}
              </a>
            )}
          </div>
        ))}

        {/* Mobile Action Icons */}
        <div className="mobile-action-icons">
          <div className="mobile-icon-wrapper" onClick={() => {
            navigate('/account');
            setIsMenuOpen(false);
          }}>
            <User size={24} />
            <span>Account</span>
          </div>
          <div className="mobile-icon-wrapper" onClick={() => {
            navigate('/wishlist');
            setIsMenuOpen(false);
          }}>
            <Heart size={24} />
            <span>Wishlist ({wishlistCount})</span>
          </div>
          <div className="mobile-icon-wrapper" onClick={() => {
            navigate('/cart');
            setIsMenuOpen(false);
          }}>
            <ShoppingBag size={24} />
            <span>Cart ({cartCount})</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;