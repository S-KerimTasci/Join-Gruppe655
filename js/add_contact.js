const colors = ['#FF7A00', '#FF5EB3', '#6E52FF', '#9327FF', '#00BEE8', '#1FD7C1', '#FF745E', '#FFA35E', '#FC71FF', '#FFC701', '#0038FF', '#C3FF2B', '#FFE62B', '#FF4646', '#FFBB2B'];
const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
const contactsContainer = document.getElementById('contactsContainer');

let contactJSONBE = [];

let contactJSON1 = {
  "email": "",
  "initials": "",
  "name": "",
  "bgColor": "",
  "phone": ""
}


/**
 * This function loads the contacts from the backend into the local contact JSON
 * 
 */
async function loadContacts() {
  contactJSONBE = await loadJSON(KEY_for_JSON_CONTACS);
}


/**
 * This funtion renders the contactlist and fills it with the loaded contacts
 * 
 */
async function createContactList() {
  await loadContacts();
  const contacts = contactJSONBE;

  for (const letter of alphabet) {
    const filteredContacts = contacts
      .filter(contact => contact.name.toLowerCase().startsWith(letter))
      .sort((a, b) => a.name.localeCompare(b.name));

    if (filteredContacts.length > 0) {
      const contactHTML = filteredContacts.map((contact, index) => {
        const contactIndex = contacts.indexOf(contact);
        return generateContactHTML(contact, contactIndex);
      }).join('');

      const html = generateLetterSection(letter, contactHTML);
      contactsContainer.innerHTML += html;
    }
  }
}


/**
 * This funtion adds new contacts to the contacts JSON 
 * 
 */
async function addContact() {
  createButton.disabled = true;
  loadContacts();
  getContactsValues();
  contactJSONBE.push(contactJSON1);
  await setItem(KEY_for_JSON_CONTACS, contactJSONBE);
  closeOvelayAfterNewContact();
  createButton.disabled = false;
}


/**
 * This function renders the contactlist with new contacts, closes the overlay and displays the new contact
 * 
 */
function closeOvelayAfterNewContact() {
  displayNewContact();
  contactsContainer.innerHTML = '';
  createContactList();
  closeAddContactOverlay();
  showAndHideContactAddedOverlay();
}


/**
 * This function displays the newly added contact 
 * 
 */
function displayNewContact() {
  let display = contactJSONBE.length - 1;
  showContactInfo(display);
}


/**
 * This funtion adds the newly edited contact to the contacts JSON and renders teh contactlist
 * 
 * @param {number} i - index of the edited contact in the contacts JSON
 */
async function addContactViaEditOverlay(i) {
  createButton.disabled = true;
  getContactsValuesEditOVerlay(i);
  contactJSONBE.splice(i, 1);
  contactJSONBE.push(contactJSON1);
  await setItem(KEY_for_JSON_CONTACS, contactJSONBE);
  closeOvelayAfterNewContact();
  createButton.disabled = false;
}


/**
 * This function gets the values from the overlay inputfields that are needed for editing a contact 
 * 
 * @param {number} i - index of the edited contact in the contacts JSON
 */
function getContactsValuesEditOVerlay(i) {
  let name = document.getElementById('inputName').value;
  let mail = document.getElementById('inputMail').value;
  let phone = document.getElementById('inputTel').value;
  let initial = name.split(' ').map(word => word.charAt(0).toUpperCase()).join('');
  let bgColor = contactJSONBE[i].bgColor;

  contactJSON1.email = mail;
  contactJSON1.initials = initial;
  contactJSON1.name = name;
  contactJSON1.bgColor = bgColor;
  contactJSON1.phone = phone;
}


/**
 * This function gets the values from the overlay inputfields that are needed for adding a contact 
 * 
 */
function getContactsValues() {
  let name = document.getElementById('inputName').value;
  let mail = document.getElementById('inputMail').value;
  let phone = document.getElementById('inputTel').value;
  let initial = name.split(' ').map(word => word.charAt(0).toUpperCase()).join('');
  let bgColor = setColor()

  contactJSON1.email = mail;
  contactJSON1.initials = initial;
  contactJSON1.name = name;
  contactJSON1.bgColor = bgColor;
  contactJSON1.phone = phone;
}


/**
 * This funtion gives every new contact a color
 * 
 * @returns the color of the newly added contact 
 */
function setColor() {
  let i = contactJSONBE.length;
  let color = colors[i % colors.length];
  return color;
}


/**
 * This function sets the responsive css for the contacts page 
 * 
 */
function hideContactInfo() {
  document.getElementById('leftDiv').classList.remove('dd-none');
  document.getElementById('rightDiv').classList.add('dd-none');
  document.getElementById('rightDiv').classList.remove('rightDivRes');
}


/**
 * This function sets the desctop view css fot the contacts page
 * 
 */
function hideContactInfoDektop() {
  document.getElementById('ContactsInfoContainer').classList.add('dd-none');
}


/**
 * This funtion displays the selected contact from the contactlist next to it
 * 
 * @param {number} i - index of the selected contact in the contacts JSON 
 */
function showContactInfo(i) {
  document.getElementById('ContactsInfoContainer').classList.remove('dd-none');

  if (window.innerWidth < 750) {
    document.getElementById('leftDiv').classList.add('dd-none');
    document.getElementById('rightDiv').classList.remove('dd-none');
    document.getElementById('rightDiv').classList.add('rightDivRes');
  }

  setContactInfo(i);
  setEditDeleteDivDesktop(i);
}


/**
 * This funtion gets the values that are needes to display a selected conatct next to the conatctlist 
 * 
 * @param {number} i - index of the edited contact in the contacts JSON
 */
function setContactInfo(i) {
  let circle = document.getElementById('contactsCircle');
  let name = document.getElementById('contactsName');
  let mail = document.getElementById('contactsMail');
  let phone = document.getElementById('contactsPhone');

  circle.innerHTML = contactJSONBE[i].initials;
  circle.style.backgroundColor = contactJSONBE[i].bgColor;
  name.innerHTML = contactJSONBE[i].name;
  mail.innerHTML = contactJSONBE[i].email;
  if (contactJSONBE[i].phone == undefined) {
    phone.innerHTML = 'Please edit phone number';
  } else {
    phone.innerHTML = contactJSONBE[i].phone;
  }
}


/**
 * This function resets the HTML in the area where the selected contacts are displayed
 * 
 */
function resetContactInfo() {
  let circle = document.getElementById('contactsCircle');
  let name = document.getElementById('contactsName');
  let mail = document.getElementById('contactsMail');
  let phone = document.getElementById('contactsPhone');

  circle.innerHTML = '';
  circle.style.backgroundColor = 'transparent';
  name.innerHTML = '';
  mail.innerHTML = '';
  phone.innerHTML = '';
}


/**
 * This function assigns the contact that is going to be edited/deleted to the edit and delted buttons 
 * 
 * @param {number} i - index of the edited contact in the contacts JSON
 */
function setEditDeleteDivDesktop(i) {
  document.getElementById('editDelteContactDektop').innerHTML = editDelteContactDektop(i);

  document.getElementById('editDeletOverlay').innerHTML = editDeletOverlay(i);
}


/**
 * This function edits a selected contact 
 * 
 * @param {number} i - index of the edited contact in the contacts JSON
 */
function editContact(i) {
  openAddContactOverlay();
  setEditContactOverlay(i);
}


/**
 * This function sets the edit contact interface and fills the inputfileds and initialscircle with the infotmation of the contact that is gooing to be edited
 * 
 * @param {number} i - index of the edited contact in the contacts JSON
 */
function setEditContactOverlay(i) {
  editContactOverlayTemplate(i);

  getAddEditContactElements();

  overlayHeader.innerHTML = 'Edit Contact';
  overlayHeaderText.classList.add('dd-none');
  overlayCircle.innerHTML = contactJSONBE[i].initials;
  overlayCircle.style.backgroundColor = contactJSONBE[i].bgColor;

  inputName.value = contactJSONBE[i].name;
  inputMail.value = contactJSONBE[i].email;
  inputTel.value = contactJSONBE[i].phone;

  overlayButtonDiv.innerHTML = overlayEditButtonDiv(i);
  document.getElementById('overlayButtonDiv').classList.add('JCspacebetween');
}


/**
 * This function sets the add contact interface
 * 
 */
function setAddContactOVerlay() {
  addContactOverlayTemplate();

  getAddEditContactElements();

  overlayHeader.innerHTML = 'Add contact';
  overlayHeaderText.classList.remove('dd-none');
  overlayCircle.style.backgroundColor = '#d1d1d1';
  overlayCircle.innerHTML = '<img src="../assets/img/person_add_contact_overlay.svg">';

  inputName.value = '';
  inputMail.value = '';
  inputTel.value = '';

  overlayButtonDiv.innerHTML = overlayAddButtonDivTemplate();
}

/**
  * This funtion get the needed HTML elements for the add & edit contact overlays and returns them 
  * 
  */
function getAddEditContactElements() {
  return {
    overlayHeader: document.getElementById('overlayHeader'),
    overlayHeaderText: document.getElementById('overlayHeaderText'),
    overlayCircle: document.getElementById('overlayCircle'),
    inputName: document.getElementById('inputName'),
    inputMail: document.getElementById('inputMail'),
    inputTel: document.getElementById('inputTel'),
    overlayButtonDiv: document.getElementById('overlayButtonDiv')
  };
}

/**
 * This function deletes a contact from the contact JSON and renders the contactlist without the deleted contact 
 * 
 * @param {number} i - index of the edited contact in the contacts JSON
 */
async function deleteContact(i) {
  contactJSONBE.splice(i, 1);
  await setItem(KEY_for_JSON_CONTACS, contactJSONBE);
  hideContactInfoDektop();
  document.getElementById('contactsContainer').innerHTML = '';
  resetContactInfo();
  createContactList();

  if (window.innerWidth < 750) {
    hideContactInfo();
  }
}


/**
 * This function opens the add contact overlay
 * 
 */
function openAddContactOverlay() {
  document.getElementById('addContactMenu').classList.add('dd-none');
  document.getElementById('createContactOverlay').classList.remove('hide');
  document.getElementById('createContactOverlay').classList.add('show');
  setAddContactOVerlay();
}


/**
 * This function closes the add contact overlay 
 * 
 */
function closeAddContactOverlay() {
  document.getElementById("addContactForm").reset();
  document.getElementById('addContactMenu').classList.remove('dd-none');
  document.getElementById('createContactOverlay').classList.remove('show');
  document.getElementById('createContactOverlay').classList.add('hide');
}


/**
 * This function shows and hides the contact succesfully created overlay after 2 seconds
 * 
 */
function showAndHideContactAddedOverlay() {
  setTimeout(function () {
    showHideOverlay('show', 'hide', 'contactAddedOVerlay')
  }, 300);
  setTimeout(function () {
    showHideOverlay('hide', 'show', 'contactAddedOVerlay')
  }, 2000);
}

/**
 * This function shows and hides the overlays
 * 
 */
function showHideOverlay(x, y, z) {
  document.getElementById(z).classList.add(x);
  document.getElementById(z).classList.remove(y);
}