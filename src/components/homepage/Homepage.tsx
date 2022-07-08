import React from "react";
import style from "./Homepage.module.css";
import { Anchor } from "react-bootstrap";

const Homepage = () => {
  return (
    <>
      <div className={style.homepageContainer}>
        <h2>Welcome, {localStorage.getItem("name")}</h2>
        <div className={style.homepageMain}>
          <div className={style.popnLogoLarge}>
            <div className={style.popnBackground}>
              <p className={style.popnLogoText}>Popn</p>
            </div>
          </div>
          <div className={style.heroContainer}>
            <div>
              <img className={style.heroImage} src="https://www.offlimit.co.za/wp-content/gallery/fanta_funometer/fant-12.jpg" alt="Fanta event" />
            </div>
            <div className={style.heroContent}>
              <div className={style.heroTitle}>
                <h2>Fanta Festival</h2>
                <ul>
                  <li>
                    <Anchor className="btn-primary">Check it Out!</Anchor>
                  </li>
                </ul>
              </div>
              <div className={style.heroDescription}>
                <p>Don't you wanna Fanta?</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={style.homepageText}>
        <p>Find fun things to do, curated and reviewed by people like you, all through the power of crowdsourcing.</p>
      </div>
    </>
  );
};

export default Homepage;
