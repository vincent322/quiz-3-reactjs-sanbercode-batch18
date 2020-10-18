import React from "react";

const Footer = () => {
  const dates = new Date();
  return (
    <footer className="footer">
      <h5 className="text-center">
        copyright &copy; {dates.getFullYear()} by Sanbercode
      </h5>
    </footer>
  );
};

export default Footer;