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
        // Agregamos una nueva card con createdAt
        const newCard = {
          id: Math.random(),
          title: fields.title,
          description: fields.description,
          createdAt: Date.now(),
        };
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

    // Función de filtrado y orden
    function filterAndSortCards(cards: any[], searchText: string) {
      if (!searchText || searchText.trim() === "") {
        // Ordenar por createdAt descendente si existe
        return [...cards].sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
      }
      try {
        const regex = new RegExp(searchText, "i");
        return cards
          .filter(card => regex.test(card.title) || regex.test(card.description))
          .sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
      } catch {
        // Si el regex es inválido, retornar lista vacía
        return [];
      }
    }

    // Filtrado en tiempo real usando la función
    React.useEffect(() => {
      setFilteredCards?.(filterAndSortCards(cards, searchText));
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