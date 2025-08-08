import { useEffect, useState } from "react";
import Card from "./components/card";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function HomePage() {

    const [is2FAEnabled, setIs2FAEnabled] = useState(false)

    const navigate = useNavigate()

    useEffect(() => {
        // Grab the user from localStorage
        const userStr = localStorage.getItem('user');

        if (userStr) {
            const user = JSON.parse(userStr);
            setIs2FAEnabled(user.is2FAEnabled);
        }
    }, []);
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-800 via-gray-900 to-black text-white">
            <header className="mb-10 text-center">
                <h1 className="text-5xl font-extrabold mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                    Welcome to the 2FA Demo App!
                </h1>
                <p className="text-lg text-gray-300 max-w-xl mx-auto">
                    Experience modern authentication with Two-Factor Authentication. Secure your account and explore our features!
                </p>
            </header>
            
            <div className="flex flex-col md:flex-row gap-8">
                {/* "Enable 2FA if false" card */}
                {!is2FAEnabled && 
                    <Card 
                        title="2FA Disabled"
                        description="It seems like two factor authentication for your account is disabled. Enable it in settings for more security"
                        icon="🔒"
                        buttonText="Enable 2FA"
                    />
                }
                

                <Card 
                    title="View settings"
                    description="Change your name, email or password"
                    icon="⚙"
                    buttonText="Go to settings"
                    onButtonClick={() => navigate('/settings')}
                    addButton={true}
                />
            </div>
            <footer className="mt-16 text-gray-500 text-sm">
                &copy; {new Date().getFullYear()} 2FA Demo App. All rights reserved.
            </footer>
        </div>
    );
}