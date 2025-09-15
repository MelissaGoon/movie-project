import { useSearchParams } from "react-router-dom";

const PageSearchResults = () => {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('q');


    return (
        <main> <div>PageSearchResults</div>
            <p>{query}</p>
        </main>
    )
}

export default PageSearchResults