import axios, { AxiosRequestConfig } from 'axios';

export const getPublishingComics = () => {
  const instance = axios.create();
  instance({
    method: 'GET',
    url: 'https://www.melon.com/chart/',
    headers: {
      'Content-Type': 'text/html',
      'Accept': '*/*',
      'cache-control': 'no-cache',
    }
  })
    .then((value) => {
      console.error('MYHOME', value);
    })
    .catch((reason) => {
      if (reason) {
        console.error('MYHOME', reason);
      }
    });
}