
import './App.css'
import { BrowserRouter as Router,Routes, Route } from "react-router-dom";
import ListAuteur from './Components/Auteur/ListAuteur';
import InsertAuteur from './Components/Auteur/InsertAuteur';
import EditAuteur from './Components/Auteur/EditAuteur';
import ViewAuteur from './Components/Auteur/ViewAuteur';
import ListEditeur from './Components/Editeur/ListEditeur';
import InsertEditeur from './Components/Editeur/InsertEditeur';
import EditEditeur from './Components/Editeur/EditEditeur';
import ViewEditeur from './Components/Editeur/ViewEditeur';
import ListSpecialite from './Components/Specialite/ListSpecialite';
// import InsertSpecialite from './Components/Specialite/InsertSpecialite';
// import EditSpecialite from './Components/Specialite/EditSpecialite';
// import ViewSpecialite from './Components/Specialite/ViewSpecialite';
import ListLivre from './Components/Livre/ListLivre';
// import InsertLivre from './Components/Livre/InsertLivre';
// import EditLivre from './Components/Livre/EditLivre';
// import ViewLivre from './Components/Livre/ViewLivre';
import Menu from "./Components/Menu";
const App=() =>{
  return (
  <div>
    <Router>
    <Menu/>
      <Routes>
        <Route  path="/Auteur" element={<ListAuteur/>} />
        <Route  path="/Auteur/add" element={<InsertAuteur/>} />
        <Route  path="/Auteur/edit/:id" element={<EditAuteur />} />
        <Route path="/Auteur/view/:id" element={<ViewAuteur />} />
        <Route  path="/Editeur" element={<ListEditeur/>} />
        <Route  path="/Editeur/add" element={<InsertEditeur/>} />
        <Route  path="/Editeur/edit/:id" element={<EditEditeur />} />
        <Route path="/Editeur/view/:id" element={<ViewEditeur />} />
        <Route  path="/Specialite" element={<ListSpecialite/>} />
        {/* <Route  path="/Specialite/add" element={<InsertSpecialite/>} />
        <Route  path="/Specialite/edit/:id" element={<EditSpecialite />} />
        <Route path="/Specialite/view/:id" element={<ViewSpecialite />} /> */}
        <Route  path="/livres" element={<ListLivre/>} />
        {/* <Route  path="/Livre/add" element={<InsertLivre/>} />
        <Route  path="/Livre/edit/:id" element={<EditLivre />} />
        <Route path="/Livre/view/:id" element={<ViewLivre />} /> */}
      </Routes>
    </Router>


  </div>
  )
}
export default App;