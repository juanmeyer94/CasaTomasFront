import { BrowserRouter as Router } from 'react-router-dom';
import useKeepAlive from './Utils/keepAlive';
import AppRoutes from './Routes/Routes';


function App() {
  useKeepAlive('https://casa-tomas-api.onrender.com/api/health');

  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}
export default App;
