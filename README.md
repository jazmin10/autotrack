# AutoTrack

AutoTrack is an inventory manager that was built to help streamline the process as a dealership prepares used automobiles bought at auction for sale. 

## Overview

### Login

* Demo Login
   * Username - demo
   * Password - demo
   
Authentication for AutoTrack uses JSON Web Token. On login, the User is taken to the Dashboard page with a default view of My Projects. There are three tabs on the Dashboard: My Projects, Masterlist, and Add/Edit Car.

![AutoTrack Login](/public/assets/images/readme-login.gif)

### My Projects and Masterlist

The My Projects tab shows cars entered by that particular User. Masterlist shows all of the cars in the database. Each well for the car shows the year, make, and model of the car, the car's progress, and a View Profile button taking you to the profile for that car.

![My Projects and Masterlist](/public/assets/images/readme-carlist.png)


### Add/Edit Car

The Add/Edit Car tab is where the User can add or edit a car using the VIN number. The VIN is checked against the database. If it is in our database, a form is rendered with the fields populated with the basic specs of that car. Changes can be made and on submit, that car is updated in our database. 

If a car is not in our database, then using that VIN number, we scrape www.vehiclehistory.com for the basic specs of that car. A form is rendered with the fields populated from the web scrape. The User can edit the fields, add the color of the car, and the mileage. On submit, that car is added into our database.

![Add Car](/public/assets/images/readme-add-car.gif)


### Profile

The Profile page is specific to each car in the database. 

#### Basic Specs and QR Code
The first part is the Basic Specs and QR Code. The Basic Specs show the year, make, model, VIN number, color, and mileage of the car. The idea behind the QR Code is that the dealership will be able to print it out and stick it to the car. The inventory manager or vendor can scan that QR Code from the lot and view the profile page of that car to see what tasks need to be completed before the car is ready to sale.

![Basic Specs and QR Code](/public/assets/images/readme-qr-specs.gif)

## Technologies Used

* MongoDB
* ExpressJS
* ReactJS
* NodeJS
* jQuery
* Lodash
* NPM Libaries
  * [react-qr-svg](https://www.npmjs.com/package/react-qr-svg)
  * [react-progressbar (used as a reference)](https://www.npmjs.com/package/react-progressbar.js)
  * [cheerio](https://www.npmjs.com/package/cheerio)

## Contributors

* [Jazmin Estrada](https://github.com/jazmin10)
* [Flynn Tan](https://github.com/sundropgold)
* [Melissa Hernandez](https://github.com/MissHernandez)
* [Steve Walsh](https://github.com/Finfischley)
* [Sada Kallur](https://github.com/sadashivakj)

