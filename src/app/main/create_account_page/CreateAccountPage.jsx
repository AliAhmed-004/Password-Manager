import React, { useState } from 'react';
import Textfield from '../../shared_components/Textfield';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function CreateAccountPage() {
    const baseUrl = import.meta.env.VITE_BASE_URL;
    const createUserEndpoint = import.meta.env.VITE_API_CREATE_USER;

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [name, setName] = useState('')
    const [is2FAEnabled, setIs2FAEnabled] = useState(false);
    const [errors, setErrors] = useState({});
    const [serverError, setServerError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const navigate = useNavigate();


    function validate() {
        const newErrors = {};
        if (!name) newErrors.name = 'Name is required';
        if (!email) newErrors.email = 'Email is required';
        if (!password) newErrors.password = 'Password is required';
        if (!confirmPassword) newErrors.confirmPassword = 'Confirm Password is required';
        if (password && confirmPassword && password !== confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }
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
            'name': name,
            'email': email,
            'password': password,
            'is2FAEnabled': is2FAEnabled
        }

        const headers = {
            'Content-Type': 'application/json',
            // Add any other headers you need, e.g.:
            // 'Authorization': 'Bearer your_token'
          };
        
        try {
            const response = await axios.post(
                `${baseUrl}${createUserEndpoint}`,
                body,
                { headers },
            );

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
                    <span className='text-xl font-bold'>Please enter your information to create an account</span>
                </div>

                <form className="flex flex-col gap-4 w-full max-w-sm" onSubmit={verifyCredentials}>
                    {serverError && <div className="text-red-500 text-sm mb-2">{serverError}</div>}
                    {successMessage && <div className="text-green-500 text-sm mb-2">{successMessage}</div>}
                    <Textfield
                        type="text"
                        name="name"
                        label={'Name'}
                        value={name}
                        onChange={e => setName(e.target.value)}
                        inputClassName="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-300"
                    />
                    {errors.name && <span className="text-red-500 text-xs">{errors.name}</span>}

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

                    <Textfield
                        type="password"
                        name="confirmPassword"
                        label={'Confirm Password'}
                        placeholder='***'
                        value={confirmPassword}
                        onChange={e => setConfirmPassword(e.target.value)}
                        inputClassName="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-300"
                    />
                    {errors.confirmPassword && <span className="text-red-500 text-xs">{errors.confirmPassword}</span>}

                    <button 
                        className='mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-300' 
                        type="submit"
                    >
                        Create Account
                    </button>
                </form>

                <span className='gap-2'>
                    Already have an account? 
                    <button 
                        onClick={() => navigate('/login', { replace: true })}
                        className='text-blue-300'
                    >
                        Sign In!
                    </button>
                </span>
            </div>
        </div>
    );
}