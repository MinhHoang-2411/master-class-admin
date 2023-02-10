import {useCountdown} from '../../../hooks/useCountdown'
import {ShowCounter} from './showCounter'
import '../../../app/assets/sass/components/showcounter.scss'
import {removeSessionStorage} from '../../../utils/auth'
import history from '../../../routes/history'

interface CountdownTimer {
  targetDate: Date
  session?: string
}

const CountdownTimer = ({targetDate, session = ''}: CountdownTimer) => {
  const [days, hours, minutes, seconds] = useCountdown(targetDate)

  const showCount = days + hours + minutes + seconds > 0

  if (!showCount) {
    removeSessionStorage(session)
    history.replace('/auth/forgot-password')
    return (
      <div className='mt-5'>
        <p style={{visibility: 'hidden'}}>" "</p>
      </div>
    )
  } else {
    return <ShowCounter days={days} hours={hours} minutes={minutes} seconds={seconds} />
  }
}

export default CountdownTimer
