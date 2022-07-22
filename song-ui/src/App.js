import SongsPage from "./Pages/SongsPage";
import Header from "./Header/Header";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import AddSong from "./Pages/AddSong";
import UpdateSong from "./Pages/UpdateSong";
import {Provider} from "react-redux";
import store from "./Redux/store";

function App() {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <div className="App">
                    <Header/>
                    <Routes>
                        <Route path='/songlist' element={<SongsPage/>}/>
                        <Route path='/addsong' element={<AddSong/>}/>
                        <Route path='/updatesong' element={<UpdateSong/>}/>
                    </Routes>
                </div>
            </BrowserRouter>
        </Provider>
    );
}

export default App;
