//Selecting elements
let btn = document.getElementById("button"),
    popUp = document.getElementById('pop-up'),
    timer = document.getElementById('timer'),
    redirectTo = 'https://goo.gl/Jc6oeV';

btn.addEventListener("click", event)

function event() {
    const time = 2000;
    let later = new Date().getTime() + time;

    // Popping the popUp
    popUp.style.display = "block";
    timer.style.display = "block";

    let redirect = new Promise((resolve, reject) => {

        // make countdown timer for the time to redirect
        let x = setInterval(() => {
                let now = new Date().getTime(),
                    distance = (later - now);

                popUp.innerHTML = `Hey, this site is redirecting you to \n-----PANDA HEAVEN------ in:`;
                timer.innerHTML = ((distance / 1000).toFixed(1)) + ' sec';

                if (distance < 0) {
                    clearInterval(x);
                    popUp.innerHTML = `Hey, this site is redirecting you to PANDA HEAVEN in 0sec`;
                    timer.innerHTML = '0.0' + ' sec';

                    resolve(redirectTo);
                }
            },
            100);
    });

    redirect.then(resolved => window.location.href = resolved, reject => 'Unexpexted error happend')
}