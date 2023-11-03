import { basicConstant } from './basic.constant';

/** 是否為本地路由 */
const isLocalUrl = window.location.href.includes('/localhost:8080/');
/** 環境 url */
const envUrl = isLocalUrl ? basicConstant.DEV_TOKEN : basicConstant.PROD_TOKEN;
/** API 權限常數 */
export const apiConstant = {
  AUTHORIZATION_URL: `https://accounts.spotify.com/authorize?client_id=4bcd4abea30c43359b72b03b45497cad&response_type=code&redirect_uri=${envUrl}my-spotify-playlist&scope=user-top-read%20user-read-private`,
  ENCODE_TOKEN:
    'NGJjZDRhYmVhMzBjNDMzNTliNzJiMDNiNDU0OTdjYWQ6Yjc0NzEyYzg5OWZiNDhkNmE5OGQxZjM2YjQzNDE0ZjU=',
};

/** 查詢時間區間清單 */
export const durationName = {
  short_term: 'approximately last 4 weeks',
  medium_term: 'approximately last 6 months',
  long_term:
    'calculated from several years of data and including all new data as it becomes available',
} as const;

/** 時間區間型別 */
export type durationNameKey = keyof typeof durationName;
