const contacts = ['Anna Adalbert','Adalbert Annason', 'Berta Github', 'Dora Dorado','Aaron Knoblauch', 'Eva Müller', 'Frieda Maurer', 'Greta Schuster', 'Hannah Arndt', 'Ida Tenya', 'Klara Münz'];
const mails = ['anna@example.com', 'adalbert@example.com', 'berta@example.com', 'dora@example.com', 'aaron@example.com', 'eva@example.com', 'frieda@example.com', 'greta@example.com', 'hannah@example.com', 'ida@example.com', 'klara@example.com'];
const colors =['#FF7A00', '#FF5EB3','#6E52FF','#9327FF','#00BEE8','#1FD7C1','#FF745E','#FFA35E','#FC71FF','#FFC701','#0038FF','#C3FF2B','#FFE62B','#FF4646','#FFBB2B'];

const contactsJSON1 = [];

  const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
  const contactsContainer = document.getElementById('contactsContainer');


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
  
  function createContactList(contacts) {
    for (const letter of alphabet) {
      const filteredContacts = Object.values(contacts)
        .filter(contact => contact.usrName.toLowerCase().startsWith(letter))
        .sort((a, b) => a.usrName.localeCompare(b.usrName));
  
      if (filteredContacts.length > 0) {
        const html = `
          <div class="contact-letter">${letter.toUpperCase()}</div>
          <hr class="letter-line">
          <div class="contacts-list">
            ${filteredContacts.map(contact => {
              return `
                <div class="contact">
                  <div class="circle" style="background-color: ${contact.bgColor};">${contact.initials}</div>
                    <div class="nameDiv">
                        ${contact.usrName}
                        <a class="colorLink" href="mailto:${contact.usrMail}">${contact.usrMail}</a> <!-- Änderung: Verweis auf usrMail -->
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
  




/*
  function fillContactsJSON1() {
    for (let i = 0; i < contacts.length; i++) {
      const name = contacts[i];
      const bgColor = colors[i % colors.length];
      const initials = name.split(' ').map(word => word.charAt(0).toUpperCase()).join('');
      
      const contactInfo = {
        name: name,
        bgColor: bgColor,
        initials: initials
      };
      
      contactsJSON1.push(contactInfo);
    }
  }
  
  fillContactsJSON1();
  createContactList(contactsJSON1);
  
  function createContactList(contacts) {
    for (const letter of alphabet) {
      const filteredContacts = contacts
        .filter(contact => contact.name.toLowerCase().startsWith(letter))
        .sort((a, b) => a.name.localeCompare(b.name));
      
      if (filteredContacts.length > 0) {
        const html = `
          <div class="contact-letter">${letter.toUpperCase()}</div>
          <hr class="letter-line">
          <div class="contacts-list">
            ${filteredContacts.map(contact => {
              return `
                <div class="contact">
                  <div class="circle" style="background-color: ${contact.bgColor};">${contact.initials}</div>
                  ${contact.name}
                </div>
              `;
            }).join('')}
          </div>
        `;
        
        contactsContainer.innerHTML += html;
      }
    }
  }

/*
  function createContactList(contacts, colors) {
    for (const letter of alphabet) {
      const filteredContacts = contacts
        .filter(contact => contact.toLowerCase().startsWith(letter))
        .sort();
      
      if (filteredContacts.length > 0) {
        const html = `
          <div class="contact-letter">${letter.toUpperCase()}</div>
          <hr class="letter-line">
          <div class="contacts-list">
            ${filteredContacts.map((contact, index) => {
              const initials = contact.split(' ').map(word => word.charAt(0).toUpperCase()).join('');
              const color = colors[index % colors.length]; // Zufällige Farbauswahl aus dem colors-Array
              return `
                <div class="contact">
                  <div class="circle" style="background-color: ${color};">${initials}</div>
                  ${contact}
                </div>
              `;
            }).join('')}
          </div>
        `;
        
        contactsContainer.innerHTML += html;
      }
    }
  }
  
  createContactList(contacts, colors);
  

 
  function createContactList(contacts) {
    for (const letter of alphabet) {
        const filteredContacts = contacts
          .filter(contact => contact.toLowerCase().startsWith(letter))
          .sort(); // Hier wird das Array alphabetisch sortiert
      
      if (filteredContacts.length > 0) {
        const html = `
          <div class="contact-letter">${letter.toUpperCase()}</div>
          <hr class="letter-line">
          <div class="contacts-list">
            ${filteredContacts.map(contact => `<div class="contact">${contact}</div>`).join('')}
          </div>
        `;
        
        contactsContainer.innerHTML += html;
      }
    }
  }
  
  createContactList(contacts);
  

 
  function createContactList(contacts) {
    for (const letter of alphabet) {
      const filteredContacts = contacts.filter(contact => contact.toLowerCase().startsWith(letter));
      
      if (filteredContacts.length > 0) {
        const letterDiv = document.createElement('div');
        letterDiv.className = 'contact-letter';
        letterDiv.textContent = letter.toUpperCase();
        
        const line = document.createElement('hr');
        line.className = 'letter-line';
        
        const contactsList = document.createElement('div');
        contactsList.className = 'contacts-list';
        
        filteredContacts.forEach(contact => {
          const contactDiv = document.createElement('div');
          contactDiv.className = 'contact';
          contactDiv.textContent = contact;
          contactsList.appendChild(contactDiv);
        });
        
        contactsContainer.appendChild(letterDiv);
        contactsContainer.appendChild(line);
        contactsContainer.appendChild(contactsList);
      }
    }
  }
  
  createContactList(contacts);
  */