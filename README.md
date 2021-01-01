# CS50w Final Project - Project 5: Capstone

## Overview
This is the [final project](https://cs50.harvard.edu/web/2020/projects/final/capstone/) of the [CS50 Web Programming](https://cs50.harvard.edu/web/2020/) course, where a web application should be designed and implemented with Python and Javascript.

### Requirements
The final project is an opportunity to design and implement an own creation dynamic website. So long as the final project draws upon this course’s lessons, the nature of the website can be freely chosen, subject to some constraints as indicated below.

* The web application must be sufficiently distinct from the other projects in this course, and more complex than those.
	* A project that appears to be a social network is a priori deemed by the staff to be indistinct from Project 4, and should not be submitted; it will be rejected.
	* A project that appears to be an e-commerce site is strongly suspected to be indistinct from Project 2, and your `README.md` file should be very clear as to why it’s not. Failing that, it should not be submitted; it will be rejected.
* The web application must utilize Django (including at least one model) on the back-end and JavaScript on the front-end.
* The web application must be mobile-responsive.

# Pet Sentry

## Description and motivation

### What is it for
Pet Sentry was made to help owners finding their missing pets. Connecting concerned owners and spotters, hopefully, this traumatic moment can have a happy ending.

So, if your pet has gone missing or if you spotted a wandering pet and want to increase its chance of being retrieved, Pet Sentry might come in handy.

### How does it work
It's simple! As an owner, you simply register a missing alert with your pet name, the last time it was seen, some way to contact you, a short description, and a picture of them. Then, a red marker will be set on the map as a missing alert.

As a spotter, you can follow the same steps and register a sighting, then a blue marker will be set on the same map. With this data, spotters might increase the chance of owners know about the whereabouts of their missing pets.

## Usage
Inside the project's `BASE_DIR` folder, execute the following command, substituting "key" for the Google API key:
```py
export API_KEY="key"
```
This will enable the geocoding feature of the application, and everything is ready to go.
To build up the local development server execute the command:
```py
python3 manage.py runserver
```
The default port will be 8000. If you wish to use another one, you can choose it by running:
```py
python3 manage.py runserver xxxx
```
replacing 'xxxx' with the port number you desire.

## Technologies used
This web application was built using **Django** for the back-end and **JavaScript** on the front-end. It also makes use of some libraries in its structure, such as **Leaflef.js** for the maps, which was supplied with **OpenStreetMap** data, **Bootstrap**, **jQuery**, and **Popper**. On top of that, to enable the geocoding feature, the **Google Geocoding API** was used.

The application was constructed to be very straightforward. It's only composed of a landing page and the "sentry map" page, which contains the map itself and all the necessary forms. Unless the user chooses to go back to the landing page or refresh the map page itself, they don't need to load anything twice, since the buttons only toggle the visibility of the structures.

The communication between the client and the server is made mostly with ***AJAX*** requests. When the user sends a form, the server does the processing and handles back either an 'OK' status or an error message. Being it the first case, the map `div` will be changed to visible again and the form will be hidden, and the cached data sent to the server is used to add a marker to the map without the need of requesting the whole set of markers again. Or else, in case of error while processing data, the form will not be toggled with the map and an alert will tell the user that something went wrong.

To make possible that ***JSON*** files carry images, the uploaded file size had to be limited at 3Mb, and allowed formats restrained to `.jpeg` (or `.jpg`), `.png`, `.gif` and `.bmp`. This is due to both the limit size of JSON files and the JavaScript conversion method `FileReader.readAsDataURL()` of binary data to **base64**.

A full demonstration of this web application functionalities can be seen in this [video](https://youtu.be/4NOiRHDxFa8).

##### ## Lucas Oliveira Corumbá ## CS50w Final Project ## ##
