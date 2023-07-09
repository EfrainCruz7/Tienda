const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const listaCursos = document.querySelector('#lista-cursos');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
let articulosCarrito = [];

cargarEventListeners();
function cargarEventListeners()
{
    listaCursos.addEventListener('click',agregarCurso);
    carrito.addEventListener('click',eliminarCurso);
    vaciarCarritoBtn.addEventListener('click', ()=>{
                                                    articulosCarrito=[];
                                                    limpiarCarritoHTML();
                                                    carritoHTML();
    });
}

function agregarCurso(e)
{   e.preventDefault();
   if(e.target.classList.contains('agregar-carrito'))
   {
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado);
   }
}

function eliminarCurso(id)
{   
        const cursoId = id;
        articulosCarrito=articulosCarrito.filter(curso=>parseInt(curso.id) !== cursoId);
        console.log(articulosCarrito);
        carritoHTML();
}


function leerDatosCurso(curso)
{
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id:     curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1,
        subTotal: curso.querySelector('.precio span').textContent,
    }

        const existe = articulosCarrito.some(curso =>curso.id ===infoCurso.id);
        if(existe==true)
        {
            const cursos = articulosCarrito.map(curso=>{
                if(curso.id === infoCurso.id)
                { 
                  curso.cantidad++;
                 // curso.subTotal= parseInt(curso.precio) * parseInt(curso.cantidad);
                  return curso;
                }
                else {return curso;}
                
            })
        }

        else
         {articulosCarrito=[...articulosCarrito,infoCurso];}
        
    carritoHTML();
}



function extraerPrecio(costo)
{
    let c="";
    for(let i=0; i<costo.length; i++)
    {
        if(costo[i]!="$") c=c+costo[i];
    }
    return c;
}


function carritoHTML()
{
    limpiarCarritoHTML();
    articulosCarrito.forEach(curso => {
        const {imagen, titulo, precio, cantidad, id}= curso;
        const subTotal= parseInt(extraerPrecio(precio))* parseInt(cantidad);
        const row = document.createElement('tr');
            row.innerHTML = `
                                <td> <img src = ${imagen} width="100" height="90"></td>
                                <td> ${titulo} </td>
                                <td> ${precio} </td>
                                <td> ${cantidad} </td>
                                <td> $${subTotal} </td>
                                <td>
                                <button onclick="eliminarCurso(${id})">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"  viewBox="0 0 16 16">
                                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"/>
                                        <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"/>
                                    </svg>
                                </button>  
                                </td>                 
                            `;
        contenedorCarrito.appendChild(row);   
    });

}


function limpiarCarritoHTML()
{
    while(contenedorCarrito.firstChild)
    {
        (contenedorCarrito.removeChild(contenedorCarrito.firstChild))
    }
}