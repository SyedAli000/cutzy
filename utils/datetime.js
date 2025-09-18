export const timeToDate = (time) => {
  const date = new Date()
  date.setHours(parseInt(time / 60), time % 60, 0)

  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  })
}

export const formatDuration = (record, dateTimeCombined = false) => {
  const startDay = formatDate(record?.starts_at, { view: 'date', timezone: record.timezone })
  const endDay = formatDate(record?.ends_at, { view: 'date', timezone: record.timezone })
  const sameDay = startDay === endDay
  if (dateTimeCombined) {
    const first = sameDay ? startDay : formatDate(record?.starts_at, { view: 'datetime', timezone: record.timezone })
    const second = sameDay ? `${formatDate(record?.starts_at, { view: 'time', timezone: record.timezone })} - ${formatDate(record?.ends_at, { view: 'time', timezone: record.timezone })}` : formatDate(record?.ends_at, { view: 'datetime', timezone: record.timezone })
    return [
      first,
      second
    ]
  }

  const dayDuration = sameDay ? startDay : `${startDay} - ${endDay}`
  return [
    `${dayDuration}`,
    `${formatDate(record?.starts_at, { view: 'time', timezone: record.timezone })} - ${formatDate(record?.ends_at, { view: 'time', timezone: record.timezone })}`
  ]
}

export const calculateDuration = (start, end) => {
  let startDate = new Date(start); let endDate = new Date(end)
  if (startDate > endDate) {
    [startDate, endDate] = [endDate, startDate]
  }

  let diffMs = endDate - startDate

  const msInMinute = 1000 * 60
  const msInHour = msInMinute * 60
  const msInDay = msInHour * 24
  const msInWeek = msInDay * 7
  const msInMonth = msInDay * 30

  const months = Math.floor(diffMs / msInMonth)
  diffMs %= msInMonth
  const weeks = Math.floor(diffMs / msInWeek)
  diffMs %= msInWeek
  const days = Math.floor(diffMs / msInDay)
  diffMs %= msInDay
  const hours = Math.floor(diffMs / msInHour)
  diffMs %= msInHour
  const minutes = Math.floor(diffMs / msInMinute)

  const parts = []
  if (months > 0) parts.push(`${months}m`)
  if (weeks > 0) parts.push(`${weeks}w`)
  if (days > 0) parts.push(`${days}d`)
  if (hours > 0) parts.push(`${hours}h`)
  if (minutes > 0) parts.push(`${minutes}m`)

  return parts.join(' ')
}

export const dateToTime = (dateString) => {
  const date = new Date(dateString)
  return date.getHours() * 60 + date.getMinutes()
}

export const concatTimeWithDate = (dateString, time) => {
  const date = new Date(dateString)
  date.setHours(time / 60)
  date.setMinutes(time % 60)
  return date
}

export const betweenDates = (startDate, endDate) => {
  if (!startDate || !endDate) return []
  if (startDate > endDate) return []

  const start = new Date(startDate)
  const end = new Date(endDate)

  if (start > end) {
    throw new Error('Start date must be before or equal to end date')
  }

  const dates = new Set()
  const currentDate = new Date(start)

  // eslint-disable-next-line no-unmodified-loop-condition
  while (currentDate <= end) {
    dates.add(formatDate(currentDate, { view: 'no' }))
    currentDate.setDate(currentDate.getDate() + 1)
    currentDate.setHours(0, 0, 0, 0)
  }

  dates.add(formatDate(end, { view: 'no' }))

  return Array.from(dates)
}

export const formatDateOnly = (dateInput) => {
  const date = new Date(dateInput)
  if (isNaN(date)) return 'Invalid Date'

  const day = date.getDate()
  const month = date.toLocaleString('en-US', { month: 'short' })

  return `${day} ${month}`
}

export const formatDate = (dateString, dateOptions = {}) => {
  if (!dateString) return null

  const view = dateOptions.view || 'datetime'
  const timeZone = dateOptions.timezone || 'Asia/Karachi'

  const date = new Date(dateString) // Convert string to Date object
  let options = { timeZone }
  let locale = 'en-US'

  if (view.includes('date')) {
    options = {
      ...options,
      ...{
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }
    }
  }

  if (view.includes('time')) {
    options = {
      ...options,
      ...{
        hour: 'numeric',
        minute: 'numeric'
      }
    }
  }

  if (view.includes('sec')) {
    options = {
      ...options,
      ...{
        second: 'numeric'
      }
    }
  }

  if (view.includes('tmz')) {
    options = {
      ...options,
      ...{
        timeZoneName: 'short'
      }
    }
  }

  if (view.includes('-')) {
    options = {
      ...options,
      ...{
        hourCycle: 'h23'
      }
    }
  }

  if (view.includes('no')) {
    options = { timeZone }
    locale = 'en-CA'
  }

  return new Intl.DateTimeFormat(locale, options).format(date)
}
