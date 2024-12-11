import { Link } from "react-router-dom";
import { useState } from "react";
import "../css/Header.css";

function Header({ selectedPlatform, setSelectedPlatform }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const platforms = [
    { name: "Twitter", icon: "../assets/twitter_icon.svg" },
    { name: "Telegram", icon: "../assets/telegram_icon.svg" },
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="header">
      <button className="menu-toggle" onClick={toggleMenu}>
        ☰
      </button>
      <h1 className="app-title">Columbus</h1>
      <nav className={`nav-links ${isMenuOpen ? "open" : ""}`}>
        <Link to="/admin" className="nav-link">
          Admin Panel
        </Link>
        <Link to="/" className="nav-link">
          Dashboard
        </Link>
      </nav>
      <div className="platform-dropdown">
        <button className="dropdown-button">{selectedPlatform}</button>
        <div className="dropdown-content">
          {platforms.map((platform) => (
            <a
              key={platform.name}
              href="#"
              onClick={() => setSelectedPlatform(platform.name)}
            >
              {platform.logo} {platform.name}
            </a>
          ))}
        </div>
      </div>
    </header>
  );
}

export default Header;
