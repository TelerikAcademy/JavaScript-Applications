import { MyRouter } from 'myRouter';
import { homeController } from 'homeController';
import { userController } from 'userController';
const router = new MyRouter();

router
    .on('/', location.hash = '#/home')
    .on('/home', homeController())
    .on('/my-cookie', myCookieController())
    .on('/auth', userController())
    .on('logout', )
    // .on('/home/:category', someController)
    // .on('/my-cookie', someController);


$(window).on('load', () => router.navigate())
$(window).on('haschchange', () => router.navigate())