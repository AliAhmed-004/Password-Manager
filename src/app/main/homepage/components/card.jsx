export default function Card({
    icon = "🔒",
    title = "Create an Account",
    description = "New here? Sign up and enable 2FA for enhanced security.",
    buttonText = "Get Started",
    buttonHref = "",
    buttonClassName = "bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded transition",
    containerClassName = "bg-gray-700 rounded-xl shadow-lg p-8 flex flex-col items-center w-80",
    onButtonClick,
    addButton = false
}) {
    return (
        <div className={containerClassName}>
            <span className="text-4xl mb-4">{icon}</span>
            <h2 className="text-2xl font-bold mb-2">{title}</h2>
            <p className="text-gray-300 mb-4 text-center">{description}</p>
            {addButton && 
                <button
                    className={buttonClassName}
                    onClick={onButtonClick}
                    type="button"
                >
                    {buttonText}
                </button>}
        </div>
    );
}