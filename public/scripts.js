document.getElementById('formulario').addEventListener('submit', function(event) {
    event.preventDefault();

    const fecha = document.getElementById('fecha').value;
    const titulo = document.getElementById('titulo').value; 
    const tarea = document.getElementById('tarea').value;

    // Verificar que la fecha sea válida (no anterior a la actual)
    var selectedDate = new Date(fecha);
    var now = new Date();
    if (selectedDate < now) {
        alert("fecha incorrecta.");
        return; // Detener la ejecución si la fecha es incorrecta
    }

    // Verificar que todos los campos estén completos
    if (fecha.trim() === '' || titulo.trim() === '' || tarea.trim() === '') {
        alert('Completa todos los campos');
        return;
    }

    

    // Obtener tareas existentes del localStorage
    let tareas = JSON.parse(localStorage.getItem('tareas')) || {};

   // Agregar la nueva tarea a la lista de tareas para esa fecha
if (!tareas[fecha]) {
    tareas[fecha] = [];
}
// Aquí convertimos la tarea a un objeto y lo agregamos al array
tareas[fecha].push({titulo: titulo, tarea: tarea});

    // Guardar la lista actualizada en el localStorage
    localStorage.setItem('tareas', JSON.stringify(tareas));

    // Actualizar la visualización de las tareas
    actualizarTareas();

    // Limpiar el formulario
    document.getElementById('formulario').reset();
});

function actualizarTareas() {
    const tareasDiv = document.getElementById('tareas');
    tareasDiv.innerHTML = '';

    // Obtener tareas del localStorage
    const tareas = JSON.parse(localStorage.getItem('tareas')) || {};

    // Obtener las fechas de las tareas y ordenarlas
    const fechas = Object.keys(tareas).sort();

    // Mostrar las tareas en forma de cards
    let hayTareas = false;
    fechas.forEach((fecha) => {
        tareas[fecha].forEach((tareaObj, index) => {
            hayTareas = true;
            const cardDiv = document.createElement('div');
            cardDiv.classList.add('card');

            const fechaElement = document.createElement('p');
            fechaElement.textContent = fecha; 
            fechaElement.classList.add('fecha'); // Agregar clase para darle estilos
            cardDiv.appendChild(fechaElement);

            const tituloElement = document.createElement('h3');
            tituloElement.textContent = tareaObj.titulo;
            cardDiv.appendChild(tituloElement);

            const contenidoElement = document.createElement('p');
            contenidoElement.textContent = tareaObj.tarea;
            cardDiv.appendChild(contenidoElement);

            const modificarButton = document.createElement('button');
            modificarButton.textContent = 'Modificar';
            modificarButton.addEventListener('click', function() {
                modificarTarea(fecha, index);
            });

            const borrarButton = document.createElement('button');
            borrarButton.textContent = 'Borrar';
            borrarButton.addEventListener('click', function() {
                borrarTarea(fecha, index);
            });

            cardDiv.appendChild(modificarButton);
            cardDiv.appendChild(borrarButton);

            tareasDiv.appendChild(cardDiv);
        });
    });

    // Si no hay tareas, mostrar mensaje
    if (!hayTareas) {
        const mensaje = document.createElement('p');
        mensaje.textContent = 'No tienes tareas pendientes.';
        tareasDiv.appendChild(mensaje);
    }
}

function modificarTarea(fecha, index) {
    // Obtener tareas del localStorage
    let tareas = JSON.parse(localStorage.getItem('tareas')) || {};

    // Obtener la tarea actual
    const tareaActual = tareas[fecha][index];

    // Solicitar la nueva descripción de la tarea mediante un prompt
    const nuevaTarea = prompt('modifica la descripción manteniendo : ', tareaActual.titulo + ': ' + tareaActual.tarea);

    // Actualizar la tarea si se ingresó una nueva descripción
    if (nuevaTarea !== null) {
        // Separar el título y la tarea
        const partes = nuevaTarea.split(':');
        const nuevoTitulo = partes[0].trim();
        const nuevaDescripcion = partes[1].trim();

        // Actualizar la tarea en el localStorage
        tareas[fecha][index] = { titulo: nuevoTitulo, tarea: nuevaDescripcion };
        localStorage.setItem('tareas', JSON.stringify(tareas));

        // Actualizar la visualización de las tareas
        actualizarTareas();
    }
}

function borrarTarea(fecha, index) {
    // Obtener tareas del localStorage
    let tareas = JSON.parse(localStorage.getItem('tareas')) || {};

    // Borrar la tarea seleccionada
    tareas[fecha].splice(index, 1);

    // Guardar la lista actualizada en el localStorage
    localStorage.setItem('tareas', JSON.stringify(tareas));

    // Actualizar la visualización de las tareas
    actualizarTareas();
}

// Mostrar las tareas almacenadas al cargar la página
actualizarTareas();
