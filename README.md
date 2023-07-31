# Apollon 🎸

This project aims to give users a concise way to view their Spotify activities and data.  
It is currently in development and not ready for production use.  
There is already a [live deployment](https://appollon.vercel.app) of the current state of the project using Vercel, as well as plans to deploy to Azure.  
But due to restrictions of the Spotify API it is only accessible to users, who are explicitly added to the Spotify application.  
If you wish to read more about this project, please visit the wiki of this repository.  
For a detailed setup guide have a look at the [dev setup](#dev-setup) section of this readme.


## Tech-Stack

We utilize Next.js with Tailwind. Our Database is implemented via Prisma.  
Read more about the frameworks an libraries used in the project in this repository's wiki.

## Dev Setup

### Requirements
Node.js is required to run this project.  
The project was developed using `pnpm`, there is a preinstall script in place, which enforces the usage of `pnpm`.  
You can use `npm` to install `pnpm`, simply run this command `npm install -g pnpm`.  
If you are getting build errors, make sure you are using `pnpm`.  
If you clone this repository make sure to run `pnpm install`.  
You will also need Docker to setup the database.  
You can download it [here](https://docs.docker.com/engine/install/).  

### Spotify Application
The application will only work if you have a Spotify application set up.  
For a detailed guide on how to set up a Spotify application, visit the [Spotify Docs](https://developer.spotify.com/documentation/web-api/tutorials/getting-started).  
After creating the application, fill in the required information in the .env file.
It is also necessary to specify the redirect URI in the settings of the Spotify Application you have just created. It should be the same as in the .env.

### Environment Variables
- `DATABASE_URL`  
  The url to your databse, if you use the docker-compose file provided in this repository it should be `mysql://root:apollon@localhost:3306/apollon`
- `SPOTIFY_CLIENT_ID`  
  The client id of your spotify application
- `SPOTIFY_CLIENT_SECRET`  
  The client secret of your spotify application
- `SPOTIFY_REDIRECT_URI`  
  The redirect uri, if run locally this should be `http://localhost:3000/spotifycallback`  
  make sure to change this, if you change the port of the dev server
- `SPOTIFY_SCOPE`  
  The scopes provided to the Spotify API when requesting access to a user's data.  
  In the current development stage, we just added all scopes, because we are still developing features and don't want to add scopes later on. In the     future we will only request the scopes we need.
- `DOMAIN`  
  The actual domain of the application, if you run it locally this should be `http://localhost:3000`.  
  Make sure to modify the port, should you change it.

## Starting the Database
To start the database, you can use the docker-compose file provided in this repository or host your own database.
To use the docker-compose file, run `docker-compose -f local-db-docker.yml up` in the root directory of the project.

## Starting the Application
After you have completed the setup, you can start the application by running `pnpm dev`. This will start the dev server on port 3000.  
Another option is to build the application as a docker container. To achieve this, you have to first build the image by running `docker build . -t apollon` in the root directory of the project. After that you can use the docker-compose file to start the application, this will automatically set the environment variables. Execute it by running `docker-compose up` in the root directory of the project.


## Related Docs

- https://pnpm.io/
- https://nextjs.org/docs
- https://docs.docker.com
- https://www.prisma.io/docs
- https://developer.spotify.com/documentation/web-api
