import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import "./stylesheets/alignment.css";
import "./stylesheets/sizes.css";
import "./stylesheets/form-elements.css";
import "./stylesheets/custom.css";
import "./stylesheets/theme.css";
import ProtectedRoute from "./components/ProtectedRoute";
import {useSelector} from "react-redux";
import Profile from "./pages/Profile";
import Admin from "./pages/Admin";
import TheatresForMovie from "./pages/TheatresForMovie";
import BookShow from './pages/BookShow';
import Search from './pages/Search';
import Landing from './pages/Landing'
import SearchDetail from './pages/Search/SearchDetail';

function App() {
  const { loading } = useSelector((state) => state.loaders);
  return (
    <div>
        {loading && (
            <div className="loader-parent">
                <div className="loader"></div>
            </div>
        )}
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<ProtectedRoute><Landing /></ProtectedRoute>}/>
                <Route path="/search" element={<ProtectedRoute><Search /></ProtectedRoute>}/>
                <Route path="/search/:searchTerm" element={<ProtectedRoute><Search /></ProtectedRoute>}/>
                <Route path="/search/:searchTerm/:searchType" element={<ProtectedRoute><Search /></ProtectedRoute>}/>
                <Route path="/detail/:id" element={<ProtectedRoute><SearchDetail /></ProtectedRoute>}/>
                <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
                <Route path="/movie/:id" element={<ProtectedRoute><TheatresForMovie /></ProtectedRoute>} />
                <Route path="/book-show/:id" element={<ProtectedRoute><BookShow /></ProtectedRoute>} />
                <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
                <Route path="/admin" element={<ProtectedRoute><Admin /></ProtectedRoute>} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
