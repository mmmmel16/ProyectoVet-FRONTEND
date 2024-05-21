document.addEventListener("DOMContentLoaded", function() {
    const spanElement = document.getElementById("castrado");
    spanElement.addEventListener("mouseover", function() {
        this.textContent = "24/04/24";  //Hay que cambiar con la fecha de la BD
    });

    spanElement.addEventListener("mouseout", function() {
        this.textContent = "Castrado";
    });
});

function printReport() {
    const originalContent = document.body.innerHTML;
    const reportContent = document.getElementById("customReport").innerHTML;
    
    document.body.innerHTML = '<html><head><title>Historia clínica</title><link href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" rel="stylesheet"></head><body>' + reportContent + '</body></html>';
    window.print();
    document.body.innerHTML = originalContent;
}