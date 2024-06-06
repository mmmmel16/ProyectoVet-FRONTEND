
//Input imagenes
function uploadImage() {
    document.getElementById('uploadCard').addEventListener('click', function() {
        document.getElementById('fileInput').click();
    });

    document.getElementById('fileInput').addEventListener('change', function(event) {
        var files = event.target.files;
        var imageContainer = document.getElementById('imageContainer');
        imageContainer.innerHTML = ''; // Limpiar el contenedor de imágenes
        Array.from(files).forEach(file => {
            if (file.type.startsWith('image/')) {
                var reader = new FileReader();
                reader.onload = function(e) {
                    var img = document.createElement('img');
                    img.src = e.target.result;
                    imageContainer.appendChild(img);
                }
                reader.readAsDataURL(file);
            }
        });
    });
}

uploadImage();

//Creacion de filas para plan sanitario
function addRowToTable() {
    // Crear una nueva fila
    var newRow = document.createElement('tr');

    // Crear celdas para la nueva fila
    var nameCell = document.createElement('td');
    var dateCell = document.createElement('td');
    var dosisCell = document.createElement('td');
    var actionsCell = document.createElement('td');

    // Crear inputs para las celdas
    var nameInput = document.createElement('input');
    nameInput.type = 'text';
    nameCell.appendChild(nameInput);
    nameCell.classList.add('input-cell');

    var dateInput = document.createElement('input');
    dateInput.type = 'date';
    dateCell.appendChild(dateInput);
    dateCell.classList.add('input-cell');

    var dosisInput = document.createElement('input');
    dosisInput.type = 'number';
    dosisCell.appendChild(dosisInput);
    dosisCell.classList.add('input-cell');

    // Crear botón de eliminar
    var deleteBtn = document.createElement('i');
    deleteBtn.classList.add('fas', 'fa-minus-circle','delTable','fa-2x');
    deleteBtn.addEventListener('click', function() {
        this.parentElement.parentElement.remove();
    });

    // Añadir el botón de eliminar a la celda de acciones
    actionsCell.appendChild(deleteBtn);

    // Añadir celdas a la fila
    newRow.appendChild(nameCell);
    newRow.appendChild(dateCell);
    newRow.appendChild(dosisCell);
    newRow.appendChild(actionsCell);

    // Añadir la fila al cuerpo de la tabla
    document.querySelector('#editableTable tbody').appendChild(newRow);
}

document.getElementById('addRowIcon').addEventListener('click', addRowToTable);

