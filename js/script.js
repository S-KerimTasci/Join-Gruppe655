const STORAGE_TOKEN = 'JCBM19KHMDXFWN16VAJWOY8L41ZV33EX7L3HYKWY';
const STORAGE_URL = 'https://remote-storage.developerakademie.org/item';
const KEY_for_JSON = 'Join-Group655';

/**
 * This function saves Data into the backend.
 * 
 * @param {string} key - Takes a key for any sort of data.
 * @param {string} value - Takes a value in form of JSON.
 * @returns the stringifyed data.
 */
async function setItem(key, value) {
    const payload = { key, value, token: STORAGE_TOKEN };
    return fetch(STORAGE_URL, { method: 'POST', body: JSON.stringify(payload)})
    .then(res => res.json());
}

/**
 * This function recieves and loads Data from the backend.
 * 
 * @param {string} key - Key of an data type e.g. an object 
 * @returns parsed Data from the backend.
 */
async function getItem(key) {
    const url = `${STORAGE_URL}?key=${key}&token=${STORAGE_TOKEN}`;
    return fetch(url).then(res => res.json());
}

/**
 * This function returns the first letters of member name i.e. "John Doe"
 * used in headFootTemplate.js and board.js
 * 
 * @param {string} member - this ist the full name of the member
 * @returns initials of user i.e. "JD"
 */
function memberInitials(member){
    let initials = member.split(' ').map(name => name[0]).join('');
    return initials;
}