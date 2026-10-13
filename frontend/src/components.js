import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";

/**
 * Reusable Navbar Component
 * Features responsive mobile toggle, navigation links, and quick SOS trigger
 */
export function Navbar({ onOpenSOS }) {
  const [navCollapsed, setNavCollapsed] = useState(true);

  const toggleNavbar = () => {
    setNavCollapsed(!navCollapsed);
  };

  const closeNavbar = () => {
    setNavCollapsed(true);
  };

  return (
    <nav className="navbar navbar-expand-lg custom-navbar">
      <div className="container">
        <Link to="/" className="navbar-brand navbar-brand-custom" onClick={closeNavbar}>
          <div className="brand-icon-badge">
            <i className="bi bi-shield-plus"></i>
          </div>
          <div>
            <div className="brand-text-full">Campus Helpline Directory</div>
            <span className="brand-text-sub">Virtual Emergency Response</span>
          </div>
        </Link>

        {/* Mobile Toggle Button */}
        <button
          className="navbar-toggler text-white border-0"
          type="button"
          onClick={toggleNavbar}
          aria-controls="navbarNav"
          aria-expanded={!navCollapsed}
          aria-label="Toggle navigation"
        >
          <i className={`bi ${navCollapsed ? "bi-list" : "bi-x-lg"} fs-3`}></i>
        </button>

        {/* Navigation Menu */}
        <div className={`collapse navbar-collapse ${!navCollapsed ? "show" : ""}`} id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-lg-center gap-1 my-2 my-lg-0">
            <li className="nav-item">
              <NavLink to="/" end className="nav-link nav-link-custom" onClick={closeNavbar}>
                <i className="bi bi-house-door me-1"></i> Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/directory" className="nav-link nav-link-custom" onClick={closeNavbar}>
                <i className="bi bi-person-lines-fill me-1"></i> Directory
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/safety-map" className="nav-link nav-link-custom" onClick={closeNavbar}>
                <i className="bi bi-map me-1"></i> Safety Map
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/feedback" className="nav-link nav-link-custom" onClick={closeNavbar}>
                <i className="bi bi-chat-square-text me-1"></i> Feedback
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/admin" className="nav-link nav-link-custom" onClick={closeNavbar}>
                <i className="bi bi-gear me-1"></i> Admin
              </NavLink>
            </li>
            <li className="nav-item ms-lg-2 mt-2 mt-lg-0">
              <button
                type="button"
                className="btn btn-nav-sos w-100"
                onClick={() => {
                  closeNavbar();
                  onOpenSOS();
                }}
              >
                <i className="bi bi-exclamation-octagon-fill"></i> SOS HELPLINE
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

/**
 * Reusable Footer Component
 * College project disclaimer and quick navigation
 */
export function Footer({ onOpenSOS }) {
  return (
    <footer className="app-footer">
      <div className="container">
        <div className="row g-4">
          <div className="col-lg-5 col-md-6">
            <h5>
              <i className="bi bi-shield-shaded text-danger me-2"></i>
              Virtual Emergency Campus Helpline
            </h5>
            <p className="text-secondary mb-3">
              An accessible, centralized campus crisis assistance and institutional helpline directory designed for university students, faculty, and residential staff.
            </p>
            <div className="d-flex align-items-center gap-2">
              <button
                type="button"
                className="btn btn-sm btn-outline-danger text-light fw-bold"
                onClick={onOpenSOS}
              >
                <i className="bi bi-telephone-fill me-1"></i> Open Emergency SOS
              </button>
              <Link to="/safety-map" className="btn btn-sm btn-outline-secondary text-light">
                <i className="bi bi-geo-alt me-1"></i> Campus Map
              </Link>
            </div>
          </div>

          <div className="col-lg-3 col-md-6">
            <h5>Quick Navigation</h5>
            <Link to="/" className="footer-link">
              <i className="bi bi-chevron-right me-1"></i> Home Overview
            </Link>
            <Link to="/directory" className="footer-link">
              <i className="bi bi-chevron-right me-1"></i> Contact Directory
            </Link>
            <Link to="/safety-map" className="footer-link">
              <i className="bi bi-chevron-right me-1"></i> Campus Safety Canvas
            </Link>
            <Link to="/feedback" className="footer-link">
              <i className="bi bi-chevron-right me-1"></i> Report Issue / Feedback
            </Link>
            <Link to="/admin" className="footer-link">
              <i className="bi bi-chevron-right me-1"></i> Admin Contact Manager
            </Link>
          </div>

          <div className="col-lg-4 col-md-12">
            <h5>Important Campus Numbers</h5>
            <p className="small text-secondary mb-2">Fictional demonstration numbers for academic showcase:</p>
            <ul className="list-unstyled small text-light mb-3">
              <li className="mb-1">
                <strong>Campus Security:</strong>{" "}
                <a href="tel:+910000000001" className="text-info text-decoration-none">
                  +91 00000 00001
                </a>
              </li>
              <li className="mb-1">
                <strong>Medical Centre:</strong>{" "}
                <a href="tel:+910000000002" className="text-info text-decoration-none">
                  +91 00000 00002
                </a>
              </li>
              <li className="mb-1">
                <strong>Ambulance Unit:</strong>{" "}
                <a href="tel:+910000000003" className="text-info text-decoration-none">
                  +91 00000 00003
                </a>
              </li>
              <li className="mb-1">
                <strong>Disaster & Fire Cell:</strong>{" "}
                <a href="tel:+910000000004" className="text-info text-decoration-none">
                  +91 00000 00004
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="mb-1">
            <strong>Demonstration Academic Project:</strong> Web Programming Course (HTML5 • CSS3 • JavaScript • Bootstrap 5 • ReactJS • PHP • MySQL)
          </p>
          <p className="text-secondary small mb-0">
            Notice: Fictional demonstration contacts. Does not dispatch real municipal 911/police/ambulance emergency services.
          </p>
        </div>
      </div>
    </footer>
  );
}

/**
 * EmergencyBanner Component
 * Prominent banner displayed on homepage and directory with quick-access dials
 */
export function EmergencyBanner({ onOpenSOS }) {
  return (
    <div className="emergency-banner">
      <div className="emergency-banner-info">
        <div className="emergency-banner-icon">
          <i className="bi bi-exclamation-triangle-fill"></i>
        </div>
        <div>
          <div className="emergency-banner-title">Emergency? Get Help Immediately</div>
          <p className="emergency-banner-subtitle">
            Need urgent assistance on campus? One-tap direct lines to 24/7 security, ambulance, and first-aid medical desk.
          </p>
        </div>
      </div>

      <div className="emergency-quick-actions">
        <a href="tel:+910000000001" className="btn-quick-call btn-security">
          <i className="bi bi-shield-check text-primary"></i> Security
        </a>
        <a href="tel:+910000000002" className="btn-quick-call btn-medical">
          <i className="bi bi-heart-pulse-fill text-danger"></i> Medical
        </a>
        <a href="tel:+910000000003" className="btn-quick-call btn-medical">
          <i className="bi bi-truck text-danger"></i> Ambulance
        </a>
        <button type="button" className="btn-sos-trigger" onClick={onOpenSOS}>
          <i className="bi bi-telephone-outbound-fill"></i> Open SOS Popup
        </button>
      </div>
    </div>
  );
}

/**
 * SOSModal Component
 * Prominent emergency popup with high z-index and direct call actions
 */
export function SOSModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const emergencyContacts = [
    {
      title: "Campus Security Desk",
      hours: "24/7 Service • Main Gate Complex",
      phone: "+910000000001",
      icon: "bi-shield-shaded",
      color: "#1e40af"
    },
    {
      title: "Campus Medical Centre",
      hours: "24/7 Emergency • Block B Pavilion",
      phone: "+910000000002",
      icon: "bi-heart-pulse-fill",
      color: "#b91c1c"
    },
    {
      title: "Campus Emergency Ambulance",
      hours: "24/7 On-Call • Rapid Bay",
      phone: "+910000000003",
      icon: "bi-truck",
      color: "#dc2626"
    },
    {
      title: "Fire & Safety Response Unit",
      hours: "24/7 Rapid Response • Safety Depot",
      phone: "+910000000004",
      icon: "bi-fire",
      color: "#c2410c"
    }
  ];

  return (
    <div className="sos-modal-overlay" onClick={onClose} id="sosModalBackdrop">
      <div
        className="sos-modal-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="sosModalTitle"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sos-modal-header">
          <h4 id="sosModalTitle">
            <i className="bi bi-exclamation-octagon-fill"></i> Campus SOS Helpline
          </h4>
          <button
            type="button"
            className="sos-btn-close"
            onClick={onClose}
            aria-label="Close modal"
          >
            <i className="bi bi-x-lg"></i>
          </button>
        </div>

        <div className="sos-modal-body">
          <div className="sos-warning-note">
            <i className="bi bi-info-circle-fill fs-5"></i>
            <div>
              <strong>Demonstration Popup:</strong> Tapping call will launch your device dialer with demonstration helpline numbers.
            </div>
          </div>

          <div className="sos-contact-list">
            {emergencyContacts.map((contact, idx) => (
              <div key={idx} className="sos-contact-row">
                <div className="sos-row-left">
                  <div className="sos-row-icon" style={{ backgroundColor: contact.color }}>
                    <i className={`bi ${contact.icon}`}></i>
                  </div>
                  <div>
                    <div className="sos-row-title">{contact.title}</div>
                    <div className="sos-row-hours">{contact.hours}</div>
                  </div>
                </div>
                <a href={`tel:${contact.phone}`} className="btn-sos-call">
                  <i className="bi bi-telephone-fill"></i> Call {contact.phone.slice(-4)}
                </a>
              </div>
            ))}
          </div>
        </div>

        <div className="sos-modal-footer">
          <span className="text-muted small">Stay calm • Report location clearly</span>
          <button type="button" className="btn btn-secondary btn-sm" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

/**
 * ContactCard Component
 * Reusable card displaying full contact metadata, call/email actions, and admin controls
 */
export function ContactCard({
  id,
  name,
  category,
  phone,
  email,
  location,
  available_hours,
  description,
  isAdmin = false,
  onEdit,
  onDelete
}) {
  // Map category to CSS class
  const getCategoryClass = (cat) => {
    switch (cat?.toLowerCase()) {
      case "security":
        return "cat-security";
      case "medical":
        return "cat-medical";
      case "safety":
        return "cat-safety";
      case "hostel":
        return "cat-hostel";
      case "it":
        return "cat-it";
      case "maintenance":
        return "cat-maintenance";
      case "administration":
        return "cat-administration";
      case "transport":
        return "cat-transport";
      default:
        return "cat-security";
    }
  };

  return (
    <div className="contact-card">
      <div className="card-top-bar">
        <span className={`category-tag ${getCategoryClass(category)}`}>
          <i className="bi bi-tag-fill"></i> {category}
        </span>
        <span className="contact-hours-badge">
          <i className="bi bi-clock"></i> {available_hours}
        </span>
      </div>

      <h5 className="contact-card-title">{name}</h5>
      <p className="contact-card-desc">{description}</p>

      <div className="contact-meta-group">
        <div className="contact-meta-item">
          <i className="bi bi-geo-alt-fill text-danger"></i>
          <span>{location}</span>
        </div>
        <div className="contact-meta-item">
          <i className="bi bi-telephone-fill text-primary"></i>
          <span>{phone}</span>
        </div>
        <div className="contact-meta-item">
          <i className="bi bi-envelope-fill text-secondary"></i>
          <span>{email}</span>
        </div>
      </div>

      <div className="contact-card-actions">
        <a href={`tel:${phone}`} className="btn-card-call">
          <i className="bi bi-telephone-outbound-fill"></i> Call Now
        </a>
        <a href={`mailto:${email}`} className="btn-card-email">
          <i className="bi bi-envelope"></i> Email
        </a>
      </div>

      {isAdmin && (
        <div className="admin-card-bar">
          <button
            type="button"
            className="btn-admin-edit"
            onClick={() => onEdit && onEdit({ id, name, category, phone, email, location, available_hours, description })}
          >
            <i className="bi bi-pencil-square me-1"></i> Edit
          </button>
          <button
            type="button"
            className="btn-admin-delete"
            onClick={() => onDelete && onDelete(id, name)}
          >
            <i className="bi bi-trash-fill me-1"></i> Delete
          </button>
        </div>
      )}
    </div>
  );
}

/**
 * SearchBar Component
 * Search input with real-time text query and clear button
 */
export function SearchBar({ value, onChange, onClear }) {
  return (
    <div className="search-input-group">
      <i className="bi bi-search search-icon"></i>
      <input
        type="text"
        className="search-input"
        placeholder="Search by name, department or keyword..."
        value={value}
        onChange={onChange}
        aria-label="Search contacts"
      />
      {value && (
        <button
          type="button"
          className="search-clear-btn"
          onClick={onClear}
          title="Clear Search"
          aria-label="Clear Search"
        >
          <i className="bi bi-x-circle-fill"></i>
        </button>
      )}
    </div>
  );
}

/**
 * CategoryFilter Component
 * Filter pills for selecting specific departments
 */
export function CategoryFilter({ categories, selectedCategory, onSelectCategory }) {
  return (
    <div className="category-pills-wrapper" role="group" aria-label="Category filter">
      {categories.map((cat) => (
        <button
          key={cat}
          type="button"
          className={`category-pill ${selectedCategory === cat ? "active" : ""}`}
          onClick={() => onSelectCategory(cat)}
        >
          {cat === "All" && <i className="bi bi-grid-fill"></i>}
          {cat === "Security" && <i className="bi bi-shield-check"></i>}
          {cat === "Medical" && <i className="bi bi-heart-pulse-fill"></i>}
          {cat === "Safety" && <i className="bi bi-fire"></i>}
          {cat === "Hostel" && <i className="bi bi-building"></i>}
          {cat === "IT" && <i className="bi bi-laptop"></i>}
          {cat === "Maintenance" && <i className="bi bi-tools"></i>}
          {cat === "Administration" && <i className="bi bi-briefcase"></i>}
          {cat === "Transport" && <i className="bi bi-bus-front"></i>}
          {cat}
        </button>
      ))}
    </div>
  );
}
