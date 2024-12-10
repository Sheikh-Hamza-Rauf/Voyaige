// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import './Signup.css';
// import { FaUser, FaLock } from 'react-icons/fa';
// import { MdOutlineAlternateEmail } from 'react-icons/md';
// import { BsTelephone } from 'react-icons/bs';
// import axios from 'axios';

// const SignupForm = () => {
//   const [formData, setFormData] = useState({
//     firstName: '',
//     lastName: '',
//     email: '',
//     phoneNumber: '',
//     password: '',
//     confirmPassword: '',
//   });

//   const { firstName, lastName, email, phoneNumber, password, confirmPassword } = formData;
//   const navigate = useNavigate();

//   const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

//   const onSubmit = async e => {
//     e.preventDefault();
//     try {
//       const res = await axios.post('http://localhost:5000/api/users/register', formData);
//       console.log('Registration response:', res.data);
//       alert('Registration successful, please log in.');
//       navigate('/login'); // Navigate to the login page
//     } catch (err) {
//       console.error('Error registering:', err.response ? err.response.data : err.message);
//       if (err.response) {
//         console.error('Response data:', err.response.data);
//         console.error('Response status:', err.response.status);
//         console.error('Response headers:', err.response.headers);
//       } else if (err.request) {
//         console.error('Request data:', err.request);
//       } else {
//         console.error('Error message:', err.message);
//       }
//       alert('Error registering');
//     }
//   };

//   return (
//     <div className='wrapper'>
//       <form onSubmit={onSubmit}>
//         <h1>Sign-up</h1>
//         <div className='form-grid'>
//           <div className='input-box'>
//             <input
//               type='text'
//               name='firstName'
//               value={firstName}
//               onChange={onChange}
//               placeholder='First Name'
//               required
//             />
//             <FaUser className='icon' />
//           </div>
//           <div className='input-box'>
//             <input
//               type='text'
//               name='lastName'
//               value={lastName}
//               onChange={onChange}
//               placeholder='Last Name'
//               required
//             />
//             <FaUser className='icon' />
//           </div>
//           <div className='input-box'>
//             <input
//               type='email'
//               name='email'
//               value={email}
//               onChange={onChange}
//               placeholder='Email'
//               required
//             />
//             <MdOutlineAlternateEmail className='icon' />
//           </div>
//           <div className='input-box'>
//             <input
//               type='tel'
//               name='phoneNumber'
//               value={phoneNumber}
//               onChange={onChange}
//               placeholder='Phone Number'
//               required
//             />
//             <BsTelephone className='icon' />
//           </div>
//           <div className='input-box'>
//             <input
//               type='password'
//               name='password'
//               value={password}
//               onChange={onChange}
//               placeholder='Password'
//               required
//             />
//             <FaLock className='icon' />
//           </div>
//           <div className='input-box'>
//             <input
//               type='password'
//               name='confirmPassword'
//               value={confirmPassword}
//               onChange={onChange}
//               placeholder='Confirm Password'
//               required
//             />
//             <FaLock className='icon' />
//           </div>
//         </div>
//         <div className='remember-forgot'>
//           <label>
//             <input type='checkbox' /> Remember me
//           </label>
//           <a href='#'>Forgot Password?</a>
//         </div>
//         <button type='submit'>Sign Up</button>
//         <div className='register-link'>
//           <p>
//             Already have an account? <Link to='/login'>Log In</Link>
//           </p>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default SignupForm;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaLock, FaPlane } from 'react-icons/fa';
import { MdOutlineAlternateEmail } from 'react-icons/md';
import { BsTelephone } from 'react-icons/bs';
import axios from 'axios';
import './Signup.css';

const SignupForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({});
  const [touchedFields, setTouchedFields] = useState({});
  const navigate = useNavigate();

  const validateField = (name, value) => {
    switch (name) {
      case 'firstName':
        return !value.trim() ? 'First name is required' : '';
      case 'lastName':
        return !value.trim() ? 'Last name is required' : '';
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value.trim()) return 'Email is required';
        if (!emailRegex.test(value)) return 'Invalid email format';
        return '';
      case 'phoneNumber':
        const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
        if (!value.trim()) return 'Phone number is required';
        if (!phoneRegex.test(value)) return 'Invalid phone number';
        return '';
      case 'password':
        if (!value) return 'Password is required';
        if (value.length < 8) return 'Password must be at least 8 characters';
        return '';
      case 'confirmPassword':
        if (!value) return 'Please confirm your password';
        if (value !== formData.password) return 'Passwords do not match';
        return '';
      default:
        return '';
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouchedFields(prev => ({ ...prev, [name]: true }));
    
    const errorMessage = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: errorMessage }));
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing if field has been touched
    if (touchedFields[name]) {
      const errorMessage = validateField(name, value);
      setErrors(prev => ({ ...prev, [name]: errorMessage }));
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    
    // Validate all fields
    const newErrors = {};
    Object.keys(formData).forEach(key => {
      const errorMessage = validateField(key, formData[key]);
      if (errorMessage) newErrors[key] = errorMessage;
    });

    setErrors(newErrors);
    setTouchedFields(
      Object.keys(formData).reduce((acc, key) => ({ ...acc, [key]: true }), {})
    );

    // Only submit if no errors
    if (Object.keys(newErrors).length === 0) {
      try {
        const res = await axios.post('http://localhost:5000/api/users/register', formData);
        alert('Registration successful, please log in.');
        navigate('/login');
      } catch (err) {
        console.error('Registration error:', err.response?.data || err.message);
        alert('Registration failed. Please try again.');
      }
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
        <div className="logo">
          <h3>Voyaige</h3>
          <FaPlane />
        </div>
        <h2>Join Us</h2>
        <form onSubmit={onSubmit}>
          <div className={`input-row`}>
            <div className={`input-group ${touchedFields.firstName && errors.firstName ? 'error' : ''}`}>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={onChange}
                onBlur={handleBlur}
                placeholder="First Name"
              />
              {touchedFields.firstName && errors.firstName && (
                <div className="error-tooltip">{errors.firstName}</div>
              )}
            </div>
            <div className={`input-group ${touchedFields.lastName && errors.lastName ? 'error' : ''}`}>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={onChange}
                onBlur={handleBlur}
                placeholder="Last Name"
              />
              {touchedFields.lastName && errors.lastName && (
                <div className="error-tooltip">{errors.lastName}</div>
              )}
            </div>
          </div>
          
          <div className={`input-group ${touchedFields.email && errors.email ? 'error' : ''}`}>
            <MdOutlineAlternateEmail className="icon" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={onChange}
              onBlur={handleBlur}
              placeholder="Email"
            />
            {touchedFields.email && errors.email && (
              <div className="error-tooltip">{errors.email}</div>
            )}
          </div>
          
          <div className={`input-group ${touchedFields.phoneNumber && errors.phoneNumber ? 'error' : ''}`}>
            <BsTelephone className="icon" />
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={onChange}
              onBlur={handleBlur}
              placeholder="Phone Number"
            />
            {touchedFields.phoneNumber && errors.phoneNumber && (
              <div className="error-tooltip">{errors.phoneNumber}</div>
            )}
          </div>
          
          <div className={`input-group ${touchedFields.password && errors.password ? 'error' : ''}`}>
            <FaLock className="icon" />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={onChange}
              onBlur={handleBlur}
              placeholder="Password"
            />
            {touchedFields.password && errors.password && (
              <div className="error-tooltip">{errors.password}</div>
            )}
          </div>
          
          <div className={`input-group ${touchedFields.confirmPassword && errors.confirmPassword ? 'error' : ''}`}>
            <FaLock className="icon" />
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={onChange}
              onBlur={handleBlur}
              placeholder="Confirm Password"
            />
            {touchedFields.confirmPassword && errors.confirmPassword && (
              <div className="error-tooltip">{errors.confirmPassword}</div>
            )}
          </div>
          
          <button type="submit" className="submit-btn">Sign Up</button>
        </form>
        <p className="switch-form">
          Already have an account? <a href="/login">Log In</a>
        </p>
      </div>
    </div>
  );
};

export default SignupForm;
