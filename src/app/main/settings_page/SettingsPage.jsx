import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Textfield from "../../shared_components/Textfield";
import axios from "axios";
import { QRCodeSVG } from "qrcode.react";

export default function SettingsPage() {
    const [user, setUser] = useState({
        name: "",
        email: "",
        is2FAEnabled: false,
    });
    const [editMode, setEditMode] = useState(false);
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
    });
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");

    const [qr_url, setQR_URL] = useState('');
    const [otp, setOtp] = useState('')

    const baseUrl = import.meta.env.VITE_BASE_URL;
    const OTP_URL_Endpoint = import.meta.env.VITE_API_GET_OTP_URL;
    const verifyOTP_Endpoint = import.meta.env.VITE_API_VERIFY_OTP;

    const navigate = useNavigate();

    useEffect(() => {
        // Load user from localStorage
        const userStr = localStorage.getItem("user");
        if (userStr) {
            const userObj = JSON.parse(userStr);
            setUser({
                name: userObj.name || "",
                email: userObj.email || "",
                is2FAEnabled: userObj.is2FAEnabled || false,
            });
            setForm({
                name: userObj.name || "",
                email: userObj.email || "",
                password: "",
            });
        }
    }, []);

    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    function handleEdit() {
        setEditMode(true);
        setSuccess("");
        setError("");
    }

    function handleCancel() {
        setEditMode(false);
        setForm({
            name: user.name,
            email: user.email,
            password: "",
        });
        setSuccess("");
        setError("");
    }

    function handleSave(e) {
        e.preventDefault();
        // Simulate save
        if (!form.name || !form.email) {
            setError("Name and email are required.");
            return;
        }
        setUser({
            name: form.name,
            email: form.email,
            is2FAEnabled: user.is2FAEnabled,
        });
        // Update localStorage
        const userStr = localStorage.getItem("user");
        if (userStr) {
            const userObj = JSON.parse(userStr);
            userObj.name = form.name;
            userObj.email = form.email;
            localStorage.setItem("user", JSON.stringify(userObj));
        }
        setEditMode(false);
        setSuccess("Profile updated successfully!");
        setError("");
    }

    async function handleEnable2FA() {
        const headers = {
            'Content-Type': 'application/json',
        };

        const body = {
            'email': user.email
        };

        // Make the POST request
        const response = await axios.post(
            `${baseUrl}${OTP_URL_Endpoint}`,
            body,
            { headers }
        );

        // Extract URL and secret from the response
        const qr_url = response.data.data.qr_url

        // Set the QR URL
        setQR_URL(qr_url)        
    }

    async function handleVerifyOtp() {
        // Request body
        const body = {
            'email': user.email,
            'otp': otp
        }

        // Request headers
        const headers = {
            'Content-Type': 'application/json',
        };

        try {
            const response = await axios.post(
                `${baseUrl}${verifyOTP_Endpoint}`,
                JSON.stringify(body),
                { headers }
            );

            // update user's info
            const updatedUser = {
                'name': user.name,
                'email': user.email,
                'is2FAEnabled': true,
            }

            localStorage.setItem('user', JSON.stringify(updatedUser))

            console.log("Setting user")
            setUser(updatedUser)
            setQR_URL('')
        } catch (error) {
            console.log(`Not OK: ${error}`)
            
        }
    }

    function handleLogout() {
        // Remove user from localStorage
        localStorage.setItem('user', null)

        // Navigate to CreateAccoungPage
        navigate('/', { replace: true })
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-800 via-gray-900 to-black text-white">
            <div className="flex flex-col items-center justify-center bg-gray-800 rounded-xl shadow-lg p-10 w-full max-w-md">
                <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                    Settings
                </h2>
                {success && <div className="mb-4 text-green-400 text-center">{success}</div>}
                {error && <div className="mb-4 text-red-400 text-center">{error}</div>}
                <form onSubmit={handleSave} className="flex flex-col gap-5">
                    <div className="flex flex-col gap-8">
                        <Textfield
                            label={'Name'}
                            value={user.name}
                            placeholder="Your name"
                        />
                        <Textfield
                            label={'New Password'}
                            placeholder="***"
                        />
                        <Textfield
                            label={'Confirm Password'}
                            placeholder="***"
                        />
                    </div>
                    
                    {/* 2FA Section */}
                    <div className="border-t border-gray-600 pt-5">
                        <label className="block text-gray-300 mb-1">Two-Factor Authentication</label>
                        <div className="flex items-center justify-between p-3 bg-gray-700 rounded border border-gray-600">
                            <div className="flex items-center gap-3">
                                <span className="text-2xl">{user.is2FAEnabled ? "🔒" : "⚠️"}</span>
                                <div>
                                    <div className="text-white font-medium">
                                        {user.is2FAEnabled ? "Enabled" : "Disabled"}
                                    </div>
                                    <div className="text-gray-400 text-sm">
                                        {user.is2FAEnabled 
                                            ? "Your account is protected with 2FA" 
                                            : "Enable 2FA for enhanced security"
                                        }
                                    </div>
                                </div>
                            </div>
                            {!user.is2FAEnabled && (
                                <button
                                    type="button"
                                    onClick={handleEnable2FA}
                                    className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded transition text-sm"
                                >
                                    Enable 2FA
                                </button>
                            )}
                        </div>
                    </div>

                    {/* QR Code */}
                    {qr_url &&
                        <div>
                            <QRCodeSVG value={qr_url} size={256} includeMargin={true}/>
                            
                            <div className="flex items-end justify-between">
                                {/* Textfield to verify OTP */}
                                <Textfield
                                    type="number"
                                    name="otp"
                                    label={'Please enter the OTP to verify'}
                                    onChange={e => setOtp(e.target.value)}
                                    inputClassName="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-300"
                                    className="mt-10"
                                />

                                <button 
                                    className="px-4 py-2 rounded-2xl bg-green-600"
                                    onClick={handleVerifyOtp}>
                                        Verify
                                </button>
                            </div>
                        </div>
                    }

                    <div className="flex justify-between mt-4">
                        {!editMode ? (
                            <button
                                type="button"
                                onClick={handleEdit}
                                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded transition"
                            >
                                Edit
                            </button>
                        ) : (
                            <>
                                <button
                                    type="submit"
                                    className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded transition"
                                >
                                    Save
                                </button>
                                <button
                                    type="button"
                                    onClick={handleCancel}
                                    className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-6 rounded transition"
                                >
                                    Cancel
                                </button>
                            </>
                        )}
                    </div>
                </form>

                {/* Logout Button */}
                <button 
                    className="px-10 py-5 rounded-xl mt-5 bg-red-400"
                    onClick={handleLogout}>
                        Log Out
                </button>
            </div>
            <footer className="mt-10 text-gray-500 text-sm">
                &copy; {new Date().getFullYear()} 2FA Demo App. All rights reserved.
            </footer>
        </div>
    );
}
