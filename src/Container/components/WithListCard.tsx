
import { ICard } from '@/store/type';
import { useStore } from '@/store/useStore';
import React from 'react';
import { useDebounce } from 'use-debounce';

const WithListCard = <P extends object>(Components: React.ComponentType<P>): React.FC<P> => {
  const WithListCard: React.FC<P> = (props: P) => {
    const {
      setIsFocused,
      cards,
      setCards,
      setFields,
      fields,
      searchText,
      setFilteredCards,
      setEditingId,
      editingId,
      setModal,
      setCloseModal,
      setLoading,
    } = useStore();
    const [debouncedSearchText] = useDebounce(searchText, 1000);

    const handleCard = (e: React.SyntheticEvent) => {
      e.preventDefault();
      if (fields.description.length > 100) {
        setModal?.({
          isOpen: true,
          onClose: () => setCloseModal?.(),
          title: 'Descripcion de tarjeta',
          title_secondary: 'La descripción no puede superar los 10 caracteres.',
          buttonFooter: [{ className: 'primary', label: 'Aceptar', onClick: () => setCloseModal?.() }],
        });
        return;
      }

      const isDuplicate = cards.some(card =>
        card.title.trim().toLowerCase() === fields.title.trim().toLowerCase() &&
        card.description.trim().toLowerCase() === fields.description.trim().toLowerCase()
      );
      if (isDuplicate) {
        setModal?.({
          isOpen: true,
          onClose: () => setCloseModal?.(),
          title: 'Tarjeta duplicada',
          title_secondary: 'No se puede crear la tarjeta porque el título y la descripción ya existen.',
          buttonFooter: [{ className: 'primary', label: 'Aceptar', onClick: () => setCloseModal?.() }],
        });
        return;
      }

      if (editingId !== null) {
        const updatedCards = cards.map(card =>
          card.id === editingId ? { ...card, title: fields.title, description: fields.description } : card
        );
        setCards?.(updatedCards);
        setEditingId?.(null);
      } else {
        const newCard = { id: Math.random(), title: fields.title, description: fields.description, createdAt: Date.now() };
        setCards?.([...cards, newCard]);
      }
      setFields?.('title', '');
      setFields?.('description', '');
    };

    const handleDelete = (id: number) => {
      const updatedCards = cards.filter(card => card.id !== id);
      setCards?.(updatedCards);
      if (editingId === id) setEditingId?.(null);
      setFields?.('title', '');
      setFields?.('description', '');
    };

    const handleEdit = (id: number) => {
      const card = cards.find(c => c.id === id);
      if (!card) return;
      setFields?.('title', card.title);
      setFields?.('description', card.description);
      setEditingId?.(id);
    };

    function filterAndSortCards(cards: ICard[], text: string) {
      const toPlain = (s: string) => (s ?? '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
      const q = toPlain(text).trim();
      const list = !q ? [...cards] : cards.filter(card => {
        const title = toPlain(card.title);
        const description = toPlain(card.description);
        return title.includes(q) || description.includes(q);
      });
      return list.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
    }

    React.useEffect(() => {
      setLoading?.(true);
      const timeout = setTimeout(() => {
        setFilteredCards?.(filterAndSortCards(cards, debouncedSearchText));
        setLoading?.(false);
      }, 500); // Simulamos carga
      return () => clearTimeout(timeout);
    }, [debouncedSearchText, cards, setFilteredCards, setLoading]);


    function handleFocus() { setIsFocused?.(true); }
    function handleBlur() { setIsFocused?.(false); }

    const action = { 
      handleCard, 
      handleFocus, 
      handleBlur, 
      setFields, 
      handleDelete, 
      handleEdit };

    return <Components {...(action as unknown as P)} {...props} />;
  };
  WithListCard.displayName = `WithListCard(${Components.displayName || Components.name || 'Component'})`;

  return WithListCard;
};

export default WithListCard;
