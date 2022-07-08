import React from "react";
import { Link } from "react-router-dom";
import { signInWithGoogle } from "../../firebase";

import HeaderStyles from "./Header.module.css";

const Header = () => {
  return (
    <header>
      <nav>
        <div className="hamburger">
          <Link to="/" className="btn-secondary">
            <span className="material-symbols-outlined">menu</span>
          </Link>
        </div>
        <ul className={HeaderStyles.primaryAction}>
          <li className={HeaderStyles.action}>
            <Link to="/find-activities" className="btn-secondary">
              <span className="material-symbols-outlined">search</span>Find Activities
            </Link>
          </li>
          <li className={HeaderStyles.action}>
            <Link to="add-activity" className="btn-secondary">
              <span className="material-symbols-outlined">add</span>Add Activities
            </Link>
          </li>
        </ul>
        <div className={HeaderStyles.signIn}>
          <Link to="signup-page" className="btn-secondary" style={{ minHeight: "38px" }}>
            Log In
          </Link>
          {/*<button onClick={signInWithGoogle}>Sign in With Google</button>*/}
        </div>
      </nav>
    </header>
  );
};

export default Header;
