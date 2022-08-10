console.log("this is library book");

class BookModel {
  constructor(name, author, type) {
    this.name = name;
    this.author = author;
    this.type = type;
  }
}

var number = 0;
class Book {
  add(book) {
    let items = localStorage.getItem("book");
    if (items == null) {
      var books = [];
    } else {
      books = JSON.parse(items);
    }
    books.push(book);
    localStorage.setItem("book", JSON.stringify(books));
    Book.showBookData();
  }

  static showBookData() {
    let books = localStorage.getItem("book");
    if (books == null) {
      var booksList = [];
    } else {
      booksList = JSON.parse(books);
    }

    let trbody = "";
    booksList.forEach((element, index) => {
      trbody += `
                      <tr class="searchBook">
                          <th scope="row">${index + 1}</th>
                          <td>${element.name}</td>
                          <td>${element.author}</td>
                          <td>${element.type}</td>
                          <td> <a  onclick="new Book().delete(${index})" class="material-symbols-outlined" style="cursor: pointer;">delete</a> </td>
                      </tr>
              `;
    });
    let tableBody = document.getElementById("tableBody");

    if (booksList.length != 0) {
      tableBody.innerHTML = trbody;
    } else {
      tableBody.innerHTML = `
           <tr  style=" font-weight: bold; font-size: x-large; color: red;">
                <td colspan="4" style="text-align:center" >
                    <b>Books not found</b>
                </td>
            </tr>
      `;
    }
  }

  delete(index) {
    console.log(index);
    let books = localStorage.getItem("book");
    if (books == null) {
      var booksList = [];
    } else {
      booksList = JSON.parse(books);
    }
    booksList.splice(index, 1);
    localStorage.setItem("book", JSON.stringify(booksList));
    Book.showBookData();
  }

  clear() {
    let libraryForm = document.getElementById("libraryForm");
    libraryForm.reset();
  }
  validate(book) {
    if (book.name.length < 2 || book.author.length < 2) {
      return false;
    } else {
      return true;
    }
  }
  alert(alertType, message) {
    let alert = `
                <div class="alert alert-${alertType} alert-dismissible fade show" role="alert">
                    <strong>${alertType}!!</strong> ${message}
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
               </div>
      `;
    let alertMsg = document.getElementById("alertMsg");
    alertMsg.innerHTML = alert;

    setTimeout(() => {
      alertMsg.innerHTML = "";
    }, 3500);
  }

  static searchBook() {
    let searchTxt = document.getElementById("searchTxt");
    searchTxt.addEventListener("input", () => {
      let inputVal = searchTxt.value.toLowerCase();

      let searchBook = document.getElementsByClassName("searchBook");

      Array.from(searchBook).forEach((element) => {
        let name = element.getElementsByTagName("td")[0].innerText;
        let author = element.getElementsByTagName("td")[1].innerText;
        let type = element.getElementsByTagName("td")[2].innerText;

        if (
          name.includes(inputVal) ||
          author.includes(inputVal) ||
          type.includes(inputVal)
        ) {
          element.style.display = "";
        } else {
          element.style.display = "none";
        }
      });
    });
  }
}

let libraryForm = document.getElementById("libraryForm");
libraryForm.addEventListener("submit", librarySubmitform);

function librarySubmitform(e) {
  let name = document.getElementById("bookName").value;
  let authorName = document.getElementById("authorName").value;
  let type = document.querySelector('input[name="type"]:checked').value;

  let book = new BookModel(name, authorName, type);

  let showBook = new Book();
  if (showBook.validate(book)) {
    showBook.add(book);
    showBook.clear();
    showBook.alert("success", "Successfully added items");
  } else {
    showBook.alert("danger", "Enter name and auther first");
  }

  e.preventDefault();
  //   document.location.reload();
}

Book.showBookData();
Book.searchBook();
