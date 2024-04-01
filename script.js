
const myLibrary = [
];

const book1 = new Book("The Lord of the Rings", "Tolkiem", 231,true)
const book2 = new Book("One Piece", "Eiichiro Oda", 1200, true)
myLibrary.push(book1)
myLibrary.push(book2)
const titleForm = document.querySelector("#title")
const authorForm = document.querySelector("#author")
const pagesForm = document.querySelector("#pages")
const readForm = document.querySelector("#read")



function Book(title,author,pages, read){
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
    this.toggleRead = function(){
        this.read = !this.read;
        showBooks()
    }
}
function addBookToLibrary(event){
    event.preventDefault();
    if (!titleForm.value || !authorForm.value || !pagesForm.value){
        return
    }
    
    title = titleForm.value
    author = authorForm.value
    pages = pagesForm.value
    const isRead = readForm.checked;
    const book = new Book(title,author,pages,isRead)
    myLibrary.push(book)
    showBooks()
    
}

const submitButton = document.querySelector('#submitButton')
submitButton.addEventListener('click', addBookToLibrary)

const books= document.querySelector('#book-container');
myLibrary.forEach(book => {
    console.log(book)
    
});
function showBooks(){
    books.innerHTML = '';
    myLibrary.forEach(book => {
        const card = document.createElement("div")
        card.classList.add("card")

        title = document.createElement("p")
        title.innerHTML = book.title

        author = document.createElement("p")
        author.innerHTML = book.author

        pages = document.createElement("p")
        pages.innerHTML = book.pages

        read = document.createElement("p")    
        read.innerHTML = book.read 
        if (book.read === true){
            read.style.backgroundColor = "green"
            read.style.color = "white"
        }
        else{
            read.style.backgroundColor = "red"
            read.style.color = "white"
        }
        read.addEventListener('click',() => {
            book.toggleRead()          
            showBooks()
            
        })
        

        deleteButton = document.createElement("button")
        deleteButton.innerHTML = "delete"
        deleteButton.addEventListener('click',() => {
            const index = myLibrary.indexOf(book);
            if (index > -1) {
                myLibrary.splice(index, 1); 
            }
            showBooks()
        })

        card.append(title)
        card.append(author)
        card.append(pages)
        card.append(read)
        card.append(deleteButton)
        books.append(card)
        })

        
        
        
    };
    function openPopup(){
        const popup = document.querySelector('#popup');
        const backdrop = document.querySelector('#backdrop');
        popup.classList.add("open-popup");
        backdrop.style.display = 'block'; // Show the backdrop
        backdrop.classList.add("blur"); // Blur the backdrop
    }
    
    function closePopup(){
        const popup = document.querySelector('#popup');
        const backdrop = document.querySelector('#backdrop');
        popup.classList.remove("open-popup");
        backdrop.style.display = 'none'; // Hide the backdrop
        backdrop.classList.remove("blur"); // Remove the blur
    }
    function sortBooks(){
        myLibrary.sort(function (a,b){
            const titleA = a.title.toUpperCase();
            const titleB = b.title.toUpperCase();
            if (titleA < titleB) {
                return -1;
            }
            if (titleA > titleB) {
                return 1;
            }
            return 0; 
        })
        showBooks()
    }
window.onload = showBooks;



