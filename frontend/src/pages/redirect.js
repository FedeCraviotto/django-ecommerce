import Link from "next/link";
import Layout from "../hoc/Layout";

const Redirect = () => {
  return (
    <Layout title='Success' content=''>
      <h1 className="display-2 mt-5 text-center">Thank You! Redirecting</h1>
      <p className="fs-5 mt-5 mb-5 text-muted text-center">Your order was successful. Check your email for transaction details</p>
      <div className="d-flex justify-content-center align-items-center">
        <Link href='/' legacyBehavior>
          <a className="btn btn-primary btn-lg">Back to site</a>
        </Link>
      </div>
    </Layout>
  );
};

export default Redirect;
