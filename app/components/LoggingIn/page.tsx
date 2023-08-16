// Login component

import React, { useState } from 'react';
import jwt from 'jsonwebtoken';

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };
    
    const handlePasswordChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setPassword(event.target.value);
    };
    
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
    
        // Prepare the user data to be sent in the POST request
        const userData = {
        email,
        password,
        };
    
        try {
        // Make a POST request to the server with the user data
        const response = await fetch(`http://localhost:8000/api-v1/users/login`, {
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
            console.log('User logged in successfully:', user);
            console.log('User logged in successfully:', data);
            // Redirect the user to the home page
            window.location.href = '/';
        } else {
            console.error('Error logging in user:', response.statusText);
        }
        } catch (error) {
        console.error('Error logging in user:', error);
        }
    };
    
    return (
        <div>
        <form onSubmit={handleSubmit}>
            <div>
            <label htmlFor="email">Email</label>
            <input
                type="email"
                name="email"
                value={email}
                autoComplete='email'
                onChange={handleEmailChange}
            />
            </div>
            <div>
            <label htmlFor="password">Password</label>
            <input
                type="password"
                name="password"
                value={password}
                autoComplete='password'
                onChange={handlePasswordChange}
            />
            </div>
            <button type="submit">Login</button>
        </form>
        </div>
    );
    }

export default Login;