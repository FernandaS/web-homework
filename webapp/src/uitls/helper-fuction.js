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
