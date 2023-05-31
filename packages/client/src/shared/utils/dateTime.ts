/**
 *
 * @param dateTime 2023-05-29T17:42:25.351Z
 */

export const convertDateTime = (dateTime: string): string[] => {
  if (!dateTime) return []

  const [date, time] = dateTime.split('T')

  const resultDate = date.split('-').reverse().join('.')
  const resultTime = time.split('.')[0].split(':').slice(0, 2).join(':')

  return [resultDate, resultTime]
}

export interface ISortOption {
  createdAt: string
}

export const sortByNew = (array: ISortOption[]): ISortOption[] => {
  const arrayForSort = [...array]

  return arrayForSort.sort(
    (a, b) => new Date(b.createdAt).valueOf() - new Date(a.createdAt).valueOf()
  )
}
