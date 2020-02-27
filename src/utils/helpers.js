export const isBrowser = () => typeof window !== "undefined"
export const parseDate = date => new Date(date).toLocaleDateString()

export function changeKeyName([...oldValue], [...newValue], str) {
  oldValue.forEach((el, i) => {
    str = str.replace(el, newValue[i])
  })
  return str
}
