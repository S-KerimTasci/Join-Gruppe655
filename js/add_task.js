let allTasks =[];
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

function setPrio(x){
    currentPrio = '';
    currentPrio = x;
    console.log(currentPrio)
}


function highlight(x){
    document.getElementById(x).classList.add(x)
    document.getElementById(x+'IMG').src = `../assets/img/prio_${x}_white.svg`
}

function removeHighlight(x){
    document.getElementById(x).classList.remove(x)
    document.getElementById(x+'IMG').src = `../assets/img/prio_${x}.svg`
}