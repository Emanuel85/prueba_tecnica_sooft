'use client';
import Image from "next/image";
import styles from "../styles/create.module.scss";
import iconSearch from "../../../public/icon/icon_create2.png";
import { useStore } from "@/store/useStore";

// Ahora recibe setFields y fields del HOC
export default function CreateBox({ handleCard, handleFocus, handleBlur, isFocused }: any) {
  const { setFields, fields, editingId } = useStore();
  return (
    <form className={`${styles.container_form} ${isFocused ? styles.focused : ""} ${editingId ? styles.editing_card_borde : ""}`} onSubmit={(e) => { handleCard(e); }}>
      <input
        type="text"
        placeholder="Título de tarjeta..."
        className={`${styles.form_inputs_title} ${editingId ? styles.editing_card_background : ""}`}
        value={fields.title}
        onChange={e => setFields?.("title", e.target.value)}
        onFocus={handleFocus}
        onBlur={handleBlur}
        data-testid="title-input"
      />
      <input
        type="text"
        placeholder="Descripción de tarjeta..."
        className={`${styles.form_inputs_description} ${editingId ? styles.editing_card_background : ""}`}
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