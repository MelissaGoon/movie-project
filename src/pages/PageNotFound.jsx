import { Link } from "react-router-dom"
const PageNotFound = () => {
    return (
        <main className="error-page">
            <h1>Page Not Found</h1>
            <Link to="/"> Go Home </Link>
        </main>
    )
}

export default PageNotFound