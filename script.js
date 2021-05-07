// book constructor
function Book(titre, auteur, annee) {
  this.titre = titre;
  this.auteur = auteur;
  this.annee = annee;
}

// UI constructor
function UI() {}

// ajout du livre à la liste

UI.prototype.addBookToList = function (book) {
  const list = document.getElementById("book-list");

  // creer un élement tr
  const row = document.createElement("tr");

  // creer le contenu du tr

  row.innerHTML = `
    <td>${book.titre}</td>
    <td>${book.auteur}</td>
    <td>${book.annee}</td>
    <td><a href="#" class="delete">X</a></td>
    `;

  list.appendChild(row);
};

// Nettoyer les champs
UI.prototype.clearFields = function () {
  document.getElementById("titre").value = "";
  document.getElementById("auteur").value = "";
  document.getElementById("annee").value = "";
};

// Montrez alerte
UI.prototype.showAlert = function (message, className) {
  // Creer div
  const div = document.createElement("div");
  // ajoute une classe
  div.className = `alert ${className}`;
  // ajout du texte
  div.appendChild(document.createTextNode(message));
  // prendre le parent
  const container = document.querySelector(".container");
  // Prend le form
  const form = document.querySelector("#book-form");
  // Insérer notre alerte
  container.insertBefore(div, form);

  // Timeout pour faire partir la div 3s
  setTimeout(function () {
    document.querySelector(".alert").remove();
  }, 3000);
};

// Delete book
UI.prototype.deleteBook = function (target) {
  if (target.className === "delete") {
    target.parentElement.parentElement.remove();
  }
};

// Event listener pour ajouter livre / erreur / succès

document.getElementById("book-form").addEventListener("submit", function (e) {
  // on prends toutes les valeurs
  const titre = document.getElementById("titre").value,
    auteur = document.getElementById("auteur").value,
    annee = document.getElementById("annee").value;

  // instancier un nouveau book
  const book = new Book(titre, auteur, annee);

  // instancier un nouvel ui
  const ui = new UI();

  // validation
  if (titre === "" || auteur === "" || annee === "") {
    ui.showAlert("Remplissez les champs!", "error");
  } else {
    // ajout du livre dans la liste
    ui.addBookToList(book);

    // Succès
    ui.showAlert("Livre ajouté", "success");

    // clear fields
    ui.clearFields();
  }

  e.preventDefault();
});

// Évenement pour supprimer les lignes

document.getElementById("book-list").addEventListener("click", function (e) {
  // instancier UI
  const ui = new UI();
  // Effacer le livre
  ui.deleteBook(e.target);
  // montrer un message de succès
  ui.showAlert("Livre enlevé avec succès !", "success");

  e.preventDefault();
});
