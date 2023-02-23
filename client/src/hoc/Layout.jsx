import React from 'react';
import Navbar from '../components/Navbar';
import { Helmet, HelmetProvider } from 'react-helmet-async'; 
// Habilita a recibir title y content metatags
// Podemos borrar los del index.html
// Using async version of react-helmet because of errors

const Layout = ({ title, content, children }) => (
    <>
    <HelmetProvider>
    <Helmet>
        <title>Showtech | {title}</title>
        <meta name='description' content={content}/>
    </Helmet>
    <Navbar />
    <div className="container">
        {children}
    </div>
    </HelmetProvider>
    </>
)

export default Layout;