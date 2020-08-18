// Event listener para cuando se presiona el botón
document.querySelector('#generar-nombre').addEventListener('submit', cargarNombres);

// Se cargan los valores que ingresó el usuario para realizar el filtrado
function cargarNombres(e) {
    e.preventDefault();
    const origen = document.getElementById('origen');
    const origenSeleccionado = origen.options[origen.selectedIndex].value;

    const genero = document.getElementById('genero');
    const generoSeleccionado = genero.options[genero.selectedIndex].value;

    const cantidad = document.getElementById('numero').value;

    let url = '';
    url += 'https://randomuser.me/api/?';
    // Si hay origen agregarlo a la URL
    if (origenSeleccionado !== '') {
        url += `nat=${origenSeleccionado}&`;
    }
    // Si hay un género agregarlo a la URL
    if (generoSeleccionado !== '') {
        url += `gender=${generoSeleccionado}&`;
    }
    // Si hay una cantidad de nombres agregarlo a la URL
    if (cantidad !== '') {
        url += `results=${cantidad}`;
    }


    // Conexión con Fetch API
    fetch(url)
        .then(res => res.json())
        .then(data => {
            let html = `<h2>Nombres Generados</h2>`;
            html += `<ul class="lista">`;
            const results = data.results;
            results.forEach(result => {
                html += `
                    <li>${result.name.first}</li>
               `;
            });
            html += `</ul>`;
            document.getElementById('resultado').innerHTML = html;
        })
        .catch(error => console.log(error));
}