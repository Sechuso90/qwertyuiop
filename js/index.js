const sizeCategories = {
    "Best Buy": {
        "Small/Medium": { maxDimension: 52, maxWeight: 60, totalWeight: 250, maxVolume: 0.5 },
        "Large": { maxDimension: 75, maxWeight: 150, totalWeight: 400, maxVolume: 12 },
        "Huge": { maxDimension: 96, maxWeight: 600, totalWeight: 600, maxVolume: 125 }
    },
    "Tractor Supply Company": {
        "Small": { maxDimension: 12, maxWeight: 5, totalWeight: 10, maxVolume: 0.5 },
        "Medium": { maxDimension: 40, maxWeight: 60, totalWeight: 120, maxVolume: 12 },
        "Large": { maxDimension: 48, maxWeight: 60, totalWeight: 250, maxVolume: 24 },
        "Extra Large (XL)": { maxDimension: 60, maxWeight: 150, totalWeight: 400, maxVolume: 32 },
        "Huge": { maxDimension: 150, maxWeight: 1500, totalWeight: 3500, maxVolume: 125 }
    },
    "Discount Tire": {
        "Small/Medium": { maxDimension: 40, maxWeight: 60, totalWeight: 120, maxVolume: 12 },
        "Large": { maxDimension: 48, maxWeight: 60, totalWeight: 250, maxVolume: 24 },
        "Extra Large (XL)": { maxDimension: 60, maxWeight: 150, totalWeight: 400, maxVolume: 32 },
        "Huge": { maxDimension: 150, maxWeight: 1500, totalWeight: 3500, maxVolume: 125 }
    },
    "At Home": {
        "Small/Medium": { maxDimension: 40, maxWeight: 60, totalWeight: 120, maxVolume: 12 },
        "Large": { maxDimension: 48, maxWeight: 60, totalWeight: 250, maxVolume: 24 },
        "Extra Large (XL)": { maxDimension: 60, maxWeight: 150, totalWeight: 400, maxVolume: 32 },
        "Huge": { maxDimension: 150, maxWeight: 1500, totalWeight: 3500, maxVolume: 125 }
    },
    "BJ's Wholesale Club": {
        "Large": { maxDimension: 48, maxWeight: 60, totalWeight: 250, maxVolume: 24 },
        "Extra Large (XL)": { maxDimension: 60, maxWeight: 150, totalWeight: 400, maxVolume: 32 },
        "Huge": { maxDimension: 150, maxWeight: 350, totalWeight: 3500, maxVolume: 125 }
    },
    "Home Depot": {  // Añadir la nueva categoría aquí
        "Small": { maxDimension: 12, maxWeight: 5, totalWeight: 10, maxVolume: 0.5 },
        "Medium": { maxDimension: 40, maxWeight: 60, totalWeight: 120, maxVolume: 12 },
        "Large": { maxDimension: 48, maxWeight: 60, totalWeight: 250, maxVolume: 24 },
        "Extra Large (XL)": { maxDimension: 60, maxWeight: 125, totalWeight: 400, maxVolume: 32 },
        "Huge": { maxDimension: 84, maxWeight: 125, totalWeight: 1500, maxVolume: 125 }
    }
};

function categorizeItem() {
    const selectedTable = document.getElementById('tableSelect').value; // Obtener la tabla seleccionada
    const length = document.getElementById('length').value;
    const width = document.getElementById('width').value;
    const height = document.getElementById('height').value;
    const itemWeight = document.getElementById('itemWeight').value;
    const quantity = document.getElementById('quantity').value;

    // Verificar si todos los campos están llenos
    if (!selectedTable || !length || !width || !height || !itemWeight || !quantity) {
        document.getElementById('result').innerText = 'Please fill in all fields.';
        return; // Salir de la función si hay campos vacíos
    }

    // Convertir valores a tipos numéricos
    const lengthNum = parseFloat(length);
    const widthNum = parseFloat(width);
    const heightNum = parseFloat(height);
    const itemWeightNum = parseFloat(itemWeight);
    const quantityNum = parseInt(quantity);

    // Calcular la dimensión máxima
    const maxDimension = Math.max(lengthNum, widthNum, heightNum);

    // Calcular el volumen en pies cúbicos
    const volume = (lengthNum * widthNum * heightNum) / 1728;  // Convertir pulgadas cúbicas a pies cúbicos

    // Calcular el peso total
    const totalWeight = itemWeightNum * quantityNum;

    let sizeCategory = "More than Huge"; // Valor por defecto

    // Obtener las categorías de la tabla seleccionada
    const categories = sizeCategories[selectedTable];

    // Lógica de categorización
    for (const [key, value] of Object.entries(categories)) {
        if (maxDimension <= value.maxDimension && itemWeightNum <= value.maxWeight && totalWeight <= value.totalWeight && volume <= value.maxVolume) {
            sizeCategory = key; // Asignar la categoría
            break; // Salir del ciclo una vez encontrada la categoría
        }
    }

    document.getElementById('result').innerText = `The item is categorized as: ${sizeCategory} with a volume of ${volume.toFixed(2)} cubic feet`;
}



function calculatePayout() {
    const originalSize = document.getElementById('originalSize').value;
    const updatedSize = document.getElementById('updatedSize').value;
    const distance = parseFloat(document.getElementById('distance').value);

    // Verificar si todos los campos están llenos
    if (!originalSize || !updatedSize || isNaN(distance)) {
        document.getElementById('payoutResult').innerText = 'Please fill in all fields.';
        return; // Salir de la función si hay campos vacíos
    }

    let adjustment = 0;

    // Store adjustments for each transition
    const adjustments = {
        "Small/Medium": {
            "Large": distance > 20 ? 3.00 : (distance > 10 ? 2.00 : 1.00),
            "Huge": distance > 20 ? 5.00 : (distance > 10 ? 4.00 : 3.00)
        },
        "Large": {
            "Extra Large": distance > 20 ? 5.00 : (distance > 10 ? 4.00 : 3.00),
            "Huge": distance > 20 ? 5.00 : (distance > 10 ? 4.00 : 3.00)
        },
        "Extra Large": {
            "Huge": distance > 20 ? 10.00 : (distance > 10 ? 7.00 : 5.00)
        }
    };

    // Calculate the maximum adjustment for the selected sizes
    if (adjustments[originalSize] && adjustments[originalSize][updatedSize]) {
        adjustment = adjustments[originalSize][updatedSize];
    }

    document.getElementById('payoutResult').innerText = `Payout Adjustment: $${adjustment.toFixed(2)}`;
}

// Cargar las notas guardadas de localStorage al cargar la página
document.addEventListener("DOMContentLoaded", function () {
    const notasGuardadas = JSON.parse(localStorage.getItem('notas')) || [];
    mostrarNotas(notasGuardadas);
});

// Cargar las notas guardadas de localStorage al cargar la página
document.addEventListener("DOMContentLoaded", function () {
    const notasGuardadas = JSON.parse(localStorage.getItem('notas')) || [];
    mostrarNotas(notasGuardadas);
});

// Función para agregar una nueva nota
function agregarNota() {
    const nuevaNota = document.getElementById('editor').innerHTML;

    if (nuevaNota.trim() !== "") {
        // Recuperar notas previas de localStorage
        let notas = JSON.parse(localStorage.getItem('notas')) || [];

        // Agregar la nueva nota al array
        notas.push(nuevaNota);

        // Guardar en localStorage
        localStorage.setItem('notas', JSON.stringify(notas));

        // Mostrar las notas actualizadas
        mostrarNotas(notas);

        // Limpiar el campo de texto
        document.getElementById('editor').innerHTML = '';
    } else {
        alert('Por favor, escribe una nota.');
    }
}

// Función para mostrar las notas en pantalla
function mostrarNotas(notas) {
    const listaNotas = document.getElementById('listaNotas');
    listaNotas.innerHTML = '';

    notas.forEach((nota, index) => {
        const notaDiv = document.createElement('div');
        notaDiv.className = 'note';
        notaDiv.innerHTML = `
            <p>${nota}</p>
            <button onclick="confirmarEliminarNota(${index})">X</button>
        `;
        listaNotas.appendChild(notaDiv);
    });
}

function confirmarEliminarNota(index) {
    const respuesta = confirm('¿Seguro que deseas eliminar la nota?');
    if (respuesta) {
        eliminarNota(index);
    }
}

// Función para eliminar una nota
function eliminarNota(index) {
    let notas = JSON.parse(localStorage.getItem('notas')) || [];

    // Eliminar la nota en el índice dado
    notas.splice(index, 1);

    // Guardar el array actualizado en localStorage
    localStorage.setItem('notas', JSON.stringify(notas));

    // Mostrar las notas actualizadas
    mostrarNotas(notas);
}
if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('darkmode');
    document.getElementById('theme-icon').classList.replace('fa-sun', 'fa-moon');
}

function toggleTheme() {
    document.body.classList.toggle('darkmode');
    const icon = document.getElementById('theme-icon');

    if (document.body.classList.contains('darkmode')) {
        localStorage.setItem('theme', 'dark');
        icon.classList.replace('fa-sun', 'fa-moon'); // Switch to moon icon
    } else {
        localStorage.removeItem('theme');
        icon.classList.replace('fa-moon', 'fa-sun'); // Switch back to sun icon
    }
}

 // Function to open modal with the selected image
 function openModal(imageSrc) {
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    modalImage.src = imageSrc; // Set the modal image source
    modal.style.display = 'flex'; // Show modal
}

// Function to close modal
function closeModal() {
    const modal = document.getElementById('imageModal');
    modal.style.display = 'none'; // Hide modal
}

// Close modal when clicking outside of the image
window.onclick = function(event) {
    const modal = document.getElementById('imageModal');
    if (event.target == modal) {
        closeModal();
    }
}