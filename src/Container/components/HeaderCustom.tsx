import styles from "../styles/header.module.scss";
import SearchBox from "./SearchBox";
import { Props } from "./type";

function HeaderCustom({ handleCard, handleFocus, handleBlur }:Props) {
  return (
    <header className={styles.container_header}>
      <div className={styles.header}>
        <div className={styles.header_logo}>
        </div>
        <SearchBox
          handleCard={handleCard}
          handleFocus={handleFocus}
          handleBlur={handleBlur}
        />
      </div>
    </header>
  );
}

export default HeaderCustom;
