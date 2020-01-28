// Book Constructor
function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

//UI Constructor
function UI() {
  // Add book to list
  UI.prototype.addBookToList = function(book) {
    const list = document.getElementById("book-list");
    // Create tr element
    const row = document.createElement("tr");
    // Insert cols
    row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href ="#" class ="delete">X</a></td> `;
    list.appendChild(row);
  };

  // Show alert
  UI.prototype.showAlert = function(message, className) {
    // Create div
    const div = document.createElement("div");
    // Add classes
    div.className = `alert ${className}`;
    // Add text
    div.appendChild(document.createTextNode(message));
    // Get Parent
    const container = document.querySelector(".container");
    // Get form
    const form = document.querySelector("#book-form");
    // Insert alert
    container.insertBefore(div, form);

    // Timeout after 2 sec
    setTimeout(function() {
      document.querySelector(".alert").remove();
    }, 1000 * 2);
  };

  // Delete book
  UI.prototype.deleteBook = function(target) {
    
      target.parentElement.parentElement.remove();
 
  };

  // Clear fields
  UI.prototype.clearFields = function() {
    document.getElementById("title").value = "";
    document.getElementById("author").value = "";
    document.getElementById("isbn").value = "";
  };
} // End UI Constructor

//Event Listener for add book
document.getElementById("book-form").addEventListener("submit", function(e) {
  // Get form values
  const title = document.getElementById("title").value,
    author = document.getElementById("author").value,
    isbn = document.getElementById("isbn").value;

  // Instantiate Book
  const book = new Book(title, author, isbn);

  // Instantiate UI
  const ui = new UI();

  // Validate
  if (title === "" || author === "" || isbn === "") {
    // Error alert
    ui.showAlert("Please fill in all fields", "error");
  } else {
    // Add book to list
    ui.addBookToList(book);

    //Clear fields
    ui.clearFields();

    // Success alert
    ui.showAlert("Book Added!", "success");
  }

  e.preventDefault();
});

// Event listener for delete
document.getElementById("book-list").addEventListener("click", function(e) {
  // Instantiate UI
  const ui = new UI();

  if (e.target.classList.contains("delete")) {
    // Delete Book
    ui.deleteBook(e.target);

    // Show message
    ui.showAlert("Book Removed!", "success");
  }

  e.preventDefault();
});
