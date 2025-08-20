import React from 'react'
import styles from '../../styles/components/messageCustom.module.scss'
import Image from 'next/image'
import { IMenssage } from '@/store/type'

const MessageCustom = ({ url_msg, msgPrimary, msgSecondary }: IMenssage) => {
  return (
    <div className={styles.container_error}>
      <Image src={url_msg} alt="Error" width={500} height={250} />
      <div className={styles.error_msg}>
        <p className={styles.msg_primary}> {msgPrimary}</p>
        <p className={styles.msg_secondary} data-testid="msg_secondary">{msgSecondary}</p>
      </div>
    </div>
  )
}

export default MessageCustom