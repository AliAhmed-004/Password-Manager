import { useEffect, useState } from "react";
import Card from "./components/card";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function HomePage() {
    const [is2FAEnabled, setIs2FAEnabled] = useState(false);
    const [user, setUser] = useState({ name: "", email: "" });
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        // Grab the user from localStorage
        const userStr = localStorage.getItem('user');

        if (userStr) {
            const user = JSON.parse(userStr);
            setIs2FAEnabled(user.is2FAEnabled);
            setUser(user);
        }
    }, []);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    const NavigationItem = ({ icon, text, onClick, active = false }) => (
        <button
            onClick={onClick}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 hover:bg-gray-700 ${
                active ? 'bg-gray-700 text-blue-400' : 'text-gray-300 hover:text-white'
            }`}
        >
            <span className="text-xl">{icon}</span>
            <span className="font-medium">{text}</span>
        </button>
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-800 via-gray-900 to-black text-white">
            {/* Mobile Header */}
            <div className="lg:hidden bg-gray-800 border-b border-gray-700 px-4 py-3">
                <div className="flex items-center justify-between">
                    <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                        SecureVault
                    </h1>
                    <button
                        onClick={toggleSidebar}
                        className="text-gray-300 hover:text-white p-2"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Tablet Header */}
            <div className="hidden lg:hidden md:block bg-gray-800 border-b border-gray-700 px-6 py-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                        SecureVault
                    </h1>
                    <div className="flex items-center gap-4">
                        <NavigationItem icon="🔍" text="Search" onClick={() => {}} />
                        <NavigationItem icon="➕" text="Add Password" onClick={() => {}} />
                        <NavigationItem icon="⚙️" text="Settings" onClick={() => navigate('/settings')} />
                        <div className="w-px h-6 bg-gray-600"></div>
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-400">Welcome,</span>
                            <span className="font-medium">{user.name}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex">
                {/* Desktop Sidebar */}
                <div className="hidden lg:block w-64 bg-gray-800 border-r border-gray-700 min-h-screen">
                    <div className="px-2 py-8">
                        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-8">
                            SecureVault
                        </h1>

                        <div className="space-y-2">
                            <NavigationItem icon="🏠" text="Dashboard" onClick={() => {}} active={true} />
                            <NavigationItem icon="🔍" text="Search Passwords" onClick={() => {}} />
                            <NavigationItem icon="➕" text="Add Password" onClick={() => {}} />
                            <NavigationItem icon="📁" text="Categories" onClick={() => {}} />
                            <NavigationItem icon="🔐" text="Security" onClick={() => {}} />
                        </div>

                        <div className="mt-8 pt-6 border-t border-gray-700">
                            <NavigationItem icon="⚙️" text="Settings" onClick={() => navigate('/settings')} />
                            <NavigationItem icon="📊" text="Analytics" onClick={() => {}} />
                        </div>

                        <div className="mt-8 pt-6 border-t border-gray-700">
                            <div className="px-4 py-3">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                                        <span className="text-sm font-medium">{user.name?.charAt(0) || 'U'}</span>
                                    </div>
                                    <div>
                                        <div className="font-medium text-white">{user.name}</div>
                                        <div className="text-xs text-gray-400">{user.email}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Mobile Sidebar Overlay */}
                {sidebarOpen && (
                    <div className="lg:hidden fixed inset-0 z-50">
                        <div className="fixed inset-0 bg-black bg-opacity-50" onClick={toggleSidebar}></div>
                        <div className="fixed left-0 top-0 h-full w-64 bg-gray-800 border-r border-gray-700">
                            <div className="p-6">
                                <div className="flex items-center justify-between mb-8">
                                    <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                                        SecureVault
                                    </h1>
                                    <button onClick={toggleSidebar} className="text-gray-300 hover:text-white">
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                                
                                <div className="space-y-2">
                                    <NavigationItem icon="🏠" text="Dashboard" onClick={() => {}} active={true} />
                                    <NavigationItem icon="🔍" text="Search Passwords" onClick={() => {}} />
                                    <NavigationItem icon="➕" text="Add Password" onClick={() => {}} />
                                    <NavigationItem icon="📁" text="Categories" onClick={() => {}} />
                                    <NavigationItem icon="🔐" text="Security" onClick={() => {}} />
                                    <NavigationItem icon="⚙️" text="Settings" onClick={() => navigate('/settings')} />
                                </div>

                                <div className="mt-8 pt-6 border-t border-gray-700">
                                    <div className="px-4 py-3">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                                                <span className="text-sm font-medium">{user.name?.charAt(0) || 'U'}</span>
                                            </div>
                                            <div>
                                                <div className="font-medium text-white">{user.name}</div>
                                                <div className="text-xs text-gray-400">{user.email}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Main Content */}
                <div className="flex-1 min-h-screen">
                    <div className="p-6 lg:p-8">
                        {/* Welcome Section */}
                        <div className="mb-8">
                            <h2 className="text-3xl font-bold mb-2">Welcome back, {user.name}!</h2>
                            <p className="text-gray-400">Manage your passwords securely with 2FA protection</p>
                        </div>

                        {/* Stats Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-gray-400 text-sm">Total Passwords</p>
                                        <p className="text-2xl font-bold">0</p>
                                    </div>
                                    <span className="text-2xl">🔐</span>
                                </div>
                            </div>
                            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-gray-400 text-sm">Categories</p>
                                        <p className="text-2xl font-bold">0</p>
                                    </div>
                                    <span className="text-2xl">📁</span>
                                </div>
                            </div>
                            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-gray-400 text-sm">Security Score</p>
                                        <p className="text-2xl font-bold">85%</p>
                                    </div>
                                    <span className="text-2xl">🛡️</span>
                                </div>
                            </div>
                            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-gray-400 text-sm">2FA Status</p>
                                        <p className="text-2xl font-bold">{is2FAEnabled ? "Enabled" : "Disabled"}</p>
                                    </div>
                                    <span className="text-2xl">{is2FAEnabled ? "🔒" : "⚠️"}</span>
                                </div>
                            </div>
                        </div>

                        {/* Top Passwords */}
                        <div className="mb-8">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-xl font-semibold">Top Passwords</h3>
                                <button 
                                    onClick={() => {}} // TODO: Navigate to all passwords
                                    className="text-blue-400 hover:text-blue-300 text-sm font-medium transition"
                                >
                                    View All
                                </button>
                            </div>
                            
                            {/* Empty State */}
                            <div className="bg-gray-800 rounded-xl p-8 border border-gray-700">
                                <div className="text-center">
                                    <span className="text-6xl mb-4 block">🔐</span>
                                    <h4 className="text-lg font-semibold text-white mb-2">No passwords yet</h4>
                                    <p className="text-gray-400 mb-6 max-w-md mx-auto">
                                        Start building your secure password vault. Add your first password to get started with SecureVault.
                                    </p>
                                    <button
                                        onClick={() => {}} // TODO: Navigate to add password page
                                        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition flex items-center gap-2 mx-auto"
                                    >
                                        <span>➕</span>
                                        Add Your First Password
                                    </button>
                                </div>
                            </div>
                            
                            {/* TODO: When passwords exist, show them like this:
                            <div className="space-y-3">
                                <div className="bg-gray-800 rounded-lg p-4 border border-gray-700 hover:bg-gray-750 transition">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <span className="text-2xl">🌐</span>
                                            <div>
                                                <h4 className="font-medium text-white">Gmail</h4>
                                                <p className="text-sm text-gray-400">user@gmail.com</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-xs text-gray-500">Last used 2h ago</span>
                                            <button className="text-blue-400 hover:text-blue-300 text-sm">
                                                View
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="bg-gray-800 rounded-lg p-4 border border-gray-700 hover:bg-gray-750 transition">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <span className="text-2xl">💳</span>
                                            <div>
                                                <h4 className="font-medium text-white">Bank of America</h4>
                                                <p className="text-sm text-gray-400">online banking</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-xs text-gray-500">Last used 1d ago</span>
                                            <button className="text-blue-400 hover:text-blue-300 text-sm">
                                                View
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            */}
                        </div>

                        {/* Security Alerts */}
                        {!is2FAEnabled && (
                            <div className="bg-yellow-900/20 border border-yellow-600/30 rounded-xl p-6 mb-8">
                                <div className="flex items-start gap-4">
                                    <span className="text-2xl">⚠️</span>
                                    <div className="flex-1">
                                        <h3 className="text-lg font-semibold text-yellow-400 mb-2">Security Recommendation</h3>
                                        <p className="text-gray-300 mb-4">
                                            Two-factor authentication is disabled for your account. Enable it in settings for enhanced security.
                                        </p>
                                        <button
                                            onClick={() => navigate('/settings')}
                                            className="bg-yellow-600 hover:bg-yellow-700 text-white font-semibold py-2 px-4 rounded transition"
                                        >
                                            Enable 2FA
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Recent Activity */}
                        <div>
                            <h3 className="text-xl font-semibold mb-4">Recent Activity</h3>
                            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                                <div className="text-center text-gray-400 py-8">
                                    <span className="text-4xl mb-4 block">📝</span>
                                    <p>No recent activity</p>
                                    <p className="text-sm">Your password activities will appear here</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}