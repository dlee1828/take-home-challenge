// Returns SAT, SUN, MON, TUE, WED, THU, FRI
export const getAbbreviatedDayFromDate = (utc: Date) => {
  const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']
  return days[utc.getDay()]
}
