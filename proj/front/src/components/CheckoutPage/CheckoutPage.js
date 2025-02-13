import React, { useState, useEffect } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CreditCard, Lock, Calendar, User, Shield } from 'lucide-react';
import './CheckoutPage.css';
import Navbar from '../NavBar/Navbar';

const CheckoutPage = ({ tripData = {
  days: [
    { title: "Plan + Flight + Hotel", cost: 140000 },
    { title: "Plan + Bus + Hotel", cost: 25000 },
    { title: "Plan + Car + Hotel", cost: 32500 }
  ],
  discountPercentage: 10
} }) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [isCardFocused, setIsCardFocused] = useState(false);

  // Calculate totals
  const subtotal = tripData.days.reduce((sum, day) => sum + day.cost, 0);
  const discount = (subtotal * tripData.discountPercentage) / 100;
  const total = subtotal - discount;

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        navigate('/cart');
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
        amount: total
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
    <div className="checkout-container">
      <Navbar />
      <div className="checkout-content fade-in">
        <div className="checkout-header">
          <h1>Complete Your Payment</h1>
          <div className="secure-badge">
            <Shield size={18} /> Secured & Encrypted
          </div>
        </div>

        <div className="checkout-grid">
          <div className="summary-card">
            <div className="card-header">
              <h2>Trip Summary</h2>
              <CreditCard size={20} />
            </div>

            <div className="cost-breakdown">
              {tripData.days.map((day, index) => (
                <div key={index} className="cost-item slide-in">
                  <span>Day {index + 1}: {day.title}</span>
                  <span className="cost">{day.cost.toLocaleString()}</span>
                </div>
              ))}
              
              <div className="cost-divider"></div>
              
              <div className="subtotal cost-item">
                <span>Sub-total</span>
                <span className="cost">{subtotal.toLocaleString()}</span>
              </div>
              
              <div className="discount cost-item">
                <span>Points Discount ({tripData.discountPercentage}%)</span>
                <span className="cost-discount">-{discount.toLocaleString()}</span>
              </div>
              
              <div className="total cost-item">
                <span>Total Amount</span>
                <span className="cost-total">{total.toLocaleString()}</span>
              </div>
            </div>

            <div className="promosection">
              <h3>Promo Code</h3>
              <div className="promo-input">
                <input 
                  type="text" 
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  placeholder="Enter your code"
                />
                <button className="promo-button">Apply</button>
              </div>
            </div>
          </div>

          <div className="payment-card">
            <div className="card-header">
              <h2>Card Payment</h2>
              <Lock size={20} />
            </div>

            <form onSubmit={handleSubmit} className="payment-form">
              <div className={`stripe-card ${isCardFocused ? 'focused' : ''}`}>
                <CardElement 
                  onFocus={() => setIsCardFocused(true)}
                  onBlur={() => setIsCardFocused(false)}
                  options={{
                    style: {
                      base: {
                        fontSize: '16px',
                        fontWeight: '500',
                        fontFamily: 'Inter, system-ui, sans-serif',
                        color: '#1a1f36',
                        '::placeholder': {
                          color: '#6b7280',
                        },
                        padding: '20px 0',
                      },
                      invalid: {
                        color: '#ef4444',
                      },
                    },
                  }}
                />
              </div>

              {error && <div className="error-message slide-in">{error}</div>}
              {success && <div className="success-message slide-in">Payment successful! Redirecting...</div>}

              <button 
                className={`payment-button ${loading ? 'loading' : ''}`}
                type="submit"
                disabled={!stripe || loading}
              >
                {loading ? (
                  <>
                    <div className="spinner"></div>
                    Processing Payment...
                  </>
                ) : (
                  <>
                    <Lock size={18} />
                    Pay {total.toLocaleString()}
                  </>
                )}
              </button>
            </form>

            <div className="security-info">
              <Shield size={16} />
              <span>Your payment information is encrypted and secure</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;