import React from "react";
import ReactDom from "react-dom";

function Footer()
{
    const date = new Date().getFullYear();

    return(
        <footer>
            <p>copyright {date}</p>
        </footer>
    );
}

export default Footer;