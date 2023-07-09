const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos'); 
let articulosCarrito = [];

cargarEventlisteners();
function cargarEventlisteners()
{
    listaCursos.addEventListener('click',agregarCurso);

    carrito.addEventListener('click',eliminarCurso);

    vaciarCarritoBtn.addEventListener('click', () => {
                                        articulosCarrito=[]; 
                                        limpiarHTML();
                                    })
}

function agregarCurso(e)
{
    e.preventDefault();

    if( e.target.classList.contains('agregar-carrito') )
    {
        const cursoSeleccionado=e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado);
    }
}

//Elimina curso del carrito
function eliminarCurso(e)
{
    console.log(e.target.classList);
    if(e.target.classList.contains('borrar-curso'))
    {
        const cursoId = e.target.getAttribute('data-id');

        articulosCarrito=articulosCarrito.filter(curso=>curso.id !== cursoId);
        //console.log(articulosCarrito);
        CarritoHTML();
    }
}



function leerDatosCurso(curso)
{  //Lee el contenido HTML del curso seleccionado y extrae los datos
    const infoCurso = {
                        imagen: curso.querySelector('img').src,
                        titulo: curso.querySelector('h4').textContent,
                        precio: curso.querySelector('.precio span').textContent,
                        id: curso.querySelector('a').getAttribute('data-id'),
                        cantidad: 1
                      }
    const existe = articulosCarrito.some(curso => curso.id === infoCurso.id)
    if(existe)
    {
        const cursos = articulosCarrito.map(curso =>{
            if(curso.id === infoCurso.id)
            {
                curso.cantidad++;
                return curso;
            }
            else
            {
                return curso;
            }
        });
        articulosCarrito=[...cursos];
    }
    else
    {
        //Agrega elementos al arreglo del carrito
        articulosCarrito = [...articulosCarrito,infoCurso];
    }
    
    CarritoHTML();
}

function CarritoHTML()
{
    //Limpia el HTML
        limpiarHTML();

    //Recorre el carrito y genera el HTML
    articulosCarrito.forEach(curso =>{
                                        const row = document.createElement('tr');
                                        row.innerHTML = `
                                                        <td>
                                                            <img src="${curso.imagen}" width="80">
                                                        </td>
                                                        <td>
                                                            ${curso.titulo}
                                                        </td>
                                                        <td>
                                                        ${curso.cantidad}
                                                        </td>
                                                        <td>
                                                            ${curso.precio}
                                                        </td>
                                                        <td>
                                                            <a href="#" class="borrar-curso" data-id="${curso.id}"> X </a>
                                                        </td>
                                                        `
    contenedorCarrito.appendChild(row);
                                                    })
}

function limpiarHTML()
{
    //contenedorCarrito.innerHTML='';
    while(contenedorCarrito.firstChild)
    {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}