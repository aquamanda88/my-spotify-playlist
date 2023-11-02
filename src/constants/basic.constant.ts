import { environment } from "@/environments/environment";

/** 網站基本資料 */
export const basicConstant = {
  /** local 開發環境 */
  DEV_SERVER: environment.dev_server,
  /** local 開發環境網址 base64 */
  DEV_TOKEN: environment.dev_server_base,
  /** PROD 環境 */
  PROD_SERVER: environment.production_server,
  /** PROD 環境網址 base64 */
  PROD_TOKEN: environment.production_server_base,
};
