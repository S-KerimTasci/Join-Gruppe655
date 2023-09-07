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
  const contacts = contactJSONBE

  for (const letter of alphabet) {
    const filteredContacts = contacts
      .filter(contact => contact.name.toLowerCase().startsWith(letter))
      .sort((a, b) => a.name.localeCompare(b.name));

    if (filteredContacts.length > 0) {
      const html = `
                <div class="contact-letter">${letter.toUpperCase()}</div>
                <hr class="letter-line">
                <div class="contacts-list">
                    ${filteredContacts.map((contact, index) => {
        const contactIndex = contacts.indexOf(contact);
        return `
                            <div class="contact" onclick="showContactInfo(${contactIndex})">
                                <div class="circle" style="background-color: ${contact.bgColor};">${contact.initials}</div>
                                <div class="nameDiv">
                                    <span class="textcap">${contact.name}</span>
                                    <span class="colorLink"> ${contact.email}</span>
                                </div>
                            </div>
                        `;
      }).join('')}
                </div>
            `;
      contactsContainer.innerHTML += html;
    }
  }
}


/**
 * This funtion adds new contacts to the contacts JSON 
 * 
 */
async function addContact() {
  createButton.disabled = true
  loadContacts()
  getContactsValues();
  contactJSONBE.push(contactJSON1);
  await setItem(KEY_for_JSON_CONTACS, contactJSONBE);
  closeOvelayAfterNewContact()
  createButton.disabled = false
}


/**
 * This function renders the contactlist with new contacts, closes the overlay and displays the new contact
 * 
 */
function closeOvelayAfterNewContact() {
  displayNewContact()
  contactsContainer.innerHTML = ''
  createContactList()
  closeAddContactOverlay()
  showAndHideContactAddedOverlay()
}


/**
 * This function displays the newly added contact 
 * 
 */
function displayNewContact(){
  let display= contactJSONBE.length - 1;
  showContactInfo(display)
}


/**
 * This funtion adds the newly edited contact to the contacts JSON and renders teh contactlist
 * 
 * @param {number} i - index of the edited contact in the contacts JSON
 */
async function addContactViaEditOverlay(i){
  createButton.disabled = true
  getContactsValuesEditOVerlay(i);
  contactJSONBE.splice(i, 1);
  contactJSONBE.push(contactJSON1);
  await setItem(KEY_for_JSON_CONTACS, contactJSONBE);
  closeOvelayAfterNewContact()
  createButton.disabled = false
}


/**
 * This function gets the values from the overlay inputfields that are needed for editing a contact 
 * 
 * @param {number} i - index of the edited contact in the contacts JSON
 */
function getContactsValuesEditOVerlay(i){
  let name = document.getElementById('inputName').value
  let mail = document.getElementById('inputMail').value
  let phone = document.getElementById('inputTel').value
  let initial = name.split(' ').map(word => word.charAt(0).toUpperCase()).join('');
  let bgColor = contactJSONBE[i].bgColor  

  contactJSON1.email = mail
  contactJSON1.initials = initial
  contactJSON1.name = name
  contactJSON1.bgColor = bgColor
  contactJSON1.phone = phone
}


/**
 * This function gets the values from the overlay inputfields that are needed for adding a contact 
 * 
 */
function getContactsValues() {
  let name = document.getElementById('inputName').value
  let mail = document.getElementById('inputMail').value
  let phone = document.getElementById('inputTel').value
  let initial = name.split(' ').map(word => word.charAt(0).toUpperCase()).join('');
  let bgColor = setColor()

  contactJSON1.email = mail
  contactJSON1.initials = initial
  contactJSON1.name = name
  contactJSON1.bgColor = bgColor
  contactJSON1.phone = phone
}


/**
 * This funtion gives every new contact a color
 * 
 * @returns the color of the newly added contact 
 */
function setColor() {
  let i = contactJSONBE.length;
  let color = colors[i % colors.length];
  return color
}


/**
 * This function sets the responsive css for the contacts page 
 * 
 */
function hideContactInfo() {
  document.getElementById('leftDiv').classList.remove('dd-none')
  document.getElementById('rightDiv').classList.add('dd-none')
  document.getElementById('rightDiv').classList.remove('rightDivRes')
}


/**
 * This function sets the desctop view css fot the contacts page
 * 
 */
function hideContactInfoDektop() {
  document.getElementById('ContactsInfoContainer').classList.add('dd-none')
}


/**
 * This funtion displays the selected contact from the contactlist next to it
 * 
 * @param {number} i - index of the selected contact in the contacts JSON 
 */
function showContactInfo(i) {
  document.getElementById('ContactsInfoContainer').classList.remove('dd-none')

  if (window.innerWidth < 750) {
    document.getElementById('leftDiv').classList.add('dd-none')
    document.getElementById('rightDiv').classList.remove('dd-none')
    document.getElementById('rightDiv').classList.add('rightDivRes')
  }

  setContactInfo(i)
  setEditDeleteDivDesktop(i)
}


/**
 * This funtion gets the values that are needes to display a selected conatct next to the conatctlist 
 * 
 * @param {number} i - index of the edited contact in the contacts JSON
 */
function setContactInfo(i){
  let circle = document.getElementById('contactsCircle');
  let name = document.getElementById('contactsName');
  let mail = document.getElementById('contactsMail');
  let phone = document.getElementById('contactsPhone');

  circle.innerHTML = contactJSONBE[i].initials;
  circle.style.backgroundColor = contactJSONBE[i].bgColor;
  name.innerHTML = contactJSONBE[i].name;
  mail.innerHTML = contactJSONBE[i].email;
  phone.innerHTML = contactJSONBE[i].phone;
}


/**
 * This function resets the HTML in the area where the selected contacts are displayed
 * 
 */
function resetContactInfo(){
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
 * This function assigns the contact that is going to be edited/deleted to the edit and delte buttons 
 * 
 * @param {number} i - index of the edited contact in the contacts JSON
 */
function setEditDeleteDivDesktop(i) {
  document.getElementById('editDelteContactDektop').innerHTML = `
  <span onclick="editContact(${i})"><img src="../assets/img/edit_subtask.svg">Edit </span>
  <span onclick="deleteContact(${i})"><img src="../assets/img/delete_subtask.svg">Delete</span>
  `

  document.getElementById('editDeletOverlay').innerHTML = `
  <button onclick="editContact(${i})" class="editDeletOverlayButton"><img src="../assets/img/edit_subtask.svg"> Edit</button>
  <button onclick="deleteContact(${i})" class="editDeletOverlayButton"><img src="../assets/img/delete_subtask.svg">Delete</button>
  `
}


/**
 * This function edits a selected contact 
 * 
 * @param {number} i - index of the edited contact in the contacts JSON
 */
function editContact(i){
  openAddContactOverlay()
  setEditContactOVerlay(i)
}


/**
 * This function sets the edit contact interface and fills the inputfileds and initialscircle with the infotmation of the contact that is gooing to be edited
 * 
 * @param {number} i - index of the edited contact in the contacts JSON
 */
function setEditContactOVerlay(i){
  editContactOverlayTemplate(i)

  let overlayHeader = document.getElementById('overlayHeader')
  let overlayHeaderText = document.getElementById('overlayHeaderText')
  let overlayCircle = document.getElementById('overlayCircle')
 
  let inputName = document.getElementById('inputName')
  let inputMail = document.getElementById('inputMail')
  let inputTel = document.getElementById('inputTel')
 
  let overlayButtonDiv = document.getElementById('overlayButtonDiv')
   
  overlayHeader.innerHTML = 'Edit Contact';
  overlayHeaderText.classList.add('dd-none')
  overlayCircle.innerHTML = contactJSONBE[i].initials;
  overlayCircle.style.backgroundColor = contactJSONBE[i].bgColor;
 
  inputName.value = contactJSONBE[i].name;
  inputMail.value = contactJSONBE[i].email;
  inputTel.value = contactJSONBE[i].phone;
 
  overlayButtonDiv.innerHTML = `
     <button type="reset" onclick="deleteContact(${i})" id="cancelButton" class="cancelButton">Delete <img
     src="../assets/img/cancel_contactOverlay.svg"></button>
 
     <button id="createButton" class="createButton"><span>Save</span> <img
     src="../assets/img/check.svg"></button>`
}


/**
 * This function sets the add contact interface
 * 
 */
function setAddContactOVerlay(){
  addContactOverlayTemplate()

  let overlayHeader = document.getElementById('overlayHeader')
  let overlayHeaderText = document.getElementById('overlayHeaderText')
  let overlayCircle = document.getElementById('overlayCircle')
 
  let inputName = document.getElementById('inputName')
  let inputMail = document.getElementById('inputMail')
  let inputTel = document.getElementById('inputTel')
 
  let overlayButtonDiv = document.getElementById('overlayButtonDiv')
  
 
  overlayHeader.innerHTML = 'Add contact';
  overlayHeaderText.classList.remove('dd-none')
  overlayCircle.style.backgroundColor = '#d1d1d1';
  overlayCircle.innerHTML ='<img src="../assets/img/person_add_contact_overlay.svg">'
 
  inputName.value = '';
  inputMail.value = '';
  inputTel.value = '';
 
  overlayButtonDiv.innerHTML = `
      <button type="reset" onclick="closeAddContactOverlay()" id="cancelButton" class="cancelButton">Cancel <img
      src="../assets/img/cancel_contactOverlay.svg"></button>

      <button id="createButton" class="createButton"><span>Create contact</span> <img
      src="../assets/img/check.svg"></button>`
}


/**
 * This function deletes a contact from the contact JSON and renders the contactlist without the deleted contact 
 * 
 * @param {number} i - index of the edited contact in the contacts JSON
 */
async function deleteContact(i) {
  contactJSONBE.splice(i, 1)
  await setItem(KEY_for_JSON_CONTACS, contactJSONBE);
  hideContactInfoDektop(); 
  document.getElementById('contactsContainer').innerHTML = '';
  resetContactInfo()
  createContactList();

  if (window.innerWidth < 750) {
    hideContactInfo()
  }
}


/**
 * This function opens the add contact overlay
 * 
 */
function openAddContactOverlay() {
  document.getElementById('body').classList.add('noScroll');
  document.getElementById('addContactMenu').classList.add('dd-none');
  document.getElementById('createContactOverlay').classList.remove('hide'); // Entferne hide-Klasse
  document.getElementById('createContactOverlay').classList.add('show'); // Füge show-Klasse hinzu
  setAddContactOVerlay()
}


/**
 * This function closes the add contact overlay 
 * 
 */
function closeAddContactOverlay() {
  document.getElementById('body').classList.remove('noScroll');
  document.getElementById("addContactForm").reset();
  document.getElementById('addContactMenu').classList.remove('dd-none');
  document.getElementById('createContactOverlay').classList.remove('show');
  document.getElementById('createContactOverlay').classList.add('hide'); 
}


/**
 * This function shows the contact succesfully created overlay
 */
function showContactAddedOverlay(){
  document.getElementById('contactAddedOVerlay').classList.remove('hide')
  document.getElementById('contactAddedOVerlay').classList.add('show')
}

/**
 * This function hides the contact succesfully created overlay
 */
function hideContactAddedOverlay(){
  document.getElementById('contactAddedOVerlay').classList.add('hide')
  document.getElementById('contactAddedOVerlay').classList.remove('show')
}


/**
 * This function shows and hides the contact succesfully created overlay after 2 seconds
 * 
 */
function showAndHideContactAddedOverlay(){
  setTimeout(function () {
    showContactAddedOverlay()
  }, 300);
  setTimeout(function () {
    hideContactAddedOverlay(); // Verstecke das Overlay nach 2 Sekunden
  }, 2000);
}

/**
 * This function shows the edit and delete buttons in responsive view
 * 
 */
function showEditDeletOverlay() {
  document.getElementById('editDeletOverlay').classList.add('show')
  document.getElementById('editDeletOverlay').classList.remove('hide')
}


/**
 * This function hides the edit and delete buttons in responsive view
 * 
 */
function hideEditDeletOverlay() {
  document.getElementById('editDeletOverlay').classList.add('hide')
  document.getElementById('editDeletOverlay').classList.remove('show')
}


/**
 * This functions returns the HTML template for the edit contact overlay
 * 
 * @param {number} i - index of the edited contact in the contacts JSON
 * @returns  HTML template for the edit contact overlay
 */
function editContactOverlayTemplate(i){
  let form = document.getElementById("contactsFooterOverlay").innerHTML =`
  <form id="addContactForm" class="inputArea" onsubmit="addContactViaEditOverlay(${i});return false">
                        <input id="inputName" class="inputName" type="text" placeholder="Name" required pattern="^(\\w+\\s\\w+)$" title="Surname Name">
                        <input id="inputMail" class="inputMail" type="email" placeholder="Email" required>
                        <input id="inputTel" class="inputTel" type="tel" placeholder="Phone" required>
                        <div id="overlayButtonDiv" class="buttonDiv">
                            <button type="reset" onclick="closeAddContactOverlay()" id="cancelButton" class="cancelButton">Cancel <img
                                    src="../assets/img/cancel_contactOverlay.svg"></button>
                            <button id="createButton" class="createButton"><span>Create contact</span> <img
                                    src="../assets/img/check.svg"></button>
                        </div>
                    </form>

                    <img onclick="closeAddContactOverlay()" class="closeResponsive"
                        src="../assets/img/cancel_contactOverlay.svg">
  `;
  return form;
}


/**
 * This functions returns the HTML template for the add contact overlay
 * 
 * @returns the HTML template for the add contact overlay
 */
function addContactOverlayTemplate(){
  let form = document.getElementById("contactsFooterOverlay").innerHTML =`
  <form id="addContactForm" class="inputArea" onsubmit="addContact();return false">
  <input id="inputName" class="inputName" type="text" placeholder="Name" required pattern="^(\\w+\\s\\w+)$" title="Surname Name">
  <input id="inputMail" class="inputMail" type="email" placeholder="Email" required>
  <input id="inputTel" class="inputTel" type="tel" placeholder="Phone" required>
  <div id="overlayButtonDiv" class="buttonDiv">
      <button type="reset" onclick="closeAddContactOverlay()" id="cancelButton" class="cancelButton">Cancel <img
              src="../assets/img/cancel_contactOverlay.svg"></button>
      <button id="createButton" class="createButton"><span>Create contact</span> <img
              src="../assets/img/check.svg"></button>
  </div>
</form>

<img onclick="closeAddContactOverlay()" class="closeResponsive"
  src="../assets/img/cancel_contactOverlay.svg">
  `;
  return form;
}