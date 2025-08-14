import { useStore } from '@/store/useStore';
import React from 'react'

const useWithListCard = <P extends object>(Components: React.ComponentType<P>): React.FC<P> => {
  return (props: P) => {

    const { setIsFocused, cards, setCards, setFields, fields } = useStore();

    // handleCard solo se llama al hacer submit, agrega la card con los valores actuales de fields
    const handleCard = (e: React.SyntheticEvent) => {
      e.preventDefault();
      setCards?.([
        ...cards,
        { id: Date.now(), title: fields.title, description: fields.description },
      ]);
      setFields?.("title", "");
      setFields?.("description", "");
    };

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
      fields,
    };
    return <Components {...action} {...props} />;
  }
}

export default useWithListCard