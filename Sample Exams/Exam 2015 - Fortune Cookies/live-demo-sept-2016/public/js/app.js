/* globals Navigo controllers $ dataService document */

let router = new Navigo(null, true);

let controllersInstance = controllers.get(dataService, templates);

router
    .on("login", controllersInstance.login)
    .on("home", controllersInstance.home)
    .on("my-cookie", controllersInstance.myCookie)
    .on("cookie-add", controllersInstance.addCookie)
    .on(() => {
        router.navigate("/home");
    })
    .resolve();

dataService.isLoggedIn()
    .then(function(isLoggedIn) {
        if (isLoggedIn) {
            $(document.body).addClass("logged-in");
        }
    });

$(".btn-nav-logout").on("click", () => {
    dataService.logout()
        .then(() => {
            $(document.body).removeClass("logged-in");
        });
});