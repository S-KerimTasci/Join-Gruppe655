/**
 * This function calls function: includeHTML() and adds the return valus for function: initials() to header element id='userIntials'
 * 
 */
async function init(){
    await includeHTML();
    document.getElementById('userIntials').innerText = initials(); //add global var for login
}
/**
 * This function returns the initals of the loged in user
 * 
 * @param {string} login - this is the login ofe the user
 * @returns initials of user
 */
function initials(login) {
    if (login) {
        return 'AS' // here add function for getting initials
    } else { return 'G'}
    
}

/**
 * This function looks for all elements with the attribute w3-include-html and loads the code from the source added as value for this attribute  
 * 
 */
async function includeHTML() {
    let includeElements = document.querySelectorAll('[w3-include-html]');
    for (let i = 0; i < includeElements.length; i++) {
        const element = includeElements[i];
        file = element.getAttribute('w3-include-html');
        let resp = await fetch(file);
        if (resp.ok) {
            element.innerHTML = await resp.text();
        } else {
            element.innerHTML = 'Page not found';
        }
    }
}