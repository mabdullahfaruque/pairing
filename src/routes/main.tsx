import { Route } from 'react-router-dom';
import { HelloPage, AboutPage, WeatherPage } from '../pages';

const MainRoutes = (
  <>
    <Route path="/" element={<HelloPage />} />
    <Route path="/about" element={<AboutPage />} />
    <Route path="/weather" element={<WeatherPage />} />
  </>
);

export { MainRoutes };
