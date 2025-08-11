import { useState } from "react";

export default function AddPasswordModal({ isOpen, onClose, onSave }) {
    const [formData, setFormData] = useState({
        title: "",
        username: "",
        password: "",
        website: "",
        notes: "",
        category: "personal"
    });
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        
        try {
            // TODO: Implement password saving logic
            await onSave(formData);
            handleClose();
        } catch (error) {
            console.error("Error saving password:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleClose = () => {
        setFormData({
            title: "",
            username: "",
            password: "",
            website: "",
            notes: "",
            category: "personal"
        });
        setShowPassword(false);
        setIsLoading(false);
        onClose();
    };

    const generatePassword = () => {
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";
        let result = "";
        for (let i = 0; i < 16; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        setFormData(prev => ({ ...prev, password: result }));
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-gray-800 rounded-xl shadow-lg max-w-md w-full mx-4 border border-gray-700">
                <div className="p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold text-white">Add New Password</h2>
                        <button
                            onClick={handleClose}
                            className="text-gray-400 hover:text-white transition"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Title */}
                        <div>
                            <label className="block text-gray-300 mb-1 text-sm font-medium">
                                Title *
                            </label>
                            <input
                                type="text"
                                value={formData.title}
                                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                                placeholder="e.g., Gmail, Bank Account"
                                className="w-full px-3 py-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400 text-white"
                                required
                            />
                        </div>

                        {/* Username/Email */}
                        <div>
                            <label className="block text-gray-300 mb-1 text-sm font-medium">
                                Username/Email
                            </label>
                            <input
                                type="text"
                                value={formData.username}
                                onChange={(e) => setFormData(prev => ({ ...prev, username: e.target.value }))}
                                placeholder="username@example.com"
                                className="w-full px-3 py-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400 text-white"
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-gray-300 mb-1 text-sm font-medium">
                                Password *
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={formData.password}
                                    onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                                    placeholder="Enter password"
                                    className="w-full px-3 py-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400 text-white pr-20"
                                    required
                                />
                                <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex gap-1">
                                    <button
                                        type="button"
                                        onClick={generatePassword}
                                        className="text-blue-400 hover:text-blue-300 text-xs px-2 py-1 rounded"
                                    >
                                        Generate
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="text-gray-400 hover:text-white text-xs px-2 py-1 rounded"
                                    >
                                        {showPassword ? "Hide" : "Show"}
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Website */}
                        <div>
                            <label className="block text-gray-300 mb-1 text-sm font-medium">
                                Website URL
                            </label>
                            <input
                                type="url"
                                value={formData.website}
                                onChange={(e) => setFormData(prev => ({ ...prev, website: e.target.value }))}
                                placeholder="https://example.com"
                                className="w-full px-3 py-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400 text-white"
                            />
                        </div>

                        {/* Category */}
                        <div>
                            <label className="block text-gray-300 mb-1 text-sm font-medium">
                                Category
                            </label>
                            <select
                                value={formData.category}
                                onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                                className="w-full px-3 py-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400 text-white"
                            >
                                <option value="personal">Personal</option>
                                <option value="work">Work</option>
                                <option value="finance">Finance</option>
                                <option value="social">Social Media</option>
                                <option value="shopping">Shopping</option>
                                <option value="other">Other</option>
                            </select>
                        </div>

                        {/* Notes */}
                        <div>
                            <label className="block text-gray-300 mb-1 text-sm font-medium">
                                Notes
                            </label>
                            <textarea
                                value={formData.notes}
                                onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                                placeholder="Additional notes (optional)"
                                rows="3"
                                className="w-full px-3 py-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400 text-white resize-none"
                            />
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-3 pt-4">
                            <button
                                type="button"
                                onClick={handleClose}
                                className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded transition"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={isLoading || !formData.title || !formData.password}
                                className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-semibold py-2 px-4 rounded transition"
                            >
                                {isLoading ? "Saving..." : "Save Password"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
