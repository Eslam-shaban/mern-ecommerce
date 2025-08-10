

const Button = ({
    children,
    onClick,
    isSubmit = false,
    isDisabled = false,
    className = "",
}) => {
    return (
        <button
            className={`${className}`}
            type={isSubmit ? "submit" : "button"}
            onClick={onClick}
            disabled={isDisabled}
        >
            {children}
        </button>
    );
};

export default Button;
