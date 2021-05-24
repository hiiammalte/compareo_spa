function ErrorSummary({errorMessage} : {errorMessage: string}) {
    return (
        <p className="error-summary">{ errorMessage }</p>
    );
}

export default ErrorSummary;