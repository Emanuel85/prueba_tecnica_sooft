'use client';
import Image from "next/image";
import styles from "../../styles/components/create.module.scss";
import iconCreate from "../../../public/icon/icon_create2.png";
import { useStore } from "@/store/useStore";
import { Props } from "./type";


export default function CreateBox({ handleCard, handleFocus, handleBlur, }: Props) {
  const { setFields, fields, editingId, isFocused } = useStore();
  return (
    <form className={`${styles.container_form} ${isFocused ? styles.focused : ""} ${editingId ? styles.editing_card_borde : ""}`} onSubmit={(e) => { handleCard?.(e); }}>
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
      <button disabled={!fields.title || !fields.description} type="submit" className={styles.form_button} data-testid="create-button">
        <Image src={iconCreate} alt="icon create" className={styles.button_icon} />
      </button>
    </form>
  );
}