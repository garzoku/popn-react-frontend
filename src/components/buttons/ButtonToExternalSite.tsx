import React from "react";
import style from "./OrangeButton.module.css";

type data = {
  text: string;
  link: string;
};

const ButtonToExternalSite = ({ text, link }: data) => {
  return (
    <a className={style.button} href={link} target="_blank" rel="noreferrer">
      {text}
    </a>
  );
};

export default ButtonToExternalSite;
