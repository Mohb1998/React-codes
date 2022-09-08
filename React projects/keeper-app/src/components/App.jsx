import React from "react";
import ReactDom from "react-dom";

import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import Note from "./Note.jsx";

function App()
{
    return(
        <div>
            <Header />
            <Note />
            <Footer />
        </div>
    );
        
}

export default App;