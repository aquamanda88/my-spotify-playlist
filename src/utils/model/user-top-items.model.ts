/** 取得歷史演出者資料 response */
export interface UserTopReadArtistsRes {
  /** 外部連結 */
  external_urls: ExternalUrlsDatum;
  /** 演出者追蹤者資訊 */
  followers: FollowersDatum;
  /** 演出者關聯曲風 */
  genres: Array<string>;
  /** 曲目詳細資訊 API 網址 */
  href: string;
  /** Spotify ID：base-62 資源識別碼 */
  id: string;
  /** 演出者封面圖片 */
  images: Array<ImagesDatum>;
  /** 演出者名稱 */
  name: string;
  /** 演出者知名度：0-100 */
  popularity: number;
  /** track */
  type: string;
  /** Spotify URI：專輯資源識別碼  */
  uri: string;
}

/** 取得歷史歌單資料 response */
export interface UserTopReadTracksRes {
  /** 曲目所屬專輯 */
  album: AlbumDatum;
  /** 曲目所屬演出者 */
  artists: Array<ArtistsDatum>;
  /** 發行市場 */
  available_markets: Array<string>;
  /** 光碟編號（通常為 1，除非該專輯包含多張光碟） */
  disc_number: number;
  /** 音軌長度 */
  duration_ms: number | string;
  /** 曲目是否有明確歌詞 */
  explicit: boolean;
  /** 曲目外部 ID */
  external_ids: ExternalIdsDatum;
  /** 外部連結 */
  external_urls: ExternalUrlsDatum;
  /** 曲目詳細資訊 API 網址 */
  href: string;
  /** Spotify ID：base-62 資源識別碼 */
  id: string;
  /** 曲目名稱 */
  name: string;
  /** 演出者知名度：0-100 */
  popularity: number;
  /** 30 秒預覽連結 */
  preview_url: string;
  /** 音軌編號 */
  track_number: number;
  /** track */
  type: string;
  /** Spotify URI：專輯資源識別碼  */
  uri: string;
  /** 曲目是否來自電腦文件 */
  is_local: boolean;
}

/** 曲目所屬專輯資料 */
export interface AlbumDatum {
  /** 專輯類型：album: 專輯；single: 單曲；compilation: 精選輯 */
  album_type: string;
  /** 曲目數 */
  total_tracks: number;
  /** 發行市場 */
  available_markets: Array<string>;
  /** 外部連結 */
  external_urls: ExternalUrlsDatum;
  /** 專輯詳細資訊 API 網址 */
  href: string;
  /** Spotify ID：base-62 資源識別碼 */
  id: string;
  /** 專輯封面圖片 */
  images: Array<ImagesDatum>;
  /** 專輯名稱 */
  name: string;
  /** 發行日期 */
  release_date: string;
  /** 發行日期精確程度：year；month；day */
  release_date_precision: string;
  /** 物件類型：album */
  type: string;
  /** Spotify URI：專輯資源識別碼  */
  uri: string;
  /** 專輯演出者 */
  artists: Array<ArtistsDatum>;
}

/** 曲目所屬演出者資料 */
export interface ArtistsDatum {
  /** 外部連結 */
  external_urls: ExternalUrlsDatum;
  /** 追蹤者 */
  followers?: FollowersDatum;
  /** 專輯詳細資訊 API 網址 */
  href: string;
  /** Spotify ID：base-62 資源識別碼 */
  id: string;
  /** 演出者名稱 */
  name: string;
  /** 物件類型：artist */
  type: string;
  /** Spotify URI：專輯資源識別碼  */
  uri: string;
}

/** 外部連結資料 */
export interface ExternalUrlsDatum {
  /** Spotify URL：Spotify 連結 */
  spotify: string;
}

/** 專輯封面圖片資料 */
export interface ImagesDatum {
  /** 圖片網址 */
  url: string;
  /** 圖片高度 */
  height: number;
  /** 圖片寬度 */
  width: number;
}

/** 曲目外部 ID 資料 */
export interface ExternalIdsDatum {
  /** 國際標準錄音錄影資料代碼 (ISRC) */
  isrc: string;
}

/** 演出者追蹤者資料 */
export interface FollowersDatum {
  /** 追蹤者資訊連結（目前固定為 null） */
  href: string;
  /** 追蹤者數量 */
  total: number;
}

/** 內容限制原因資料 */
export interface RestrictionDatum {
  /** 內容限制原因：market: 市場；product: 訂閱方案；explicit: 設定為不播放 */
  reason: string;
}
