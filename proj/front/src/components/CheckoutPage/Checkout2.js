import React, { useState, useEffect } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { Lock, CreditCard } from 'lucide-react';
import './CheckoutPage.css';
import Navbar from '../NavBar/Navbar';

const Checkout2 = () => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const location = useLocation();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [promoDiscount, setPromoDiscount] = useState(0);
  const [promoError, setPromoError] = useState(null);
  const [hotelData, setHotelData] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    if (location.state?.hotelData && location.state?.totalPrice) {
      setHotelData(location.state.hotelData);
      setTotalPrice(location.state.totalPrice);
    } else {
      setError("Missing trip details.");
      navigate('/tripdetails'); // Redirect if data is missing
    }
  }, [location.state, navigate]);

  const calculateTotals = () => {
    const discount = (totalPrice * promoDiscount) / 100;
    const finalTotal = totalPrice - discount;
    return { subtotal: totalPrice, discount, total: finalTotal };
  };

  const handleApplyPromo = () => {
    const promoCodes = { 'SAVE10': 10, 'DISCOUNT20': 20 };

    if (promoCodes[promoCode.toUpperCase()]) {
      setPromoDiscount(promoCodes[promoCode.toUpperCase()]);
      setPromoError(null);
    } else {
      setPromoError("Invalid promo code.");
      setPromoDiscount(0);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    if (!stripe || !elements) {
      setError("Stripe not initialized.");
      setLoading(false);
      return;
    }

    try {
      const { total } = calculateTotals();
      const response = await axios.post(`https://localhost/api/payment-intent`, { amount: total });

      if (response.status !== 200) throw new Error(response.data.message);

      const { clientSecret } = response.data;
      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: { card: elements.getElement(CardElement) },
      });

      if (error) {
        setError(error.message);
        setSuccess(false);
      } else if (paymentIntent.status === 'succeeded') {
        setSuccess(true);
        alert("Booking Successful")
        setTimeout(() => navigate('/'), 2000); // Redirect after success
      }
    } catch (err) {
      setError("Payment error.");
    }

    setLoading(false);
  };

  if (!hotelData.length) {
    return <div className="loading">Loading trip details...</div>;
  }

  const { subtotal, discount, total } = calculateTotals();

  return (
    <div className="checkout-container">
      <Navbar />
      <div className="checkout-content">
        <div className="checkout-header">
          <h1>Checkout - Trip Details</h1>
          <div className="secure-badge">
            <Lock size={16} />
            Secure Payment
          </div>
        </div>

        <div className="checkout-grid">
          {/* Order Summary */}
          <div className="summary-card">
            <div className="card-header">
              <h2>Trip Summary</h2>
            </div>
            {hotelData.map((hotel, index) => (
              <div key={index} className="cost-item">
                <span>{hotel.hotelName}</span>
                <span>${hotel.hotelPrice} / night</span>
              </div>
            ))}
            <div className="cost-divider"></div>
            <div className="cost-item">
              <span>Subtotal</span>
              <span className="cost">${subtotal}</span>
            </div>
            <div className="cost-item">
              <span>Discount</span>
              <span className="cost-discount">-${discount}</span>
            </div>
            <div className="cost-divider"></div>
            <div className="cost-item cost-total">
              <span>Total</span>
              <span>${total}</span>
            </div>
          </div>

          {/* Payment Section */}
          <div className="payment-card">
            <div className="card-header">
              <h2>Payment Details</h2>
            </div>
            <form onSubmit={handleSubmit} className="payment-form">
              {/* Promo Code Section */}
              <div className="promosection">
                <h3>Promo Code</h3>
                <div className="promo-input">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Enter promo code"
                  />
                  <button className="promo-button" onClick={handleApplyPromo}>
                    Apply
                  </button>
                </div>
                {promoError && <p className="error-message">{promoError}</p>}
              </div>

              {/* Card Input */}
              <div className="stripe-card">
                <CardElement />
              </div>

              {/* Payment Button */}
              <button
                type="submit"
                className={`payment-button ${loading ? 'loading' : ''}`}
                disabled={loading}
              >
                {loading ? <div className="spinner"></div> : <CreditCard size={16} />}
                Pay ${total}
              </button>

              {/* Error/Success Messages */}
              {error && <p className="error-message">{error}</p>}
              {success && <p className="success-message">Payment Successful! Redirecting...</p>}

              {/* Security Info */}
              <div className="security-info">
                <Lock size={16} />
                Your payment is encrypted and secure.
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout2;
