import React from "react";
// import { FaGithub } from "react-icons/fa";

const styles = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  padding: "25px",
  background: "#FFFCF8",
};

const Footer = () => {
  return (
    <div style={styles}>
      <p>
        you made tasty 🍔, loved it ?{" "}
        <span>
          add some new features -{" "}
          <a href="">
            {<div
              style={{
                fontSize: "1.5em",
                cursor: "pointer",
                marginBottom: "-5px",
              }}
            />}
          </a>{" "}
        </span>
      </p>
      <h3>
        Developed with ❤️ by{" "}
        <a
          href="https://github.com/MehrdadWeb"
          style={{ textDecoration: "none", borderBottom: "2px solid #E8833E" }}
        >
          Mehrdad Mohammadi
        </a>{" "}
      </h3>
    </div>
  );
};

export default Footer;

