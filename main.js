//Book Constructor
function Book(title,author,isbn){
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}


//UI Constructor
function UI(){}


//Add Book To List
UI.prototype.addBookToList = function(book){
    var list = document.getElementById('book_list');

    //Create tr Element
    var row = document.createElement('tr');

    //Insert cols
    row.innerHTML = '<td>' + book.title + '</td>' +
    '<td>' + book.author + '</td>' +
    '<td>' + book.isbn + '</td>' +
    '<td><a href="#" class="delete">X</a></td>';

    list.appendChild(row);
}

//Delete Book
UI.prototype.deleteBook = function (target){
    if(target.className === 'delete'){
        target.parentElement.parentElement.remove();
    }
}


//Clear fields
UI.prototype.clearFields = function(){
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
}

//Show Alert
UI.prototype.showAlert = function (message,className){
    //Create Div
    var div = document.createElement('div');

    //Add classes
    div.className = 'alert ' + className;

    //Add Text
    div.appendChild(document.createTextNode(message));

    //Get parent
    var container = document.querySelector('.container');

    //Get form
    var form = document.getElementById('book_form');

    //Insert alret
    container.insertBefore(div,form);

    //Timeout after 3 sec
    setTimeout(function(){
        document.querySelector('.alert').remove();
    },3000);
}


//Event Listeners for add book
document.getElementById('book_form').addEventListener('submit',
function(e){
    //Get Form Values
    var title = document.getElementById('title').value;
    var author = document.getElementById('author').value;
    var isbn = document.getElementById('isbn').value;

    //Instantiate book
    var book = new Book(title,author,isbn);

    //Instantiate UI
    var ui = new UI();

    //Validate
    if(title === '' || author === '' || isbn === ''){
        //Error alert
        ui.showAlert('Please fill in all fields','error');
    }else{
        //Add book to list
        ui.addBookToList(book);

        //Show Success
        ui.showAlert('Book Added!','success');

        //Clear fields
        ui.clearFields();
    }

    e.preventDefault();
});

//Event Listeners for delete
document.getElementById('book_list').addEventListener('click',
function(e){

    //Instantiate UI
    var ui = new UI();

    //Delete Book
    ui.deleteBook(e.target);

    //Show message
    ui.showAlert('Book Removed!','success');

    e.preventDefault();
});