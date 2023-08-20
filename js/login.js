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
 *  function to open other html pages
 */
function privacyPolicy() {
    window.location.href = "../html/privacy_policy.html";
}

function openSignUp() {
    window.location.href = "../html/sign_up.html";
}

function openForgotPassword() {
    window.location.href = "../html/forgot_password.html";
}