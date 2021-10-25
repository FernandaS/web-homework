export function currencyFormat(debit, credit, amount) {
  if (!amount) return;

  let currencySymbol;

  if (debit) {
    currencySymbol = `+ $`;
  } else {
    currencySymbol = '$';
  }

  amount = amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
  return `${currencySymbol}${amount}`;
}

export function intToRoman(num) {
  const map = {
    M: 1000,
    CM: 900,
    D: 500,
    CD: 400,
    C: 100,
    XC: 90,
    L: 50,
    XL: 40,
    X: 10,
    IX: 9,
    V: 5,
    IV: 4,
    I: 1
  };
  let result = '';

  for (let key in map) {
    const repeatCounter = Math.floor(num / map[key]);

    if (repeatCounter !== 0) {
      result += key.repeat(repeatCounter);
    }

    num %= map[key];

    if (num === 0) return result;
  }

  return result;
}
