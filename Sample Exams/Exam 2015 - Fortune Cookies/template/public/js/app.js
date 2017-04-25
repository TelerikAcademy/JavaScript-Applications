import { MyRouter } from 'myRouter';
import { homeController } from 'homeController';
const router = new MyRouter();

router
    .on('/', location.hash = '#/home')
    .on('/home', homeController())
    // .on('/home/:category', someController)
    // .on('/my-cookie', someController);


$(window).on('load', () => router.navigate())
$(window).on('haschchange', () => router.navigate())