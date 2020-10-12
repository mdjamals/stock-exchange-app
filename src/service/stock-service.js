export const fetchDataUrl = () => {
  return fetch(
    //blocked by CORS policy. CORS Anywhere is a NodeJS proxy which adds CORS headers to the proxied request.
    'https://cors-anywhere.herokuapp.com/https://services.ing.nl/api/securities/mobile/markets/stockmarkets/AEX'
  );
};
