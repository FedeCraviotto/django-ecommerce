import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
     <div className="not-found">
        <h1>NotFound</h1>
        <p>The requested page does not exists</p>
        <Link to='/' className='text-decoration-none'>Back to Home</Link>
     </div>   
    )
}

export default NotFound;