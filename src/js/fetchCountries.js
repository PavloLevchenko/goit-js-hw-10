const URL = 'https://restcountries.com/v2/name/';
const PARAMETERS = '?fullText=true,fields=name,capital,population,flags,languages';

exports.fetchCountries = (name, callback, error) => {
  const countryUrl = URL + name + PARAMETERS;
  fetch(countryUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      response
        .json()
        .then(data => {
          if (data.status == 404) {
            throw new Error(data.status);
          }
          callback(data);
        })
        .catch(error);
    })
    .catch(error);
};
