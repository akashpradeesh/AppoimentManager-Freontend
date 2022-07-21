import Introduction from'./Introduction';
import WelcomePage from "./WelcomePage";
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import WelcomeAdmin from './WelcomeAdmin';

function App() {
  return (
    <Router>
    <Routes>
    <Route path ="/"
      element={<Introduction/>}/>
      <Route path ="/Welcome"
      element={<WelcomePage/>}/>
      <Route path ="/WelcomeAdmin"
      element={<WelcomeAdmin/>}/>
    </Routes>
</Router>
  );
}

export default App;
