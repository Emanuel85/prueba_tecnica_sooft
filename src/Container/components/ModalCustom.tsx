import React from 'react';
import styles from '../../styles/components/modalCustom.module.scss';
import { IModal } from '@/store/type';


const ModalCustom: React.FC<IModal> = ({
  isOpen,
  onClose,
  title,
  title_secondary,
  buttonFooter
}) => {
  if (!isOpen) return null;
  return (
    <div className={styles.overlay_container} onClick={onClose}>
      <div className={styles.container_modal} onClick={e => e.stopPropagation()}>
        <button className={styles.modal_close} onClick={onClose}>&times;</button>
        <div className={styles.modal_header}>
          {title && <h2>{title}</h2>}
        </div>
        <div className={styles.content_footer}>
          {title_secondary && <p>{title_secondary}</p>}
          <div className={styles.footer_actions}>
            {
              buttonFooter.map((button, index) => (
                <button
                  key={index}
                  className={styles[`${button.className}`]}
                  onClick={button.onClick}
                >
                  {button.label}
                </button>
              ))
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalCustom;
