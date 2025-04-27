import React, { useState, useEffect } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { CreditCard, Lock, Calendar, User, Shield } from 'lucide-react';
import './CheckoutPage.css';
import Navbar from '../NavBar/Navbar';
import './Checkout2.css'

const CheckoutPage = () => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const location = useLocation();
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [isCardFocused, setIsCardFocused] = useState(false);
  const [tripData, setTripData] = useState(null);
  const [initialLoad, setInitialLoad] = useState(true);
  const [applyingPromo, setApplyingPromo] = useState(false);
  const [promoDiscount, setPromoDiscount] = useState(0);
  const [promoError, setPromoError] = useState(null);

  // Load trip data from location state or API
  useEffect(() => {
    const fetchTripData = async () => {
      try {
        if (location.state?.tripId) {
          const response = await axios.get(`https://voyaige-production.up.railway.app/api/trips/${location.state.tripId}`);
          console.log(response);
          if (response.data && response.data.checkoutData) {
            setTripData({
              days: response.data.checkoutData.days || [],
              discountPercentage: response.data.checkoutData.discountPercentage || 0,
              summary: response.data.checkoutData.summary || {}
            });
            
          } else {
            setError("Trip data not found or incomplete");
          }
        } else {
          // Redirect to customization page if no trip ID is provided
          navigate('/UserCustomization');
        }
      } catch (err) {
        console.error("Error fetching trip data:", err);
        setError("Could not load trip data. Please try again.");
      } finally {
        setInitialLoad(false);
      }
    };

    fetchTripData();
  }, [location.state, navigate]);

  // Calculate totals from trip data
  const calculateTotals = () => {
    if (!tripData || !tripData.days) return { subtotal: 0, discount: 0, total: 0 };
    
    const subtotal = tripData.days.reduce((sum, day) => sum + day.totalCost, 0);
    const pointsDiscount = (subtotal * (tripData.discountPercentage || 0)) / 100;
    const promoAmount = (subtotal * promoDiscount) / 100;
    const totalDiscount = pointsDiscount + promoAmount;
    const total = subtotal - totalDiscount;
    return { subtotal, discount: totalDiscount, total, pointsDiscount, promoAmount };
  };

  // Handle promo code application
  const handleApplyPromo = async () => {
    if (!promoCode.trim()) {
      setPromoError("Please enter a promo code");
      return;
    }
    
    setApplyingPromo(true);
    setPromoError(null);
    
    try {
      // Mock API call for promo code validation
      // In a real application, this would be a call to your backend
      // const response = await axios.post('http://localhost:5000/api/validate-promo', { code: promoCode });
      
      // Simulating API response for demo purposes
      const mockValidCodes = {
        'WELCOME10': 10,
        'TRAVEL20': 20,
        'FIRSTTRIP': 15
      };
      
      if (mockValidCodes[promoCode.toUpperCase()]) {
        setPromoDiscount(mockValidCodes[promoCode.toUpperCase()]);
        setPromoError(null);
      } else {
        setPromoError("Invalid promo code");
        setPromoDiscount(0);
      }
    } catch (err) {
      setPromoError("Error applying promo code");
      setPromoDiscount(0);
    } finally {
      setApplyingPromo(false);
    }
  };

  // Handle redirection after successful payment
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        navigate('/cart', { 
          state: { 
            tripData: tripData,
            paymentDetails: {
              amount: calculateTotals().total,
              date: new Date().toISOString(),
              status: 'Paid'
            }
          } 
        });
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [success, navigate, tripData, calculateTotals]); // Added calculateTotals to dependency array

  // Handle payment submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    
    if (!stripe || !elements) {
      setError("Stripe is not properly initialized");
      setLoading(false);
      return;
    }
  
    try {
      const { total } = calculateTotals();
      
      // Create payment intent
      const response = await axios.post('http://localhost:5000/api/payment-intent', {
        amount: total
      });
  
      if (response.status !== 200) {
        throw new Error(`Error: ${response.data.message}`);
      }
      
      const { clientSecret } = response.data;
  
      // Confirm card payment
      const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        }
      });
  
      if (stripeError) {
        setError(stripeError.message);
        setSuccess(false);
      } else if (paymentIntent.status === 'succeeded') {
        // Update trip status to 'paid' in the database
        if (location.state?.tripId) {
          await axios.patch(`http://localhost:5000/api/trips/${location.state.tripId}`, {
            status: 'paid',
            paymentDetails: {
              amount: total,
              date: new Date().toISOString(),
              method: 'card',
              promoApplied: promoDiscount > 0 ? promoCode : null,
              promoDiscount: promoDiscount
            }
          });
        }
        
        setSuccess(true);
        setError(null);
      } else {
        setError(`Payment status: ${paymentIntent.status}. Please try again.`);
        setSuccess(false);
      }
    } catch (err) {
      setError(err.message || "An error occurred while processing your payment");
      setSuccess(false);
    }
    setLoading(false);
  };

  // Show loading state during initial data fetch
  if (initialLoad) {
    return (
      <div className="checkout-container">
        <Navbar />
        <div className="checkout-content fade-in loading-state">
          <div className="loading-spinner"></div>
          <p>Loading your trip details...</p>
        </div>
      </div>
    );
  }

  // Show error state if trip data couldn't be loaded
  if (!tripData && !initialLoad) {
    return (
      <div className="checkout-container">
        <Navbar />
        <div className="checkout-content fade-in error-state">
          <div className="error-icon">⚠️</div>
          <h2>Unable to load trip details</h2>
          <p>{error || "Please try again or contact support."}</p>
          <button className="retry-button" onClick={() => window.location.reload()}>
            Retry
          </button>
        </div>
      </div>
    );
  }

  const { subtotal, discount, total, pointsDiscount, promoAmount } = calculateTotals();

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

            {/* Trip details summary */}
            {tripData && tripData.summary && (
              <div className="trip-overview">
                <div className="trip-route">
                  <span className="from">{tripData.summary.from}</span>
                  <span className="separator">→</span>
                  <span className="to">{tripData.summary.to}</span>
                </div>
                <div className="trip-dates">
                  <Calendar size={14} />
                  <span>
                    {new Date(tripData.summary.startDate).toLocaleDateString('en-US', { 
                      month: 'short', day: 'numeric' 
                    })} - {new Date(tripData.summary.endDate).toLocaleDateString('en-US', { 
                      month: 'short', day: 'numeric', year: 'numeric' 
                    })}
                  </span>
                </div>
                <div className="trip-guests">
                  <User size={14} />
                  <span>Budget: {tripData.summary.guests === 1 ? 'Economic' : tripData.summary.guests === 2 ? 'Normal' : tripData.summary.guests === 3 ? 'Deluxe' : 'N/A'} • {tripData.summary.duration} {tripData.summary.duration > 1 ? 'Days' : 'Day'}</span>
                </div>
              </div>
            )}

            <div className="cost-breakdown">
              {tripData && tripData.days.map((day, index) => (
                <div key={index} className="cost-item slide-in">
                  <span>{day.title}</span>
                  <span className="cost">{day.totalCost.toLocaleString()}</span>
                </div>
              ))}
              
              <div className="cost-divider"></div>
              
              <div className="subtotal cost-item">
                <span>Sub-total</span>
                <span className="cost">{subtotal.toLocaleString()}</span>
              </div>
              
              {pointsDiscount > 0 && (
                <div className="discount cost-item">
                  <span>Points Discount ({tripData.discountPercentage}%)</span>
                  <span className="cost-discount">-{pointsDiscount.toLocaleString()}</span>
                </div>
              )}
              
              {promoDiscount > 0 && (
                <div className="discount cost-item">
                  <span>Promo Discount ({promoCode.toUpperCase()}: {promoDiscount}%)</span>
                  <span className="cost-discount">-{promoAmount.toLocaleString()}</span>
                </div>
              )}
              
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
                  disabled={applyingPromo || success}
                />
                <button 
                  className={`promo-button ${applyingPromo ? 'loading' : ''}`}
                  onClick={handleApplyPromo}
                  disabled={applyingPromo || success}
                >
                  {applyingPromo ? 'Applying...' : 'Apply'}
                </button>
              </div>
              {promoError && <div className="promo-error">{promoError}</div>}
              {promoDiscount > 0 && <div className="promo-success">Promo code applied successfully!</div>}
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
              {success && <div className="success-message slide-in">Payment successful! Redirecting to confirmation page...</div>}

              <button 
                className={`payment-button ${loading ? 'loading' : ''}`}
                type="submit"
                disabled={!stripe || loading || success}
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