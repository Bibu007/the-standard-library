const add = document.querySelector(".add");
const dialog = document.querySelector(".add-book-dialog");
const closeBtn = document.querySelector("#close");
const removeBtn = document.querySelector('#remove');
const books = new Array();

const myForm = document.getElementById("add-new");
const formData = myForm.addEventListener('submit', (event) => {
  event.preventDefault(); // Prevent standard page reload

  const formData = new FormData(myForm);
  const formObject = Object.fromEntries(formData.entries());

  console.log(formObject); 
  // Output: { username: "JohnDoe", email: "john@example.com" }

  addNewBookTolibrary(formObject.title, formObject.author, formObject.pages);

  displayBooks();
  

  

  dialog.close();
  myForm.reset();
});



add.addEventListener('click', () => {dialog.showModal();});
closeBtn.addEventListener('click', () => dialog.close());

function Book(title, author, pages){
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = "Unread";
}

const b1 = new Book("Titan", "Ron Chernov", "723");
books.push(b1);
const b2 = new Book("Rework", "Jason Fried", "356");
books.push(b2);
const b3 = new Book("Mossad", "Michal Bar Zohar", "567");
books.push(b3);
const b4 = new Book("Elon Musk", "Walter Issacson", "844");
books.push(b4);
const b5 = new Book("Nexus", "Yuval Noah Harari", "531");
books.push(b5);
const b6 = new Book("Sapiens", "Yuval Noah Harari", "724");
books.push(b6);
const b7 = new Book("Siddartha", "Herman Hesse", "221");
books.push(b7);
const b8 = new Book("Fountainhead", "Ayn Rand", "789");
books.push(b8);
const b9 = new Book("Metamorphosis", "Franz Kafka", "1853");
books.push(b9);
const b10 = new Book("Deep work", "Cal Newport", "312");
books.push(b10);

let bookMap = {};

for(let i = 0; i < books.length; i++){
bookMap[books[i].id] = i;
}


const tableBody = document.querySelector(".books-table");

function displayBooks(){
    tableBody.replaceChildren();
    for(let i = 0; i < books.length; i++){
        const rowTemplate = `<tr>
                        <td>${books[i].title}</td>
                        <td>${books[i].author}</td>
                        <td>${books[i].pages}</td>
                        <td><button class="table-btn read-btn" id="read">${books[i].read}</button></td>
                        <td><button class="table-btn remove-btn" id="remove" data-id="${books[i].id}">Remove</button></td>
                        </tr>`;

        tableBody.insertAdjacentHTML("beforeend", rowTemplate);
    }
}

displayBooks();

function addNewBookTolibrary(title, author, pages){
    const b = new Book(title, author, pages);
    books.push(b);
}

function removeBook(event){
    let bookIndex = bookMap[event.target.dataset.id];
    books.splice(bookIndex, 1);
    displayBooks();
}

function readBook(event){
    if(event.target.textContent == "Read"){
        event.target.textContent ="Unread";
    }
    else if(event.target.textContent == "Unread"){
        event.target.textContent = "Read";
    }
}

//removeBtn.addEventListener('click', (event) => removeBook(event));

tableBody.addEventListener('click', (event) => {
  // Check if the clicked element is actually the remove button
  if (event.target.classList.contains('remove-btn')) {
    removeBook(event);
  }

});


tableBody.addEventListener('click', (event) => {
  // Check if the clicked element is actually the remove button
  if (event.target.classList.contains('read-btn')) {
    readBook(event);
  }
});
