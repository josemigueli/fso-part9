import { useEffect, useState } from 'react'
import { useNotificationValue } from '../functions'
import style from './Notification.module.css'

const Notification = () => {
  const notification = useNotificationValue()
  const [closing, setClosing] = useState(false)

  const toast = (message: string, type: string) => {
    return (
      <div
        className={
          closing
            ? `${style.toastContainer} ${style.animateFallOut}`
            : `${style.toastContainer} ${style.animateFallIn}`
        }
      >
        <div className={style.toastSubContainer}>
          {type === 'ERROR' ? <p>❌ {message}</p> : <p>✅ {message}</p>}
        </div>
      </div>
    )
  }

  useEffect(() => {
    if (notification) {
      setTimeout(() => {
        setClosing(true)
      }, 4600)
      setClosing(false)
    }
  }, [notification])

  if (!notification) {
    return null
  }

  return (
    <div className={style.notiContainer}>
      {toast(notification.payload, notification.type)}
    </div>
  )
}
export default Notification
