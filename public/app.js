
//create a div

const dbDiv = document.querySelector('main')
//appending to the div with our data
fetch('/todo')
    .then(res => res.json())
    .then(data => data.forEach(todo => {
        const item = document.createElement('p')
        item.innerText = `Task: ${todo.title}, Date: ${todo.date}, Details: ${todo.details}`;
        dbDiv.appendChild(item);
    }));

//grabbing the values from the html form
const titleInput = document.querySelector('input[name="title"]');
const dateInput = document.querySelector('input[name="date"]');
const detailsInput = document.querySelector('input[name="details"]');
const createButton = document.querySelector("button#create-item");
//grabbing the values from the update form 
const titleUpdate = document.querySelector('input[name="updatetitle"]');
const dateUpdate = document.querySelector('input[name="updatedate"]');
const detailsUpdate = document.querySelector('input[name="updatedetails"]');
const updateButton = document.querySelector("button#update-item");

//grabbing the values from the delete form
const titleDelete = document.querySelector('input[name="deletetitle"]');
const deleteButton = document.querySelector("button#delete-item");



//Add task to database
function addTask() {
    // const title = titleInput.value; 
    // const date = dateInput.value;
    // const details = detailsInput.value;

    let created = {
        title: titleInput.value,
        date: dateInput.value,
        details: detailsInput.value
    }

    fetch('/todo', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(created)
    })
        .then(res => res.json())
        .then(data => console.log(data));


    location.reload()
}


//update a task by name

function updateTask() {

    let updated = {
        title: titleUpdate.value,
        date: dateUpdate.value,
        details: detailsUpdate.value
    }

    fetch('/todo', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updated)
    })
        .then(res => res.json())
        .then(data => console.log(data));


    location.reload()
}

//deleting a task
function deleteTask() {
    console.log("here I am")
    let deleted = {
        title: titleDelete.value
    }

    fetch('/todo', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(deleted)
    })
        .then(res => res.json())
        .then(data => console.log(data));


    location.reload()
}

//Event Listener on Form Button NOTE: if we have this on the index file, we cannot have it here. 
// createButton.addEventListener('click', () => {
//     addTask();
// })