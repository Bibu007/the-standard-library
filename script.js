const add = document.querySelector(".add");
const dialog = document.querySelector(".add-book-dialog");
const closeBtn = document.querySelector("#close");
const removeBtn = document.querySelector('#remove');

class Book{
    constructor(title, author, pages){
        this.id = crypto.randomUUID();
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = "Unread";
    }

    readBook(event){
        if(event.target.textContent == "Read"){
            event.target.textContent ="Unread";
        }
        else if(event.target.textContent == "Unread"){
            event.target.textContent = "Read";
        }
    }
    
}

class BookList{
    constructor(){
        this.books = [];
        this.bookMap = {};
    }

    addNewBookTolibrary(title, author, pages){
    const b = new Book(title, author, pages);
    this.books.push(b);
    this.bookMap[b.id] = this.books.length - 1;
    }

    displayBooks(){
        tableBody.replaceChildren();
        for(let i = 0; i < this.books.length; i++){
            const rowTemplate = `<tr>
                    <td>${this.books[i].title}</td>
                    <td>${this.books[i].author}</td>
                    <td>${this.books[i].pages}</td>
                    <td><button class="table-btn read-btn" id="read">${this.books[i].read}</button></td>
                    <td><button class="table-btn remove-btn" id="remove" data-id="${this.books[i].id}">Remove</button></td>
                    </tr>`;
            tableBody.insertAdjacentHTML("beforeend", rowTemplate);
        }
    }

    removeBook(event){
        let bookIndex = this.bookMap[event.target.dataset.id];
        this.books.splice(bookIndex, 1);
        this.displayBooks();
    }

}

const l = new BookList();

l.addNewBookTolibrary("Titan", "Ron Chernov", "723");
l.addNewBookTolibrary("Rework", "Jason Fried", "356");
l.addNewBookTolibrary("Mossad", "Michal Bar Zohar", "567");
l.addNewBookTolibrary("Elon Musk", "Walter Issacson", "844");
l.addNewBookTolibrary("Nexus", "Yuval Noah Harari", "531");
l.addNewBookTolibrary("Sapiens", "Yuval Noah Harari", "724");
l.addNewBookTolibrary("Siddartha", "Herman Hesse", "221");
l.addNewBookTolibrary("Fountainhead", "Ayn Rand", "789");
l.addNewBookTolibrary("Metamorphosis", "Franz Kafka", "153");
l.addNewBookTolibrary("Deep work", "Cal Newport", "312");

console.log(l.books);

const tableBody = document.querySelector(".books-table");
/*
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
*/

l.displayBooks();

/*
function addNewBookTolibrary(title, author, pages){
    const b = new Book(title, author, pages);
    books.push(b);
}
*/

/*
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
*/
//removeBtn.addEventListener('click', (event) => removeBook(event));

tableBody.addEventListener('click', (event) => {
  // Check if the clicked element is actually the remove button
  if (event.target.classList.contains('remove-btn')) {
    l.removeBook(event);
  }

});


tableBody.addEventListener('click', (event) => {
  // Check if the clicked element is actually the remove button
  if (event.target.classList.contains('read-btn')) {
    readBook(event);
  }
});

const myForm = document.getElementById("add-new");
const formData = myForm.addEventListener('submit', (event) => {
  event.preventDefault(); // Prevent standard page reload

  const formData = new FormData(myForm);
  const formObject = Object.fromEntries(formData.entries());

  console.log(formObject); 
  // Output: { username: "JohnDoe", email: "john@example.com" }

  l.addNewBookTolibrary(formObject.title, formObject.author, formObject.pages);

  l.displayBooks();
  

  

  dialog.close();
  myForm.reset();
});



add.addEventListener('click', () => {dialog.showModal();});
closeBtn.addEventListener('click', () => dialog.close());


