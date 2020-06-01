import { ICurrencyComparison } from '../types';

const API_BASE_URL = 'http://data.fixer.io/api';

enum ApiPath {
  CURRENCIES = '/symbols',
  EXCHANGE_RATE = '/latest',
}

const getCurrencies = async () => {
  const url = `${API_BASE_URL}${ApiPath.CURRENCIES}?access_key=${process.env.REACT_APP_API_KEY}`;
  const response = await fetch(url);
  const { symbols } = await response.json();
  return symbols;
};

const getExchangeRate = async ({ to, from }: ICurrencyComparison) => {
  const url = `${API_BASE_URL}${ApiPath.EXCHANGE_RATE}?access_key=${process.env.REACT_APP_API_KEY}&base=${from}&symbols=${to}`;
  const response = await fetch(url);
  const { rates } = await response.json();
  return rates[to];
};

export { getCurrencies, getExchangeRate };
