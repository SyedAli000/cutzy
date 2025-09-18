import { APPLICATION_SUFFIX } from './urls'

export const identify = (record, key = 'identifier') => {
  if (!record) { return '' }
  if (!record.id) { return record[key] }

  return `${APPLICATION_SUFFIX}-${record[key]}`
}
