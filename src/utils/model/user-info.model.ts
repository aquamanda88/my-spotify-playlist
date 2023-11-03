/** 取得使用者資料 response */
export interface UserInfoRes {
  /** 使用者所在國家 / 地區 */
  country: string;
  /** 使用者個人資料顯示名稱 */
  display_name: string;
  /** 使用者電子信箱 */
  email: string;
  /** 限制級內容設定 */
  explicit_content: ExplicitContentDatum;
  /** 外部連結 */
  external_urls: ExternalUrlsDatum;
  /** 演出者追蹤者資訊 */
  followers: FollowersDatum;
  /** 曲目詳細資訊 API 網址 */
  href: string;
  /** Spotify ID：base-62 資源識別碼 */
  id: string;
  /** 使用者頭貼圖片 */
  images: Array<ImagesDatum>;
  /** 使用者訂閱方案：premium；free；open */
  product: string;
  /** user */
  type: string;
  /** Spotify URI：使用者識別碼  */
  uri: string;
}

/** 外部連結資料 */
export interface ExternalUrlsDatum {
  /** Spotify URL：Spotify 連結 */
  spotify: string;
}

/** 限制級內容設定資料 */
export interface ExplicitContentDatum {
  /** 是否可播放限制級內容 */
  filter_enabled: boolean;
  /** 是否將限制級內容設為禁止且使用者不可更改 */
  filter_locked: boolean;
}

/** 使用者追蹤者資料 */
export interface FollowersDatum {
  /** 追蹤者資訊連結（目前固定為 null） */
  href: string;
  /** 追蹤者數量 */
  total: number;
}

/** 使用者頭貼圖片資料 */
export interface ImagesDatum {
  /** 圖片網址 */
  url: string;
  /** 圖片高度 */
  height: number;
  /** 圖片寬度 */
  width: number;
}
