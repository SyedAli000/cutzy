const convertTime = (value, fromUnit, toUnit) => {
  if (!value) return 0
  if (typeof value === 'string') value = parseFloat(value)
  if (fromUnit === toUnit) {
    return parseFloat(value.toFixed(2))
  }

  let valueInMinutes
  switch (fromUnit) {
  case 'hours':
    valueInMinutes = value * 60
    break
  case 'minutes':
    valueInMinutes = value
    break
  case 'days':
    valueInMinutes = value * 60 * 24
    break
  default:
  }

  let result
  switch (toUnit) {
  case 'hours':
    result = valueInMinutes / 60
    break
  case 'minutes':
    result = valueInMinutes
    break
  case 'days':
    result = valueInMinutes / (60 * 24)
    break
  default:
  }

  return parseFloat(result.toFixed(2))
}

const displayBoolean = (value, good = 'Yes', bad = 'No') => {
  return value ? good || 'Yes' : bad || 'No'
}

export { convertTime, displayBoolean }
