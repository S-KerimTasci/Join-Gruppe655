let allTasks =[];
let allContacts =['Emmanuel Mauer', 'Marcel Bauer']
let currentPrio;

function createTask(){
    let title = document.getElementById('inputTitle').value
    let description = document.getElementById('inputDescription').value
    let dueDate = document.getElementById('inputDueDate').value
    let category = document.getElementById('inputCategory').value
    let priority = currentPrio
    let priorityIMG = `../assets/img/prio_${currentPrio}.svg`

    let task={
        'title':title,
        'description':description,
        'dueDate':dueDate,
        'category':category,
        'priority':priority,
        'priorityIMG':priorityIMG
    }

    allTasks.push(task);

    let allTasksAsString = JSON.stringify(allTasks);
    localStorage.setItem('allTasks', allTasksAsString);
}  

function loadAllTasks(){
    let allTasksAsString = localStorage.getItem('allTasks');
    allTasks = JSON.parse(allTasksAsString)

    for (let i = 0; i < allTasks.length; i++) {
        const element = allTasks[i];


    document.getElementById('overlayCategory').innerHTML= allTasks[i].category;
    document.getElementById('overlayTitle').innerHTML= allTasks[i].title;
    document.getElementById('overlayDescription').innerHTML= allTasks[i].description;
    document.getElementById('overlayDueDate').innerHTML= allTasks[i].dueDate;
    document.getElementById('overlayPrio').innerHTML= allTasks[i].priority;
    document.getElementById('overlayPrioIMG').src = allTasks[i].priorityIMG;    
    }
}

function loadContacts(){
    for (let i = 0; i < allContacts.length; i++) {
        const contact = allContacts[i];

        document.getElementById('inputAssignedTo').innerHTML += `<option>${contact}</option>`
    }
    
}


function highlight(x){
    removeHighlight()
    setPrio(x)

    document.getElementById(x).classList.add(x)
    document.getElementById(x+'IMG').src = `../assets/img/prio_${x}_white.svg`
}

function setPrio(x){
    currentPrio = x;
    console.log(currentPrio)
}

function removeHighlight(){
    currentPrio = '';

    document.getElementById('urgent').classList.remove('urgent')
    document.getElementById('urgentIMG').src = `../assets/img/prio_urgent.svg`

    document.getElementById('medium').classList.remove('medium')
    document.getElementById('mediumIMG').src = `../assets/img/prio_medium.svg`

    document.getElementById('low').classList.remove('low')
    document.getElementById('lowIMG').src = `../assets/img/prio_low.svg`
}

