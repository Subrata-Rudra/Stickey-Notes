const addButton = document.querySelector('#add');

const updateLocalStorageData = () => {
    const textAreaData = document.querySelectorAll('textarea');  //Here we will get all the notes in the textAreaData array.
    const notes = [];  //This is also an array, created for storing all the notes in the localStorage.
    // console.log(textAreaData); //This code is written just to test whiile coding
    textAreaData.forEach((note) => {
        return notes.push(note.value);
    });
    // console.log(notes);  //This code is written just to test whiile coding

    localStorage.setItem('notes', JSON.stringify(notes));
};

const addNewNote = (text = '') => {
    const note = document.createElement('div');
    note.classList.add('note');

    const htmlData = 
    `<div class="operation">
    <button class="edit">Edit</button>
    <button class="delete">Delete</button>
    </div>
    <div class="main ${text ? "" : "hidden"}"></div>
    <textarea class="${text ? "hidden" : ""}"></textarea>`;

    note.insertAdjacentHTML('afterbegin', htmlData);
    
    //Getting the references
    const editButton = note.querySelector('.edit');
    const deletetButton = note.querySelector('.delete');
    const mainDiv = note.querySelector('.main');
    const textArea = note.querySelector('textarea');

    //Deleting the node
    deletetButton.addEventListener('click', () => {
        note.remove(); //remove() is an in-built JavaScript function, it removes any element
        updateLocalStorageData();  //Here we are calling this function te get an updated condition of the current DOM, so that if any note is deleted this function will take an update of that, and then it will update the localStorage accoring to this. By doing this we can delete the notes from the localStorage also.
    });

    //Toggle using edit button
    textArea.value = text;
    mainDiv.innerHTML = text;
    

    editButton.addEventListener('click', () => {
        mainDiv.classList.toggle('hidden');
        textArea.classList.toggle('hidden');
    });

    textArea.addEventListener('change', (event) => {
        const value = event.target.value;
        mainDiv.innerHTML = value;

        updateLocalStorageData();
    });

    document.body.appendChild(note)  //It appends(adds) a node as the last child of a node
}

//Getting(showing) data from local storage
const notes = JSON.parse(localStorage.getItem('notes'))

if(notes){
    notes.forEach((note) => addNewNote(note))
}


addButton.addEventListener('click', () => addNewNote());