const pestanaInicio = document.getElementById("inicio");
const pestanaClientes = document.getElementById("clientes");
const pestanaMascotas = document.getElementById("mascotas");
const btnInicio = document.getElementById("btn-inicio");
const btnClientes = document.getElementById("btn-clientes");
const btnMascotas = document.getElementById("btn-mascotas");
let pestanaActiva = pestanaInicio;
let btnActivo = btnInicio;


function agregar_cliente() {
    let datos = {
        nombre: document.getElementById("nombre_cliente").value,
        cedula: Number(document.getElementById("cedula").value.trim()),
        telefono: document.getElementById("telefono").value,
        correo: document.getElementById("correo").value
    };
    tiendaVeterinaria.agregar_cliente(datos);
    document.getElementById("new_cliente").reset();

}

function agregar_mascota() {
    let datos = {
        nombre: document.getElementById("nombre_mascota").value,
        especie: document.getElementById("especie").value,
        peso: document.getElementById("peso").value,
        edad: document.getElementById("edad").value,
        estado: document.getElementById("estado").value,
        id_cedula: Number(document.getElementById("id_cliente").value.trim())
    };
    
    tiendaVeterinaria.agregar_mascota(datos);
    document.getElementById("new_mascota").reset();

}
function activarPestaña(pestana, btn) {
    pestanaActiva.classList.remove("activarPestaña");
    pestana.classList.add("activarPestaña");
    pestanaActiva = pestana;
    btnActivo.style.color = "white";
    btn.style.color = "#ffff00";
    btnActivo = btn;
}

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("btn-new-cliente").addEventListener("click", agregar_cliente);
    document.getElementById("btn-new-mascota").addEventListener("click", agregar_mascota);
    btnInicio.addEventListener("click", () => {
        activarPestaña(pestanaInicio, btnInicio);
    });
    btnClientes.addEventListener("click", () => {
        activarPestaña(pestanaClientes, btnClientes);
    });
    btnMascotas.addEventListener("click", () => {
        activarPestaña(pestanaMascotas, btnMascotas);
    });
    activarPestaña(pestanaInicio, btnInicio);
})
