import { SOCIAL } from './constants'

const { TWITTER } = SOCIAL

// source https://stackoverflow.com/a/7616484/885541 
export const hash = (str) => {
  let hash = 0, i, chr
  if (str.length === 0){ return hash }
  for (i = 0; i < str.length; i++) {
    chr   = str.charCodeAt(i)
    hash  = ((hash << 5) - hash) + chr
    hash |= 0 // Convert to 32bit integer
  }
  return hash
}

export const openModal = (href, w, h) => {
  const ww = window.innerWidth
  const wh = window.innerHeight
  const wstyle = `
  height=${h},width=${w},top=${(wh / 2) - (h / 2)},left=${(ww / 2) - (w / 2)},
    toolbar=0,location=0
  `
  window.open(href, 'socialshare', wstyle)
}

const noop = () => null

export const getTwitterShareHREF = () => {
  const url = TWITTER.INTENT_URL
  const params = Object.keys(TWITTER.PARAMS).map(key => {
    const param = TWITTER.PARAMS[key];
    let value = param;
    // if it's a function we get the value by calling it.
    if(typeof param === typeof noop){
      value = param();
    }
    if(value.length > 0){
      return `${key}=${encodeURIComponent(value)}`;
    } else {
      return null;
    }
  }).filter(param => param && param.length)
  
  return `${url}?${params.join('&')}`;
}

export function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
