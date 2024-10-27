import { useNotificationValue } from '../functions'
import style from './Notification.module.css'

const Notification = () => {
  const notification = useNotificationValue()

  const toast = (message: string, type: string) => {
    return (
      <div className={style.toastContainer}>
        <div
          className={
            type === 'ERROR'
              ? `${style.toastSubContainer} ${style.toastError}`
              : `${style.toastSubContainer} ${style.toastSuccess}`
          }
        >
          <p>{message}</p>
        </div>
      </div>
    )
  }

  if (!notification) {
    return null
  }

  return (
    <div className='notification-container'>
      {toast(notification.payload, notification.type)}
    </div>
  )
}
export default Notification
