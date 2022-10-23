# Set up Project

1. Only use Yarn. Do **_NOT_** use NPM.
2. Clone repository, run this command `yarn` to install all missing packages.
3. Run this command `yarn dev` to start the server.

# Set up Database Connection

Create a file called `.env.local` in your root directory of the repository.

Add these inside.

```
MONGO_DB_URI=mongodb+srv://Admin:cDldWFrynYgtuBKJ@sggaigai-ict2103.nmawej7.mongodb.net/?retryWrites=true&w=majority
MONGO_DB_NAME=SGGAIGAI

MYSQL_DB_URI=mysql://7edib6e99krtvzi5172b:pscale_pw_P5HQNZmeeQkWuIVTqzO3tT2UP8FCAdMk5O8pYz7ZsnE@ap-southeast.connect.psdb.cloud/sggaigai?ssl={"rejectUnauthorized":true}
```
