import { useState, useEffect } from 'react';

const useResponsive = () => {
    // Inicializamos el estado con un valor por defecto que no dependa de window
  const [windowSize, setWindowSize]:any = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    // Esta función actualiza el tamaño de la ventana
    function handleResize() {
      // Establece el tamaño de la ventana en el estado
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    // Ejecuta handleResize inmediatamente para obtener el tamaño inicial
    handleResize();

    // Suscribe al evento de resize
    window.addEventListener('resize', handleResize);

    // Limpia el event listener cuando el componente se desmonte
    return () => window.removeEventListener('resize', handleResize);
  }, []); // Las dependencias vacías aseguran que el efecto se ejecute solo una vez

  return windowSize;
};


export default useResponsive;