
var apiUrl = 'https://gorest.co.in/public/v2/users';
var usersTable = document.getElementById("usersTable").getElementsByTagName('tbody')[0];
var paginationControls = document.getElementById("paginationControls");
var prevPageButton = document.getElementById("prevPage");
var nextPageButton = document.getElementById("nextPage");
var pageButtonsContainer = document.getElementById("pageButtons");
var searchForm = document.getElementById("searchForm");
var idFilter = document.getElementById("idFilter");

var currentPage = 1;
var rowsPerPage = 4;
var data = [];
var filteredData = [];

function renderTablePage(page, dataToRender) {
  usersTable.innerHTML = "";
  var start = (page - 1) * rowsPerPage;
  var end = start + rowsPerPage;
  var pageData = dataToRender.slice(start, end);

  pageData.forEach(function(user) {
    var row = usersTable.insertRow();
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    var cell5 = row.insertCell(4);
    var cell6 = row.insertCell(5);
    var cell7 = row.insertCell(6);
    cell1.textContent = user.id;
    cell2.textContent = user.name;
    cell3.textContent = user.gender;
    cell4.textContent = user.email;
    cell5.textContent = user.status;
    /*
    // Cambiar esto según los datos reales
    cell4.textContent = user.castrated; 
    cell5.textContent = user.castration_date; /
    cell6.textContent = user.vaccinated; 
    cell7.textContent = user.address; 
    */
  });

  updatePaginationControls(page, dataToRender.length);
}

function updatePaginationControls(page, totalItems) {
  var totalPages = Math.ceil(totalItems / rowsPerPage);
  pageButtonsContainer.innerHTML = "";

  var startPage = Math.max(1, page - 1);
  var endPage = Math.min(totalPages, page + 1);

  // Si hay suficiente datos crea 3 botones de pagina
  if (endPage - startPage < 2) {
    if (startPage === 1) {
      endPage = Math.min(startPage + 2, totalPages);
    } else if (endPage === totalPages) {
      startPage = Math.max(endPage - 2, 1);
    }
  }

  for (var i = startPage; i <= endPage; i++) {
    var pageButton = document.createElement("button");
    pageButton.type = "button";
    pageButton.className = "btn btn-xl ButtonSecondary me-1";
    pageButton.textContent = i;
    if (i === page) {
      pageButton.disabled = true;
      pageButton.classList.add("active");
    } else {
      pageButton.addEventListener("click", (function(pageNumber) {
        return function() {
          currentPage = pageNumber;
          renderTablePage(currentPage, filteredData);
        };
      })(i));
    }
    pageButtonsContainer.appendChild(pageButton);
  }

  prevPageButton.disabled = page === 1;
  nextPageButton.disabled = page === totalPages;
}

prevPageButton.addEventListener("click", function() {
  if (currentPage > 1) {
    currentPage--;
    renderTablePage(currentPage, filteredData);
  }
});

nextPageButton.addEventListener("click", function() {
  if (currentPage * rowsPerPage < filteredData.length) {
    currentPage++;
    renderTablePage(currentPage, filteredData);
  }
});

function filterDataById() {//Filtra los id que empiecen con lo ingresado en el input
  var filterId = idFilter.value.trim();
  if (filterId) {
    filteredData = data.filter(function(user) {
      return user.id.toString().startsWith(filterId);
    });
  } else {
    filteredData = data.slice(); // Sin filtro, mostrar todos los datos
  }
  currentPage = 1;
  renderTablePage(currentPage, filteredData);
}

searchForm.addEventListener("submit", function(event) {
  event.preventDefault();
  filterDataById();
});

fetch(apiUrl)
  .then(function(response) {
    return response.json();
  })
  .then(function(responseData) {
    document.querySelector('h2').style.display = 'none';
    data = responseData;
    filteredData = data.slice(); // Inicialmente, sin filtro
    renderTablePage(currentPage, filteredData);
  })
  .catch(function(error) {
    console.log('Error:', error);
    document.querySelector('h2').textContent = 'Error loading user data';
  });
