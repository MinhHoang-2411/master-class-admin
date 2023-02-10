import DateTimeDisplay from './dateTimeDisplay'

export interface ShowCounter {
  days: number
  hours: number
  minutes: number
  seconds: number
}

export const ShowCounter = (props: ShowCounter) => {
  const {days, hours, minutes, seconds} = props
  return (
    <div className='show-counter'>
      <div className='countdown-link'>
        {/* <DateTimeDisplay value={days} type={'Days'} isDanger={days <= 3} />
        {days > 0 && <p>:</p>}
        <DateTimeDisplay value={hours} type={'Hours'} isDanger={false} />
        {hours > 0 && <p>:</p>} */}
        <DateTimeDisplay value={minutes} type={'Mins'} isDanger={false} />
        {minutes > 0 && <p>:</p>}
        <DateTimeDisplay value={seconds} type={'Seconds'} isDanger={false} />
      </div>
    </div>
  )
}
