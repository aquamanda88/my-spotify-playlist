import axiosCustomer from "../utils/api/axios-customization";
import { durationNameKey } from "@/constants/api";

export let errorMessage = {};

/** 使用者喜愛內容服務 */
export class UserTopReadService {
  /**
   * 取得常聽藝人資料
   *
   * @param count - 顯示數量
   * @param duration - 時間區間
   * @returns API 回傳的資料
   */
  getArtists(count?: string, duration?: durationNameKey) {
    const value = this.formatValue(count, duration);
    const token = window.sessionStorage.getItem("access_token");
    return axiosCustomer.get(`artists${value}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  /**
   * 取得常聽歌曲資料
   *
   * @param count - 顯示數量
   * @param duration - 時間區間
   * @returns API 回傳的資料
   */
  getTracks(count?: string, duration?: durationNameKey) {
    const value = this.formatValue(count, duration);
    const token = window.sessionStorage.getItem("access_token");
    return axiosCustomer.get(`tracks${value}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  /**
   * 調整呼叫 API 參數格式
   *
   * @param count - 顯示數量
   * @param duration - 時間區間
   * @returns 要呼叫 API 的字串
   */
  formatValue(count?: string, duration?: durationNameKey) {
    let value = "";
    if (count === undefined && duration === undefined) {
      return (value = "");
    } else if (count && duration === undefined) {
      return (value = `?limit=${count}`);
    } else if (count === undefined && duration) {
      return (value = `?limit=20&time_range=${duration}`);
    } else if (count && duration) {
      return (value = `?limit=${count}&time_range=${duration}`);
    } else {
      return value;
    }
  }

  /**
   * 取得呼叫 API 類型
   *
   * @param href - 詳細資訊 API 網址
   * @returns API 類型字串
   */
  getApiType(href: string): string {
    const startLength = href.indexOf("v1/me/top/") + 10;
    const endLength = href.indexOf("?");
    if (endLength !== -1) {
      return href.substring(startLength, endLength);
    } else {
      return href.split("v1/me/top/")[1];
    }
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

export default new UserTopReadService();
