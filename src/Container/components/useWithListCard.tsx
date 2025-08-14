import { useStore } from '@/store/useStore';
import React from 'react'

const useWithListCard = <P extends object>(Components: React.ComponentType<P>): React.FC<P> => {
  return (props: P) => {

    const { setIsFocused, cards, setCards, setFields, fields, searchText, setFilteredCards, setEditingId, editingId } = useStore();


    const handleCard = (e: React.SyntheticEvent) => {
      e.preventDefault();
      if (editingId !== null) {
        // Guardamos la edición
        const updatedCards = cards.map(card =>
          card.id === editingId ? { ...card, title: fields.title, description: fields.description } : card
        );
        setCards?.(updatedCards);
        setEditingId?.(null);
      } else {
        // Agregamos una nueva card
        const newCard = { id: Math.random(), title: fields.title, description: fields.description };
        setCards?.([...cards, newCard]);
      }
      setFields?.("title", "");
      setFields?.("description", "");
    };

    // handleDelete para elimina card por id
    const handleDelete = (id: number) => {
      const updatedCards = cards.filter(card => card.id !== id);
      setCards?.(updatedCards);
      // si estabamos editando una card, cancelamos la edición
      if (editingId === id) setEditingId?.(null);
      setFields?.("title", "");
      setFields?.("description", "");
    };

    // handleEdit para cargar datos de la card en los inputs
    const handleEdit = (id: number) => {
      const card = cards.find(c => c.id === id);
      if (!card) return;
      setFields?.("title", card.title);
      setFields?.("description", card.description);
      // se habilita el modo edicion
      setEditingId?.(id);
    };

    // Filtrado en tiempo real
    React.useEffect(() => {
      if (!searchText || searchText.trim() === "") {
        setFilteredCards?.(cards);
      } else {
        const lower = searchText.toLowerCase();
        setFilteredCards?.(
          cards.filter(card =>
            card.title?.toLowerCase().includes(lower) ||
            card.description?.toLowerCase().includes(lower)
          )
        );
      }
    }, [searchText, cards]);

    function handleFocus() {
      setIsFocused?.(true);
    }

    function handleBlur() {
      setIsFocused?.(false);
    }
    const action = {
      handleCard,
      handleFocus,
      handleBlur,
      setFields,
      handleDelete,
      handleEdit
    };
    return <Components {...action} {...props} />;
  }
}

export default useWithListCard