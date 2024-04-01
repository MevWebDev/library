let myLibrary = [];

const book1 = new Book("The Lord of the Rings", "Tolkiem", 231, false);
const book2 = new Book("One Piece", "Eiichiro Oda", 1200, true);
myLibrary.push(book1);
myLibrary.push(book2);
const titleForm = document.querySelector("#title");
const authorForm = document.querySelector("#author");
const pagesForm = document.querySelector("#pages");
const readForm = document.querySelector("#read");

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.toggleRead = function () {
    this.read = !this.read;
  };
}
function addBookToLibrary(event) {
  event.preventDefault();
  const title = titleForm.value;
  const author = authorForm.value;
  const pages = pagesForm.value;
  if (!titleForm.value || !authorForm.value || !pagesForm.value) {
    return;
  }
  const isRead = readForm.checked;
  const book = new Book(title, author, pages, isRead);
  myLibrary.push(book);
  showBooks();
}

const submitButton = document.querySelector("#submitButton");
submitButton.addEventListener("click", addBookToLibrary);

const books = document.querySelector("#book-container");
function showBooks() {
  books.innerHTML = "";
  myLibrary.forEach((book) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
      <p>${book.title}</p>
      <p>${book.author}</p>
      <p>${book.pages}</p>
      <p id="read" style="background-color: ${
        book.read ? "green" : "red"
      }; color: white;">${book.read}</p>
      <button id="deleteButton">delete</button>
    `;

    const read = card.querySelector("#read");
    read.addEventListener("click", () => {
      book.toggleRead();
      showBooks();
    });
    const deleteButton = card.querySelector("#deleteButton");
    deleteButton.addEventListener("click", () => {
      const index = myLibrary.indexOf(book);
      if (index > -1) {
        myLibrary = myLibrary.filter((_, i) => i !== index);
      }
      showBooks();
    });
    books.append(card);
  });
}
function openPopup() {
  const popup = document.querySelector("#popup");
  const backdrop = document.querySelector("#backdrop");
  popup.classList.add("open-popup");
  backdrop.style.display = "block";
  backdrop.classList.add("blur");
}

function closePopup() {
  const popup = document.querySelector("#popup");
  const backdrop = document.querySelector("#backdrop");
  popup.classList.remove("open-popup");
  backdrop.style.display = "none";
  backdrop.classList.remove("blur");
}
function sortBooks() {
  myLibrary.sort(sortByTitle);
  showBooks();
}
function sortByTitle(a, b) {
  const titleA = a.title.toUpperCase();
  const titleB = b.title.toUpperCase();
  if (titleA < titleB) {
    return -1;
  }
  if (titleA > titleB) {
    return 1;
  }
  return 0;
}

window.onload = showBooks;
