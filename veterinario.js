let tarEnfermo = document.getElementById("t-enfermos");
let tarTratamiento = document.getElementById("t-tratamiento");
let tarSanos = document.getElementById("t-sanos");
let tablaClientes = document.getElementById("listar-clientes");
let tablaMascotas = document.getElementById("listar-mascotas");
let listaClientes = document.getElementById("listaClientes");
let estadoEnfermo = document.getElementById("t-enfermos");
let estadoSanos = document.getElementById("t-sanos");
let estadoTratamiento = document.getElementById("t-tratamiento");
function cerrarModal() {
    document.getElementById("miModal").style.display = "none";
  }
class Veterinaria {
    constructor() {
        this.clientes = new Map();
        this.mascotas = new Map(); // Corregido nombre
        this.cantidad = [0, 0, 0];
        this.estados = ["Enfermo", "En tratamiento", "Sano"];
        this.tarjetas = [tarEnfermo, tarTratamiento, tarSanos];
    }

    agregar_cliente(datos) {
        
        if (!this.clientes.has(datos.cedula)) {
            const nuevoCliente = new Cliente(this.clientes.size, datos.nombre, datos.cedula, datos.telefono, datos.correo);
            this.clientes.set(datos.cedula, nuevoCliente);

        } else {
            alert("Cliente ya registrado");
        }
    }

    agregar_mascota(datos) {
        if (this.clientes.has(datos.id_cedula)) {
            const id_mascota = this.mascotas.size;
            const nuevaMascota = new Mascota(id_mascota, datos.nombre, datos.especie, datos.edad, datos.peso, datos.estado, datos.id_cedula, this.cambiarEstado.bind(this), this.eliminarMascota.bind(this));
            this.mascotas.set(id_mascota, nuevaMascota);

            const cliente = this.clientes.get(datos.id_cedula);
            cliente.agregar_mascota(nuevaMascota);
            this.actulizarEstados(datos, 1);
        } else {
            alert("Cliente no registrado, registrar cliente primero");
        }
    }
    cambiarEstado(id_mascota) {
        let datos = this.mascotas.get(id_mascota);
        let estado = datos.estado;
        if (estado !== "Sano") {
            let index = this.estados.indexOf(estado);
            index = index < 2 ? index + 1 : 2;
            let newEstado = this.estados[index];

            this.actulizarEstados(datos, -1);
            datos.actualizarEstado(newEstado);
            this.actulizarEstados(datos, 1);
        };
    }
    actulizarEstados(datos, sumar) {
        let index = this.estados.indexOf(datos.estado);
        this.cantidad[index] += sumar;
        this.tarjetas[index].textContent = this.cantidad[index];
    }

    eliminarMascota(id_mascota) {
        let datos = this.mascotas.get(id_mascota);
        this.actulizarEstados(datos, -1);
        this.clientes.get(datos.id_dueno).eliminarMascota(datos);
    }
}

class Mascota {
    constructor(id, nombre, especie, edad, peso, estado, id_dueno, cambiarEstado, eliminarMascota) {
        this.id = id;
        this.nombre = nombre;
        this.especie = especie;
        this.edad = edad;
        this.peso = peso;
        this.estado = estado;
        this.id_dueno = id_dueno;
        this.cambiarEstado = cambiarEstado;
        this.eliminarMascota = eliminarMascota;
        this.agregar_a_tabla();
    }
    cambiarEdad(edad) {
        this.edad = edad;
        this.fila.children[3].textContent = this.edad;
    }

    cambiarPeso(peso) {
        this.peso = peso;
        this.fila.children[4].textContent = this.peso;
    }

    actualizarEstado(estado) {
        this.estado = estado;
        this.fila.children[5].textContent = this.estado;
    }

    agregar_a_tabla() {
        this.fila = document.createElement("tr");

        let tdId = document.createElement("td");
        tdId.textContent = this.id;
        this.fila.appendChild(tdId);

        let tdNombre = document.createElement("td");
        tdNombre.textContent = this.nombre;
        this.fila.appendChild(tdNombre);

        let tdespecie = document.createElement("td");
        tdespecie.textContent = this.especie;
        this.fila.appendChild(tdespecie);

        let tdedad = document.createElement("td");
        tdedad.textContent = this.edad;
        this.fila.appendChild(tdedad);

        let tdpeso = document.createElement("td");
        tdpeso.textContent = this.peso;
        this.fila.appendChild(tdpeso);

        let tdestado = document.createElement("td");
        tdestado.textContent = this.estado;
        this.fila.appendChild(tdestado);

        let tdid_dueno = document.createElement("td");
        tdid_dueno.textContent = this.id_dueno;
        this.fila.appendChild(tdid_dueno);

        let tdAcciones = document.createElement("td");
        let btnActulizar = document.createElement("button");
        let btnEliminar = document.createElement("button");
        let btnEditar = document.createElement("button");

        btnActulizar.classList.add("btnAcciones");
        btnEliminar.classList.add("btnAcciones");
        btnEditar.classList.add("btnAcciones");

        btnActulizar.textContent = "🔄️";
        btnEliminar.textContent = "🗑️";
        btnEditar.textContent = "👁️‍🗨️";

        btnActulizar.addEventListener("click", () => { this.cambiarEstado(this.id) });
        btnEliminar.addEventListener("click", () =>{this.eliminarFilaTabla()});
        btnEditar.addEventListener("click", () =>{this.editarMascota()});

        tdAcciones.appendChild(btnEditar);
        tdAcciones.appendChild(btnActulizar);
        tdAcciones.appendChild(btnEliminar);

        this.fila.appendChild(tdAcciones);
        // Insertar como primer hijo del tbody
        tablaMascotas.insertBefore(this.fila, tablaMascotas.firstChild);


    };

    eliminarFilaTabla(){
        this.fila.remove();
        this.eliminarMascota(this.id);
    }
    
    editarMascota(){
        document.getElementById("miModal").style.display = "block";
    }
}

class Cliente {
    constructor(id, nombre, cedula, telefono, correo) {
        this.id = id;
        this.nombre = nombre;
        this.cedula = cedula;
        this.telefono = telefono;
        this.correo = correo;
        this.mascotas = new Map();
        this.agregar_a_tabla();
    }
    agregar_a_tabla() {
        this.fila = document.createElement("tr");

        let tdId = document.createElement("td");
        tdId.textContent = this.id;
        this.fila.appendChild(tdId);

        let tdNombre = document.createElement("td");
        tdNombre.textContent = this.nombre;
        this.fila.appendChild(tdNombre);

        let tdCedula = document.createElement("td");
        tdCedula.textContent = this.cedula;
        this.fila.appendChild(tdCedula);

        let tdTelefono = document.createElement("td");
        tdTelefono.textContent = this.telefono;
        this.fila.appendChild(tdTelefono);

        let tdCorreo = document.createElement("td");
        tdCorreo.textContent = this.correo;
        this.fila.appendChild(tdCorreo);

        let tdMascotas = document.createElement("td");
        tdMascotas.textContent = this.mascotas.length;
        this.fila.appendChild(tdMascotas);

        // Insertar como primer hijo del tbody
        tablaClientes.insertBefore(this.fila, tablaClientes.firstChild);
        const option = document.createElement("option");
        option.value = this.cedula;
        option.textContent = this.nombre;
        listaClientes.appendChild(option);
    }
    agregar_mascota(mascota) {
        this.mascotas.set(mascota.id, mascota);
        this.fila.children[5].textContent = this.mascotas.size;
    }
    eliminarMascota(mascota) {
        this.mascotas.delete(mascota.id);
        this.fila.children[5].textContent = this.mascotas.size;
    }
}

var tiendaVeterinaria = new Veterinaria;


const datosIniciales = [{
    "nombre": "Ana Pérez",
    "cedula": 123456789,
    "telefono": 3001234567,
    "correo": "ana.perez@example.com",
},
{
    "nombre": "Carlos Gómez",
    "cedula": 987654321,
    "telefono": 3109876543,
    "correo": "carlos.gomez@example.com"
},
{
    "nombre": "Carlos Gómez",
    "cedula": 987654321,
    "telefono": 3109876543,
    "correo": "carlos.gomez@example.com"
}
];
const mascotas = [
    {
        "nombre": "Rex",
        "especie": "Perro",
        "edad": 5,
        "peso": 20,
        "estado": "En tratamiento",
        "id_cedula": 987654321
    },
    {
        "nombre": "Firulais",
        "especie": "Perro",
        "edad": 3,
        "peso": 12.5,
        "estado": "Enfermo",
        "id_cedula": 987654321
    },
    {
        "nombre": "Nina",
        "especie": "Gato",
        "edad": 2,
        "peso": 4.3,
        "estado": "Enfermo",
        "id_cedula": 123456789
    },
    {
        "nombre": "Nina",
        "especie": "Gato",
        "edad": 2,
        "peso": 4.3,
        "estado": "Enfermo",
        "id_cedula": 1234556789
    }

];

async function cargardatos() {
    datosIniciales.forEach(cliente => {
        tiendaVeterinaria.agregar_cliente(cliente);
    });
    mascotas.forEach(mascota => {
        tiendaVeterinaria.agregar_mascota(mascota);
    });
}


document.addEventListener("DOMContentLoaded", cargardatos);

