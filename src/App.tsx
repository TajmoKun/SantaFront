import {BrowserRouter, Routes, Route, Link} from "react-router-dom";
import EntryList from "./components/EntryList";
import WishList from "./components/WishList";

function App(){
  return (<>
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<EntryList/>}/>
      <Route path='/secretSanta/:memberId' element={<WishList/>}/>
    </Routes>
  </BrowserRouter>
  </>);
}

export default App;