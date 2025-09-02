import React, { useState } from "react";

export default function Navbar() {
  const [searchValue, setSearchValue] = useState('');

  const navStyle = {
    width: '100%',
    backgroundColor: '#1f2937',
    color: 'white',
    position: 'fixed',
    top: 0,
    left: 0,
    zIndex: 50,
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
  };

  const containerStyle = {
    maxWidth: '1400px',
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 24px',
    gap: '20px'
  };

  const brandStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    minWidth: '200px'
  };

  const logoStyle = {
    width: '40px',
    height: '40px',
    borderRadius: '8px',
    objectFit: 'contain'
  };

  const brandTextStyle = {
    lineHeight: '1.2'
  };

  const titleStyle = {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#10b981',
    margin: 0
  };

  const subtitleStyle = {
    fontSize: '13px',
    color: '#d1d5db',
    margin: 0
  };

  const searchContainerStyle = {
    flex: '1',
    maxWidth: '400px',
    position: 'relative'
  };

  const searchInputStyle = {
    width: '100%',
    padding: '10px 40px 10px 16px',
    borderRadius: '8px',
    border: 'none',
    backgroundColor: '#374151',
    color: 'white',
    fontSize: '14px',
    outline: 'none'
  };

  const searchIconStyle = {
    position: 'absolute',
    right: '12px',
    top: '50%',
    transform: 'translateY(-50%)',
    color: '#9ca3af',
    fontSize: '18px',
    cursor: 'pointer'
  };

  const navLinksStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '24px'
  };

  const linkStyle = {
    color: 'white',
    textDecoration: 'none',
    fontSize: '14px',
    fontWeight: '500',
    transition: 'color 0.2s ease',
    whiteSpace: 'nowrap'
  };

  const actionsStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '16px'
  };

  const iconButtonStyle = {
    background: 'none',
    border: 'none',
    color: 'white',
    fontSize: '18px',
    cursor: 'pointer',
    padding: '8px',
    borderRadius: '6px',
    transition: 'background-color 0.2s ease'
  };

  const loginButtonStyle = {
    backgroundColor: '#16a34a',
    color: 'white',
    padding: '8px 16px',
    borderRadius: '8px',
    textDecoration: 'none',
    fontSize: '14px',
    fontWeight: '500',
    border: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease',
    display: 'flex',
    alignItems: 'center',
    gap: '6px'
  };

  return (
    <nav style={navStyle}>
      <div style={containerStyle}>
        
        {/* Left: Logo + Brand */}
        <div style={brandStyle}>
          <img
            src="/logoagri.png"
            alt="AgriSmartAI Logo"
            style={logoStyle}
          />
          <div style={brandTextStyle}>
            <h1 style={titleStyle}>AgriSmartAI</h1>
            <p style={subtitleStyle}>AI assistant for farmers</p>
          </div>
        </div>

        {/* Center: Search Bar */}
        <div style={searchContainerStyle}>
          <input
            type="text"
            placeholder="Search city or crop..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            style={searchInputStyle}
          />
          <span style={searchIconStyle}>🔍</span>
        </div>

        {/* Right: Navigation Links */}
        <div style={navLinksStyle}>
          <a href="#" style={linkStyle} onMouseEnter={(e) => e.target.style.color = '#10b981'} onMouseLeave={(e) => e.target.style.color = 'white'}>
            Dashboard
          </a>
          <a href="#" style={linkStyle} onMouseEnter={(e) => e.target.style.color = '#10b981'} onMouseLeave={(e) => e.target.style.color = 'white'}>
            Weather
          </a>
          <a href="#" style={linkStyle} onMouseEnter={(e) => e.target.style.color = '#10b981'} onMouseLeave={(e) => e.target.style.color = 'white'}>
            Market Prices
          </a>
          <a href="#" style={linkStyle} onMouseEnter={(e) => e.target.style.color = '#10b981'} onMouseLeave={(e) => e.target.style.color = 'white'}>
            Guides
          </a>
          <a href="#" style={linkStyle} onMouseEnter={(e) => e.target.style.color = '#10b981'} onMouseLeave={(e) => e.target.style.color = 'white'}>
            AI Assistant
          </a>
          <a href="#" style={linkStyle} onMouseEnter={(e) => e.target.style.color = '#10b981'} onMouseLeave={(e) => e.target.style.color = 'white'}>
            Blog
          </a>
          <a href="#" style={linkStyle} onMouseEnter={(e) => e.target.style.color = '#10b981'} onMouseLeave={(e) => e.target.style.color = 'white'}>
            Contact
          </a>
        </div>

        {/* Far Right: User Actions */}
        <div style={actionsStyle}>
          <button 
            style={iconButtonStyle}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#374151'}
            onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
            title="Notifications"
          >
            🔔
          </button>
          <button 
            style={iconButtonStyle}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#374151'}
            onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
            title="Language"
          >
            🌐
          </button>
          <a
            href="#"
            style={loginButtonStyle}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#15803d'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#16a34a'}
          >
            👤 Login
          </a>
        </div>

      </div>
    </nav>
  );
}