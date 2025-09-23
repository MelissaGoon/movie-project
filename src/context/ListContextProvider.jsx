import { useReducer } from "react";
import { APP_STORAGE_NAME } from "../globals/global-variables";
import { ListContext } from "./ListContext";

function getListFromLocalStorage() {
    const list = localStorage.getItem(APP_STORAGE_NAME);

    if (list !== null) {
        return {
            items: JSON.parse(list)
        }
    } else {
        return {
            items: []
        }
    }
}

const listFromLocalStorage = getListFromLocalStorage();

const initialState = {
    items: listFromLocalStorage.items
}


function listReducer(state, action) {
    switch (action.type) {
        case 'ADD':
            {
                const movieObjCore = {
                    id: action.payload.id,
                    title: action.payload.title,
                    poster_path: action.payload.poster_path,
                    release_date: action.payload.release_date,
                    overview: action.payload.overview,
                    vote_average: action.payload.vote_average,
                    vote_count: action.payload.vote_count,
                    backdrop_path: action.payload.backdrop_path
                }

                const newList = [...state.items, movieObjCore];
                localStorage.setItem(APP_STORAGE_NAME, JSON.stringify(newList));

                return {
                    ...state,
                    items: newList
                }
            }
        case 'REMOVE':
            {
                const listCopy = [...state.items];
                const indexToRemove = getIndex(action.payload, state.items);

                listCopy.splice(indexToRemove, 1);
                localStorage.setItem(APP_STORAGE_NAME, JSON.stringify(listCopy));

                return {
                    ...state,
                    items: [...listCopy]
                }
            }
        default:
            return state;

    }

}

function ListProvider({ children }) {
    const [state, dispatch] = useReducer(listReducer, initialState);

    const addToList = movieOb => {
        dispatch({
            type: 'ADD',
            payload: movieOb
        })
    }

    const removeFromList = movieOb => {
        dispatch({
            type: 'REMOVE',
            payload: movieOb
        })
    }

    const value = {
        list: state.items,
        addToList,
        removeFromList
    }

    return (
        <ListContext.Provider value={value}>
            {children}
        </ListContext.Provider>
    )

}


// Helpers
function getIndex(item, arr) {
    return arr.findIndex(arrItem => arrItem.id == item.id);
}

export default ListProvider;