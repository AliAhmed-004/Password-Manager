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
            
            // Navigate to HomePage
            navigate('/homepage', { replace: true })
        } catch (err) {

            setServerError(
                err.response?.data?.message || 'An error occurred. Please try again.'
            );
        }
    }

    return (
        <div className='min-h-screen flex  items-center justify-center bg-gray-800'>
            {/* Left side */}
            <div className='min-h-screen w-full flex flex-col items-center justify-center'>
                <div className='bg-gray-400 p-40'></div>
            </div>

            {/* Right side */}
            <div className='min-h-screen w-full flex flex-col items-start justify-center text-white gap-6 p-20'>
                {/* Welcome Message */}
                <div className='text-3xl text-gray-400'>
                    <span>Welcome to this Demo of 2FA!</span>
                    <br />
                    <span className='text-xl font-bold'>Please enter your credentials</span>
                </div>

                <form className="flex flex-col gap-4 w-full max-w-sm" onSubmit={verifyCredentials}>
                    {serverError && <div className="text-red-500 text-sm mb-2">{serverError}</div>}
                    {successMessage && <div className="text-green-500 text-sm mb-2">{successMessage}</div>}

                    <Textfield
                        type="email"
                        name="email"
                        label={'Email'}
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder="example@email.com"
                        autoComplete="email"
                        inputClassName="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-300"
                    />
                    {errors.email && <span className="text-red-500 text-xs">{errors.email}</span>}

                    <Textfield
                        type="password"
                        name="password"
                        label={'Password'}
                        placeholder='***'
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        inputClassName="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-300"
                    />
                    {errors.password && <span className="text-red-500 text-xs">{errors.password}</span>}

                    
                    <button 
                        className='mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-300' 
                        type="submit"
                    >
                        Log In
                    </button>
                </form>

                <span className='gap-2'>
                    Don't have an account?
                    <button 
                        onClick={() => navigate('/', { replace: true })}
                        className='text-blue-300'
                    >
                        Make one!
                    </button>
                </span>
            </div>
        </div>
    );
}