import React, { useState, useEffect } from 'react';
import Formulario from './components/Formulario';
import Lista from './components/Lista';
import Filtros from './components/Filtros';
import Pagination from './components/Pagination';
import './App.css';

const App = () => {
  const [productos, setProductos] = useState([]); // Estado para almacenar la lista de productos
  const [productoAEditar, setProductoAEditar] = useState(null); // Estado para el producto que se está editando
  const [busqueda, setBusqueda] = useState(''); // Estado para el término de búsqueda
  const [currentPage, setCurrentPage] = useState(1); // Estado para almacenar la página actual de la paginación
  const productsPerPage = 8; // Número de productos por página

  useEffect(() => {
    // Cargar productos desde localStorage al iniciar la aplicación
    const productosGuardados = JSON.parse(localStorage.getItem('productos'));
    if (productosGuardados) {
      setProductos(productosGuardados);
    }
  }, []);

  useEffect(() => {
    // Guardar productos en localStorage cada vez que cambie la lista de productos
    localStorage.setItem('productos', JSON.stringify(productos));
  }, [productos]);

  // Función para agregar un nuevo producto a la lista
  const agregarProducto = (producto) => {
    const nuevosProductos = [...productos, producto];
    setProductos(nuevosProductos);
  };

  // Función para editar un producto existente en la lista
  const editarProducto = (productoEditado) => {
    const productosActualizados = productos.map((prod) =>
      prod.id === productoEditado.id ? productoEditado : prod
    );
    setProductos(productosActualizados);
    setProductoAEditar(null);
  };

  // Función para eliminar un producto de la lista
  const eliminarProducto = (id) => {
    const productosActualizados = productos.filter((prod) => prod.id !== id);
    setProductos(productosActualizados);
  };

  // Función para manejar el clic en el botón de editar producto
  const handleEditarClick = (producto) => {
    setProductoAEditar(producto); // Establecer el producto que se va a editar
  };

  // Filtrar productos según el término de búsqueda
  const productosFiltrados = productos.filter(
    (prod) =>
      prod.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      prod.categoria.toLowerCase().includes(busqueda.toLowerCase())
  );

  // Calcular el índice del último y primer producto en la página actual
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  // Obtener los productos de la página actual
  const currentProducts = productosFiltrados.slice(indexOfFirstProduct, indexOfLastProduct);

  // Función para ir a la página siguiente
  const nextPage = () => {
    if (indexOfLastProduct < productosFiltrados.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Función para ir a la página anterior
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Función para ir a una página específica
  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="App">
      <h1>Catálogo de Productos</h1>
      {/* Componente Filtros para manejar el término de búsqueda */}
      <Filtros busqueda={busqueda} setBusqueda={setBusqueda} />
      {/* Componente Formulario para agregar y editar productos */}
      <Formulario
        agregarProducto={agregarProducto}
        productoAEditar={productoAEditar}
        setProductoAEditar={setProductoAEditar}
        editarProducto={editarProducto}
      />
      {/* Componente Lista para mostrar la lista de productos */}
      <Lista
        productos={currentProducts}
        eliminarProducto={eliminarProducto}
        editarProducto={handleEditarClick}
      />
      {/* Componente Pagination para la paginación de productos */}
      <Pagination
        currentPage={currentPage}
        productsPerPage={productsPerPage}
        totalProducts={productosFiltrados.length}
        nextPage={nextPage}
        prevPage={prevPage}
        paginate={goToPage}
      />
    </div>
  );
};

export default App;


