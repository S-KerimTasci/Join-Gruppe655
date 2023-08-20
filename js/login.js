let users = []; // Hier wird die users-Variable initialisiert


/**
 *  Animation logo
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
 *  function releases the button when the checkbox is checked
 */
function toggleSignUpButton(checkbox) {
    const signUpButton = document.getElementById('signUpButton');
    signUpButton.disabled = !checkbox.checked;
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

function displayMessage(message) {
    const messageContainer = document.getElementById('confirmTextResponsivSignUp');
    messageContainer.style.display = 'block';
    messageContainer.innerHTML = message;
}

/**============Sign Up========== */

/**
 *  Downloads the users array from the backend.
 *
 */
async function loadUsers() {
    try {
        const response = await getItem("users");
        const usersData = response.data.value; 
        users = JSON.parse(usersData);
    } catch (e) {
        console.error("Loading error:", e);
    }
}



/**
 * This function returns the initials of a given name
 * 
 * @param {string} name - The name to extract initials from
 * @returns Initials of the name
 */
function initials(name) {
    const words = name.split(' ');
    if (words.length === 1) {
        return words[0].charAt(0);
    } else {
        return words[0].charAt(0) + words[1].charAt(0);
    }
}


/**
 *  saves the user data in the backend
 */
async function addUser() {
    const name = document.getElementById('newName').value;
    const email = document.getElementById('signUpEmail').value;
    const password = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (password !== confirmPassword) {
        handlePasswordMismatch();
        return;
    }

    await loadUsers();

    const existingUser = users.find(user => user.email === email);
    
    if (existingUser) {
        handleExistingUser();
        return;
    }

    setNewUser(name, email, password);

    try {
        const response = await setItem("users", JSON.stringify(users));
        handleResponse(response);
    } catch (error) {
        console.error(error);
    }
}

function handlePasswordMismatch() {
    const errorMessage = "Passwords do not match";

    if (window.innerWidth <= 768) {
        const confirmTextResponsivSignUp = document.getElementById('confirmTextResponsivSignUp');
        confirmTextResponsivSignUp.style.display = 'block';
        confirmTextResponsivSignUp.innerHTML = errorMessage;

        const msgBox = document.getElementById('messageNewUser');
        msgBox.style.display = 'none';
    } else {
        const msgBox = document.getElementById('messageNewUser');
        msgBox.style.display = 'block';
        msgBox.innerHTML = errorMessage;
        
        const confirmTextResponsivSignUp = document.getElementById('confirmTextResponsivSignUp');
        confirmTextResponsivSignUp.style.display = 'none';
    }
}

function handleExistingUser() {
    const errorMessage = "User already exists. Please Login";

    if (window.innerWidth <= 768) {
        const confirmTextResponsivSignUp = document.getElementById('confirmTextResponsivSignUp');
        confirmTextResponsivSignUp.style.display = 'block';
        confirmTextResponsivSignUp.innerHTML = errorMessage;

        const msgBox = document.getElementById('messageNewUser');
        msgBox.style.display = 'none';
    } else {
        const msgBox = document.getElementById('messageNewUser');
        msgBox.style.display = 'block';
        msgBox.innerHTML = errorMessage;
        
        const confirmTextResponsivSignUp = document.getElementById('confirmTextResponsivSignUp');
        confirmTextResponsivSignUp.style.display = 'none';
    }
    clearRegistrationForm();
    redirectToLoginAfterDelay();
}

function handleResponse(response) {
    if (response.status === "success") {
        const successMessage = "You have successfully registered.";

        if (window.innerWidth <= 768) {
            const confirmTextResponsivSignUp = document.getElementById('confirmTextResponsivSignUp');
            confirmTextResponsivSignUp.style.display = 'block';
            confirmTextResponsivSignUp.innerHTML = successMessage;

            const msgBox = document.getElementById('messageNewUser');
            msgBox.style.display = 'none';
        } else {
            const msgBox = document.getElementById('messageNewUser');
            msgBox.style.display = 'block';
            msgBox.innerHTML = successMessage;

            const confirmTextResponsivSignUp = document.getElementById('confirmTextResponsivSignUp');
            confirmTextResponsivSignUp.style.display = 'none';
        }
        clearRegistrationForm();
        redirectToLoginAfterDelay();
    }
}

/**
 * This function redirects to the login page after a delay
 */
function redirectToLoginAfterDelay() {
    setTimeout(() => {
        window.location.href = "login.html";
    }, 2000); 
}

  /**
 * This function clears the registration form fields
 */
  function clearRegistrationForm() {
    document.getElementById('newName').value = '';
    document.getElementById('signUpEmail').value = '';
    document.getElementById('newPassword').value = '';
    document.getElementById('confirmPassword').value = '';
}


/**
 * This function sets a new user with the given details and adds initial to the user object
 * 
 * @param {string} name - The name of the user
 * @param {string} email - The email of the user
 * @param {string} password - The password of the user
 */
function setNewUser(name, email, password) {
    const userInitials = initials(name); 
    users.push({
        name: name.trim(),
        email: email.trim(),
        password: password,
        initials: userInitials,        
    });
}



/**============Login========== */

/**
 * check if user is already exist, if yes, forward to summary.html
 * if not, option to sign up
 */
async function login() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        await loadUsers(); 

        const user = users.find(c => c.email === email && c.password === password);

        const message = document.getElementById('message');
        const messageResponsiv = document.getElementById('confirmTextResponsivLogin');

        if (!user) {
            message.style.display = 'flex';
            message.innerHTML = generateHTMLifNotUserDesktop();
            messageResponsiv.style.display = 'inline';
            document.getElementById('headerRightResponsiv').style.display = 'none';
            messageResponsiv.innerHTML = generateHTMLifNotUserMobile();
        } else {
            localStorage.setItem('currentUser', JSON.stringify(user));
            window.location.href = '../html/summary.html';
        }

        document.getElementById('email').value = '';
        document.getElementById('password').value = '';
    } catch (error) {
        console.error(error);
    }
}

/**
 * This function generates HTML for desktop view if the user is not registered
 */
function generateHTMLifNotUserDesktop() {
    return /*html*/ `
        <div id="popUpBg" class="confirm-send-mail" onclick="closeOverlay()">
            <div class="confirm-box">
                <div onclick="doNotCloseOverlay(event)" class="register-text">You are not registered yet.<br> Click 
                    <span class="here" onclick="openSignUp(this)">here</span> to sign up
                </div>
            </div>
        </div>`;
}


/**
 * This function generates HTML for mobile view if the user is not registered
 */
function generateHTMLifNotUserMobile() {
    return /*html*/`
        You are not registered yet.<br> Click 
            <span class="here-responsiv" onclick="openSignUp(this)">here</span> to sign up`;
}


/**============Forgot Password========== */

/**
 * This function confirms sending the email
 */
async function confirmSendMail() {
    const emailInput = document.getElementById('forgotMail');
    enteredEmail = emailInput.value; 

    const message = document.getElementById('confirmSendMail');
    const messageResponsiv = document.getElementById('confirmTextResponsiv');

    await loadUsers();

    const existingUser = users.find(user => user.email === enteredEmail);

        if (existingUser) {
            message.style.display = 'block';
            message.innerHTML = sendPasswordDesktop();
            messageResponsiv.style.display = 'block';
            messageResponsiv.innerHTML = sendPasswordMobile();

            setTimeout(() => {
                window.location.href = '../html/reset_password.html';
            }, 2000);

        } else {
            message.style.display = 'flex';
            message.innerHTML = generateHTMLifNotUserDesktop();
            messageResponsiv.style.display = 'inline';
            messageResponsiv.innerHTML = generateHTMLifNotUserMobile();
        }
    

    emailInput.value = '';
}

/**
 * This function generates HTML for desktop view if the user is not registered
 */
function sendPasswordDesktop() {
    return /*html*/ `
        <div id="popUpBg" class="confirm-send-mail" onclick="closeOverlay()">
            <div class="confirm-box">
                <div onclick="doNotCloseOverlay(event)" class="register-text">
                    <img src="../assets/img/email-send.svg">
                    An E-Mail has been sent to you
                </div>
            </div>
        </div>`;
}

/**
 * This function generates HTML for mobile view if the user is not registered
 */

function sendPasswordMobile() {
    return /*html*/ `
        An E-Mail has been sent to you`;
}







/**============Reset Password========== */




/**
 * This function resets the user's password.
 */


function resetPasswordDesktop() {
    return /*html*/ `
        <div id="popUpBg" class="confirm-send-mail" onclick="closeOverlay()">
            <div class="confirm-box">
                <div onclick="doNotCloseOverlay(event)" class="register-text">
                    You reset your password
                </div>
            </div>
        </div>`;
}



function resetPasswordMobile() {
    return /*html*/ `
        You reset your password`;
}


function passwordNotMatchDesktop() {
    return /*html*/ `
        <div id="popUpBg" class="confirm-send-mail" onclick="closeOverlay()">
            <div class="confirm-box">
                <div onclick="doNotCloseOverlay(event)" class="register-text">
                    Passwords do not match. Please try again.
                </div>
            </div>
        </div>`;
}


function passwordNotMatchMobile() {
    return /*html*/ `
        Passwords do not match. Please try again.`;
}


/**============Nur zum Debuggen========== */

async function loadAndDisplayUsers() {
    await loadUsers(); 

    // Zeige die Benutzerdaten im Klartext in der Konsole an
    users.forEach(user => {
        const { name, email, password } = user;
        const userInitials = initials(name);
        console.log(`Name: ${name}, Email: ${email}, Password: ${password}, Initials: ${userInitials}`);
    });
}

// Rufe die Funktion auf, um die Benutzerdaten zu laden und anzuzeigen
loadAndDisplayUsers();