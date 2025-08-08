import React, { useState } from 'react';
import Textfield from '../../shared_components/Textfield';
import axios from 'axios';
import { replace, useNavigate } from 'react-router-dom';

export default function LogInPage() {
    const baseUrl = import.meta.env.VITE_BASE_URL;
    const loginUserEndpoint = import.meta.env.VITE_API_LOGIN_USER;
    const navigate = useNavigate();

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errors, setErrors] = useState({});
    const [serverError, setServerError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    function validate() {
        const newErrors = {};
        if (!email) newErrors.email = 'Email is required';
        if (!password) newErrors.password = 'Password is required';
        return newErrors;
      }


    async function verifyCredentials(e) {
        e.preventDefault();
        setServerError('');
        setSuccessMessage('');

        const validationErrors = validate();
        
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        
        setErrors({});
        
        const body = {
            'email': email,
            'password': password,
        }

        const headers = {
            'Content-Type': 'application/json',
        };
        
        try {
            const response = await axios.post(
                `${baseUrl}${loginUserEndpoint}`,
                body,
                { headers },
            );
            setSuccessMessage(response.data.message || 'User created successfully!');

            // Get user information from the response
            const user = response.data.data.user

            // Save the user data in local storage
            localStorage.setItem('user', JSON.stringify(user))

            
            if (!user.is2FAEnabled) {
                // Navigate to HomePage
                navigate('/homepage', { replace: true });
                return;
            }

            navigate('/verifyOTP');
        } catch (err) {

            setServerError(
                err.response?.data?.message || 'An error occurred. Please try again.'
            );
        }
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-800 via-gray-900 to-black text-white">
            <div className="bg-gray-800 rounded-xl shadow-lg p-10 w-full max-w-md">
                <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                    Log In
                </h2>
                {serverError && <div className="mb-4 text-red-400 text-center">{serverError}</div>}
                {successMessage && <div className="mb-4 text-green-400 text-center">{successMessage}</div>}
                
                <form className="flex flex-col gap-5" onSubmit={verifyCredentials}>
                    <div>
                        <label className="block text-gray-300 mb-1">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            placeholder="example@email.com"
                            autoComplete="email"
                            className="w-full px-3 py-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400 text-white"
                        />
                        {errors.email && <span className="text-red-400 text-xs">{errors.email}</span>}
                    </div>

                    <div>
                        <label className="block text-gray-300 mb-1">Password</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            className="w-full px-3 py-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400 text-white"
                        />
                        {errors.password && <span className="text-red-400 text-xs">{errors.password}</span>}
                    </div>

                    <button 
                        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded transition mt-4"
                        type="submit"
                    >
                        Log In
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <span className="text-gray-400">Don't have an account? </span>
                    <button 
                        onClick={() => navigate('/create-account', { replace: true })}
                        className="text-blue-400 hover:text-blue-300 transition"
                    >
                        Make one!
                    </button>
                </div>
            </div>
            <footer className="mt-10 text-gray-500 text-sm">
                &copy; {new Date().getFullYear()} 2FA Demo App. All rights reserved.
            </footer>
        </div>
    );
}