# Google OAuth implementation
1. Clone repo into root project directory
2. Run command `npm i` in project directory
3. Add this line to server file 
`require('./google_oath/google_oauth')();`
4. Create .env file (if one does not already exist) and et .env variables
```
PORT = ####
MONGO_URI=""
GOOGLE_CLIENT_ID = ""
GOOGLE_CLIENT_SECRET = ""
```