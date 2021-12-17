import '../css/styles.css';
// Импорт библиотеки задержек
import debounce from 'lodash/debounce';
// Импорт библиотеки уведомлений
import Notiflix from 'notiflix';

import { fetchCountries } from './fetchCountries.js';

const DEBOUNCE_DELAY = 300;
const input = document.querySelector('#search-box');
const countryList = document.querySelector('ul.country-list');
const countryInfo = document.querySelector('div.country-info');

const markup = countries => {
  return countries
    .map(({ name, flags }) => {
      return `<li>
          <img class="country-icon" src="${flags.svg}" alt="Flag">
          <span class="country-title">${name.official}</span>
          </li>`;
    })
    .join('');
};

const markupExpand = countries => {
  return countries
    .map(({ name, capital, population, flags, languages }) => {
      return `
          <img class="country-icon" src="${flags.svg}" alt="Flag">
          <span class="country-title">${name.official}</span>
          <p><b>Capital:</b> ${capital}</p>
          <p><b>Population:</b> ${population}</p>
          <p><b>Languages:</b> ${Object.values(languages).join(',')}</p>
        `;
    })
    .join('');
};

function renderList(countries) {
  if (countries.length > 10) {
    Notiflix.Notify.info('Too many matches found. Please enter a more specific name');
  } else if (countries.length > 1) {
    countryInfo.innerHTML = '';
    countryList.innerHTML = markup(countries);
  } else {
    countryList.innerHTML = '';
    countryInfo.innerHTML = markupExpand(countries);
  }
}

function error(error) {
  if (error.message == 404) {
    Notiflix.Notify.failure('Oops, there is no country width that name');
  } else {
    Notiflix.Notify.failure(`❌ ${error}`);
  }
}

const debounced = debounce(event => {
  const name = event.target.value.trim();
  fetchCountries(name, renderList, error);
}, DEBOUNCE_DELAY);

input.addEventListener('input', debounced);
