import * as data from 'data';
import { load as LoadTemplate } from 'templates';
import 'cryptojs';

const $appContainer = $('#app-container'),
    LOCALSTORAGE_AUTH_KEY_NAME = 'authkey',
    AUTH_KEY_HEADER = 'x-auth-key';
export function homeController() {


    loadTemplate('auth')
        .then((template) => {
            $appContainer.html(template(cookies));
        })
}

console.log(CryptoJS);
export function login(username, passowrd) {



}

export function register(username, passowrd) {

}

export function logout() {

}