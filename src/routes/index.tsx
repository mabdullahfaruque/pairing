import { Routes } from 'react-router-dom';
import { MainRoutes } from './main';

// mainRoutes should be an array or fragment of <Route> elements
const AppRoutes = () => (
  <Routes>
    {MainRoutes}
  </Routes>
);

export { AppRoutes };
