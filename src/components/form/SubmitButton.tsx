
function SubmitButton({text}: {text: string}) {
    return (
        <div className="form-submit">
            <button type="submit" className="action-btn action-btn-dark action-btn-block">
                { text }
            </button>
        </div>
    );
}

export default SubmitButton;