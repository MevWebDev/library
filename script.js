const titleForm = document.querySelector("#title");
const authorForm = document.querySelector("#author");
const pagesForm = document.querySelector("#pages");
const readForm = document.querySelector("#read");
const submitButton = document.querySelector("#submitButton");
const books = document.querySelector("#book-container");

class Library {
  constructor() {
    this.library = [];
  }
  addBook(book) {
    this.library.push(book);
    this.displayBooks();
  }
  displayBooks() {
    books.innerHTML = "";
    this.library.forEach((book) => {
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
        this.displayBooks();
      });
      const deleteButton = card.querySelector("#deleteButton");
      deleteButton.addEventListener("click", () => {
        const index = this.library.indexOf(book);
        if (index > -1) {
          this.library = this.library.filter((_, i) => i !== index);
        }
        this.displayBooks();
      });
      books.append(card);
    });
  }
  sortBooks() {
    this.library = this.library.sort((a, b) => {
      const titleA = a.title.toUpperCase();
      const titleB = b.title.toUpperCase();
      if (titleA < titleB) {
        return -1;
      }
      if (titleA > titleB) {
        return 1;
      }
      return 0;
    });

    this.displayBooks();
  }
}

class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }
  toggleRead() {
    this.read = !this.read;
  }
}
const library = new Library();
const book1 = new Book("One Piece", "Eiichiro Oda", 1101, true);
library.addBook(book1);

submitButton.addEventListener("click", function (event) {
  event.preventDefault();
  const newBook = new Book(
    titleForm.value,
    authorForm.value,
    pagesForm.value,
    readForm.value ? true : false
  );
  library.addBook(newBook);
});

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

window.onload = function () {
  library.displayBooks();
};
