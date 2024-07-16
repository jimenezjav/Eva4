import React, { useState, useEffect } from 'react';
import Formulario from '../components/Formulario';
import Lista from '../components/Lista';
import Filtros from '../components/Filtros';
import ActualizarProducto from '../components/ActualizarProducto';
import Pagination from '../components/Pagination';
import './Pag.css';
import PropTypes from './PropTypes';

/**
 * Componente funcional que representa la página principal del catálogo de productos.
 * @param {Object} props - Propiedades pasadas al componente.
 * @param {Array} props.productos - Lista de productos a mostrar en el catálogo.
 * @param {function} props.handleSubmit - Función para manejar el envío del formulario de ingreso de productos.
 * @param {function} props.handleDelete - Función para manejar la eliminación de productos.
 * @param {function} props.handleEdit - Función para manejar la edición de productos.
 * @param {function} props.handleFilter - Función para manejar el filtrado de productos.
 * @param {number} props.currentPage - Página actual de la paginación.
 * @param {number} props.totalPages - Total de páginas disponibles en la paginación.
 * @param {function} props.handlePageChange - Función para manejar el cambio de página en la paginación.
 * @param {boolean} props.isUpdateModalOpen - Indica si el modal de actualización está abierto o cerrado.
 * @param {function} props.toggleUpdateModal - Función para abrir o cerrar el modal de actualización.
 * @param {function} props.handleUpdate - Función para manejar la actualización de productos.
 * @param {Object} props.selectedProduct - Objeto que contiene los datos del producto seleccionado para actualizar.
 */

/* Componente funcional que representa la página principal del catálogo de productos.
*/
const PaginaInicio = () => {
  const [productos, setProductos] = useState([]);
  const [productoAEditar, setProductoAEditar] = useState(null);
  const [busqueda, setBusqueda] = useState('');
  const [modalActualizar, setModalActualizar] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10;

  const KEY = "productos"; // Igualar a la clave utilizada en App.js

  // Cargar productos desde localStorage al iniciar la aplicación
  useEffect(() => {
    const productosGuardados = JSON.parse(localStorage.getItem(KEY));
    if (productosGuardados) {
      setProductos(productosGuardados);
    }
  }, []);
// Guardar productos en localStorage cada vez que cambie la lista de productos
  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(productos));
  }, [productos]);

   // Función para agregar un nuevo producto a la lista
  const agregarProducto = (producto) => {
    setProductos([...productos, producto]);
  };

  // Función para editar un producto existente en la lista
  const editarProducto = (productoEditado) => {
    const productosActualizados = productos.map((prod) =>
      prod.id === productoEditado.id ? productoEditado : prod
    );
    setProductos(productosActualizados);
    setProductoAEditar(null);
    setModalActualizar(false);
  };

  // Función para eliminar un producto de la lista
  const eliminarProducto = (id) => {
    const productosActualizados = productos.filter((prod) => prod.id !== id);
    setProductos(productosActualizados);
  };
// Función para manejar el clic en el botón de editar producto
  const handleEditarClick = (producto) => {
    setProductoAEditar(producto);
    setModalActualizar(true);
  };
// Función para cambiar la página actual de la paginación
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Filtrar productos según el término de búsqueda
  const productosFiltrados = productos.filter((producto) =>
    producto.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
    producto.categoria.toLowerCase().includes(busqueda.toLowerCase())
  );

 // Calcular el índice del último y primer producto en la página actual
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  // Obtener los productos de la página actual
  const currentProducts = productosFiltrados.slice(indexOfFirstProduct, indexOfLastProduct);
   // Calcular el número total de páginas
  const totalPages = Math.ceil(productosFiltrados.length / productsPerPage);


  return (
    <div className="pagina-inicio">
      <h1>Catálogo de Productos</h1>
      <Filtros setBusqueda={setBusqueda} productos={productos} setProductos={setProductos} />
      <button onClick={() => setModalActualizar(false)} className="btn btn-primary">
        Agregar Producto
      </button>
      {modalActualizar ? (
        <ActualizarProducto
          isOpen={modalActualizar}
          cerrarModalActualizar={() => setModalActualizar(false)}
          productoAEditar={productoAEditar}
          editarProducto={editarProducto}
        />
      ) : (
        <Formulario
          agregarProducto={agregarProducto}
          productoAEditar={productoAEditar}
          setProductoAEditar={setProductoAEditar}
          editarProducto={editarProducto}
        />
      )}
      <Lista
        productos={currentProducts}
        eliminarProducto={eliminarProducto}
        editarProducto={handleEditarClick}
      />
      <Pagination
        currentPage={currentPage}
        productsPerPage={productsPerPage}
        totalProducts={productosFiltrados.length}
        totalPages={totalPages}
        paginate={handlePageChange}
      />
    </div>
  );
};
PaginaInicio.propTypes = {
  productos: PropTypes.array.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  handleEdit: PropTypes.func.isRequired,
  handleFilter: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  handlePageChange: PropTypes.func.isRequired,
  isUpdateModalOpen: PropTypes.bool.isRequired,
  toggleUpdateModal: PropTypes.func.isRequired,
  handleUpdate: PropTypes.func.isRequired,
  selectedProduct: PropTypes.object.isRequired
};

export default PaginaInicio;

