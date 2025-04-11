import React, { useState, useEffect } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CreditCard, Lock, Calendar, User, Shield } from 'lucide-react';
import './ChekoutPage.css';
import Navbar from '../NavBar/Navbar';

const ChekoutPage = () => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [itinerary, setItinerary] = useState(null);

  // Read itinerary data solely from localStorage
  useEffect(() => {
    const storedItinerary = localStorage.getItem('confirmedItinerary');
    if (storedItinerary) {
      setItinerary(JSON.parse(storedItinerary));
    } else {
      setError("No itinerary found in local storage.");
    }
  }, []);

  // Calculate total cost to be paid by Stripe
  const calculateTotal = () => {
    if (itinerary && itinerary.cost_breakdown) {
      return itinerary.cost_breakdown.total_cost;
    }
    return 0;
  };

  // Payment submission handler
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    if (!stripe || !elements) {
      setError("Stripe is not initialized");
      setLoading(false);
      return;
    }
    try {
      const total = calculateTotal();
      // Create payment intent on the backend
      const response = await axios.post('http://localhost:5000/api/payment-intent', {
        amount: total
      });
      if (response.status !== 200) {
        throw new Error(response.data.message || "Payment intent error");
      }
      const { clientSecret } = response.data;
      // Confirm card payment
      const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement)
        }
      });
      if (stripeError) {
        setError(stripeError.message);
        setSuccess(false);
      } else if (paymentIntent.status === 'succeeded') {
        setSuccess(true);
        // Redirect to confirmation page after a short delay
        setTimeout(() => {
          navigate('/confirmation', { 
            state: { 
              itinerary,
              paymentDetails: {
                amount: total,
                date: new Date().toISOString(),
                status: 'Paid'
              }
            } 
          });
        }, 2000);
      } else {
        setError(`Payment status: ${paymentIntent.status}. Please try again.`);
        setSuccess(false);
      }
    } catch (err) {
      setError(err.message || "An error occurred during payment.");
      setSuccess(false);
    }
    setLoading(false);
  };

  if (!itinerary) {
    return (
      <div className="chekout-container">
        <Navbar />
        <div className="chekout-content">
          {error ? (
            <div className="chekout-error-message">
              <h2>Error</h2>
              <p>{error}</p>
            </div>
          ) : (
            <div>Loading itinerary...</div>
          )}
        </div>
      </div>
    );
  }

  const { destination, duration_days, hotel, cost_breakdown } = itinerary;
  const totalCost = calculateTotal();

  return (
    <div className="chekout-container">
      <Navbar />
      <div className="chekout-content">
        <div className="chekout-header">
          <h1>Complete Your Payment</h1>
          <div className="chekout-secure-badge">
            <Shield size={18} /> Secured & Encrypted
          </div>
        </div>
        <div className="chekout-grid">
          <div className="chekout-summary-card">
            <div className="chekout-card-header">
              <h2>Trip Summary</h2>
              <CreditCard size={20} />
            </div>
            <div className="chekout-trip-overview">
              <div className="chekout-trip-route">
                <span className="chekout-from">{destination}</span>
              </div>
              <div className="chekout-trip-dates">
                <Calendar size={14} />
                <span>{duration_days} {duration_days > 1 ? 'Days' : 'Day'}</span>
              </div>
              <div className="chekout-trip-guests">
                <User size={14} />
                <span>Hotel: {hotel?.name || 'N/A'}</span>
              </div>
            </div>
            <div className="chekout-cost-breakdown">
              <div className="chekout-cost-item">
                <span>Cost of Hotel</span>
                <span className="chekout-cost">{cost_breakdown?.hotel_cost?.toLocaleString() || 0}</span>
              </div>
              <div className="chekout-cost-item">
                <span>Cost of Accommodation</span>
                <span className="chekout-cost">{cost_breakdown?.restaurant_cost?.toLocaleString() || 0}</span>
              </div>
              <div className="chekout-cost-divider"></div>
              <div className="chekout-total chekout-cost-item">
                <span>Total Amount</span>
                <span className="chekout-cost-total">{totalCost.toLocaleString()}</span>
              </div>
            </div>
          </div>
          <div className="chekout-payment-card">
            <div className="chekout-card-header">
              <h2>Card Payment</h2>
              <Lock size={20} />
            </div>
            <form onSubmit={handleSubmit} className="chekout-payment-form">
              <div className="chekout-stripe-card">
                <CardElement 
                  options={{
                    style: {
                      base: {
                        fontSize: '16px',
                        fontWeight: '500',
                        fontFamily: 'Inter, system-ui, sans-serif',
                        color: '#1a1f36',
                        '::placeholder': {
                          color: '#6b7280'
                        },
                        padding: '20px 0'
                      },
                      invalid: {
                        color: '#ef4444'
                      }
                    }
                  }}
                />
              </div>
              {error && <div className="chekout-error-message chekout-slide-in">{error}</div>}
              {success && <div className="chekout-success-message chekout-slide-in">Payment successful! Redirecting...</div>}
              <button 
                className={`chekout-payment-button ${loading ? 'loading' : ''}`} 
                type="submit" 
                disabled={!stripe || loading || success}
              >
                {loading ? (
                  <>
                    <div className="chekout-spinner"></div>
                    Processing Payment...
                  </>
                ) : (
                  <>
                    <Lock size={18} />
                    Pay {totalCost.toLocaleString()}
                  </>
                )}
              </button>
            </form>
            <div className="chekout-security-info">
              <Shield size={16} />
              <span>Your payment information is encrypted and secure</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChekoutPage;
