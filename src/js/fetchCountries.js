const URL = 'https://restcountries.com/v3.1/name/';
const PARAMETERS = '?fields=name,capital,population,flags,languages';

exports.fetchCountries = (name, callback, error) => {
  const countryUrl = URL + name + PARAMETERS;
  fetch(countryUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      response.json().then(callback).catch(error);
    })
    .catch(error);
};
