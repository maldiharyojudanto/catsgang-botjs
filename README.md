# catsgang-botjs

catsgang bot multiple account https://t.me/catsgang_bot

<img width="527" alt="7yJHb6bxDp" src="https://github.com/user-attachments/assets/37ffe751-f7a3-403f-8f1d-866a589891f6">

## Features
- Auto complete task (include kucoin, bitget, and okx task) execpt telegram task
- Auto submit answer for youtube task
- Auto upgrade avatar

## Requirement
- Node.js

## How to run
1. Clone/download this repository
2. Extract and go to folder
3. Setting .env file
4. Open cmd file folder
5. > npm install
6. > node index
7. Fill query.txt

## How to get query_id?
1. Open telegram web/desktop
2. Go to Settings - Advanced - Experimental settings - Enable webview inspecting
3. Open bot https://t.me/catsgang_bot
4. Press F12 or right click then select inspect element
5. Reload Page (dot three button)
6. Go to Network tab - Fetch/XHR - Select user - Click Headers - Scroll down to Authorization - copy value after tma start with ```query_id=``` or ```user=```
7. Separate query_id= or user= with the newline (for multiple account)
