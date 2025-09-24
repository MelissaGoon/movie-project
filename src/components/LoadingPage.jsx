
const LoadingPage = ({ text }) => {
    return (
        <main className="loading-page" id="site-main">
            <h1>{text}</h1>
            <div className="loader"></div>
        </main>
    )
}

export default LoadingPage