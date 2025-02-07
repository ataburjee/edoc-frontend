import React from 'react';
import logo from '../assets/edoc_logo.gif';
import dummyProfile from '../assets/dummy_profile_image.jpg';
import '../styles/Navbar.css';

export default function Navbar() {
  return (
    <div>
      <header className="toolbar">
        <img src={logo} alt="E-Doc Logo" />
        <div className="share-user">
          <div className="user-profile">
            <span>Unknown</span>
            <img src={dummyProfile} alt="User Profile" />
          </div>
        </div>
      </header>
    </div>
  )
}
