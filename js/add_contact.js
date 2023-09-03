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


async function loadContacts() {
  contactJSONBE = await loadJSON(KEY_for_JSON_CONTACS);
}


async function addContact() {
  createButton.disabled = true
  loadContacts()
  getContactsValues();
  contactJSONBE.push(contactJSON1);
  await setItem(KEY_for_JSON_CONTACS, contactJSONBE);
  closeOvelayAfterNewContact()
}

function closeOvelayAfterNewContact() {
  createContactList()
  createButton.disabled = false
  closeAddContactOverlay()
}

function getContactsValues() {
  let name = document.getElementById('inputName').value
  let mail = document.getElementById('inputMail').value
  let phone = document.getElementById('inputTel').value
  let bgColor = setColor()
  let initial = name.split(' ').map(word => word.charAt(0).toUpperCase()).join('');

  contactJSON1.email = mail
  contactJSON1.initials = initial
  contactJSON1.name = name
  contactJSON1.bgColor = bgColor
  contactJSON1.phone = phone
}


function setColor() {
  let i = contactJSONBE.length;
  let color = colors[i % colors.length];
  return color
}

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
        const contactIndex = contacts.indexOf(contact); // Finde den Index des Kontakts im contacts-Array
        return `
                            <div class="contact" onclick="showContactInfo(${contactIndex})">
                                <div class="circle" style="background-color: ${contact.bgColor};">${contact.initials}</div>
                                <div class="nameDiv">
                                    ${contact.name}
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


function hideContactInfo() {
  document.getElementById('leftDiv').classList.remove('dd-none')
  document.getElementById('rightDiv').classList.add('dd-none')
  document.getElementById('rightDiv').classList.remove('rightDivRes')
}
function hideContactInfoDektop() {
  document.getElementById('ContactsInfoContainer').classList.add('dd-none')
}

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


function editContact(i){
  openAddContactOverlay()
  setEditContactOVerlay(i)
}


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


function openAddContactOverlay() {
  document.getElementById('addContactMenu').classList.add('dd-none');
  document.getElementById('createContactOverlay').classList.remove('hide'); // Entferne hide-Klasse
  document.getElementById('createContactOverlay').classList.add('show'); // Füge show-Klasse hinzu
  setAddContactOVerlay()
}

function closeAddContactOverlay() {
  document.getElementById("addContactForm").reset();
  document.getElementById('addContactMenu').classList.remove('dd-none');
  document.getElementById('createContactOverlay').classList.remove('show'); // Entferne show-Klasse
  document.getElementById('createContactOverlay').classList.add('hide'); // Füge hide-Klasse hinzu
}


function showEditDeletOverlay() {
  document.getElementById('editDeletOverlay').classList.add('show')
  document.getElementById('editDeletOverlay').classList.remove('hide')
}

function hideEditDeletOverlay() {
  document.getElementById('editDeletOverlay').classList.add('hide')
  document.getElementById('editDeletOverlay').classList.remove('show')
}

function editContactOverlayTemplate(i){
  let form = document.getElementById("contactsFooterOverlay").innerHTML =`
  <form id="addContactForm" class="inputArea" onsubmit="addContactViaEditOverlay(${i});return false">
                        <input id="inputName" class="inputName" type="text" placeholder="Name" required>
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

function addContactOverlayTemplate(){
  let form = document.getElementById("contactsFooterOverlay").innerHTML =`
  <form id="addContactForm" class="inputArea" onsubmit="addContact();return false">
  <input id="inputName" class="inputName" type="text" placeholder="Name" required>
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