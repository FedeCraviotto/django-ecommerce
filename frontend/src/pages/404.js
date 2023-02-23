import Link from 'next/link';

// pages/404.js
const NotFoundPage = () => {
    return <>
    <div className="not-found">
        <h1>NotFound</h1>
        <p>The requested page does not exists</p>
        <Link href='/' legacyBehavior>
            <a className='text-decoration-none'>Back to Home</a>
        </Link>
     </div>   
    </> 
}

export default NotFoundPage;