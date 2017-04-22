import 'jquery';

import { MyRouter } from 'myRouter';
import * as homeController from 'homeController';
import * as myCookieController from 'myCookieController';
import * as userController from 'userController';

const router = new MyRouter();

router
  .on('', () => location.hash = '#/home') // fix later
  .on('/', () => location.hash = '#/home')
  .on('/home', homeController.get)
  .on('/home/:category', homeController.get)
  .on('/my-cookie', myCookieController.get)
  .on('/auth', userController.get)
  .on('/login', userController.login)
  .on('/register', userController.register)
  .on('/logout', userController.logout);

$(window).on('load', () => router.navigate());
$(window).on('hashchange', () => router.navigate());
