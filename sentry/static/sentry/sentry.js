// Import map and popup icons settings
import {sentry_map, alert_icon, sight_icon} from './map.js'; 

// Display error message, if any
if (alert_message != "")
    alert(alert_message);

// Output formatted date
function formatDate(date) {
    let input = date;
    let year = input.slice(0,4);
    let month = input.slice(5,7);
    let day = input.slice(8,10);
    return `${month}/${day}/${year}`;
}

// Select 'sentry.html' view elements
const map = document.getElementById('map-container');
const miss = document.getElementById('missing');
const sight = document.getElementById('sighting');

// Button to switch views - display missing alert form
document.getElementById('missing-button').addEventListener('click', () => {
    map.style.display = 'none';
    sight.style.display = 'none';
    miss.style.display = 'block';
});

// Button to switch views - display sighting form
document.getElementById('sight-button').addEventListener('click', () => {
    map.style.display = 'none';
    sight.style.display = 'block';
    miss.style.display = 'none';
});

// Add functionality to 'back to map' buttons - display map
const back_map = document.querySelectorAll('.btn-back-map');
back_map.forEach(el => {
    el.addEventListener('click', () => {
        map.style.display = 'block';
        sight.style.display = 'none';
        miss.style.display = 'none';
    })
});

// Add functionality to 'register' buttons
document.getElementById('miss-register-btn').addEventListener('click', newMissing);
document.getElementById('sight-register-btn').addEventListener('click', newSight);

// Select image upload fields
const inp_sight_image = document.getElementById('sight-image');
const inp_miss_image = document.getElementById('miss-image');
var img_up = '';

// Listen for file selection
inp_miss_image.addEventListener('change', function() {
    // Get image info
    const file = this.files[0];
    // Limit image size to 3Mb
    if (file.size > 3145728) {
        alert("File is too big. Maximum size: 3Mb");
        inp_miss_image.value = '';
    }
    else if (file) {
        // Get image data (base64)
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.addEventListener('load', () => {
            img_up = reader.result;
        })
    }
});

// Listen for file selection
inp_sight_image.addEventListener('change', function() {
    // Get image info
    const file = this.files[0];
    // Limit image size to 3Mb
    if (file.size > 3145728) {
        alert("File is too big. Maximum size: 3Mb");
        inp_sight_image.value = '';
    }
    else if (file) {
        // Get image data (base64)
        const reader = new FileReader();          
        reader.readAsDataURL(file);
        reader.addEventListener('load', () => {
            img_up = reader.result;
        })
    }
    else {}
});

// Post new missing alert
function newMissing() {
    // Get data
    let name = document.getElementById('miss-name').value;
    let location = document.getElementById('miss-location').value;
    let time = document.getElementById('miss-time').value;
    let desc = document.getElementById('miss-description').value;
    let contact = document.getElementById('miss-contact').value;

    // Ensure required fields are filled
    let form = document.getElementById('miss-form');
    if (name == '' || location == '' || time == ''){
        form.classList.add('was-validated');
    }        

    // Make AJAX request
    else {
        fetch('/missing', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': getCookie("csrftoken")
            },
            body: JSON.stringify({
                name: name,
                location: location,
                time: time,
                description: desc,
                contact: contact,
                image: img_up
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.error)
                alert(data.error);
            else {
                // Hide form, add marker and show map
                form.classList.remove('was-validated');
                var date = formatDate(time);
                var new_marker = L.marker([data.lat_lng['lat'], data.lat_lng['lng']], {icon:alert_icon}).addTo(sentry_map);
                var popup = L.popup({maxWidth: 140, maxHeight: 400}).setContent(`<img width='140px' height='140px' src=${img_up} >
                <p><b>Name: ${name}</b><p><b>Last Seen: </b>${date}<p><b>Description:</b> ${desc}</p><p><b>Contact:</b> ${contact}</p>`);
                new_marker.bindPopup(popup);
                miss.style.display = 'none';
                map.style.display = 'block';
            }       
        });
    }
};

// Post new sighting
function newSight() {
    // Get data
    let location = document.getElementById('sight-location').value;
    let time = document.getElementById('sight-time').value;
    let desc = document.getElementById('sight-description').value;
    let contact = document.getElementById('sight-contact').value;

    // Ensure required fields are filled
    let form = document.getElementById('sight-form');
    if (location == '' || time == '') {
        form.classList.add('was-validated');
    }        

    // Make AJAX request
    else {
        fetch("/sight", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': getCookie("csrftoken")
            },
            body: JSON.stringify({
                location: location,
                time: time,
                description: desc,
                contact: contact,
                image: img_up
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.error)
                alert(data.error);
            else {
                // Hide form, add marker and show map         
                form.classList.remove('was-validated');
                var date = formatDate(time);
                var new_marker = L.marker([data.lat_lng.lat, data.lat_lng.lng], {icon:sight_icon}).addTo(sentry_map);
                var popup = L.popup({maxWidth: 140, maxHeight: 400}).setContent(`<img width='140px' height='140px' src=${img_up} >
                <b>Seen: </b>${date}<p><b>Description:</b> ${desc}</p><p><b>Contact:</b> ${contact}</p>`);
                new_marker.bindPopup(popup);
                sight.style.display = 'none';
                map.style.display = 'block';
            }            
        });
    }   
};

// Fix csrf_token issue
function getCookie(c_name){
    if (document.cookie.length > 0){
        var c_start = document.cookie.indexOf(c_name + "=");
        if (c_start != -1){
            c_start = c_start + c_name.length + 1;
            var c_end = document.cookie.indexOf(";", c_start);
            if (c_end == -1) c_end = document.cookie.length;
            return unescape(document.cookie.substring(c_start,c_end));
        }
    }
return "";
}

// export formatDate function
export {formatDate};