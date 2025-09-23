import React from 'react'

const ErrorPage = ({ text, error_msg }) => {

    return (<main className="error-page">
        <h1>{text}</h1>
        {error_msg && <p>{error_msg}</p>}
        <Link to="/"> Go Home </Link>
    </main>)
}

export default ErrorPage