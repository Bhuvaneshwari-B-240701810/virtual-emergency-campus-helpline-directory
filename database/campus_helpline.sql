-- ============================================================================
-- Virtual Emergency Campus Helpline Directory
-- Database Schema & Sample Data
-- Database: campus_helpline
-- ============================================================================

-- Create Database
CREATE DATABASE IF NOT EXISTS `campus_helpline` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `campus_helpline`;

-- ----------------------------------------------------------------------------
-- Table: contacts
-- Stores campus emergency, administrative, and departmental helpline contacts
-- ----------------------------------------------------------------------------
DROP TABLE IF EXISTS `contacts`;
CREATE TABLE `contacts` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(100) NOT NULL,
  `category` VARCHAR(50) NOT NULL,
  `phone` VARCHAR(20) NOT NULL,
  `email` VARCHAR(100) NOT NULL,
  `location` VARCHAR(150) NOT NULL,
  `available_hours` VARCHAR(50) NOT NULL,
  `description` TEXT NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------------------------------------------------------
-- Table: feedback
-- Stores student and staff feedback submissions
-- ----------------------------------------------------------------------------
DROP TABLE IF EXISTS `feedback`;
CREATE TABLE `feedback` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(100) NOT NULL,
  `email` VARCHAR(100) NOT NULL,
  `category` VARCHAR(50) NOT NULL,
  `message` TEXT NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------------------------------------------------------
-- Sample Data: contacts (Fictional Demonstration Numbers: +91 00000 0000X)
-- ----------------------------------------------------------------------------
INSERT INTO `contacts` (`id`, `name`, `category`, `phone`, `email`, `location`, `available_hours`, `description`) VALUES
(1, 'Campus Security Main Gate', 'Security', '+910000000001', 'security@campus.edu', 'Main Gate Security Complex, Gate 1', '24/7 Service', 'Primary round-the-clock campus security, gate control, immediate incident response, and patrol services.'),
(2, 'Campus Medical Centre', 'Medical', '+910000000002', 'medical@campus.edu', 'Health & Wellness Pavilion, Block B', '24/7 Emergency / OPD 8 AM - 8 PM', 'Immediate first aid, doctor consultation, acute care triage, and university pharmacy access.'),
(3, 'Emergency Ambulance Service', 'Medical', '+910000000003', 'ambulance@campus.edu', 'Medical Centre Ambulance Bay', '24/7 On-Call', 'Dedicated critical patient transit vehicle equipped with emergency oxygen and paramedic support.'),
(4, 'Fire & Disaster Safety Unit', 'Safety', '+910000000004', 'fire.safety@campus.edu', 'Safety Depot, Near Assembly Point A', '24/7 Rapid Response', 'Fire alarms, extinguisher inspection, hazardous chemical spill response, and disaster management.'),
(5, 'Women''s Safety & Counseling Cell', 'Safety', '+910000000005', 'womenscell@campus.edu', 'Student Welfare Center, Room 104', '24/7 Helpline', 'Confidential helpline for female students, faculty, and staff, offering psychological support and anti-harassment escalation.'),
(6, 'Chief Hostel Warden Office', 'Hostel', '+910000000006', 'warden@campus.edu', 'Central Hostel Administration Block', '6:00 AM - 11:00 PM (Emergency 24/7)', 'Hostel accommodation issues, night curfew assistance, room emergencies, and residential discipline.'),
(7, 'IT & Campus Network Helpdesk', 'IT', '+910000000007', 'itsupport@campus.edu', 'Computer Centre, 2nd Floor', '8:00 AM - 8:00 PM', 'Assistance with campus Wi-Fi authentication, LMS portal access, exam portal issues, and lab workstation support.'),
(8, 'Electrical & Water Maintenance', 'Maintenance', '+910000000008', 'maintenance@campus.edu', 'Engineering Substation, Utility Yard', '24/7 Emergency Repairs', 'Campus power failure restoration, electrical hazards, water supply outages, and plumbing breakdown repairs.'),
(9, 'Campus Administration Office', 'Administration', '+910000000009', 'admin@campus.edu', 'Administrative Block, Ground Floor', '9:00 AM - 5:00 PM (Mon-Sat)', 'Official verification, student notices, lost-and-found repository, and academic affairs administration.'),
(10, 'Campus Transport & Shuttle Desk', 'Transport', '+910000000010', 'transport@campus.edu', 'Transit Terminal, South Gate', '6:30 AM - 10:30 PM', 'Campus shuttle schedules, emergency student night transit, bus pass inquiries, and driver dispatch.');

-- ----------------------------------------------------------------------------
-- Sample Data: feedback
-- ----------------------------------------------------------------------------
INSERT INTO `feedback` (`id`, `name`, `email`, `category`, `message`, `created_at`) VALUES
(1, 'Aarav Sharma', 'aarav.sharma@campus.edu', 'General Feedback', 'The directory is very intuitive. The one-tap call button makes it easy to reach security during night labs.', '2026-10-10 14:32:00'),
(2, 'Priya Patel', 'priya.patel@campus.edu', 'Suggestion', 'Please make sure the hostel night-time emergency phone is highlighted during late hours.', '2026-10-11 09:15:20');
