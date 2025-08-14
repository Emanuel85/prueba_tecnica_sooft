import { create } from "zustand";
import { IInitialState } from "./type";

const initialState: IInitialState = {
    cards: [],
    searchText: "",
    fields: {
        title: "",
        description: "",
    },
    isFocused: false,
    isLoading: false,
}

export const useStore = create<IInitialState>((set => ({
    ...initialState,
    setCards: value => set(state => ({ ...state, cards: value })),
    setIsFocused: isFocused => set(state => ({ ...state, isFocused })),
    setSearchText: searchText => set(state => ({ ...state, searchText })),
    setIsLoading: isLoading => set(state => ({ ...state, isLoading })),
    setFields: (key, value) => set(state => ({
        ...state,
        fields: {
            ...state.fields,
            [key]: value
        }
    }))
})))