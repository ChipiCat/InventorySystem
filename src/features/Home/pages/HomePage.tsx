import { Button } from "../../../shared/components";

const HomePage = () => {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Home Page</h1>
        <p className="text-gray-600 dark:text-gray-400">Bienvenido a la página de inicio del Sistema de Inventario.</p>
      </div>
      
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6">
            <h3 className="text-lg font-semibold">Productos</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Gestiona tu inventario de productos</p>
            <Button className="mt-4">Ver Productos</Button>
          </div>
          
          <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6">
            <h3 className="text-lg font-semibold">Categorías</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Organiza tus productos por categorías</p>
            <Button variant="outline" className="mt-4">Ver Categorías</Button>
          </div>
          
          <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6">
            <h3 className="text-lg font-semibold">Reportes</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Analiza tu inventario con reportes detallados</p>
            <Button variant="secondary" className="mt-4">Ver Reportes</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
