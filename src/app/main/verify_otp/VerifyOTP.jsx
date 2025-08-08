import React, { useState } from "react";
import Textfield from "../../shared_components/Textfield";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function VerifyOTP() {
    const [otp, setOtp] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);

    const baseUrl = import.meta.env.VITE_BASE_URL;
    const verifyOtpEndpoint = import.meta.env.VITE_API_VERIFY_OTP;
    const navigate = useNavigate();

    async function handleVerify(e) {
        e.preventDefault();
        setError("");
        setSuccess("");
        setLoading(true);

        if (!otp || otp.length < 6) {
            setError("Please enter a valid OTP (6 digits).");
            setLoading(false);
            return;
        }

        try {
            // Get user from localStorage
            const userStr = localStorage.getItem("user");
            const user = userStr ? JSON.parse(userStr) : null;
            if (!user) {
                setError("User not found. Please log in again.");
                setLoading(false);
                return;
            }

            // Make the API call to verify OTP
            await axios.post(
                `${baseUrl}${verifyOtpEndpoint}`,
                {
                    email: user.email,
                    otp: otp,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            setSuccess("OTP verified successfully!");

            setTimeout(() => {
                navigate("/homepage", { replace: true });
            }, 1000);
        } catch (err) {
            setError(
                err.response?.data?.message ||
                    "Invalid OTP. Please try again."
            );
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-800 via-gray-900 to-black text-white">
            <div className="bg-gray-700 rounded-xl shadow-lg p-10 flex flex-col items-center w-full max-w-md">
                <span className="text-5xl mb-4">🔑</span>
                <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                    Verify OTP
                </h2>
                <p className="text-gray-300 mb-6 text-center">
                    Enter the One-Time Password from your Google Authenticator app.
                </p>
                <form className="flex flex-col gap-4 w-full" onSubmit={handleVerify}>
                    {error && (
                        <div className="text-red-500 text-sm mb-2 text-center">{error}</div>
                    )}
                    {success && (
                        <div className="text-green-500 text-sm mb-2 text-center">{success}</div>
                    )}
                    <Textfield
                        type="text"
                        name="otp"
                        label="OTP"
                        value={otp}
                        onChange={e => setOtp(e.target.value)}
                        placeholder="Enter OTP"
                        inputClassName="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-300 text-black"
                        autoFocus
                        maxLength={8}
                    />
                    <button
                        type="submit"
                        className={`bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded transition mt-2 ${
                            loading ? "opacity-60 cursor-not-allowed" : ""
                        }`}
                        disabled={loading}
                    >
                        {loading ? "Verifying..." : "Verify"}
                    </button>
                </form>
            </div>
            <footer className="mt-10 text-gray-500 text-sm">
                &copy; {new Date().getFullYear()} 2FA Demo App. All rights reserved.
            </footer>
        </div>
    );
}
