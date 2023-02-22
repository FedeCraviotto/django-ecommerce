import React from "react";
import { Link } from "react-router-dom";
import Layout from "../hoc/Layout";

const Redirect = () => {
  return (
    <Layout title='Success' content=''>
      <h1 className="display-2 mt-5 text-center">Thank You! Redirecting</h1>
      <p className="fs-5 mt-5 mb-5 text-muted text-center">Your order was successful. Check your email for transaction details</p>
      <div className="d-flex justify-content-center align-items-center">
        <Link className="btn btn-primary btn-lg" to='/'>
          Back to site
        </Link>
      </div>
    </Layout>
  );
};

export default Redirect;
