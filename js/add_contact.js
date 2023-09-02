const contacts = ['Anna Adalbert', 'Adalbert Annason', 'Berta Github', 'Dora Dorado', 'Aaron Knoblauch', 'Eva Müller', 'Frieda Maurer', 'Greta Schuster', 'Hannah Arndt', 'Ida Tenya', 'Klara Münz'];
const mails = ['anna@example.com', 'adalbert@example.com', 'berta@example.com', 'dora@example.com', 'aaron@example.com', 'eva@example.com', 'frieda@example.com', 'greta@example.com', 'hannah@example.com', 'ida@example.com', 'klara@example.com'];
const colors = ['#FF7A00', '#FF5EB3', '#6E52FF', '#9327FF', '#00BEE8', '#1FD7C1', '#FF745E', '#FFA35E', '#FC71FF', '#FFC701', '#0038FF', '#C3FF2B', '#FFE62B', '#FF4646', '#FFBB2B'];

//const contactsJSON1 = [];

let contactJSON1 = {
  "email" :"",
  "initials" : "",
  "name" : "",
  "bgColor" : "",
  "phone" : ""
}

let contactJSONBE = [];

const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
const contactsContainer = document.getElementById('contactsContainer');


async function loadContacts() {
  contactJSONBE = await loadJSON(KEY_for_JSON_CONTACS);
  let serverAnswer = await getItem(KEY_for_JSON_CONTACS);
  return JSON.parse(serverAnswer.data.value);
}

async function addContact() {
  loadContacts()
  getContactsValues();
  contactJSONBE.push(contactJSON1);
  await setItem(KEY_for_JSON_CONTACS, contactJSONBE);

  document.getElementById("addContactForm").reset();
  createContactList()
}

function getContactsValues() {
  let name = document.getElementById('inputName').value
  let mail = document.getElementById('inputMail').value
  let phone = document.getElementById('inputTel').value
  let bgColor = setColor()
  let initial = name.split(' ').map(word => word.charAt(0).toUpperCase()).join('');

  /*
  contactJSON1.push({
    email : mail,
    initials : initial,
    name : name,
    bgColor : bgColor,
    phone : phone,
  })*/

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
  const contacts = await loadContacts();

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
                                    <a class="colorLink" href="mailto:${contact.email}">${contact.email}</a>
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

function showContactInfo(i) {
  document.getElementById('ContactsInfoContainer').classList.remove('dd-none')


  if (window.innerWidth < 750) {
    document.getElementById('leftDiv').classList.add('dd-none')
    document.getElementById('rightDiv').classList.remove('dd-none')
    document.getElementById('rightDiv').classList.add('rightDivRes')
  }


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

/*
function fillContactsJSON1() {
  for (let i = 0; i < contacts.length; i++) {
    const name = contacts[i];
    const email = mails[i];
    const bgColor = colors[i % colors.length];
    const initials = name.split(' ').map(word => word.charAt(0).toUpperCase()).join('');
 
    contactsJSON1[email] = {
      usrMail: email,
      usrName: name,
      bgColor: bgColor,
      initials: initials
    };
  }
}
 
fillContactsJSON1(); 
createContactList(contactsJSON1);
*/




/*
  function createContactList(contacts) {
    loadContacts() 

    for (const letter of alphabet) {
      const filteredContacts = Object.values(contacts)
        .filter(contact => contact.name.toLowerCase().startsWith(letter))
        .sort((a, b) => a.usrName.localeCompare(b.name));
  
      if (filteredContacts.length > 0) {
        for (let i = 0; i < contacts.length; i++) {
          const contact = contacts[i];
          
        
        const html = `
          <div class="contact-letter">${letter.toUpperCase()}</div>
          <hr class="letter-line">
          <div class="contacts-list">
            ${filteredContacts.map(contact => {
              return `
                <div class="contact">
                  <div class="circle" style="background-color: ${contact.bgColor};">${contact.initials}</div>
                    <div class="nameDiv">
                        ${contact.name}
                        <a class="colorLink" href="mailto:${contact.email}">${contact.email}</a> <!-- Änderung: Verweis auf usrMail -->
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
  }
  */

/*
  function setHeightContactlist(){
    let buttonDiv = document.getElementById('addButtonDiv');
    let headerDiv = document.getElementById('headerContacts');
    let contactsContainer = document.getElementById('contactsContainer');
    
    let windowHeight = window.innerHeight; // Nutze window.innerHeight, um die Fensterhöhe zu erhalten
    
    let buttonHeight = buttonDiv.clientHeight; // Verwende clientHeight, um die tatsächliche Höhe des Elements zu erhalten
    let headerHeight = headerDiv.clientHeight;
    
    let height = windowHeight - buttonHeight - headerHeight;
    
    contactsContainer.style.height = height + 'px'; // Setze die Höhe mit 'px' am Ende
  }
  
  // Rufe die Funktion auf, um die Höhe beim Laden der Seite festzulegen
  setHeightContactlist();
  
  // Führe die Funktion erneut aus, wenn sich die Fenstergröße ändert
  window.addEventListener('resize', setHeightContactlist);
 */

function openAddContactOverlay() {
  document.getElementById('addContactMenu').classList.add('dd-none');
  document.getElementById('createContactOverlay').classList.remove('hide'); // Entferne hide-Klasse
  document.getElementById('createContactOverlay').classList.add('show'); // Füge show-Klasse hinzu
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

/*  
function openAddContactOverlay(){
    document.getElementById('addContactMenu').classList.add('dd-none')
    document.getElementById('createContactOverlay').classList.remove('dd-none')
}

function closeAddContactOverlay(){
    document.getElementById('addContactMenu').classList.remove('dd-none')
    document.getElementById('createContactOverlay').classList.add('dd-none')
}
*/