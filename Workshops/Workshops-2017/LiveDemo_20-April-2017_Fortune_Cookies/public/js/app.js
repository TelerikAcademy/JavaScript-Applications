import { MyRouter } from 'myRouter';
import 'jquery';

const router = new MyRouter();

router
  .on('/', () => location.hash = '#/home')
  .on('/home', homeController)
  .on('/home/:category', someController)
  .on('/my-cookie', someController);

$(window).on('load', () => router.navigate());
$(window).on('hashchange', () => router.navigate());
