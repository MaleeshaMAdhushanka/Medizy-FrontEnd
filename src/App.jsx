import { Routes, BrowserRouter, Route } from 'react-router-dom';
import './App.css'
import SignInPage from "./signin/SignInpage";

function App() {

  return (
     <BrowserRouter>
       <Routes>
        {/* Public router define */}
         <Route path="/" element={<SignInPage />} />


       </Routes>





     </BrowserRouter>
   
      
  );
}

export default App;
