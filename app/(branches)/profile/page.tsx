'use client'
import React from 'react';
import PasswordReset from '@/app/components/PasswordReset/page';
import Navigation from '../../components/Navigation/page';
import jwt from 'jsonwebtoken';

const handlePasswordReset = async (newPassword: string) => {
  try {
    // Get the user ID from the jwt payload
    const token = localStorage.getItem('token');
    if (!token) {
      console.log('Token not found.');
      // Handle error scenario, such as redirecting to the login page
      return;
    }

    const decodedToken = jwt.decode(token);
    if (!decodedToken || typeof decodedToken !== 'object') {
      console.log('Decoded token not found or invalid.');
      // Handle error scenario, such as redirecting to the login page
      return;
    }

    const userId = decodedToken.id;

    console.log('User ID from JWT:', userId);
    console.log('Decoded token:', decodedToken);

    // Make a PUT request to update the user's password
    const response = await fetch(`http://localhost:8000/api-v1/users/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ password: newPassword }),
    });

    if (response.ok) {
      console.log('Password reset successful!');
      // Perform any additional actions upon successful password reset
    } else {
      console.log('Password reset failed.');
      // Handle error scenario, such as displaying an error message to the user
    }
  } catch (error) {
    console.log('An error occurred during password reset:', error);
    // Handle error scenario
  }
};

const Profile = () => {
  const token = localStorage.getItem('token');
  if (!token) {
    console.log('Token not found.');
    // Handle error scenario, such as redirecting to the login page
    return;
  }
  const decodedToken = jwt.decode(token);
  if (!decodedToken || typeof decodedToken !== 'object') {
    console.log('Decoded token not found or invalid.');
    // Handle error scenario, such as redirecting to the login page
    return;
  }

  console.log(decodedToken)

  return (
    <div>
      <Navigation />
      <h2>Hi {decodedToken.name}</h2>
      <PasswordReset onSubmit={handlePasswordReset} />
      {/* List of current games uploaded */}
      <a href = '/profile/games'>Uploaded Game</a>
    </div>
  );
};

export default Profile;
