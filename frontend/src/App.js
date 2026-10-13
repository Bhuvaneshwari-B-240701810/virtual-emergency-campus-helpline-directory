import React, { useState, useEffect, useRef } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useSearchParams } from "react-router-dom";
import {
  Navbar,
  Footer,
  EmergencyBanner,
  SOSModal,
  ContactCard,
  SearchBar,
  CategoryFilter
} from "./components";

/**
 * Global API URL Configuration
 * Update this URL if your PHP backend is hosted on a custom port or path
 */
export const API_URL = "http://localhost/virtual-emergency-campus-helpline/backend/api.php";

/**
 * Built-in Demonstration Contacts
 * Ensures full standalone functionality and instant showcase during viva or offline testing
 */
const INITIAL_DEMO_CONTACTS = [
  {
    id: 1,
    name: "Campus Security Main Gate",
    category: "Security",
    phone: "+910000000001",
    email: "security@campus.edu",
    location: "Main Gate Security Complex, Gate 1",
    available_hours: "24/7 Service",
    description: "Primary round-the-clock campus security, gate control, immediate incident response, and patrol services."
  },
  {
    id: 2,
    name: "Campus Medical Centre",
    category: "Medical",
    phone: "+910000000002",
    email: "medical@campus.edu",
    location: "Health & Wellness Pavilion, Block B",
    available_hours: "24/7 Emergency",
    description: "Immediate first aid, doctor consultation, acute care triage, and university pharmacy access."
  },
  {
    id: 3,
    name: "Emergency Ambulance Service",
    category: "Medical",
    phone: "+910000000003",
    email: "ambulance@campus.edu",
    location: "Medical Centre Ambulance Bay",
    available_hours: "24/7 On-Call",
    description: "Dedicated critical patient transit vehicle equipped with emergency oxygen and paramedic support."
  },
  {
    id: 4,
    name: "Fire & Disaster Safety Unit",
    category: "Safety",
    phone: "+910000000004",
    email: "fire.safety@campus.edu",
    location: "Safety Depot, Near Assembly Point A",
    available_hours: "24/7 Rapid Response",
    description: "Fire alarms, extinguisher inspection, hazardous chemical spill response, and disaster management."
  },
  {
    id: 5,
    name: "Women's Safety & Counseling Cell",
    category: "Safety",
    phone: "+910000000005",
    email: "womenscell@campus.edu",
    location: "Student Welfare Center, Room 104",
    available_hours: "24/7 Helpline",
    description: "Confidential helpline for female students, faculty, and staff, offering psychological support and anti-harassment escalation."
  },
  {
    id: 6,
    name: "Chief Hostel Warden Office",
    category: "Hostel",
    phone: "+910000000006",
    email: "warden@campus.edu",
    location: "Central Hostel Administration Block",
    available_hours: "6:00 AM - 11:00 PM (Emergency 24/7)",
    description: "Hostel accommodation issues, night curfew assistance, room emergencies, and residential discipline."
  },
  {
    id: 7,
    name: "IT & Campus Network Helpdesk",
    category: "IT",
    phone: "+910000000007",
    email: "itsupport@campus.edu",
    location: "Computer Centre, 2nd Floor",
    available_hours: "8:00 AM - 8:00 PM",
    description: "Assistance with campus Wi-Fi authentication, LMS portal access, exam portal issues, and lab workstation support."
  },
  {
    id: 8,
    name: "Electrical & Water Maintenance",
    category: "Maintenance",
    phone: "+910000000008",
    email: "maintenance@campus.edu",
    location: "Engineering Substation, Utility Yard",
    available_hours: "24/7 Emergency Repairs",
    description: "Campus power failure restoration, electrical hazards, water supply outages, and plumbing breakdown repairs."
  },
  {
    id: 9,
    name: "Campus Administration Office",
    category: "Administration",
    phone: "+910000000009",
    email: "admin@campus.edu",
    location: "Administrative Block, Ground Floor",
    available_hours: "9:00 AM - 5:00 PM (Mon-Sat)",
    description: "Official verification, student notices, lost-and-found repository, and academic affairs administration."
  },
  {
    id: 10,
    name: "Campus Transport & Shuttle Desk",
    category: "Transport",
    phone: "+910000000010",
    email: "transport@campus.edu",
    location: "Transit Terminal, South Gate",
    available_hours: "6:30 AM - 10:30 PM",
    description: "Campus shuttle schedules, emergency student night transit, bus pass inquiries, and driver dispatch."
  }
];

const CATEGORIES = [
  "All",
  "Security",
  "Medical",
  "Safety",
  "Hostel",
  "IT",
  "Maintenance",
  "Administration",
  "Transport"
];

// ============================================================================
// 1. Home Page Component
// ============================================================================
function HomePage({ contacts, onOpenSOS }) {
  const navigate = useNavigate();

  const quickCategories = [
    { name: "Security", icon: "bi-shield-check", color: "#eff6ff", text: "#1d4ed8" },
    { name: "Medical", icon: "bi-heart-pulse-fill", color: "#fef2f2", text: "#b91c1c" },
    { name: "Safety", icon: "bi-fire", color: "#fff7ed", text: "#c2410c" },
    { name: "Hostel", icon: "bi-building", color: "#faf5ff", text: "#7e22ce" },
    { name: "IT", icon: "bi-laptop", color: "#ecfeff", text: "#0e7490" },
    { name: "Maintenance", icon: "bi-tools", color: "#fffbeb", text: "#b45309" }
  ];

  // Filter 3 featured primary emergency contacts for preview
  const featuredContacts = contacts.slice(0, 3);

  const handleCategoryClick = (categoryName) => {
    navigate(`/directory?category=${encodeURIComponent(categoryName)}`);
  };

  return (
    <div className="home-page-container">
      {/* Hero Banner */}
      <section className="hero-section">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-8">
              <span className="badge bg-danger px-3 py-2 text-uppercase mb-3">
                <i className="bi bi-broadcast me-1"></i> 24/7 Active Directory
              </span>
              <h1 className="hero-title">Virtual Emergency Campus Helpline Directory</h1>
              <p className="hero-subtitle">
                A single digital hub to immediately access campus security, medical ambulances, fire safety, student hostels, and facility helplines whenever you need assistance.
              </p>
              <div className="d-flex flex-wrap gap-3">
                <button
                  type="button"
                  className="btn btn-danger btn-lg fw-bold px-4 shadow"
                  onClick={onOpenSOS}
                >
                  <i className="bi bi-exclamation-octagon-fill me-2"></i> Launch SOS Call
                </button>
                <Link to="/directory" className="btn btn-outline-light btn-lg fw-semibold px-4">
                  <i className="bi bi-search me-2"></i> Search Helpline
                </Link>
                <Link to="/safety-map" className="btn btn-outline-info btn-lg fw-semibold px-4">
                  <i className="bi bi-map me-2"></i> Safety Map
                </Link>
              </div>

              <div className="hero-stats-row">
                <div className="stat-item">
                  <i className="bi bi-shield-check"></i>
                  <div>
                    <span className="stat-number">24/7</span>
                    <span className="stat-label">Security Patrol</span>
                  </div>
                </div>
                <div className="stat-item">
                  <i className="bi bi-hospital"></i>
                  <div>
                    <span className="stat-number">&lt; 3 Min</span>
                    <span className="stat-label">Paramedic Dispatch</span>
                  </div>
                </div>
                <div className="stat-item">
                  <i className="bi bi-telephone-inbound"></i>
                  <div>
                    <span className="stat-number">10+</span>
                    <span className="stat-label">Departments Covered</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container">
        {/* Emergency Quick Action Banner */}
        <EmergencyBanner onOpenSOS={onOpenSOS} />

        {/* Quick Department Navigation */}
        <section className="my-5">
          <div className="section-heading-wrapper">
            <div>
              <h2 className="section-title">Quick Department Categories</h2>
              <p className="section-desc">Select a category to view specific campus contacts</p>
            </div>
            <Link to="/directory" className="btn btn-sm btn-outline-primary d-none d-md-inline-block">
              View All Categories <i className="bi bi-arrow-right"></i>
            </Link>
          </div>

          <div className="row g-3">
            {quickCategories.map((cat, idx) => (
              <div key={idx} className="col-6 col-md-4 col-lg-2">
                <div className="category-card" onClick={() => handleCategoryClick(cat.name)}>
                  <div className="category-icon-bubble" style={{ backgroundColor: cat.color, color: cat.text }}>
                    <i className={`bi ${cat.icon}`}></i>
                  </div>
                  <div className="category-card-name">{cat.name}</div>
                  <div className="category-card-count">Direct Helpline</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Featured Emergency Contacts */}
        <section className="my-5">
          <div className="section-heading-wrapper">
            <div>
              <h2 className="section-title">Priority Emergency Contacts</h2>
              <p className="section-desc">Instant click-to-call lines for critical situations</p>
            </div>
            <Link to="/directory" className="btn btn-sm btn-primary">
              Full Directory ({contacts.length}) <i className="bi bi-arrow-right ms-1"></i>
            </Link>
          </div>

          <div className="row g-4">
            {featuredContacts.map((contact) => (
              <div key={contact.id} className="col-12 col-md-6 col-lg-4">
                <ContactCard {...contact} />
              </div>
            ))}
          </div>
        </section>

        {/* Safety Tips Banner */}
        <div className="safety-tips-box">
          <div className="row align-items-center">
            <div className="col-lg-9">
              <h4 className="fw-bold text-primary mb-2">
                <i className="bi bi-lightbulb-fill me-2 text-warning"></i> Campus Safety Advisory
              </h4>
              <p className="text-secondary mb-0">
                In case of fire or power failure, proceed calmly to Emergency Assembly Point A near the Safety Depot. Never use elevators during fire drills. Always report suspicious packages or perimeter breaches to Campus Security immediately.
              </p>
            </div>
            <div className="col-lg-3 text-lg-end mt-3 mt-lg-0">
              <Link to="/safety-map" className="btn btn-primary fw-semibold">
                <i className="bi bi-compass me-1"></i> View Safety Map
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// 2. Directory Page Component
// ============================================================================
function DirectoryPage({ contacts, onOpenSOS }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get("category") || "All";

  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(categoryParam);

  // Sync category if URL parameter changes
  useEffect(() => {
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
  }, [categoryParam]);

  const handleSelectCategory = (cat) => {
    setSelectedCategory(cat);
    if (cat === "All") {
      searchParams.delete("category");
      setSearchParams(searchParams);
    } else {
      setSearchParams({ category: cat });
    }
  };

  const handleClearSearch = () => {
    setSearchText("");
  };

  const handleResetAllFilters = () => {
    setSearchText("");
    setSelectedCategory("All");
    setSearchParams({});
  };

  // Real-time filtering matching name, category, location, or description
  const filteredContacts = contacts.filter((contact) => {
    const matchesCategory =
      selectedCategory === "All" ||
      contact.category.toLowerCase() === selectedCategory.toLowerCase();

    const query = searchText.trim().toLowerCase();
    const matchesSearch =
      query === "" ||
      contact.name.toLowerCase().includes(query) ||
      contact.category.toLowerCase().includes(query) ||
      contact.location.toLowerCase().includes(query) ||
      contact.description.toLowerCase().includes(query) ||
      contact.phone.toLowerCase().includes(query);

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="container py-4">
      {/* Top Emergency Prompt */}
      <EmergencyBanner onOpenSOS={onOpenSOS} />

      <div className="section-heading-wrapper mb-3">
        <div>
          <h1 className="h2 fw-bold text-navy mb-1">Campus Helpline Directory</h1>
          <p className="text-muted mb-0">
            Search and filter through all verified campus security, medical, and administrative helplines.
          </p>
        </div>
      </div>

      {/* Directory Search & Filter Controls */}
      <div className="directory-controls">
        <SearchBar
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          onClear={handleClearSearch}
        />
        <CategoryFilter
          categories={CATEGORIES}
          selectedCategory={selectedCategory}
          onSelectCategory={handleSelectCategory}
        />
      </div>

      {/* Status & Counter Bar */}
      <div className="directory-status-bar">
        <span>
          Showing <strong>{filteredContacts.length}</strong> of {contacts.length} contacts
          {selectedCategory !== "All" && ` in "${selectedCategory}"`}
          {searchText && ` matching "${searchText}"`}
        </span>
        {(searchText || selectedCategory !== "All") && (
          <button type="button" className="btn-reset-filters" onClick={handleResetAllFilters}>
            <i className="bi bi-arrow-counterclockwise me-1"></i> Clear all filters
          </button>
        )}
      </div>

      {/* Contacts Grid: 3 Desktop, 2 Tablet, 1 Mobile */}
      {filteredContacts.length > 0 ? (
        <div className="row g-4">
          {filteredContacts.map((contact) => (
            <div key={contact.id} className="col-12 col-md-6 col-lg-4">
              <ContactCard {...contact} />
            </div>
          ))}
        </div>
      ) : (
        <div className="empty-directory-state">
          <i className="bi bi-search empty-icon"></i>
          <h4>No contacts found</h4>
          <p>
            No helpline matches your current search term <em>"{searchText}"</em> in category <em>"{selectedCategory}"</em>.
          </p>
          <button type="button" className="btn btn-primary btn-sm" onClick={handleResetAllFilters}>
            Clear Search & Show All
          </button>
        </div>
      )}
    </div>
  );
}

// ============================================================================
// 3. Safety Map Component (HTML5 Canvas)
// ============================================================================
function SafetyMapPage() {
  const canvasRef = useRef(null);
  const [selectedPin, setSelectedPin] = useState(null);

  // Landmark coordinates and data for the demonstration campus map
  const landmarks = [
    {
      id: "main-gate",
      name: "Main Gate & Security Post",
      category: "Security",
      x: 100,
      y: 390,
      w: 120,
      h: 50,
      color: "#1e3a8a",
      phone: "+910000000001",
      desc: "Primary campus entry checkpoint, ID verification, and 24/7 security guard post."
    },
    {
      id: "admin-block",
      name: "Administration Block",
      category: "Administration",
      x: 310,
      y: 350,
      w: 160,
      h: 90,
      color: "#047857",
      phone: "+910000000009",
      desc: "Vice Chancellor, Registrar, Dean of Student Affairs, and official academic records."
    },
    {
      id: "medical-centre",
      name: "Campus Medical Centre & Pharmacy",
      category: "Medical",
      x: 110,
      y: 190,
      w: 140,
      h: 80,
      color: "#dc2626",
      phone: "+910000000002",
      desc: "Emergency triage, patient observation beds, duty doctors, and ambulance bay."
    },
    {
      id: "fire-depot",
      name: "Fire Safety Depot & Extinguishers",
      category: "Safety",
      x: 320,
      y: 190,
      w: 130,
      h: 70,
      color: "#ea580c",
      phone: "+910000000004",
      desc: "Central hydrant pump controls, emergency breathing apparatus, and fire alarm station."
    },
    {
      id: "assembly-point",
      name: "Emergency Assembly Point A",
      category: "Assembly",
      x: 520,
      y: 200,
      w: 140,
      h: 80,
      color: "#16a34a",
      phone: "+910000000001",
      desc: "Designated open green lawn for gathering safely during earthquake or fire evacuation."
    },
    {
      id: "hostel-block",
      name: "Student Hostels & Residential Block",
      category: "Hostel",
      x: 520,
      y: 50,
      w: 150,
      h: 90,
      color: "#7e22ce",
      phone: "+910000000006",
      desc: "Dormitories, dining halls, warden residential office, and 24/7 security gate."
    },
    {
      id: "it-centre",
      name: "IT Centre & Network Server Facility",
      category: "IT",
      x: 110,
      y: 50,
      w: 140,
      h: 80,
      color: "#0891b2",
      phone: "+910000000007",
      desc: "Main campus datacenter, network operations, computing labs, and student IT helpdesk."
    },
    {
      id: "substation",
      name: "Electrical Maintenance Substation",
      category: "Maintenance",
      x: 320,
      y: 50,
      w: 130,
      h: 70,
      color: "#d97706",
      phone: "+910000000008",
      desc: "High-voltage generator backup, power distribution transformers, and water pump motors."
    }
  ];

  // Draw on HTML5 Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    // Set fixed virtual resolution for sharp canvas rendering
    const width = 760;
    const height = 480;
    canvas.width = width;
    canvas.height = height;

    // Clear Canvas
    ctx.clearRect(0, 0, width, height);

    // 1. Campus Ground / Perimeter Background (fillRect)
    ctx.fillStyle = "#f1f5f9";
    ctx.fillRect(0, 0, width, height);

    // Outer Boundary Line (strokeRect)
    ctx.strokeStyle = "#94a3b8";
    ctx.lineWidth = 4;
    ctx.strokeRect(10, 10, width - 20, height - 20);

    // 2. Campus Internal Road Network (beginPath, moveTo, lineTo, stroke)
    ctx.strokeStyle = "#cbd5e1";
    ctx.lineWidth = 26;
    ctx.lineCap = "round";

    // Main Avenue (from Gate at bottom to top)
    ctx.beginPath();
    ctx.moveTo(160, 440);
    ctx.lineTo(160, 140);
    ctx.lineTo(600, 140);
    ctx.lineTo(600, 440);
    ctx.stroke();

    // Central crossroad
    ctx.beginPath();
    ctx.moveTo(160, 310);
    ctx.lineTo(600, 310);
    ctx.stroke();

    // Center dash line on roads
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 2;
    ctx.setLineDash([8, 8]);
    ctx.beginPath();
    ctx.moveTo(160, 430);
    ctx.lineTo(160, 140);
    ctx.lineTo(600, 140);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(160, 310);
    ctx.lineTo(600, 310);
    ctx.stroke();
    ctx.setLineDash([]); // Reset line dash

    // 3. Draw Green Garden / Safe Assembly Zone Area
    ctx.fillStyle = "#dcfce7";
    ctx.strokeStyle = "#16a34a";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect ? ctx.roundRect(500, 180, 180, 120, 12) : ctx.rect(500, 180, 180, 120);
    ctx.fill();
    ctx.stroke();

    // Assembly Point circular marker (arc)
    ctx.beginPath();
    ctx.arc(590, 240, 28, 0, 2 * Math.PI);
    ctx.fillStyle = "#15803d";
    ctx.fill();
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 3;
    ctx.stroke();

    // White Cross in Assembly Point (fillRect)
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(586, 224, 8, 32);
    ctx.fillRect(574, 236, 32, 8);

    // 4. Draw Buildings (fillRect, strokeRect, fillText)
    landmarks.forEach((building) => {
      if (building.id === "assembly-point") return; // Handled specially above

      // Shadow
      ctx.fillStyle = "rgba(0, 0, 0, 0.08)";
      ctx.fillRect(building.x + 4, building.y + 4, building.w, building.h);

      // Main Building Body (fillRect)
      ctx.fillStyle = building.color;
      ctx.fillRect(building.x, building.y, building.w, building.h);

      // Outline (strokeRect)
      ctx.strokeStyle = selectedPin?.id === building.id ? "#ffffff" : "#0f172a";
      ctx.lineWidth = selectedPin?.id === building.id ? 3 : 1.5;
      ctx.strokeRect(building.x, building.y, building.w, building.h);

      // Medical Red Cross Emblem if Medical Centre
      if (building.category === "Medical") {
        ctx.fillStyle = "#ffffff";
        ctx.beginPath();
        ctx.arc(building.x + 22, building.y + 22, 14, 0, 2 * Math.PI);
        ctx.fill();
        ctx.fillStyle = "#dc2626";
        ctx.fillRect(building.x + 19, building.y + 12, 6, 20);
        ctx.fillRect(building.x + 12, building.y + 19, 20, 6);
      }

      // Fire Icon Indicator if Fire Depot
      if (building.category === "Safety") {
        ctx.fillStyle = "#ffffff";
        ctx.beginPath();
        ctx.arc(building.x + 22, building.y + 22, 12, 0, 2 * Math.PI);
        ctx.fill();
        ctx.fillStyle = "#ea580c";
        ctx.font = "bold 13px Inter, sans-serif";
        ctx.fillText("F", building.x + 18, building.y + 26);
      }

      // Building Label Text (fillText)
      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 11px Inter, sans-serif";
      ctx.fillText(building.name.split(" ")[0] + " " + (building.name.split(" ")[1] || ""), building.x + 10, building.y + building.h - 14);
    });

    // 5. Draw Compass Rose / Legend (fillText, beginPath, lineTo)
    ctx.fillStyle = "#1e293b";
    ctx.font = "bold 13px Inter, sans-serif";
    ctx.fillText("N ↑", 710, 40);

    // North arrow
    ctx.strokeStyle = "#dc2626";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(720, 70);
    ctx.lineTo(720, 48);
    ctx.stroke();

    // Main Gate Arrow at bottom
    ctx.fillStyle = "#1e3a8a";
    ctx.font = "bold 12px Inter, sans-serif";
    ctx.fillText("ENTRANCE", 125, 465);
    ctx.beginPath();
    ctx.moveTo(160, 455);
    ctx.lineTo(160, 442);
    ctx.stroke();
  }, [selectedPin]);

  // Handle canvas clicks to inspect a landmark
  const handleCanvasClick = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    const clickX = (e.clientX - rect.left) * scaleX;
    const clickY = (e.clientY - rect.top) * scaleY;

    // Check hit test on landmarks
    const hit = landmarks.find(
      (b) =>
        clickX >= b.x &&
        clickX <= b.x + b.w &&
        clickY >= b.y &&
        clickY <= b.y + b.h
    );

    if (hit) {
      setSelectedPin(hit);
    } else {
      setSelectedPin(null);
    }
  };

  return (
    <div className="container py-4 map-page-wrapper">
      <div className="section-heading-wrapper mb-3">
        <div>
          <h1 className="h2 fw-bold text-navy mb-1">Campus Safety & Evacuation Map</h1>
          <p className="text-muted mb-0">
            Interactive HTML5 Canvas schematic showing assembly zones, fire response depots, and medical units.
          </p>
        </div>
      </div>

      {/* Mandatory Safety Notice */}
      <div className="map-disclaimer-alert">
        <i className="bi bi-exclamation-triangle-fill fs-4 text-warning"></i>
        <div>
          <strong>Demonstration Campus Safety Map – Not an Actual Evacuation Map</strong>
          <p className="mb-0 small">
            This map is rendered dynamically using the HTML5 2D Canvas API for academic curriculum demonstration. During a real campus crisis, obey physical floor wardens and illuminated exit signs.
          </p>
        </div>
      </div>

      <div className="row g-4">
        {/* Canvas Display Column */}
        <div className="col-lg-8">
          <div className="canvas-container">
            <canvas
              id="safetyCanvas"
              ref={canvasRef}
              onClick={handleCanvasClick}
              title="Click on any campus building to inspect details and dial helpline"
            />
          </div>
          <p className="small text-muted text-center">
            <i className="bi bi-cursor-fill me-1"></i> Tip: Click on any campus building on the canvas to inspect location details and direct contact number.
          </p>
        </div>

        {/* Legend & Selected Building Column */}
        <div className="col-lg-4">
          {/* Selected Building Card */}
          {selectedPin ? (
            <div className="card shadow-sm border-primary mb-4">
              <div className="card-header bg-primary text-white fw-bold d-flex justify-content-between align-items-center">
                <span>
                  <i className="bi bi-geo-alt-fill me-1"></i> {selectedPin.name}
                </span>
                <button
                  type="button"
                  className="btn-close btn-close-white btn-sm"
                  onClick={() => setSelectedPin(null)}
                  aria-label="Close"
                ></button>
              </div>
              <div className="card-body">
                <span className="badge bg-secondary mb-2">{selectedPin.category}</span>
                <p className="small text-muted mb-3">{selectedPin.desc}</p>
                <div className="d-grid">
                  <a href={`tel:${selectedPin.phone}`} className="btn btn-danger btn-sm fw-bold">
                    <i className="bi bi-telephone-fill me-1"></i> Call {selectedPin.phone}
                  </a>
                </div>
              </div>
            </div>
          ) : (
            <div className="card shadow-sm border-light mb-4 text-center p-3">
              <i className="bi bi-info-circle text-primary fs-3 mb-2"></i>
              <h6 className="fw-bold mb-1">Select a Landmark</h6>
              <p className="text-muted small mb-0">
                Click any zone on the canvas to display specific emergency instructions.
              </p>
            </div>
          )}

          {/* Color Code Legend */}
          <div className="map-legend-card">
            <h5>
              <i className="bi bi-palette-fill text-primary"></i> Map Color Legend
            </h5>
            <div className="legend-grid">
              <div className="legend-item">
                <div className="legend-color-box" style={{ background: "#1e3a8a" }}></div>
                <span>Campus Security / Gates</span>
              </div>
              <div className="legend-item">
                <div className="legend-color-box" style={{ background: "#dc2626" }}></div>
                <span>Medical Centre (Red Cross)</span>
              </div>
              <div className="legend-item">
                <div className="legend-color-box" style={{ background: "#ea580c" }}></div>
                <span>Fire & Safety Response</span>
              </div>
              <div className="legend-item">
                <div className="legend-color-box" style={{ background: "#16a34a" }}></div>
                <span>Emergency Assembly Point</span>
              </div>
              <div className="legend-item">
                <div className="legend-color-box" style={{ background: "#7e22ce" }}></div>
                <span>Student Hostels</span>
              </div>
              <div className="legend-item">
                <div className="legend-color-box" style={{ background: "#047857" }}></div>
                <span>Administration Block</span>
              </div>
              <div className="legend-item">
                <div className="legend-color-box" style={{ background: "#0891b2" }}></div>
                <span>IT Centre & Labs</span>
              </div>
              <div className="legend-item">
                <div className="legend-color-box" style={{ background: "#d97706" }}></div>
                <span>Substation / Maintenance</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// 4. Feedback Page Component
// ============================================================================
function FeedbackPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    category: "General Feedback",
    message: ""
  });

  const [errors, setErrors] = useState({});
  const [statusMessage, setStatusMessage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const feedbackCategories = [
    "General Feedback",
    "Incorrect Contact Information",
    "Emergency Contact Issue",
    "Suggestion",
    "Other"
  ];

  // JavaScript Form Validation
  const validateForm = () => {
    const errs = {};
    if (!formData.name.trim()) {
      errs.name = "Your full name is required.";
    }

    if (!formData.email.trim()) {
      errs.email = "Your email address is required.";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email.trim())) {
        errs.email = "Please provide a valid email format (e.g., student@campus.edu).";
      }
    }

    if (!formData.category) {
      errs.category = "Please select a feedback category.";
    }

    if (!formData.message.trim()) {
      errs.message = "Message cannot be empty.";
    } else if (formData.message.trim().length < 10) {
      errs.message = "Message must be at least 10 characters long.";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear field-specific validation error on change
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleReset = () => {
    setFormData({
      name: "",
      email: "",
      category: "General Feedback",
      message: ""
    });
    setErrors({});
    setStatusMessage(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setStatusMessage(null);

    try {
      // POST to PHP Backend API
      const response = await fetch(`${API_URL}?action=submit_feedback`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setStatusMessage({
          type: "success",
          text: data.message || "Thank you! Your feedback has been successfully submitted."
        });
        handleReset();
      } else {
        setStatusMessage({
          type: "danger",
          text: data.error || "Unable to submit feedback to server."
        });
      }
    } catch (err) {
      // Graceful offline demo submission fallback
      setStatusMessage({
        type: "success",
        text: `[Demo Mode] Feedback received locally: "${formData.message.slice(0, 35)}..." (To record directly in MySQL, ensure Apache/MySQL is running in XAMPP).`
      });
      handleReset();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container py-4">
      <div className="section-heading-wrapper mb-3">
        <div>
          <h1 className="h2 fw-bold text-navy mb-1">Submit Feedback & Report Contact Issues</h1>
          <p className="text-muted mb-0">
            Help us maintain directory accuracy. Report broken extensions, outdated numbers, or suggest safety improvements.
          </p>
        </div>
      </div>

      <div className="row g-4">
        {/* Form Column */}
        <div className="col-lg-8">
          <div className="feedback-card">
            {statusMessage && (
              <div className={`alert alert-${statusMessage.type} alert-dismissible fade show mb-4`} role="alert">
                <i className={`bi ${statusMessage.type === "success" ? "bi-check-circle-fill" : "bi-exclamation-triangle-fill"} me-2`}></i>
                {statusMessage.text}
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setStatusMessage(null)}
                  aria-label="Close"
                ></button>
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate>
              <div className="row g-3">
                {/* Name */}
                <div className="col-md-6">
                  <label htmlFor="feedbackName" className="form-label-custom">
                    Full Name <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    id="feedbackName"
                    name="name"
                    className={`form-control-custom ${errors.name ? "is-invalid" : ""}`}
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                  {errors.name && <span className="invalid-feedback-custom">{errors.name}</span>}
                </div>

                {/* Email */}
                <div className="col-md-6">
                  <label htmlFor="feedbackEmail" className="form-label-custom">
                    Email Address <span className="text-danger">*</span>
                  </label>
                  <input
                    type="email"
                    id="feedbackEmail"
                    name="email"
                    className={`form-control-custom ${errors.email ? "is-invalid" : ""}`}
                    placeholder="e.g., student@campus.edu"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                  {errors.email && <span className="invalid-feedback-custom">{errors.email}</span>}
                </div>

                {/* Category */}
                <div className="col-12">
                  <label htmlFor="feedbackCategory" className="form-label-custom">
                    Feedback Category <span className="text-danger">*</span>
                  </label>
                  <select
                    id="feedbackCategory"
                    name="category"
                    className={`form-select-custom ${errors.category ? "is-invalid" : ""}`}
                    value={formData.category}
                    onChange={handleInputChange}
                  >
                    {feedbackCategories.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                  {errors.category && <span className="invalid-feedback-custom">{errors.category}</span>}
                </div>

                {/* Message */}
                <div className="col-12">
                  <label htmlFor="feedbackMessage" className="form-label-custom">
                    Message Details <span className="text-danger">*</span>
                  </label>
                  <textarea
                    id="feedbackMessage"
                    name="message"
                    rows="5"
                    className={`form-control-custom ${errors.message ? "is-invalid" : ""}`}
                    placeholder="Describe the issue, specify the outdated phone extension, or share your suggestion..."
                    value={formData.message}
                    onChange={handleInputChange}
                  ></textarea>
                  {errors.message && <span className="invalid-feedback-custom">{errors.message}</span>}
                </div>
              </div>

              {/* Form Action Buttons */}
              <div className="form-actions-row">
                <button type="submit" className="btn-form-submit" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status"></span> Submitting...
                    </>
                  ) : (
                    <>
                      <i className="bi bi-send-fill"></i> Submit Feedback
                    </>
                  )}
                </button>
                <button type="button" className="btn-form-reset" onClick={handleReset}>
                  <i className="bi bi-x-circle me-1"></i> Reset Form
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Informational Sidebar */}
        <div className="col-lg-4">
          <div className="feedback-sidebar-card">
            <h5 className="fw-bold mb-3 text-navy">
              <i className="bi bi-shield-lock-fill text-primary me-2"></i> Verification Protocol
            </h5>
            <p className="small text-muted mb-3">
              All submitted helpline corrections are reviewed by the Campus Administration and Safety Committee before being updated in the directory.
            </p>
            <hr className="my-3 text-secondary" />
            <h6 className="fw-bold mb-2">Immediate Critical Hazards?</h6>
            <p className="small text-muted mb-3">
              Do not use this feedback form to report active emergencies such as ongoing fires or severe injuries. Please dial the emergency numbers directly:
            </p>
            <ul className="list-unstyled small mb-0">
              <li className="mb-2">
                <i className="bi bi-telephone-fill text-danger me-2"></i>
                <strong>Security:</strong> +91 00000 00001
              </li>
              <li className="mb-2">
                <i className="bi bi-telephone-fill text-danger me-2"></i>
                <strong>Ambulance:</strong> +91 00000 00003
              </li>
              <li>
                <i className="bi bi-telephone-fill text-danger me-2"></i>
                <strong>Fire Depot:</strong> +91 00000 00004
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// 5. Admin Page Component
// ============================================================================
function AdminPage({ contacts, onRefreshContacts }) {
  const [activeTab, setActiveTab] = useState("contacts"); // "contacts" | "add" | "feedback"
  const [editingContact, setEditingContact] = useState(null);
  const [adminNotification, setAdminNotification] = useState(null);
  const [feedbacks, setFeedbacks] = useState([]);
  const [loadingFeedbacks, setLoadingFeedbacks] = useState(false);

  // Form state for Add/Edit
  const [formData, setFormData] = useState({
    name: "",
    category: "Security",
    phone: "",
    email: "",
    location: "",
    available_hours: "24/7 Service",
    description: ""
  });

  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Load feedback list when switching to feedback tab
  useEffect(() => {
    if (activeTab === "feedback") {
      fetchFeedbackList();
    }
  }, [activeTab]);

  const fetchFeedbackList = async () => {
    setLoadingFeedbacks(true);
    try {
      const response = await fetch(`${API_URL}?action=get_feedback`);
      const data = await response.json();
      if (response.ok && data.success) {
        setFeedbacks(data.data || []);
      }
    } catch (e) {
      // Local fallback preview
      setFeedbacks([
        {
          id: 1,
          name: "Aarav Sharma",
          email: "aarav.sharma@campus.edu",
          category: "General Feedback",
          message: "The one-tap call button makes it easy to reach security during night lab hours.",
          created_at: "2026-10-10 14:32:00"
        },
        {
          id: 2,
          name: "Priya Patel",
          email: "priya.patel@campus.edu",
          category: "Suggestion",
          message: "Please ensure the hostel night-time emergency phone is highlighted during late hours.",
          created_at: "2026-10-11 09:15:20"
        }
      ]);
    } finally {
      setLoadingFeedbacks(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = "Contact name is required.";
    if (!formData.category.trim()) errs.category = "Category is required.";
    if (!formData.phone.trim()) errs.phone = "Phone number is required.";
    if (!formData.email.trim()) errs.email = "Email is required.";
    if (!formData.location.trim()) errs.location = "Campus location is required.";
    if (!formData.description.trim()) errs.description = "Description is required.";
    setFormErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleStartEdit = (contact) => {
    setEditingContact(contact);
    setFormData({
      name: contact.name,
      category: contact.category,
      phone: contact.phone,
      email: contact.email,
      location: contact.location,
      available_hours: contact.available_hours,
      description: contact.description
    });
    setActiveTab("add");
    window.scrollTo({ top: 120, behavior: "smooth" });
  };

  const handleCancelEdit = () => {
    setEditingContact(null);
    setFormData({
      name: "",
      category: "Security",
      phone: "",
      email: "",
      location: "",
      available_hours: "24/7 Service",
      description: ""
    });
    setActiveTab("contacts");
  };

  // Form Submit: Add or Edit Contact
  const handleSaveContact = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setAdminNotification(null);

    const isEdit = !!editingContact;
    const actionUrl = isEdit ? `${API_URL}?action=update_contact` : `${API_URL}?action=add_contact`;
    const payload = isEdit ? { ...formData, id: editingContact.id } : formData;

    try {
      const response = await fetch(actionUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const data = await response.json();

      if (response.ok && data.success) {
        setAdminNotification({
          type: "success",
          text: data.message || (isEdit ? "Contact updated successfully!" : "Contact added successfully!")
        });
        onRefreshContacts();
        handleCancelEdit();
      } else {
        setAdminNotification({
          type: "danger",
          text: data.error || "Failed to save contact."
        });
      }
    } catch (err) {
      // Offline fallback handling
      setAdminNotification({
        type: "info",
        text: `[Demo Mode] Simulated ${isEdit ? "update" : "creation"} for "${formData.name}". Connect XAMPP MySQL to persist permanently.`
      });
      handleCancelEdit();
    } finally {
      setIsSubmitting(false);
    }
  };

  // Delete Contact
  const handleDeleteContact = async (id, name) => {
    if (!window.confirm(`Are you sure you want to delete "${name}" from the directory?`)) {
      return;
    }

    try {
      const response = await fetch(`${API_URL}?action=delete_contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id })
      });
      const data = await response.json();

      if (response.ok && data.success) {
        setAdminNotification({
          type: "success",
          text: data.message || `Contact "${name}" deleted.`
        });
        onRefreshContacts();
      } else {
        setAdminNotification({
          type: "danger",
          text: data.error || "Failed to delete contact."
        });
      }
    } catch (err) {
      setAdminNotification({
        type: "info",
        text: `[Demo Mode] Simulated deletion of "${name}".`
      });
    }
  };

  return (
    <div className="container py-4">
      <div className="section-heading-wrapper mb-3">
        <div>
          <h1 className="h2 fw-bold text-navy mb-1">Campus Helpline Administration</h1>
          <p className="text-muted mb-0">
            Add new departments, update operational hours, or purge obsolete extensions.
          </p>
        </div>
      </div>

      {/* Mandatory Admin Security Warning */}
      <div className="admin-warning-card">
        <i className="bi bi-shield-exclamation fs-4"></i>
        <div>
          <strong>Educational Demonstration Interface:</strong> Demo Admin page has no authentication and must not be publicly exposed with real campus data.
        </div>
      </div>

      {/* Status Alert Notification */}
      {adminNotification && (
        <div className={`alert alert-${adminNotification.type} alert-dismissible fade show mb-4`} role="alert">
          <i className="bi bi-info-circle-fill me-2"></i>
          {adminNotification.text}
          <button
            type="button"
            className="btn-close"
            onClick={() => setAdminNotification(null)}
            aria-label="Close"
          ></button>
        </div>
      )}

      {/* Admin Navigation Tabs */}
      <div className="admin-tabs-nav">
        <button
          type="button"
          className={`admin-tab-btn ${activeTab === "contacts" ? "active" : ""}`}
          onClick={() => {
            setActiveTab("contacts");
            setEditingContact(null);
          }}
        >
          <i className="bi bi-list-ul"></i> Manage Contacts ({contacts.length})
        </button>
        <button
          type="button"
          className={`admin-tab-btn ${activeTab === "add" ? "active" : ""}`}
          onClick={() => setActiveTab("add")}
        >
          <i className={`bi ${editingContact ? "bi-pencil-square" : "bi-plus-circle-fill"}`}></i>
          {editingContact ? `Edit: ${editingContact.name}` : "Add New Contact"}
        </button>
        <button
          type="button"
          className={`admin-tab-btn ${activeTab === "feedback" ? "active" : ""}`}
          onClick={() => setActiveTab("feedback")}
        >
          <i className="bi bi-chat-left-quote-fill"></i> View Submitted Feedback
        </button>
      </div>

      {/* TAB 1: Contacts Table View */}
      {activeTab === "contacts" && (
        <div className="admin-table-card">
          <div className="table-responsive">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Contact Name</th>
                  <th>Category</th>
                  <th>Phone</th>
                  <th>Location</th>
                  <th>Hours</th>
                  <th className="text-end">Actions</th>
                </tr>
              </thead>
              <tbody>
                {contacts.map((c) => (
                  <tr key={c.id}>
                    <td>
                      <span className="badge bg-light text-dark">#{c.id}</span>
                    </td>
                    <td>
                      <strong>{c.name}</strong>
                      <div className="small text-muted">{c.email}</div>
                    </td>
                    <td>
                      <span className="badge bg-primary">{c.category}</span>
                    </td>
                    <td>
                      <a href={`tel:${c.phone}`} className="text-decoration-none fw-semibold">
                        {c.phone}
                      </a>
                    </td>
                    <td className="small">{c.location}</td>
                    <td className="small">{c.available_hours}</td>
                    <td className="text-end">
                      <div className="admin-action-btn-group justify-content-end">
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-primary"
                          onClick={() => handleStartEdit(c)}
                          title="Edit"
                        >
                          <i className="bi bi-pencil"></i>
                        </button>
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => handleDeleteContact(c.id, c.name)}
                          title="Delete"
                        >
                          <i className="bi bi-trash"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: Add or Edit Form */}
      {activeTab === "add" && (
        <div className="admin-form-card">
          <h4 className="fw-bold mb-3 text-navy">
            <i className={`bi ${editingContact ? "bi-pencil-square text-warning" : "bi-plus-circle text-primary"} me-2`}></i>
            {editingContact ? `Editing Contact #${editingContact.id}: ${editingContact.name}` : "Create New Helpline Contact"}
          </h4>

          <form onSubmit={handleSaveContact}>
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label-custom">
                  Contact / Department Name <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  className={`form-control-custom ${formErrors.name ? "is-invalid" : ""}`}
                  placeholder="e.g., Campus Ambulance Desk"
                  value={formData.name}
                  onChange={handleInputChange}
                />
                {formErrors.name && <span className="invalid-feedback-custom">{formErrors.name}</span>}
              </div>

              <div className="col-md-6">
                <label className="form-label-custom">
                  Category <span className="text-danger">*</span>
                </label>
                <select
                  name="category"
                  className="form-select-custom"
                  value={formData.category}
                  onChange={handleInputChange}
                >
                  {CATEGORIES.filter((c) => c !== "All").map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-md-6">
                <label className="form-label-custom">
                  Emergency Phone Number <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  name="phone"
                  className={`form-control-custom ${formErrors.phone ? "is-invalid" : ""}`}
                  placeholder="e.g., +910000000001"
                  value={formData.phone}
                  onChange={handleInputChange}
                />
                {formErrors.phone && <span className="invalid-feedback-custom">{formErrors.phone}</span>}
              </div>

              <div className="col-md-6">
                <label className="form-label-custom">
                  Official Email Address <span className="text-danger">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  className={`form-control-custom ${formErrors.email ? "is-invalid" : ""}`}
                  placeholder="e.g., helpline@campus.edu"
                  value={formData.email}
                  onChange={handleInputChange}
                />
                {formErrors.email && <span className="invalid-feedback-custom">{formErrors.email}</span>}
              </div>

              <div className="col-md-6">
                <label className="form-label-custom">
                  Campus Physical Location <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  name="location"
                  className={`form-control-custom ${formErrors.location ? "is-invalid" : ""}`}
                  placeholder="e.g., Health & Wellness Pavilion, Block B"
                  value={formData.location}
                  onChange={handleInputChange}
                />
                {formErrors.location && <span className="invalid-feedback-custom">{formErrors.location}</span>}
              </div>

              <div className="col-md-6">
                <label className="form-label-custom">
                  Operational / Available Hours <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  name="available_hours"
                  className="form-control-custom"
                  placeholder="e.g., 24/7 Service or 9:00 AM - 5:00 PM"
                  value={formData.available_hours}
                  onChange={handleInputChange}
                />
              </div>

              <div className="col-12">
                <label className="form-label-custom">
                  Description & Scope of Services <span className="text-danger">*</span>
                </label>
                <textarea
                  name="description"
                  rows="3"
                  className={`form-control-custom ${formErrors.description ? "is-invalid" : ""}`}
                  placeholder="Describe emergency scope, assistance steps, and student services..."
                  value={formData.description}
                  onChange={handleInputChange}
                ></textarea>
                {formErrors.description && <span className="invalid-feedback-custom">{formErrors.description}</span>}
              </div>
            </div>

            <div className="form-actions-row">
              <button type="submit" className="btn-form-submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2"></span> Saving...
                  </>
                ) : (
                  <>
                    <i className="bi bi-save-fill me-1"></i> {editingContact ? "Update Contact" : "Save New Contact"}
                  </>
                )}
              </button>
              {editingContact && (
                <button type="button" className="btn-form-reset" onClick={handleCancelEdit}>
                  Cancel Edit
                </button>
              )}
            </div>
          </form>
        </div>
      )}

      {/* TAB 3: Submitted Feedback View */}
      {activeTab === "feedback" && (
        <div className="admin-table-card">
          <div className="p-3 border-bottom d-flex justify-content-between align-items-center bg-light">
            <h6 className="mb-0 fw-bold">Recent Student & Staff Reports</h6>
            <button type="button" className="btn btn-sm btn-outline-secondary" onClick={fetchFeedbackList}>
              <i className="bi bi-arrow-clockwise me-1"></i> Refresh
            </button>
          </div>
          {loadingFeedbacks ? (
            <div className="p-5 text-center text-muted">
              <span className="spinner-border spinner-border-sm me-2"></span> Loading feedback...
            </div>
          ) : feedbacks.length > 0 ? (
            <div className="table-responsive">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>User</th>
                    <th>Category</th>
                    <th>Message</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {feedbacks.map((f) => (
                    <tr key={f.id}>
                      <td>#{f.id}</td>
                      <td>
                        <strong>{f.name}</strong>
                        <div className="small text-muted">{f.email}</div>
                      </td>
                      <td>
                        <span className="badge bg-secondary">{f.category}</span>
                      </td>
                      <td style={{ maxWidth: "350px" }}>{f.message}</td>
                      <td className="small text-muted">{f.created_at || "Recent"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-5 text-center text-muted">No feedback records found.</div>
          )}
        </div>
      )}
    </div>
  );
}

// ============================================================================
// Main Application Component with Router
// ============================================================================
export default function App() {
  const [contacts, setContacts] = useState(INITIAL_DEMO_CONTACTS);
  const [isSOSOpen, setIsSOSOpen] = useState(false);
  const [backendStatus, setBackendStatus] = useState("checking"); // "connected" | "demo" | "checking"

  // Fetch contacts from PHP/MySQL backend on component mount
  const fetchContacts = async () => {
    try {
      const response = await fetch(`${API_URL}?action=get_contacts`);
      if (response.ok) {
        const data = await response.json();
        if (data.success && Array.isArray(data.data) && data.data.length > 0) {
          setContacts(data.data);
          setBackendStatus("connected");
          return;
        }
      }
      setBackendStatus("demo");
    } catch (err) {
      // Graceful fallback to demo contacts when XAMPP/PHP is not running
      setBackendStatus("demo");
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  return (
    <Router>
      {/* Top Academic Demonstration Notice */}
      <div className="demo-top-banner">
        <span>
          <i className="bi bi-info-circle-fill me-1"></i>
          <strong>Academic Showcase:</strong> Virtual Emergency Campus Helpline Directory •{" "}
          {backendStatus === "connected" ? (
            <span className="text-success fw-bold">
              <i className="bi bi-database-check me-1"></i> Live MySQL Database Connected
            </span>
          ) : (
            <span>
              <i className="bi bi-laptop me-1"></i> Offline Demo Mode Active (Start Apache & MySQL in XAMPP for Live Database)
            </span>
          )}
        </span>
      </div>

      {/* Navigation Bar */}
      <Navbar onOpenSOS={() => setIsSOSOpen(true)} />

      {/* Main Content Area */}
      <main className="app-content">
        <Routes>
          <Route
            path="/"
            element={<HomePage contacts={contacts} onOpenSOS={() => setIsSOSOpen(true)} />}
          />
          <Route
            path="/directory"
            element={<DirectoryPage contacts={contacts} onOpenSOS={() => setIsSOSOpen(true)} />}
          />
          <Route path="/safety-map" element={<SafetyMapPage />} />
          <Route path="/feedback" element={<FeedbackPage />} />
          <Route
            path="/admin"
            element={<AdminPage contacts={contacts} onRefreshContacts={fetchContacts} />}
          />
        </Routes>
      </main>

      {/* Reusable Emergency SOS Modal */}
      <SOSModal isOpen={isSOSOpen} onClose={() => setIsSOSOpen(false)} />

      {/* Application Footer */}
      <Footer onOpenSOS={() => setIsSOSOpen(true)} />
    </Router>
  );
}
