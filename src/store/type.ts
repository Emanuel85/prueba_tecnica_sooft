interface ICard {
    id: number;
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
    filteredCards: ICard[];
    setFilteredCards?: (filteredCards: ICard[]) => void;
    editingId: number | null;
    setEditingId?: (value: number | null) => void
}