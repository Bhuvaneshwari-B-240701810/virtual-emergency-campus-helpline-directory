# Virtual Emergency Campus Helpline Directory

A complete, responsive, full-stack college Web Programming and viva project built using **HTML5, CSS3, JavaScript, Bootstrap 5, ReactJS, PHP, and MySQL**.

The application helps students, faculty, and campus staff quickly find and contact critical campus services such as Campus Security, Medical Centre, Emergency Ambulance, Fire and Safety, Women's Helpline, Hostel Wardens, IT Support, Electrical Maintenance, Campus Administration, and Transport Helpdesk.

---

## 1. Project Overview

During campus emergencies or urgent logistical situations, finding verified department extensions and direct contact personnel quickly is vital. The **Virtual Emergency Campus Helpline Directory** provides an intuitive, high-visibility, single-page web directory featuring:

- Direct click-to-call (`tel:`) and click-to-email (`mailto:`) actions.
- Real-time search and multi-category filtering.
- An instant emergency **SOS Popup** for high-priority numbers.
- An interactive **HTML5 Canvas Campus Safety Map** showing assembly points and fire depots.
- A **Feedback & Issue Reporting Form** with client-side JavaScript validation.
- An **Admin Management Portal** to add, edit, and delete contacts directly from MySQL.
- Seamless fallback demo mode for offline viva presentations.

---

## 2. Objectives

- **Fast Accessibility**: Ensure any campus user can locate and dial emergency numbers in fewer than two taps.
- **Academic Demonstration**: Demonstrate core syllabus topics (DOM manipulation, Canvas drawing, React State/Hooks, Fetch API, PHP REST routing, and MySQL relational persistence).
- **Simplicity & Compactness**: Maintain a clean, consolidated codebase (minimizing file proliferation) to ensure easy understanding during viva evaluations.

---

## 3. Features

1. **Emergency Banner & SOS Modal**:
   - Quick dial buttons for Security, Medical Centre, and Ambulance.
   - High-visibility SOS button opening a dedicated modal dialog with top-level crisis contacts.
2. **Real-time Search & Filtering**:
   - Instant search by contact name, department, campus location, or description.
   - Department filter pills: *All, Security, Medical, Safety, Hostel, IT, Maintenance, Administration, Transport*.
   - Combined search and category filtering with a "Clear Search" button and empty state handling.
3. **Contact Cards**:
   - Color-coded department tags, physical building locations, available hours, and direct `tel:` & `mailto:` links.
4. **HTML5 Canvas Safety Map**:
   - 2D Canvas rendering demonstrating `fillRect()`, `strokeRect()`, `fillText()`, `beginPath()`, `moveTo()`, `lineTo()`, and `arc()`.
   - Landmarks: Main Gate, Medical Centre, Fire Depot, Emergency Assembly Point, Hostels, Admin Block, and IT Centre.
   - Interactive click detection showing location details and direct call buttons.
5. **Feedback & Issue Reporting**:
   - Form fields: Name, Email, Category, and Message.
   - Client-side validation: required field checks, regular expression email verification, and length validation.
   - Submits to PHP backend API (`?action=submit_feedback`).
6. **Admin Contact Management**:
   - Full CRUD: View, Add, Edit, and Delete contacts.
   - Auto-refreshes directory data after every change.
   - Tab to inspect student-submitted feedback and issue reports.

---

## 4. Technologies Used

### Frontend
- **HTML5**: Semantic document structure in `public/index.html`.
- **CSS3**: Unified stylesheet in `src/styles.css` utilizing Flexbox, CSS Grid, positioning, transitions, and media queries.
- **JavaScript (ES6+)**: Fetch API, DOM event handling, Regex validation, Canvas 2D API.
- **Bootstrap 5**: Responsive layout grid, navbar, form controls, and icons.
- **ReactJS (v18+)**: Functional components, JSX, `useState`, `useEffect`, `useRef`.
- **React Router (v6+)**: Client-side navigation (`/`, `/directory`, `/safety-map`, `/feedback`, `/admin`).

### Backend & Database
- **PHP 7.4+ / 8.x**: RESTful API routing, input sanitation, CORS handling, and MySQLi prepared statements.
- **MySQL 5.7+ / 8.x**: Relational database storage with `contacts` and `feedback` tables.

---

## 5. Folder Structure

The project strictly follows a compact 12-file structure to prevent file bloat and simplify evaluation:

```text
virtual-emergency-campus-helpline/
│
├── frontend/
│   ├── public/
│   │   └── index.html        # Main HTML5 document with Bootstrap & Fonts CDN
│   │
│   ├── src/
│   │   ├── App.js            # React Router, Page components (Home, Directory, Map, Feedback, Admin)
│   │   ├── index.js          # React DOM entry point
│   │   ├── components.js     # Reusable components (Navbar, Footer, EmergencyBanner, SOSModal, ContactCard, SearchBar, CategoryFilter)
│   │   └── styles.css        # Consolidated stylesheet with labelled sections
│   │
│   └── package.json          # Frontend dependencies and npm scripts
│
├── backend/
│   ├── api.php               # Unified PHP API router for all CRUD and feedback operations
│   └── db.php                # Database connection with safe MySQL error handling
│
├── database/
│   └── campus_helpline.sql   # Database schema and sample data
│
└── README.md                 # Complete documentation and viva guide
```

---

## 6. Prerequisites

To run this project, make sure you have:
1. **Node.js** (v16.0 or higher) & **npm** installed.
2. **XAMPP**, **WAMP**, or **LAMP** with Apache and MySQL.

---

## 7. Setup & Installation Guide

### Step 1: Clone or Place Project in htdocs
For the PHP backend to work with Apache, place the project folder inside your web server directory:
```text
C:\xampp\htdocs\virtual-emergency-campus-helpline
```

### Step 2: Database Setup in phpMyAdmin
1. Open XAMPP Control Panel and start **Apache** and **MySQL**.
2. Open your browser and navigate to:
   ```text
   http://localhost/phpmyadmin
   ```
3. Click on the **Import** tab.
4. Choose the file located at:
   ```text
   database/campus_helpline.sql
   ```
5. Click **Import** (or **Go**).
   - This creates the `campus_helpline` database.
   - Creates the `contacts` and `feedback` tables.
   - Inserts 10 sample emergency helpline contacts and demo feedback records.

### Step 3: Verify the PHP Backend
Test the API endpoint in your browser:
```text
http://localhost/virtual-emergency-campus-helpline/backend/api.php?action=get_contacts
```
You should see a JSON response containing the sample campus contacts:
```json
{
  "success": true,
  "count": 10,
  "data": [ ... ]
}
```

### Step 4: Run the React Frontend
1. Open a terminal or command prompt.
2. Navigate to the `frontend` folder:
   ```bash
   cd frontend
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm start
   ```
5. The application will open in your browser at:
   ```text
   http://localhost:3000
   ```

---

## 8. API URL Configuration

The API URL is defined at the top of [`frontend/src/App.js`](frontend/src/App.js):

```javascript
export const API_URL = "http://localhost/virtual-emergency-campus-helpline/backend/api.php";
```

- If your XAMPP runs on a different port (e.g. `8080`), change it to:
  ```javascript
  export const API_URL = "http://localhost:8080/virtual-emergency-campus-helpline/backend/api.php";
  ```
- If running React on port 3000 and Apache on port 80, CORS headers are already pre-configured in `backend/api.php`.

---

## 9. Testing & Verification Checklist

| Test Item | Action | Expected Result |
|---|---|---|
| **Homepage** | Open `http://localhost:3000` | Hero section, Emergency banner, and Department categories load. |
| **SOS Modal** | Click "SOS HELPLINE" in Navbar or "Open SOS Popup" | Modal dialog appears with high z-index and direct call buttons. |
| **Directory Search** | Type "Ambulance" or "Main Gate" | Matching cards appear in real time. |
| **Category Filter** | Click "Medical" or "Hostel" filter pills | Only contacts from that department are displayed. |
| **Combined Search** | Select "Safety" and search "Fire" | Displays fire safety contact card. |
| **Clear Search** | Click "Clear all filters" | Resets filters and displays all contacts. |
| **Click-to-Call** | Click "Call Now" on any card | Initiates device telephone dialer via `tel:` URI. |
| **Click-to-Email** | Click "Email" on any card | Opens default email client via `mailto:` URI. |
| **Safety Map** | Navigate to `/safety-map` | Canvas renders roads, buildings, and assembly points. Clicking a building shows details. |
| **Feedback Form** | Submit empty form on `/feedback` | Client-side validation displays error highlights. |
| **Feedback Submit** | Enter valid data and submit | Shows success alert and stores record in MySQL `feedback` table. |
| **Admin Add** | Go to `/admin`, fill "Add New Contact" | New contact appears in table and directory after reload. |
| **Admin Edit** | Click "Edit" on a contact, change phone | Updated information persists in database. |
| **Admin Delete** | Click "Delete" on a contact | Contact is removed from directory and database. |

---

## 10. Limitations & Safety Disclaimer

- **Fictional Demonstration Numbers**: All phone numbers (e.g., `+91 00000 00001`) and email addresses are fictional placeholders for academic evaluation.
- **Local SOS Modal**: The SOS popup is a local browser notification dialog; it does not automatically dispatch municipal emergency services (911/112/police).
- **Admin Authentication**: The Admin portal is built without authentication to satisfy simple college project requirements. It should not be exposed to the public internet with real university data.

---

## 11. Syllabus Topic Mapping

| Syllabus Topic | Project Implementation & File Reference |
|---|---|
| **HTML5** | Semantic structure, meta tags, and root container in [`public/index.html`](frontend/public/index.html). |
| **CSS3** | Box model, Flexbox, Grid, custom properties, and media queries in [`src/styles.css`](frontend/src/styles.css). |
| **JavaScript** | Event handlers, regex email validation, and filtering algorithms in [`src/App.js`](frontend/src/App.js). |
| **HTML5 Canvas** | 2D procedural rendering (`fillRect`, `strokeRect`, `fillText`, `arc`, `lineTo`) in `SafetyMapPage`. |
| **Bootstrap 5** | Responsive grid (`col-lg-4 col-md-6 col-12`), navbar, buttons, and alert components. |
| **React JSX & Components** | Modular UI components in [`src/components.js`](frontend/src/components.js) and [`src/App.js`](frontend/src/App.js). |
| **Props & State** | Data passing to `ContactCard`, UI state management using `useState`. |
| **React Hooks** | `useState` for search/filter/modals, `useEffect` for data loading, `useRef` for Canvas. |
| **React Router** | Client-side page navigation with dynamic search query parameters (`useSearchParams`). |
| **Fetch API** | Asynchronous HTTP communication with PHP backend using native `fetch()`. |
| **PHP** | RESTful routing, CORS headers, and MySQLi prepared statements in [`backend/api.php`](backend/api.php). |
| **MySQL** | Relational tables (`contacts`, `feedback`) with foreign keys and auto-increment IDs in [`database/campus_helpline.sql`](database/campus_helpline.sql). |
| **Telephony Protocols** | Standard mobile URI protocols: `tel:` and `mailto:`. |

---

## 12. Viva Q&A Guide for Students

### Q1: Why did we consolidate the files into a compact structure?
**Answer:** In small-to-medium web projects and college viva evaluations, spreading 10 lines of code across 30 separate files makes debugging and code walkthroughs difficult. Placing shared reusable components in `components.js`, pages in `App.js`, styling in `styles.css`, and API routing in `api.php` keeps the codebase cohesive, readable, and easy to present.

### Q2: How does React communicate with the PHP backend?
**Answer:** The React frontend uses the browser's native `fetch()` API to send asynchronous HTTP requests (GET, POST, etc.) to `backend/api.php?action=...`. PHP processes the request, queries MySQL using prepared statements, and returns a JSON payload. React parses the JSON and updates its component state via `useState()`.

### Q3: How does the search and category filtering work together in real-time?
**Answer:** In `DirectoryPage`, we maintain two state variables: `searchText` and `selectedCategory`. Whenever either changes, the `.filter()` method runs on the contacts array:
```javascript
const filtered = contacts.filter(contact => {
  const matchesCat = selectedCategory === "All" || contact.category === selectedCategory;
  const matchesSearch = contact.name.toLowerCase().includes(query) || ...;
  return matchesCat && matchesSearch;
});
```
This multi-condition evaluation ensures search and category filters operate seamlessly together.

### Q4: How is the Campus Safety Map drawn without external map APIs like Google Maps?
**Answer:** The map uses the native HTML5 Canvas 2D API (`<canvas id="safetyCanvas">`). Inside a `useEffect` hook, we obtain the 2D rendering context (`canvas.getContext("2d")`) and execute procedural draw commands:
- `fillRect()` and `strokeRect()` to draw grounds and buildings.
- `beginPath()`, `moveTo()`, and `lineTo()` to draw the road grid.
- `arc()` to draw circular landmarks and assembly points.
- `fillText()` to label each zone.
- Canvas mouse coordinates are mapped to detect user clicks on specific buildings.

### Q5: How are SQL injection attacks prevented in PHP?
**Answer:** All database operations in `backend/api.php` use **prepared statements** (`$conn->prepare()` and `$stmt->bind_param()`), which separate SQL code from user-supplied input data, completely neutralizing SQL injection risks.

---

## 13. Future Enhancements

- Role-based JWT authentication for administrative staff.
- Push notifications via Service Workers for real-time campus disaster alerts.
- GPS geolocation distance calculation to highlight the nearest emergency exit.
- Multi-language support (English, Hindi, regional languages) for student diversity.
