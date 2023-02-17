import React, { useState } from "react";
import Layout from "../hoc/Layout";

const Checkout = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    email: "",
    street_address: "",
    city: "",
    country: "",
    state_province: "",
    postal_zip_code: "",
  });
  const [orderAttempted, setOrderAttempted] = useState(false);

  const {
    first_name,
    email,
    street_address,
    city,
    country,
    state_province,
    postal_zip_code,
  } = formData;

  const changeInputs = (e) =>
    setFormData({
      ...formData,
      [e.target.name]: e.target.value.replace(/ /g, ""),
    }); // remove spaces on change, while the user types
  const changeAddress = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const buyItems = (e) => {
    e.preventDefault();
  };

  return (
    <Layout title="Checkout" content="">
      <h1 className="display-4 mt-5 mb-5">Checkout</h1>
      <div className="row mb-5">
        <div className="col-5">
          <form
            action="GET"
            className={
              orderAttempted
                ? "needs-validation was-validated"
                : "needs-validation"
            }
            noValidate
            onSubmit={buyItems}
          >
            <h3 className="mb-5 display-6">Your information</h3>

            <div className="form-group mb-3">
              <label htmlFor="first-name" className="form-label">
                First Name*
              </label>
              <input
                type="text"
                name="first_name"
                className="form-control"
                placeholder="First Name*"
                onChange={changeInputs}
                value={first_name}
                required
              ></input>
              <div className="invalid-feedback">
                Please enter your first name
              </div>
            </div>

            <div className="form-group mb-3">
              <label htmlFor="email" className="form-label">
                Email*
              </label>
              <input
                type="email"
                name="email"
                className="form-control"
                placeholder="Email*"
                onChange={changeInputs}
                value={email}
                required
              ></input>
              <div className="invalid-feedback">Please enter your email</div>
            </div>

            <div className="form-group mb-3">
              <label htmlFor="street_address" className="form-label">
                Street Address*
              </label>
              <input
                type="text"
                name="street_address"
                className="form-control"
                placeholder="Street Address*"
                onChange={changeAddress}
                value={street_address}
                required
              ></input>
              <div className="invalid-feedback">
                Please enter your street address
              </div>
            </div>

            <div className="form-group mb-3">
              <label htmlFor="city" className="form-label">
                City*
              </label>
              <input
                type="text"
                name="city"
                className="form-control"
                placeholder="City*"
                onChange={changeAddress}
                value={city}
                required
              ></input>
              <div className="invalid-feedback">Please enter your city</div>
            </div>

            <div className="row mb-5 mt-3">
              <div className="col-5">
                <div className="form-group mb-3">
                  <label htmlFor="country" className="form-label">
                    Country
                  </label>
                  <select
                    className="form-select"
                    name="country"
                    onChange={changeAddress}
                    value={country}
                    required
                  >
                    <option value="">Choose...</option>
                    <option value="argentina">Argentina</option>
                    <option value="peru">Peru</option>
                    <option value="chile">Chile</option>
                    <option value="brasil">Brasil</option>
                    <option value="uruguay">Uruguay</option>
                  </select>
                  <div className="invalid-feedback">
                    Please enter your country
                  </div>
                </div>
              </div>

              <div className="col-4">
                <div className="form-group mb-3">
                  <label htmlFor="state_province" className="form-label">
                    State/Province*
                  </label>
                  <input
                    type="text"
                    name="state_province"
                    className="form-control"
                    placeholder="State/Province*"
                    onChange={changeAddress}
                    value={state_province}
                    required
                  ></input>
                  <div className="invalid-feedback">
                    Please enter your state/province
                  </div>
                </div>
              </div>

              <div className="col-3">
                <div className="form-group mb-3">
                  <label htmlFor="postal_zip_code" className="form-label">
                    Zipcode*
                  </label>
                  <input
                    type="text"
                    name="postal_zip_code"
                    className="form-control"
                    placeholder="Zipcode*"
                    onChange={changeAddress}
                    value={postal_zip_code}
                    required
                  ></input>
                  <div className="invalid-feedback">
                    Please enter your Postal/Zip code
                  </div>
                </div>
              </div>
            </div>
            <h3 className="mb-5 display-6">Payment Information</h3>
            <button
              className="btn btn-success btn-lg mt-5 shadow"
              onClick={() => setOrderAttempted(true)}
              type="submit"
            >
              Place Order
            </button>
          </form>
        </div>
        <div className="offset-1 col-6 ">ORDER DETAILS</div>
      </div>
    </Layout>
  );
};

export default Checkout;
