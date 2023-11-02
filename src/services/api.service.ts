import { basicConstant } from "@/constants/basic.constant";
import { apiConstant } from "@/constants/api";
import axiosCustomer from "@/utils/api/axios-customization";

/** 是否為本地路由 */
const isLocalUrl = window.location.href.includes("/localhost:8080/");
/** 目標導向網址 */
const redirectUri =
  (isLocalUrl ? basicConstant.DEV_SERVER : basicConstant.PROD_SERVER) +
  "/my-spotify-playlist";
/** 組好的 token 字串 */
const encodeToken = `Basic ${apiConstant.ENCODE_TOKEN}`;
/** API 呼叫路徑 */
const reqToken = "https://accounts.spotify.com/api/token";
export let errorMessage = {};

/** API 呼叫服務 */
export class ApiService {
  /**
   * 取得 authorization token
   *
   * @param code - url 中的參數
   * @returns API 回傳的資料
   */
  getAuthorizationToken(code: string) {
    /** 網址參數 */
    const queryString = new URLSearchParams();
    queryString.append("code", code);
    queryString.append("grant_type", "authorization_code");
    queryString.append("redirect_uri", redirectUri);
    return axiosCustomer.post(`${reqToken}`, queryString, {
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        Authorization: encodeToken,
      },
    });
  }

  /**
   * 取得 refresh token
   *
   * @returns API 回傳的資料
   */
  async getFreshToken() {
    const refreshToken = window.sessionStorage.getItem(
      "refresh_token"
    ) as string;
    /** 網址參數 */
    const queryString = new URLSearchParams();
    queryString.append("grant_type", "refresh_token");
    queryString.append("refresh_token", refreshToken);
    return axiosCustomer.post(`${reqToken}`, queryString, {
      headers: {
        Authorization: encodeToken,
      },
    });
  }

  /**
   * Http response 錯誤處理
   *
   * @sealed
   */
  errorHandler(error: any): void {
    // 排除顯示
    if (error.response.status === 400) {
      errorMessage = error.response.data;
    }
  }
}

export default new ApiService();
