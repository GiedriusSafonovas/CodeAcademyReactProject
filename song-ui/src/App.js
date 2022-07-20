import SongsPage from "./Pages/SongsPage";
import Header from "./Header/Header";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import AddSong from "./Pages/AddSong";

function App() {
    return (
        <BrowserRouter>
        <div className="App">
            <Header/>
            <Routes>
                <Route path='/songlist' element={<SongsPage/>}/>
                <Route path='/addsong' element={<AddSong/>}/>
            </Routes>
        </div>
        </BrowserRouter>
    );
}

export default App;
