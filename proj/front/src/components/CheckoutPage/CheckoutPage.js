import React, { useState, useEffect } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlane, faPassport, faSuitcase } from '@fortawesome/free-solid-svg-icons';
import Navbar from '../NavBar/Navbar';
import './CheckoutPage.css';

const CheckoutPage = ({ totalBalance = 10000 }) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        navigate('/');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [success, navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    
    if (!stripe || !elements) return;

    try {
      const { data: { clientSecret } } = await axios.post('http://localhost:5000/create-payment-intent', {
        amount: totalBalance * 100
      });

      const { error: stripeError } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        }
      });

      if (stripeError) {
        setError(stripeError.message);
        setSuccess(false);
      } else {
        setSuccess(true);
        setError(null);
      }
    } catch (err) {
      setError(err.message);
      setSuccess(false);
    }
    setLoading(false);
  };

  return (
    <>
      <Navbar />
      <div className="checkout-container">
        <div className="travel-image-collage">
          <div className="image-item img-1"></div>
          <div className="image-item img-2"></div>
          <div className="image-item img-3"></div>
          <div className="image-item img-4"></div>
        </div>

        <div className="checkout-content">
          <div className="header-animation">
            <FontAwesomeIcon icon={faPassport} className="passport-icon" />
            <h2 className="checkout-heading">Adventure Awaits!<br />Complete Your Journey</h2>
          </div>

          <div className="price-container">
            <p className="total-amount">PKR {totalBalance}</p>
            <FontAwesomeIcon icon={faSuitcase} className="suitcase-icon" />
          </div>

          <form onSubmit={handleSubmit} className="checkout-form">
            <div className="card-element-container">
              <CardElement className="card-element" />
            </div>

            {error && <div className="error-message pulse">{error}</div>}
            {success && (
              <div className="success-message">
                <FontAwesomeIcon icon={faPlane} className="plane-icon" />
                <span>Payment Successful! Redirecting to Home Page...</span>
              </div>
            )}

            <button className="pay-button" disabled={!stripe || loading}>
              {loading ? (
                <div className="spinner"></div>
              ) : (
                <>
                  <FontAwesomeIcon icon={faPlane} />
                  <span>Confirm Payment</span>
                </>
              )}
            </button>
          </form>


        </div>
      </div>
    </>
  );
};

export default CheckoutPage;