# Prerequisites

**NOTE: The setup process may slightly differ depending on your OS**

Okay, first of all you'll need to have the following installed on your system:

-   Node.js 10.x or higher - [install with Homebrew](https://www.dyclassroom.com/howto-mac/how-to-install-nodejs-and-npm-on-mac-using-homebrew) if using a Mac, or [download the installer for your system](https://nodejs.org/en/download/current/) if not

*   MongoDB 3.6.x - [install with Homebrew](https://treehouse.github.io/installation-guides/mac/mongo-mac.html) if using a Mac, or follow the [installation instructions here](https://docs.mongodb.com/manual/installation/)

If you already have these installed, verify they are the correct versions:

```
Juusos-MacBook-Pro:~ juuso$ node -v
v10.7.0
Juusos-MacBook-Pro:~ juuso$ mongod --version
db version v3.6.1
...
```

In case you need to have different versions of node for different project, I would recommend you install [Node Version Manager](https://github.com/creationix/nvm) to be able to use different versions depending on the project directory.

# Setup

### Fork the repository

First things first, fork the repository under your own GitHub Account.

### Clone the repository and set it up

Next, clone the repository. You'll probably want to rename it from `website-template` to something else - we'll use `awesome-site` in this readme.

Clone the repository:

```
git clone <URL of your repository> awesome-site
```

### .env Settings

Create a .env file under `./frontend/app` and include the following settings:

```
REACT_APP_CLOUDINARY_CLOUD_NAME= Your Cloudinary Name //See the bottom of this page for details
REACT_APP_API_BASE_URL= Your cms address. Defaults to localhost:1337
REACT_APP_GRAPHQL_BASE_URL= Same as API_BASE_URL but with /graphql Defaults to locahost:1337/graphql
```

### Change the project name

Our project is called `awesome-site` (you can name yours whatever you wish) so let's edit the project name in a few places to reflect that. This is not strictly necessary but would make a lot of sense for you to do as well.

1. In the root directory package.json, change the project name to describe your project (`awesome-site`)

```
{
  "name": "react-strapi-starter", // Change this to your project name
  "version": "1.0.0",
  "main": "index.js",
  ...
```

2. In `cms/config/environments/development/database.json` edit the `database` field from `react-strapi-starter` to your project name (`awesome-site`)

```
{
  "defaultConnection": "default",
  "connections": {
    "default": {
      "connector": "strapi-hook-mongoose",
      "settings": {
        "client": "mongo",
        "host": "127.0.0.1",
        "port": 27017,
        "database": "react-strapi-starter", // Change this to your project name
        "username": "",
        "password": ""
      },
      "options": {}
    }
  }
}
```

3. In `frontend/app/src/redux/configureStore.js` edit `persistConfig` and change the `key` field from `react-strapi-starter` to your app name (`awesome-site`)

```
const persistConfig = {
	key: 'react-strapi-starter', // Change this to your project name
	storage,
	stateReconciler: autoMergeLevel2,
}
```

### Spin up the project

First, let's install the dependencies for both the backend and frontend.

First of all, make sure you have a local MongoDB server running. In a new terminal window, run `mongod` to start the server. If this fails with a "permission denied" error, you might need to run:

```
sudo mkdir -p /data/db
sudo chown -R $USER /data/db
mongod
```

Then, in the project root, run:

```
npm install strapi@beta -g
npm run setup
```

Once the dependencies are installed, let's start the app in development mode by running (in the root of the project):

```
npm run dev
```

This will spin up the frontend at `localhost:3000` and the backend at `localhost:1337`. Both will automatically reload if any code changes are made. You'll notice that the frontend of the site isn't really showing any content, besides some default text. But we'll fix that in the next steps.

### Log in to the admin panel

Open `localhost:1337/admin` in a browser, and it will prompt you to create your first user. Once you've created your first admin user, let's make a few changes in the admin panel:

-   Go to `Roles & Permission`, choose `Public` and under permissions check `find`, `findone` and `count` under all content types - then click Save in the top right corner.

1. Go to Roles & Permission in the sidebar
2. Choose Public
3. Under Permissions, check `find`, `findone` and `count` under all of the content types (Unless using a contact form which should only have `create` checked and nothing else.)
4. Click Save in the top right corner

### Adding content to your site

You can add content from the CMS by opening any `content-type` from the sidebar and pressing the `+Add 'ContentType'` button. Fill in the required info and press save. Your content will now appear on the website after refreshing the page. Play around with it a bit and see how it works! :)

## Developer mode

It will be helpful to setup your app to have a Developer mode, which will include a switch to show the keys of media/textfields and grant access to all sites. Edit the `config.js` file and add your development site to the `DEBUG_HOSTNAMES` variable. `Note: localhost will work aswell!`

### Setting up Cloudinary

By default any images uploaded to the admin panel will go into `/cms/public/uploads` but you might want to change that to use something like Cloudinary. Cloudinary is an online image hosting service where you can serve any images on your site via their CDN in various formats and sizes depending on where you want to show them. This will dramatically speed up your site and I would recommend setting it up from the get-go.

-   Create a [Cloudinary account](https://cloudinary.com/users/register/free) (they have a very generous free tier which will be more than enough for one site)
-   Open the Admin panel at `localhost:1337`
-   Click Plugins under General in the sidebar
-   Click the cog icon next to Files Upload
-   Under the development tab, choose Cloudinary from the Providers dropdown, fill in your Cloudinary keys, and Save

Now any images uploaded via the admin panel will go to your Cloudinary account, from where you can serve them in various sizes and formats just by making small edits to the url of the image. The project has [`cloudinary-react`](https://github.com/cloudinary/cloudinary-react) already set up for use, but you should look further into it yourself to learn how to unleash the full power of Cloudinary.

The project also includes the `<Image />` component, which you can use to automatically fetch an image as a given size (thumbnail, full image, etc.) just by supplying it a `width` and `height` prop.
