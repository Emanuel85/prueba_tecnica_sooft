import React from 'react'
import styles from '../../styles/components/search.module.scss';
import Image from 'next/image';
import iconSearch from "../../../public/icon/icon_search.png";
import { useStore } from '@/store/useStore';
import { Props } from './type';


const SearchBox = ({ handleCard, handleFocus, handleBlur, }: Props) => {
  const { searchText, setSearchText, isFocused } = useStore()
  return (
    <form className={`${styles.container_form} ${isFocused ? styles.focused : ""}`} onSubmit={(e) => { handleCard?.(e); }}>
      <input
        type="text"
        placeholder="Buscar..."
        className={styles.form_inputs}
        value={searchText}
        onChange={e => setSearchText?.(e.target.value)}
        onFocus={handleFocus}
        onBlur={handleBlur}
        data-testid="title-input"
      />
      <button type="submit" className={styles.form_button}  data-testid="search-button" aria-label="Buscar">
        <Image src={iconSearch} alt="icon search" className={styles.button_icon} />
      </button>
    </form>
  )
}

export default SearchBox