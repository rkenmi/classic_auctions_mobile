// Victory Charts don't support custom components tied to data in their tick axis labels. This is a workaround.
export const tickYAxisFormatter = (money: number): string => {
  if (money === 0) {
    return ``;
  }

  if (money > 9999) {
    return `${Math.floor(money / 10000)}g`
  } else if (money > 99) {
    return `${Math.floor((money / 100) % 100)}s`
  } else {
    return `${Math.floor(money % 100)}c`
  }
}

