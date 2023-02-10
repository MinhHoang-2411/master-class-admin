export interface DateTimeDisplay {
  value: number
  type: string
  isDanger: boolean
}

const DateTimeDisplay = (props: DateTimeDisplay) => {
  const {value, type, isDanger} = props
  return (
    <>
      {value >= 0 && (
        <div className={isDanger ? 'countdown danger' : 'countdown'}>
          <p>{value}</p>
          <span>{type}</span>
        </div>
      )}
    </>
  )
}

export default DateTimeDisplay
