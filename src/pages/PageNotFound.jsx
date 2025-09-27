import { useEffect } from "react"
import { APP_TITLE } from "../globals/global-variables"
import ErrorPage from "../components/ErrorPage"

const PageNotFound = () => {
    useEffect(() => {
        document.title = `${APP_TITLE} | Error`
    }, [])

    return <ErrorPage text="Page Not Found" />;

}

export default PageNotFound