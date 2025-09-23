
import { useListContext } from "../context/ListContext"

const PageList = () => {
    const { list, addToList, removeFromList } = useListContext();

    return (
        <main>
            <h1>My List</h1>


        </main>
    )
}

export default PageList