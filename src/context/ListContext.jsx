import { createContext, useContext } from "react";

export const ListContext = createContext([]);
export const useListContext = () => useContext(ListContext);
