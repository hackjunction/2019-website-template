# Setup

Start off by following the `SETUP.md` to setup your local development environment.

# Config

Head over to `./frontend/app/src/config`

## Visible pages

You can choose which pages you would like to be visible on the live version of the website, open the `features.js` file and edit the `features` variable to have the pages you want visible to be set to `true`, and the pages you want to be hidden to `false`.

`Note: all pages are visible by default`

## Developer mode

The website can be run in Developer mode, and this is controlled by a flag under `./frontend/app/src/config/config.js`, with the `IS_DEBUG` config variable. When the site is in Developer mode, all pages will be visible, even those hidden from the live site. Developer mode also enables some developer functionality, which makes editing the website content easier.

By default, the page is in developer mode when it is being run under certain hostnames, such as `localhost`. You're free to come up with your own conditions for this.

# Defining colours

You can edit these at `./frontend/app/src/styles/_colors.scss`

You should edit the main-color, main-gradient, background, background-gradient, link-colour and the text colouring variables to fit your theme. The 2 main-color/-gradients will change the colouring of buttons etc.

# Services

The `./frontend/app/src/services` directory contains helpers for accessing your CMS and other APIs. They will work out of the box, except for `newsletter.js` and `socialmedias.js` which require some additional config. More info included in the respective files.

# Publishing the changes

(TODO: Move this section under DEPLOYMENT.md)
Publishing changes you made to the website is very simple. When you add content to the CMS the website is automatically updated. When you make changes to the files (like changing the colours etc.) you only need to use a couple simple commands.

First push your changes to your GitHub repository.

Then deploy the Backend and/or Frontend

> npm run deploy-backend

> npm run deploy-frontend

# Using the CMS

The first time you open the CMS you will be prompted to create an account.

## Permissions

After creating the account head over to `Plugins / Roles & Permissions`(scroll down on the leftside menu) and change the public roles permissions, so that all of the content types have `count, find` and `findone` on. Execpt for the `Contact Requests` which should only have `create` and nothing else. 

This allows your React app to fetch content from the CMS, and this setup step will need to be repeated every time you deploy the website to a new environment.

## Adding content to your website

You can add content from the CMS by opening any Content Type from the menu on the left and pressing the `+Add <ContentType>` button. Fill in the required info and press save. Your content will now appear on the website after refreshing the page.

`Note: If a content type has no entries, it will not be rendered. For example, if you have no need for the guidelines component, it will not render if the guidelines content-type has no content entries.`

## Static content

There are two "special" content types in the CMS, `textfields` and `mediafields`, which allow you to define arbitrary text and media content to show on your website. Usage is as follows: 

### Textfields

- Create a new Textfield entry in the CMS, with a key of your choice, e.g. `homePageTitle`.
- Add some text content corresponding to this key, e.g. `Welcome to my awesome website`.

The project contains a `getText` helper function for accessing your textfields. Calling this function with the key of the textfield will return the content for that key.

```
const text = getText('homePageTitle')
console.log(text)
// Prints 'Welcome to my awesome site'
```

### Mediafields 

Mediafields work in much the same way as textfields, except you're able to upload images or any other arbitrary files with a key of your choice. The corresponding helper function for using your mediafields is, you guessed it, `getMedia`. 

```
const media = getMedia('homePageImage')
console.log(media)
// Prints the media object
```

## Other content types

In addition to these two powerful content types, the project has some built-in list-based content types that may be useful for you.

-   **Challenges:**
    The `slug` field is the link for the challenge, ie. `slug: challenge-1` will result in the link being `/challenges/challenge-1` `priority` will sort the challenges by priority with the lowest number being first. `Partner` and `Track` need to be created in their corresponding Content-types before you can select them here.

-   **Contactrequests:**
    All the Contact Requests sent from the website will show up here.

-   **Eventdates:**
    These will be shown on the `/info` page and are used for displaying important dates.

-   **Eventinfos:**
    These are useful for linking your Submission platform, Discord/Slack etc. and will display on the `/live` page.

-   **FAQs:**
    These will show on the Front Page and `/info` page.

-   **Footerimages:**
    These are the image links right above the footer and appear on all pages.

-   **Genericpages:**
    `NOT ADDED YET, COMING SOON`

-   **Guidelines:**
    Shown on the `/demo` page and are used to give your participants some ideas on how to rate a good project.

-   **Hardwares:**
    Usefull for letting participants know what kind of hardware will be available at your event. These will render in a list sorted Alphabetically on the `/hardware` page.

-   **Jobs:**
    If your partners have any open jobs and are looking to employ participants, these will be shown on the `/jobs` page. Partner and Jobskills need to be created before you can add them to a Job.

-   **Jobskills:**
    Useful for letting partners show what kind of skills they are looking for when they have a job application. ie. JavaScript, Photoshop etc.

-   **Openinghours:**
    Shown on the `/live` page and are used for letting participants know the opening hours for ie. the Meeting area/cafeteria etc. at your event.

-   **Partners:**
    `ShowOnTerminalPage` decides if the partner will be included in the list of partners on the `/terminal` page.
    `ShowOnFrontPage` decides if the partner will be included in the list of partners on the Front page.

    The partner lists will be sorted by the `priority` and partners with `Priority: 1` will have larger logos.

    The `hidden` boolean is useful if for example 2 partners are teaming up for a challenge, and want both their logos in the challenges. Add an image with both of their logos in the `logo` field and use `hidden`. Partners with `hidden` turned on will not be included in the partner lists.

    Add a link to the partners website in the `link` field.

-   **Schedules:**
    The schedules of your event will be shown on the `/live` page. Use the `order` field to make sure all your schedules are in order.

-   **Teammembers:**
    Will be shown on the `/team` page. The image will be shown as default, and the gif will be shown when hovering on a teammember. Both fields accept gifs and images.

    Teammembers will be sorted by the `priority` field.

-   **Tracks:**
    These should be created before challenges, so you will have an easier time sorting the correct challenges in to the correct tracks. The `mentor` field is for a partner mentoring a track.
