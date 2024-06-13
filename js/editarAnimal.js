
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


function cargarTablaDesdeJSON() {
    // Simulación de datos obtenidos de un JSON
    var jsonData = [
        { "medicamento": "Moquillo", "fecha": "2024-01-05", "dosis": "1"},
        { "medicamento": "Gripe Felina", "fecha": "2024-01-05", "dosis": "2"},
        { "medicamento": "Leucemia", "fecha": "2024-01-05", "dosis": "2"},
        { "medicamento": "Peritonitis infecciosa felina", "fecha": "2024-01-05", "dosis": "2"}
    ];

    var tableBody = document.querySelector('#editableTable tbody');

    // Función para agregar una fila a la tabla
    function addRow(medicamento, fecha, dosis) {
        var newRow = document.createElement('tr');

        // Crear celdas para la nueva fila
        var nameCell = document.createElement('td');
        var dateCell = document.createElement('td');
        var dosisCell = document.createElement('td');
        var actionsCell = document.createElement('td');

        var nameInput = document.createElement('input');
        nameInput.value = medicamento;
        nameInput.type = 'text';
        nameCell.appendChild(nameInput);
        nameCell.classList.add('input-cell')

        var dateInput = document.createElement('input');
        dateInput.value = fecha;
        dateInput.type = 'date';
        dateCell.appendChild(dateInput);
        dateCell.classList.add('input-cell')

        var dosisInput = document.createElement('input');
        dosisInput.value = dosis;
        dosisInput.type = 'number';
        dosisCell.appendChild(dosisInput);
        dosisCell.classList.add('input-cell')

        // Crear botón de eliminar
        var deleteBtn = document.createElement('i');
        deleteBtn.classList.add('fas', 'fa-minus-circle','delTable','fa-2x');
        deleteBtn.addEventListener('click', function() {
            this.parentElement.parentElement.remove();
        });
        
        // Añadir celdas a la fila
        newRow.appendChild(nameCell);
        newRow.appendChild(dateCell);
        newRow.appendChild(dosisCell);
        newRow.appendChild(actionsCell);

        // Añadir el botón de eliminar a la celda de acciones
        actionsCell.appendChild(deleteBtn);
        
        // Agregar la fila a la tabla
        tableBody.appendChild(newRow);
    }

    // Iterar sobre los datos del JSON y agregar filas a la tabla
    jsonData.forEach(function(item) {
        addRow(item.medicamento, item.fecha, item.dosis);
    });

    // Agregar evento click al icono de agregar
    document.getElementById('addRowIcon').addEventListener('click', function() {
        addRow('', ''); 
    });
}

// Llamar a la función cuando el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', cargarTablaDesdeJSON);



function datosFields() {
    fetch('https://gorest.co.in/public/v2/users/2934696')
    .then(response => response.json())
    .then(data => {
        // Actualizar los valores de los inputs con los datos obtenidos
        document.getElementById('id').value = data.id;
        document.getElementById('animalName').value = data.name;
        
        //document.getElementById('animalType').value = data.type;
        document.getElementById('animalType').value = 'Gato'


        //document.getElementById('gender').value = data.name;
        document.getElementById('gender').value = 'Macho';

        //document.getElementById('castrado').value = data.castrado;
        document.getElementById('inlineRadio1').checked = 'true';



        //document.getElementById('castratedDate').value = data.name;
        document.getElementById('castratedDate').value = '2024-05-01';

        //document.getElementById('fileInput').value = 


        //document.getElementById('aggresive').value = data.aggresive;
        document.getElementById('aggresive').value = '2';

        document.getElementById('ownerName').value = data.name;
        document.getElementById('ownerAddress').value = data.name;
        document.getElementById('ownerCity').value = data.name;
        document.getElementById('ownerPhone').value = data.id;
    })
    .catch(error => console.error('Error al obtener los datos:', error));
}

// Llamar a la función cuando el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', datosFields);