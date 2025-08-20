export interface ICard {
    id: number;
    title: string;
    description: string;
    createdAt?: number;
}

export interface IMenssage {
    url_msg: string,
    msgPrimary: string
    msgSecondary: string,
}

interface IFields {
    title: string;
    description: string;
}

interface IButtonFooter {
    className: string;
    label: string;
    onClick: () => void;
}
export interface IModal {
    isOpen: boolean,
    onClose: () => void,
    title: string,
    title_secondary?: string,
    buttonFooter: IButtonFooter[]
}

export interface IInitialState {
    cards: ICard[];
    setCards?: (cards: ICard[]) => void;
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
    setEditingId?: (value: number | null) => void;
    modal: IModal;
    setModal?: (value: IModal) => void;
    setCloseModal?: () => void;
    loading: boolean;
    setLoading?: (value: boolean) => void;
}