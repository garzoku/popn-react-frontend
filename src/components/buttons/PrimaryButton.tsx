import React from "react";
import style from "./PrimaryButton.module.css";

type data = {
  text: String;
  link?: String;
};

const PrimaryButton = ({ text }: data) => {
  return (
    <a className={style.button} href="www.dogs.com">
      {text}
    </a>
  );
};

export default PrimaryButton;
