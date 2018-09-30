import React from 'react';
import "./Partials.css";

const Footer = (props) => {
    return (
        <footer>
            <div>
            {new Date().getFullYear()} Copyright &#169; Kristina Butkovic
            </div>
        </footer>
    );
};

export default Footer;  