/**
 *  Animation Logo
 */

function initAnimation() {
    let animation = document.getElementById('initAnimation');
    let animationImg = document.getElementById('initAnimationImg');
    setTimeout(function () {
        animation.style.display = 'none';
        animationImg.style.display = 'none';
    }, 2400);
}

function initAnimationResponsiv() {
    let animation = document.getElementById('initAnimationResponsiv');
    let animationImg = document.getElementById('initAnimationImgResponsiv');
    setTimeout(function () {
        animation.style.display = 'none';
        animationImg.style.display = 'none';
    }, 2400);
}

/**
* Open and Closing Popups
*/

function openLogIn(signUp) {
    const loginContainer = signUp.closest('.login-container');
    loginContainer.querySelector('.sign-up-content-responsiv').style.display = 'none';
    loginContainer.querySelector('.msg-box').style.display = 'none';
    loginContainer.querySelector('#loginInclusiveResponsiv').style.display = 'flex';
    loginContainer.querySelector('#headerRight').style.display = 'flex';
    document.getElementById('message').style.display = 'none';
    document.getElementById('message').innerHTML = '';
}

function openSignUp(signUp) {
    const loginContainer = signUp.closest('.login-container');
    loginContainer.querySelector('#loginInclusiveResponsiv').style.display = 'none';
    loginContainer.querySelector('#headerRight').style.display = 'none';
    loginContainer.querySelector('#signUpContentResponsiv').style.display = 'flex';
    document.getElementById('message').style.display = 'none';
    document.getElementById('message').innerHTML = '';
    document.getElementById('confirmTextResponsivSignUp').style.display = 'none';
    document.getElementById('confirmTextResponsivSignUp').innerHTML = '';
}

function closeSignUp(signUp) {
    const loginContainer = signUp.closest('.login-container');
    loginContainer.querySelector('#loginInclusiveResponsiv').style.display = 'flex';
    loginContainer.querySelector('#headerRight').style.display = 'flex';
    loginContainer.querySelector('.header-right-responsiv').style.display = 'flex';
    loginContainer.querySelector('#signUpContentResponsiv').style.display = 'none';
    document.getElementById('message').innerHTML = '';
    document.getElementById('message').style.display = 'none';
    document.getElementById('confirmTextResponsivLogin').style.display = 'none';
    document.getElementById('confirmTextResponsivLogin').innerHTML = '';
}

function openSignUpAfterRegister() {
    document.getElementById('signUpContentResponsiv').style.display = 'none';
    document.getElementById('loginInclusiveResponsiv').style.display = 'flex';
    document.getElementById('headerRight').style.display = 'flex';
}

function openForgotPassword(password) {
    const loginContainer = password.closest('.login-container');
    loginContainer.querySelector('#loginInclusiveResponsiv').style.display = 'none';
    loginContainer.querySelector('#headerRight').style.visibility = 'hidden';
    loginContainer.querySelector('.forgot-inklusive-responsiv').style.display = 'flex';
    document.getElementById('forgotMail').value = '';
    document.getElementById('confirmSendMail').style.display = 'none';
    document.getElementById('resetYourPassword').style.display = 'none';
}

function closeForgotPassword(password) {
    const loginContainer = password.closest('.login-container');
    loginContainer.querySelector('#loginInclusiveResponsiv').style.display = 'flex';
    loginContainer.querySelector('.login-header').style.visibility = 'visible';
    loginContainer.querySelector('.header-right-responsiv').style.display = 'flex';
    loginContainer.querySelector('.forgot-inklusive-responsiv').style.display = 'none';
    document.getElementById('resetContent').style.display = 'none';
    loginContainer.querySelector('#headerRight').style.visibility = 'visible';
    document.getElementById('confirmTextResponsivLogin').style.display = 'none';
    document.getElementById('confirmTextResponsivLogin').innerHTML = '';
}

function closeResetPassword(password) {
    const loginContainer = password.closest('.login-container');
    loginContainer.querySelector('.login-header').style.visibility = 'visible';
    loginContainer.querySelector('#resetContent').style.display = 'none';
    loginContainer.querySelector('#resetContent').style.display = 'flex';
    document.getElementById('forgotMail').value = '';
    document.getElementById('confirmSendMail').style.display = 'none';
}