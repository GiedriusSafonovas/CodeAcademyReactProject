import SongsPage from "./Pages/SongsPage";
import Header from "./Header/Header";
import {BrowserRouter, Route, Routes} from "react-router-dom";

function App() {
    return (
        <BrowserRouter>
        <div className="App">
            <Header/>
            <Routes>
                <Route path='/songlist' element={<SongsPage/>}/>
            </Routes>
        </div>
        </BrowserRouter>
    );
}

export default App;
