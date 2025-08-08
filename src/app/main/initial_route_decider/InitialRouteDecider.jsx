import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function InitialRouteDecider() {
    const navigate = useNavigate();

    useEffect(() => {
        // Check if user exists in localStorage
        const userStr = localStorage.getItem("user");
        
        if (userStr) {
            try {
                const userObj = JSON.parse(userStr);
                // If user exists and has valid data, redirect to homepage
                if (userObj && userObj.email) {
                    navigate('/homepage', { replace: true });
                } else {
                    // Invalid user data, clear it and go to create account
                    localStorage.removeItem("user");
                    navigate('/create-account', { replace: true });
                }
            } catch (error) {
                // Invalid JSON in localStorage, clear it and go to create account
                console.error("Invalid user data in localStorage:", error);
                localStorage.removeItem("user");
                navigate('/create-account', { replace: true });
            }
        } else {
            // No user in localStorage, redirect to create account
            navigate('/create-account', { replace: true });
        }
    }, [navigate]);

    // Show loading state while checking
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-800 via-gray-900 to-black text-white">
            <div className="flex flex-col items-center justify-center bg-gray-800 rounded-xl shadow-lg p-10 w-full max-w-md">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mb-4"></div>
                <h2 className="text-xl font-semibold text-center">
                    Checking authentication...
                </h2>
                <p className="text-gray-400 text-center mt-2">
                    Please wait while we verify your session
                </p>
            </div>
        </div>
    );
}
