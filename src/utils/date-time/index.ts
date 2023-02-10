import moment from 'moment'

const addMinutesToDate = (minutes: number) => {
  const now = new Date()
  return new Date(now.getTime() + minutes * 60000)
}

const getDifferenceBetweenTwoDates = (start: Date, end: Date) => {
  try {
    const timeLiveToken = moment(end)
    const timeNow = moment(start)
    const duration = moment.duration(timeLiveToken.diff(timeNow))
    const minutes = duration.asMinutes()

    return minutes
  } catch (error) {
    return 0
  }
}

export {addMinutesToDate, getDifferenceBetweenTwoDates}
