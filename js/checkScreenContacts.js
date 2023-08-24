/*
const c_mql = window.matchMedia("(max-width: 750px)");

let buttonDiv = document.getElementById('addButtonDiv');
let headerDiv = document.getElementById('headerContacts');
let cont_Container = document.getElementById('contactsContainer');

let windowHeight = window.innerHeight; // Nutze window.innerHeight, um die Fensterhöhe zu erhalten

let buttonHeight = buttonDiv.clientHeight; // Verwende clientHeight, um die tatsächliche Höhe des Elements zu erhalten
let headerHeight = headerDiv.clientHeight;



c_mql.onchange = (e) => {
  if (e.matches) {
    
    setHeightContactlist()
  } 
}


function setHeightContactlist() {
if (c_mql) {
  let height = windowHeight - buttonHeight - 96;
  cont_Container.style.height = height + 'px'; // Setze die Höhe mit 'px' am Ende
} else{
  let height = windowHeight - headerHeight;

  cont_Container.style.height = height + 'px'; // Setze die Höhe mit 'px' am Ende
}
}
  



*/