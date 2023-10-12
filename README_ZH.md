[English](https://github.com/a10115101/world-tracker/blob/main/README.md) | [中文](#世界追蹤者)

# 世界追蹤者

> **簡介**

1.  使用者可以輕鬆地在地圖上記錄自己的足跡，視覺化地展示他們到訪過或正在計畫去的地方。
2.  將個人旅行數據彙總為統計數據。
3.  管理好友，查看他們的個人資料或旅行紀錄。

> **MERN 專案**

![MERN 專案](https://github.com/a10115101/world-tracker/blob/main/readme_demo/MERN.jpg "MERN")

網站連結：[世界追蹤者](https://world-tracker.site/)

## 目次

- [測試帳號](#測試帳號)
- [系統架構](#系統架構)
  - [前端架構](#前端架構)
  - [後端架構](#後端架構)
  - [資料庫架構](#資料庫架構)
- [技術棧](#技術棧)
  - [前端技術棧](#前端技術棧)
  - [後端技術棧](#後端技術棧)
  - [資料庫技術棧](#資料庫技術棧)
  - [其他工具](#其他工具)
- [展示](#展示)
  - [地圖搜尋](#地圖搜尋)
  - [旅行紀錄過濾器](#旅行紀錄過濾器)
  - [旅行紀錄](#旅行紀錄)
  - [關於我](#關於我)
  - [統計數據](#統計數據)
  - [朋友](#朋友)
- [附錄](#附錄)
  - [前端應用套件](#前端應用套件)
  - [後端應用套件](#後端應用套件)
  - [API 文檔](#API-文檔)
- [聯絡我](#聯絡我)

## 測試帳號

您可以透過以下帳號或是用 Google Oauth 登入

- 帳號 A : `demo_a@gmail.com` 密碼 : `12345678`
- 帳號 B : `demo_b@gmail.com` 密碼 : `12345678`

> **注意事項：**
> 根據 [Render.com](https://render.com/docs/free#spinning-down-on-idle)，網頁後端伺服器超過 15 分鐘沒有收到新的請求，會進入**休眠狀態**，待接收到新請求後，**約 30 秒至 1 分鐘會恢復正常**。

## 系統架構

### 前端架構

![前端](https://github.com/a10115101/world-tracker/blob/main/readme_demo/Frontend_Architecture.jpg "前端架構")

### 後端架構

![後端](https://github.com/a10115101/world-tracker/blob/main/readme_demo/Backend_Architecture.jpg "後端架構")

### 資料庫架構

![資料庫](https://github.com/a10115101/world-tracker/blob/main/readme_demo/Database_Architecture.jpg "資料庫架構")

## 技術棧

### 前端技術棧

- 採用**Vite**讓使用者有更好的體驗
- React Hooks
- React Router
- CSS Modules
- Local Storage 應用
- 第三方 API : Geocoding / Reverse Geocoding
- 客製化網域

### 後端技術棧

- **RESTful APIs**
- 根據**MVC**設計模式，增加程式可維護與可讀性
- 設置 Helmet 跟 Rate Limit 增加**網站安全性**
- **防止 NoSQL 注入攻擊**
- 透過**資料驗證**，確保正確資料進入資料庫 .
- 透過 Passport 提供**JWT**與**Google**認證

### 資料庫技術棧

- **CRUD** 操作
- **Aggregation** 操作

### 其他工具

- 代碼風格：ESLint / Prettier
- 版本控制： Git / GitHub
- API 平台： Postman

## 展示

### 地圖搜尋

- 搜尋地點並顯示該地區的資訊。
  ![地圖搜尋](https://github.com/a10115101/world-tracker/blob/main/readme_demo/Map_Search_Demo.gif "地圖搜尋")

### 旅行紀錄過濾器

- 使用者可依照**狀態**或**日期**輕鬆過濾紀錄
  ![旅行紀錄過濾器](https://github.com/a10115101/world-tracker/blob/main/readme_demo/Map_Record_Filter_Demo.gif "旅行紀錄過濾器")

### 旅行紀錄

- 新增紀錄
  ![新增紀錄](https://github.com/a10115101/world-tracker/blob/main/readme_demo/Map_Record_Create_Demo.gif "新增紀錄")

- 更新或刪除紀錄
  ![更新或刪除紀錄](https://github.com/a10115101/world-tracker/blob/main/readme_demo/Map_Record_Update_Delete_Demo.gif "更新或刪除紀錄")

### 關於我

- 設定個人資訊(選項)
  ![關於我](https://github.com/a10115101/world-tracker/blob/main/readme_demo/Profile_About_Me_Demo.gif "關於我")

### 統計數據

- 將個人旅行數據彙總為統計數據  
  ![統計數據](https://github.com/a10115101/world-tracker/blob/main/readme_demo/Profile_Statis_Demo.gif "統計數據")

### 朋友

- 管理好友，查看他們的個人資料或旅行紀錄。  
  ![朋友](https://github.com/a10115101/world-tracker/blob/main/readme_demo/Profile_Friends_Demo.gif "朋友")

## 附錄

### 前端應用套件

- axios
- chart.js
- leaflet
- notistack
- react
- react-dom
- react-router-dom
- react-chartjs-2
- react-country-flag
- react-datepicker
- react-leaflet

### 後端應用套件

- bcryptjs
- compression
- cookie-parser
- cors
- dotenv
- express
- express-mongo-sanitize
- express-rate-limit
- express-session
- helmet
- joi
- jsonwebtoken
- mongoose
- morgan
- multer
- passport
- passport-google-oauth20
- passport-jwt
- sharp

### API 文檔

[API 文檔](https://documenter.getpostman.com/view/28528931/2s9YJjSzUk)

## 聯絡我

- 作者 : Patrick Wu
- 信箱 : a10115101@gmail.com
