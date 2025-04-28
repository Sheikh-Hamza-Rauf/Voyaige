// LoginForm.js
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaUser, FaLock, FaPlane, FaExclamationCircle } from 'react-icons/fa';
import axios from 'axios';
import './Login.css';
import Navbar from '../NavBar/Navbar';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [touched, setTouched] = useState({
    email: false,
    password: false
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  // Validation function
  const validateField = (name, value) => {
    switch(name) {
      case 'email':
        if (!value) return 'Email is required';
        if (!value.includes('@')) return 'Email must contain @';
        if (!value.includes('.')) return 'Email must contain a domain';
        return '';
      case 'password':
        if (!value) return 'Password is required';
        if (value.length < 8) return 'Password must be at least 8 characters';
        return '';
      default:
        return '';
    }
  };

  // Handle input change
  const onChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Validate immediately
    const error = validateField(name, value);
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };

  // Handle input blur to show errors
  const onBlur = (e) => {
    const { name } = e.target;
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));
  };

  // Submit handler
  const onSubmit = async (e) => {
    e.preventDefault();

    // Validate all fields
    const emailError = validateField('email', formData.email);
    const passwordError = validateField('password', formData.password);

    setErrors({
      email: emailError,
      password: passwordError
    });

    setTouched({
      email: true,
      password: true
    });

    // Only submit if no errors
    if (!emailError && !passwordError) {
      setIsSubmitting(true);
      try {
        const res = await axios.post(`https://voyaige-production.up.railway.app/api/users/login`, formData);
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('user', JSON.stringify(res.data.user));
        window.dispatchEvent(new Event('storage'));
        navigate('/');
      } catch (err) {
        setErrors(prev => ({
          ...prev,
          submit: 'Login failed. Please check your credentials.'
        }));
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="auth-container">
    <Navbar />
      <div className="auth-form">
        <Link to="/" className="logo">
         <FaPlane className="plane-icon" /><h3>Voyaige</h3>
        </Link>

        <h2>Welcome Back!</h2>

        {errors.submit && (
          <div className="global-error">
            <FaExclamationCircle />
            {errors.submit}
          </div>
        )}

        <form onSubmit={onSubmit}>
          <div className={`input-group ${touched.email && errors.email ? 'input-error' : ''}`}>
            <FaUser className="icon" />
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={onChange}
              onBlur={onBlur}
              placeholder="Email"
            />
            {touched.email && errors.email && (
              <div className="error-tooltip">
                <FaExclamationCircle /> {errors.email}
              </div>
            )}
          </div>

          <div className={`input-group ${touched.password && errors.password ? 'input-error' : ''}`}>
            <FaLock className="icon" />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={onChange}
              onBlur={onBlur}
              placeholder="Password"
            />
            {touched.password && errors.password && (
              <div className="error-tooltip">
                <FaExclamationCircle /> {errors.password}
              </div>
            )}
          </div>

          <button 
            type="submit" 
            className="submit-btn" 
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Logging In...' : 'Log In'}
          </button>
        </form>

        <p className="switch-form">
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;