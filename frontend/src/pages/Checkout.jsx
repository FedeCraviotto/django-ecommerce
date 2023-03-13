import React, { useState, useEffect } from "react";
import { Navigate } from 'react-router-dom';
import Layout from "../hoc/Layout";
import DropIn from 'braintree-web-drop-in-react';
import { Oval } from 'react-loader-spinner';
import axios from 'axios';
import Headphones from '../assets/images/headphones.jpg';

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
  const [clientToken, setClientToken] = useState(null)
  
  // Loader for the dropping UI
  const [loading, setLoading] = useState(true)
  // Loader for after clicking Place Order button 
  const [processingOrder, setProcessingOrder] = useState(false)
  const [orderAttempted, setOrderAttempted] = useState(false);
  // If  payment is successfull, we redirect to main page
  const [success, setSuccess] = useState(false);
  // Needed in this format corresponding the Dropping UI docs.
  const [data, setData] = useState({
    instance: {}
  })
  const {
    first_name,
    email,
    street_address,
    city,
    country,
    state_province,
    postal_zip_code,
  } = formData;

  useEffect(()=>{
    const fetchData = async () => {
      const config = {
        headers: {
          'Accept' : 'application/json',
        }
      }
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/payment/generate-token`, config)
        if (res.status === 200) {
          //It comes from the API View's Reponse, as res.data
          setClientToken(res.data.token)
          setLoading(false)
          setProcessingOrder(false)
        }
      } catch (err) {
      }
    };

    fetchData();
  }, []);

  const changeInputs = (e) =>
    setFormData({
      ...formData,
      [e.target.name]: e.target.value.replace(/ /g, ""),
    }); // remove spaces on change, while the user types
  
    const changeAddress = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  
    const buyItems = async (e) => {
    e.preventDefault();
    if (
      first_name !== '' &&
      email !== '' &&
      street_address !== '' &&
      city !== '' &&
      country !== '' &&
      state_province !== '' &&
      postal_zip_code !== ''      
    ) {
      const config = {
        headers : {
          'Accept': 'application/json',
          'Content-type': 'application/json'
        }
      };

      let { nonce } = await data.instance.requestPaymentMethod();

      setProcessingOrder(true);

      const body = JSON.stringify({
        first_name,
        email,
        street_address,
        city,
        country,
        state_province,
        postal_zip_code,
        nonce
      });

      try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/payment/process-payment`, body, config);

        if (res.status===201) setSuccess(true);

      } catch (err) {
        console.log(err);
      }

      setProcessingOrder(false);
    }
  };

  // With replace set to true, if the user tries to navigate back, he won't be able. The list of links he had navigated won't show the Checkout page as a previous navigated site. replace={true} is commonly used for previous logins to checkouts -in order to not see the login page if back-navigating once logged-in. 
  if(success) return <Navigate to='/redirect' replace={true}/>

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
                    <option value="brazil">Brazil</option>
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
            {
              loading || clientToken === null ? (
                <div className="d-flex justify-content-center align-items-center mt-5 mb-5">
                  <Oval 
                    color='#00bfff'
                    width={50}
                    height={50}
                  />
                </div>
              ) : (
                <DropIn 
                  options={{
                    authorization: clientToken,
                    paypal: {
                      // Lo va a guardar en nuestra vault como un payment Method
                      flow:'vault'
                    }
                  }}
                  onInstance={instance=> setData({instance : instance})}
                />
              )
            }

            {
              processingOrder ? (
                <div className="d-flex justify-content-center align-items-center mt-5 mb-5">
                  <Oval
                    color='#00bfff'
                    width={50}
                    height={50}
                  />
                </div>
              ) : (
                <div>
                  {
                    loading ? (
                      <></>
                    ) : (
                      <button
                        className="btn btn-success btn-lg mt-5 shadow"
                        onClick={() => setOrderAttempted(true)}
                        type="submit"
                      >
                        Place Order
                      </button>
                    )
                  }
                </div>
              )
            }
            
          </form>
        </div>

        <div className="offset-1 col-6 ">
          <h3 className="display-6 mb-5">Order Details:</h3>
          <div className="row">
            <div className="col-4">
              <img 
              className="img-fluid"
              src={Headphones}
              alt='Headphones'
              />
            </div>
            <div className="offset-1 col-7 mt-3">
              <p className="fs-5 lead">
                Order Item: Blasting Graspberry Headphones
              </p>
              <p className="lead fs-3">
                <strong>Order Total: (USS)$10.00</strong>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Checkout;
