import {BrowserRouter, Routes, Route} from 'react-router-dom';
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
import Home from './pages/Home'
import SearchDetail from './pages/Search/SearchDetail';
import OtherProfile from './pages/Profile/OtherProfile';
import Movie from './pages/Movie';

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
                <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>}/>
                <Route path="/search" element={<ProtectedRoute><Search /></ProtectedRoute>}/>
                <Route path="/search/:searchTerm" element={<ProtectedRoute><Search /></ProtectedRoute>}/>
                <Route path="/search/:searchTerm/:searchType" element={<ProtectedRoute><Search /></ProtectedRoute>}/>
                <Route path="/detail/:id" element={<ProtectedRoute><SearchDetail /></ProtectedRoute>}/>
                <Route path="/movie" element={<ProtectedRoute><Movie /></ProtectedRoute>} />
                <Route path="/movie/:id" element={<ProtectedRoute><TheatresForMovie /></ProtectedRoute>} />
                <Route path="/book-show/:id" element={<ProtectedRoute><BookShow /></ProtectedRoute>} />
                <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
                <Route path="/profile/:id" element={<ProtectedRoute><OtherProfile /></ProtectedRoute>} />
                <Route path="/admin" element={<ProtectedRoute><Admin /></ProtectedRoute>} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
