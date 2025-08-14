interface ICard {
    id: Date;
    title: string;
    description: string;
}

interface IFields {
    title: string;
    description: string;
}

export interface IInitialState {
    cards: ICard[]
    setCards?: (cards: any) => void
    isFocused: boolean;
    setIsFocused?: (isFocused: boolean) => void;
    searchText: string;
    setSearchText?: (searchText: string) => void;
    isLoading: boolean;
    setIsLoading?: (isLoading: boolean) => void;
    fields: IFields;
    setFields?: (key: string, value: string) => void;
}