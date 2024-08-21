import '@babel/polyfill'
import { displayMap } from './mapbox';
import {login} from './login'

// DOM ELEMENTS
const mapBox = document.getElementById('map');
const loginForm = document.getElementById('.form');

// VALUES



if (mapBox) {
    const locations = JSON.parse(document.getElementById('map').dataset.locations);
}

if (loginForm) {
    loginFormaddEventListener('submit', e => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        login(email,password);
    }) 
}


displayMap(locations);

