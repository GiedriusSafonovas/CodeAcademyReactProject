import Header from "./Header/Header";
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import store from "./Redux/store";
import "./Translation"
import Pages from "./Pages";

function App() {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <div className="App">
                    <Header/>
                    <Pages/>
                </div>
            </BrowserRouter>
        </Provider>
    );
}

export default App;
