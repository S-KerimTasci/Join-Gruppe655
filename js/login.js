/*Logo Animation*/

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


/*Open and Closing Popups*/

function openForgotPassword(password) {
    password.closest('.login-container').querySelector('#loginInclusiveResponsiv').style.display = 'none';
    password.closest('.login-container').querySelector('#headerRight').style.visibility = 'hidden';
    password.closest('.login-container').querySelector('.forgot-inklusive-responsiv').style.display = 'flex';
    document.getElementById('forgotMail').value = '';
}

function closeForgotPassword(password) {
    password.closest('.login-container').querySelector('#loginInclusiveResponsiv').style.display = 'flex';
    password.closest('.login-container').querySelector('#headerRightResponsiv').style.visibility = 'visible';
    password.closest('.login-container').querySelector('.header-right-responsiv').style.display = 'flex';
    password.closest('.login-container').querySelector('.forgot-inklusive-responsiv').style.display = 'none';
}
