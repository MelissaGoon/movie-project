function PrevArrow(props) {
    const { className, onClick, additionalClass } = props;
    return (
        <button className={`arrowButton ${additionalClass ? additionalClass : ""} ${className}`} onClick={onClick}>

            <svg width="32" height="53" viewBox="0 0 32 53" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
                <path d="M27.8928 4.33765L5.33765 26.8928L27.8928 49.4479" stroke="#FFF9ED" strokeWidth="7" strokeLinecap="round" />

            </svg>
            <span className="screen-reader-only">Previous</span>
        </button>
    );
}

function NextArrow(props) {
    const { className, onClick, additionalClass } = props;
    return (
        <button className={`arrowButton ${additionalClass ? additionalClass : ""} ${className}`} onClick={onClick}>

            <svg width="32" height="53" viewBox="0 0 32 53" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">

                <path d="M3.55514 4L26.1103 26.5551L3.55514 49.1103" stroke="#FFF9ED" strokeWidth="7" strokeLinecap="round" />

            </svg>
            <span className="screen-reader-only">Next</span>
        </button>
    );
}

export { PrevArrow, NextArrow };