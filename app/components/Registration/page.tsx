'use client'
import React, { useState } from 'react';
import jwt from 'jsonwebtoken';

const Registration: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userName, setUserName] = useState('');

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleUserNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // Prepare the user data to be sent in the POST request
    const userData = {
      name,
      email,
      password,
      userName,
      // Add other user data fields as needed (e.g., userName, avatar, bio)
    };

    try {
      // Make a POST request to the server with the user data
      const response = await fetch(`http://localhost:8000/api-v1/users/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      // Handle the response if needed
      if (response.ok) {
        const data = await response.json();
        // Save the JWT to localStorage
        localStorage.setItem('token', data.token);
        // Decode the JWT and save the user data
        const user = jwt.decode(data.token);
        console.log('User registered successfully:', user);
        console.log('User registered successfully:', data);
      } else {
        console.error('Error registering user:', response.statusText);
      }
      // Redirect the user to the login page
      window.location.href = '/login';
    } catch (error) {
      // Handle errors if the POST request fails
      console.error('Error registering user:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" value={name} onChange={handleNameChange} />
        </div>
        <div>
          <label htmlFor='userName'>User Name:</label>
          <input type='text' id='userName' autoComplete="username" value={userName} onChange={handleUserNameChange} />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" value={email} onChange={handleEmailChange} />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" autoComplete="current-password" value={password} onChange={handlePasswordChange} />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Registration;
