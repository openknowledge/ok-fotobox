export default {
    FOTOBUCKET_NAME: process.env.REACT_APP_FOTOBUCKET_NAME || (function() {throw new Error("FOTOBUCKET_NAME is not set")}()),
    LOGIN_URL: process.env.REACT_APP_LOGIN_URL + '/prod/login' || (function() {throw new Error("LOGIN_URL is not set")}()),
    ACCESS_KEY: process.env.REACT_APP_USER_ACCESS || (function() {throw new Error("USER_ACCESS is not set")}()),
    SECRET_KEY: process.env.REACT_APP_USER_SECRET || (function() {throw new Error("USER_SECRET is not set")}())
}