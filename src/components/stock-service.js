export const fetchDataUrl = () => {
  return fetch(
    'https://cors-anywhere.herokuapp.com/https://services.ing.nl/api/securities/mobile/markets/stockmarkets/AEX'
  );
};
