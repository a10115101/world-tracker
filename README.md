# World-Tracker

> **Introduction**

1.  Users can easily record their tracks on a map and visually present the places they have visited or are planning to travel.
2.  Aggregation of individual travel data into statistical data.
3.  Manage friends and watch their profiles or travel records.

> **MERN Project**

![MERN Project](https://github.com/a10115101/world-tracker/blob/main/readme_demo/MERN.jpg "MERN")

Web Link：[World-Tracker](https://world-tracker.site/)

## Table of Contents

- [Test Account](#test-account)
- [System Architecture](#system-architecture)
  - [Frontend Architecture](#frontend-architecture)
  - [Backend Architecture](#backend-architecture)
  - [Database Architecture](#database-architecture)
- [Technique Stack](#technique-stack)
  - [Frontend Stack](#frontend-stack)
  - [Backend Stack](#backend-stack)
  - [Database Stack](#database-stack)
  - [Other Tools](#other-tools)
- [Demo](#demo)
  - [Map Search](#map-search)
  - [Records Filter](#records-filter)
  - [Records](#records)
  - [About Me](#about-me)
  - [Statis](#statis)
  - [Friends](#friends)
- [Appendix](#appendix)
  - [Frontend Dependencies](#frontend-dependencies)
  - [Backend Dependencies](#backend-dependencies)
- [Contact](#contact)

## Test Account

You can login via the accounts shown below or with Google Oauth.

- Account A : `demo_a@gmail.com` Password : `12345678`
- Account B : `demo_b@gmail.com` Password : `12345678`

> **Notice:**
> According to [Render.com](https://render.com/docs/free#spinning-down-on-idle), if the web server does not receive a new request for more than 15 minutes, it will go into a hibernation state and will resume normal after receiving a new request in about 30 seconds to 1 minute.

## System Architecture

### Frontend Architecture

![Frontend](https://github.com/a10115101/world-tracker/blob/main/readme_demo/Frontend_Architecture.jpg "Frontend Architecture")

### Backend Architecture

![Backend](https://github.com/a10115101/world-tracker/blob/main/readme_demo/Backend_Architecture.jpg "Backend Architecture")

### Database Architecture

![Database](https://github.com/a10115101/world-tracker/blob/main/readme_demo/Database_Architecture.jpg "Database Architecture")

## Technique Stack

### Frontend Stack

- Adopting **Vite** for a better user experience.
- React Hooks
- React Router
- CSS Modules
- Local Storage Application
- Third-party API : Geocoding / Reverse Geocoding
- Custom Domains

### Backend Stack

- **RESTful APIs**
- Based on **MVC** design pattern for better code maintainability and readability.
- Setting Helmet and Rate Limit to Increase **website security**.
- **Prevented NoSQL injection attacks**.
- Ensure that the correct data is entered into the database through **data validation**.
- **JWT** and **Google OAuth** via Passport.

### Database Stack

- **CRUD** Operations
- **Aggregation** Operations

### Other Tools

- Lint Tool: ESLint / Prettier
- Version Control : Git / GitHub
- API Platform : Postman

## Demo

### Map Search

- Search for a location and display information about the area.
  ![Map Search](https://github.com/a10115101/world-tracker/blob/main/readme_demo/Map_Search_Demo.gif "Map Search")

### Records Filter

- Users can easily filter records by status or date.
  ![Records Filter](https://github.com/a10115101/world-tracker/blob/main/readme_demo/Map_Record_Filter_Demo.gif "Records Filter")

### Records

- Add New Record.
  ![Add New Record](https://github.com/a10115101/world-tracker/blob/main/readme_demo/Map_Record_Create_Demo.gif "Add New Record")

- Update or Delete the Record.
  ![Update or Delete the Record](https://github.com/a10115101/world-tracker/blob/main/readme_demo/Map_Record_Update_Delete_Demo.gif "Update or Delete the Record")

### About Me

- Setting individual information (Optional).
  ![About Me](https://github.com/a10115101/world-tracker/blob/main/readme_demo/Profile_About_Me_Demo.gif "About Me")

### Statis

- Aggregation of individual travel data into statistical data.  
  ![Statis](https://github.com/a10115101/world-tracker/blob/main/readme_demo/Profile_Statis_Demo.gif "Statis")

### Friends

- Manage friends and watch their profiles or travel records.  
  ![Friends](https://github.com/a10115101/world-tracker/blob/main/readme_demo/Profile_Friends_Demo.gif "Friends")

## Appendix

### Frontend Dependencies

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

### Backend Dependencies

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

## Contact

- Author : Patrick Wu
- Email : a10115101@gmail.com
