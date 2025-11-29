import {BrowserRouter, Routes, Route, Link} from "react-router-dom";
import EntryList from "./components/EntryList";
import WishList from "./components/WishList";

function App(){
  return (<>
  <BrowserRouter>
    <nav>
      <Link to="/">starting page</Link> | <Link to="/secretSanta">Santa</Link>
    </nav>
    <Routes>
      <Route path='/' element={<EntryList/>}/>
      <Route path='/secretSanta/:gifterId/:gifteeId' element={<WishList/>}/>
    </Routes>
  </BrowserRouter>
  </>);
}

export default App;