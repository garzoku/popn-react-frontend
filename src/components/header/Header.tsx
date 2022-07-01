import React from "react";
import { Link } from "react-router-dom";

import HeaderStyles from "./Header.module.css";

const Header = () => {
  return (
    <header>
      <nav>
        <div className="hamburger">
          <Link to="/" className={HeaderStyles.button}>
            <span className="material-symbols-outlined">menu</span>
          </Link>
        </div>
        <ul className={HeaderStyles.primaryAction}>
          <li className={HeaderStyles.action}>
            <Link to="/find-activities" className={HeaderStyles.button}>
              <span className="material-symbols-outlined">search</span>Find Activities
            </Link>
          </li>
          <li className={HeaderStyles.action}>
            <a href="add-activity" className={HeaderStyles.button}>
              <span className="material-symbols-outlined">add</span>Add Activities
            </a>
          </li>
        </ul>
        <div className={HeaderStyles.favicon}>
          <a href="find-whats-popn">Popn</a>
        </div>
      </nav>
    </header>
  );
};

export default Header;
