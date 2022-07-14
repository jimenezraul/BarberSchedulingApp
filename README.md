# Barber Scheduling App

## Description
This Barber Scheduling App lets any barber link to their own Setmore API account and schedule their appointments. The app will then display the available days and times for each barber. The user can then select a date and time to book an appointment. The customer will login with google account and the will have access to book an appointment and view their profile. In the profile page the user can view their upcoming appointments, reschedule and cancel appointments.

## Click [here](https://limitless-spire-83509.herokuapp.com/) to view the live application.

## Table of Contents
- [Barber Scheduling App](#barber-scheduling-app)
  - [Description](#description)
  - [Click here to view the live application.](#click-here-to-view-the-live-application)
  - [Table of Contents](#table-of-contents)
  - [Tools Used](#tools-used)
  - [Instalation](#instalation)
  - [Screenshot](#screenshot)
  - [License](#license)
  - [Deployment](#deployment)
  - [Questions](#questions)

## Tools Used
- React - [React](https://reactjs.org/)
- Tailwind CSS - [Tailwind CSS](https://tailwindcss.com/)
- Material UI - [Material UI](https://material-ui.com/)
- Javascript - [Javascript](https://www.javascript.com/)
- Node - [Node](https://nodejs.org/)
- Express - [Express](https://expressjs.com/)
- Redux - [Redux](https://redux.js.org/)
- Auth0 - [Auth0](https://auth0.com/)

## Instalation
```
git clone git@github.com:jimenezraul/BarberSchedulingApp.git
cd BarberSchedulingApp
npm install
```
Edit the .env file on ther server and add your Setmore API key and your Auth0 account credentials.
Edit Auth0 Provider in client/src/index.js and add your Auth0 account info.

```
npm run develop
```

## Screenshot

![Home](/server/public/screenshots/home.png)
![BookNow](/server/public/screenshots/booknow.png)
![Gallery](/server/public/screenshots/gallery.png)
![Prices](/server/public/screenshots/prices.png)
![Profile](/server/public/screenshots/profile.png)

## License

![badge](https://img.shields.io/badge/license-MIT-brightgreen)  
This application is covered by the MIT license.  
[MIT License](https://opensource.org/licenses/MIT)

## Deployment

Application deployed on Heroku  
[Live Demo](https://limitless-spire-83509.herokuapp.com/)

## Questions

Contact me by email
Email: [jimenezraul1981@gmail.com](mailto:jimenezraul1981@gmail.com)