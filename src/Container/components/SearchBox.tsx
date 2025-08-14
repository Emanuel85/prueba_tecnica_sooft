'use client';
import Image from "next/image";
import styles from "../styles/search.module.scss";
import iconSearch from "../../../public/icon/icon_search.png";
import { useStore } from "@/store/useStore";

// Ahora recibe setFields y fields del HOC
export default function SearchBox({ handleCard, handleFocus, handleBlur, isFocused }: any) {
  const { setFields, fields, } = useStore();
  return (
    <form className={`${styles.container_form} ${isFocused ? styles.focused : ""}`} onSubmit={(e) => { handleCard(e); }}>
      <input
        type="text"
        placeholder="Título"
        className={styles.form_inputs}
        value={fields.title}
        onChange={e => setFields?.("title", e.target.value)}
        onFocus={handleFocus}
        onBlur={handleBlur}
        data-testid="title-input"
      />
      <input
        type="text"
        placeholder="Descripción"
        className={styles.form_inputs}
        value={fields.description}
        onChange={e => setFields?.("description", e.target.value)}
        onFocus={handleFocus}
        onBlur={handleBlur}
        data-testid="description-input"
      />
      <button type="submit" className={styles.form_button} onClick={handleCard} data-testid="search-button">
        <Image src={iconSearch} alt="icon search" className={styles.button_icon} />
      </button>
    </form>
  );
}