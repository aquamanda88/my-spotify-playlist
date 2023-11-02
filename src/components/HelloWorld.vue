<script setup lang="ts">
import userTopReadService, {
  errorMessage,
} from "@/services/user-top-items.service";
import apiService from "@/services/api.service";
import { apiConstant, durationNameKey } from "@/constants/api";
import {
  UserTopReadArtistsRes,
  UserTopReadTracksRes,
} from "@/utils/model/user-top-items.model";
import { onMounted, ref } from "vue";
import { Radio, Select } from "@/utils/model/user-top-items-utils.model";

/** 演出者播放次數排名 */
const artistsResult = ref<UserTopReadArtistsRes[]>([]);
/** 曲目播放次數排名 */
const tracksResult = ref<UserTopReadTracksRes[]>([]);
/** 是否為登入狀態 */
const isLogin = ref(false);
/** API 網址 */
const apiHref = ref("");
/** 選擇資料筆數 */
const selectValue = ref("");
/** 選單是否為開啟狀態 */
const isActive = ref(false);

/** 排行類型選項 */
const dataTypeList: Radio[] = [
  { label: "曲目", value: "tracks" },
  { label: "演出者", value: "artists" },
];

/** 時間區間選項 */
const timeRageList: Radio[] = [
  { label: "近一個月", value: "short_term" },
  { label: "近六個月", value: "medium_term" },
  { label: "全部時間", value: "long_term" },
];

/** 資料筆數選項 */
const countList: Select[] = [
  { label: "10", value: "10" },
  { label: "15", value: "15" },
  { label: "20", value: "20" },
  { label: "25", value: "25" },
  { label: "30", value: "30" },
  { label: "35", value: "35" },
  { label: "40", value: "40" },
  { label: "45", value: "45" },
  { label: "50", value: "50" },
];

onMounted(() => {
  /** url 參數 */
  const params = new URLSearchParams(window.location.search);
  // 若網址中含有 "code"
  if (params.has("code")) {
    /** 參數值 */
    const code = params.get("code") as string;
    handleAuthorization(code)
      .then((res) => {
        window.sessionStorage.setItem("access_token", res.authorization);
        window.sessionStorage.setItem("refresh_token", res.refreshToken);
        isLogin.value = true;
        return res;
      })
      .catch((fail) => {
        throw fail;
      });
  } else {
    window.sessionStorage.removeItem("access_token");
  }
});

/**
 * 處理權限 token
 *
 * @param code - 登入授權 code
 * @returns API 所需 token
 */
async function handleAuthorization(
  code: string
): Promise<{ authorization: string; refreshToken: string }> {
  /** API 回傳的授權資料 */
  const res = await apiService.getAuthorizationToken(code);
  /** 授權 token */
  const authorization = res.data.access_token;
  /** 重新整理 token */
  const refreshToken = res.data.refresh_token;
  return { authorization, refreshToken };
}

/**
 * 取得演出者播放次數排名
 *
 * @param count - 顯示數量
 * @param duration - 時間區間
 * @returns 無回傳值
 */
async function getArtistData(count?: string, duration?: durationNameKey) {
  /** url 參數 */
  const params = new URLSearchParams(window.location.search);
  // 如果網址有攜帶參數
  if (params.has("code")) {
    /** API 回傳的演出者資料 */
    const res = await userTopReadService.getArtists(count, duration);
    isLogin.value = Object.keys(errorMessage).length === 0;
    // 判斷目前呼叫的 API 類型
    if (res) {
      apiHref.value = userTopReadService.getApiType(res?.data.href);
      artistsResult.value = res?.data?.items;
    }
  } else {
    isLogin.value = false;
  }
}

/**
 * 取得曲目播放次數排名
 *
 * @param count - 顯示數量
 * @param duration - 時間區間
 * @returns 無回傳值
 */
async function getTrackData(count?: string, duration?: durationNameKey) {
  /** url 參數 */
  const params = new URLSearchParams(window.location.search);
  // 如果網址有攜帶參數
  if (params.has("code")) {
    /** API 回傳的曲目資料 */
    const res = await userTopReadService.getTracks(count, duration);
    isLogin.value = Object.keys(errorMessage).length === 0;
    // 判斷目前呼叫的 API 類型
    if (res) {
      apiHref.value = userTopReadService.getApiType(res?.data.href);
      tracksResult.value = res?.data?.items;
      tracksResult.value.forEach((res) => {
        // 取 API 回傳的音軌毫秒進行換算
        if (typeof res.duration_ms === "number") {
          /** 分鐘數 */
          const minutes = Math.floor(res.duration_ms / 1000 / 60);
          /** 初步計算的秒數值 */
          let secondValue = Math.floor((res.duration_ms / 1000) % 60);
          /** 秒數 */
          const seconds =
            secondValue.toString().length === 1
              ? `0${secondValue}`
              : secondValue;
          res.duration_ms = `${minutes}:${seconds}`;
        }
      });
    }
  } else {
    isLogin.value = false;
  }
}

/**
 * 取得選擇資料筆數
 *
 * @param $event - 點擊事件
 * @returns 無回傳值
 */
function checkOption($event: Event) {
  selectValue.value = ($event.target as HTMLInputElement).value;
}

/**
 * 送出查詢
 *
 * @returns 無回傳值
 */
function onSubmit() {
  /** 表單元素 */
  const form = document.getElementById("searchForm") as HTMLFormElement;
  /** 取得選取排行類型 */
  const typeValue = form.elements.namedItem("dataType") as HTMLInputElement;
  /** 取得選取排行筆數 */
  const count = selectValue.value ? selectValue.value : "20";
  /** 取得選取時間區間 */
  const timeRangeValue = (
    form.elements.namedItem("timeRange") as HTMLInputElement
  ).value as durationNameKey;

  // 如果排行類型為「曲目」
  if (typeValue.value === "tracks") {
    getTrackData(count, timeRangeValue);
  }
  // 如果排行類型為「演出者」
  else if (typeValue.value === "artists") {
    getArtistData(count, timeRangeValue);
  }
}
</script>

<template>
  <div class="container">
    <a v-if="isLogin" class="btn btn-main font-en-button mb-4" href="/">
      <div class="d-flex align-items-center">
        <img
          class="me-2"
          src="../assets/icons/icon_spotify_white.svg"
          alt="spotifyIcon"
        />
        <span>LOGOUT</span>
      </div>
    </a>
    <a
      v-else
      class="btn btn-main font-en-button mb-4"
      :href="apiConstant.AUTHORIZATION_URL"
    >
      <div class="d-flex align-items-center">
        <img
          class="me-2"
          src="../assets/icons/icon_spotify_white.svg"
          alt="spotifyIcon"
        />
        <span>LOGIN</span>
      </div>
    </a>
    <div v-if="isLogin">
      <div class="single-operation-board card">
        <h3 class="font-zh-h3">查詢條件</h3>
        <form id="searchForm">
          <div class="card-body">
            <div class="row">
              <div class="col-12">
                <div class="form-check-group">
                  <p class="font-zh-p-medium">資料類型</p>
                  <div class="form-check-list d-flex">
                    <div
                      v-for="radio in dataTypeList"
                      :key="radio.value"
                      class="form-check"
                    >
                      <input
                        :id="radio.value"
                        :value="radio.value"
                        class="form-check-input"
                        name="dataType"
                        type="radio"
                        :checked="radio.value === 'tracks'"
                      />
                      <label
                        :for="radio.value"
                        class="font-zh-p-medium form-check-label"
                      >
                        {{ radio.label }}
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-12">
                <div class="form-check-group">
                  <p class="font-zh-p-medium">時間區間</p>
                  <div class="form-check-list d-flex">
                    <div
                      v-for="radio in timeRageList"
                      :key="radio.value"
                      class="form-check"
                    >
                      <input
                        :id="radio.value"
                        :value="radio.value"
                        class="form-check-input"
                        name="timeRange"
                        type="radio"
                        :checked="radio.value === 'medium_term'"
                      />
                      <label
                        :for="radio.value"
                        class="font-zh-p-medium form-check-label"
                      >
                        {{ radio.label }}
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-12">
                <div class="row">
                  <p class="font-zh-p-medium">資料筆數</p>
                  <div class="col-6">
                    <div class="form-check-group">
                      <div class="dropdown">
                        <button
                          class="default-select font-zh-p-medium form-control"
                          type="button"
                          id="dropdownMenuButton1"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                          @blur="isActive = false"
                          @click="isActive = !isActive"
                        >
                          <div class="d-flex justify-content-between w-100">
                            <p>{{ selectValue ? selectValue : "請選擇" }}</p>
                            <img
                              :class="{ 'not-active': !isActive }"
                              class="icon-arrow-down-gray"
                              src="../assets/icons/icon_down_arrow.svg"
                              alt="arrow"
                            />
                          </div>
                        </button>
                        <div class="dropdown-menu">
                          <ul
                            class="menuBoard dropdown-items"
                            aria-labelledby="dropdownMenuButton1"
                          >
                            <li v-for="radio in countList" :key="radio.value">
                              <button
                                class="dropdown-item"
                                type="button"
                                :value="radio.value"
                                @click="checkOption($event)"
                              >
                                {{ radio.label }}
                              </button>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-6">
                    <button
                      class="default-input font-zh-p-medium btn btn-main"
                      type="button"
                      @click="onSubmit()"
                    >
                      <p>查詢</p>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
      <table
        v-if="apiHref === 'artists'"
        class="table table-hover"
        data-bs-theme="dark"
      >
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col" colspan="2">演出者</th>
            <th scope="col">曲風</th>
            <th scope="col">知名度 (0-100)</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in artistsResult" :key="item.uri">
            <th scope="row">{{ index + 1 }}</th>
            <td>
              <img :src="item.images[2].url" alt="artistUrl" />
            </td>
            <td class="contentInfo">
              <p class="songName">{{ item.name }}</p>
            </td>
            <td class="text-start">
              <span
                v-for="(genres, index) in item.genres"
                :key="index"
                class="artistsGenres"
              >
                <span v-if="item.genres.length !== 1">
                  <span v-if="index !== 0">, </span>{{ genres }}</span
                >
                <span v-else>{{ genres }}</span>
              </span>
            </td>
            <td>{{ item.popularity }}</td>
          </tr>
        </tbody>
      </table>
      <table
        v-if="apiHref === 'tracks'"
        class="table table-hover"
        data-bs-theme="dark"
      >
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col" colspan="2">標題</th>
            <th scope="col">專輯</th>
            <th scope="col">
              <img src="../assets/icons/icon_access_time.svg" alt="time" />
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in tracksResult" :key="item.uri">
            <th scope="row">{{ index + 1 }}</th>
            <td>
              <img :src="item.album.images[2].url" alt="albumUrl" />
            </td>
            <td class="contentInfo">
              <p class="songName">
                {{ item.name }}
              </p>
              <p>
                <span
                  v-for="(artists, index) in item.artists"
                  :key="artists.id"
                  class="artistsName"
                >
                  <span v-if="item.artists.length !== 1">
                    <span v-if="index !== 0">, </span>{{ artists.name }}</span
                  >
                  <span v-else>{{ artists.name }}</span>
                </span>
              </p>
            </td>
            <td class="text-start">{{ item.album.name }}</td>
            <td>{{ item.duration_ms }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
