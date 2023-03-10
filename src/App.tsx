import "./App.css";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { Home } from "./pages/Home";
import { Private } from "./pages/Private";
import { RequireAuth } from "./contexts/Auth/RequireAuth";
import { Login } from "./pages/Login";
import { useContext } from "react";
import { AuthContext } from "./contexts/Auth/AuthContext";

function App() {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  async function handleLogout() {
    await auth.signOut();
    navigate("/");
  }

  return (
    <div className="App">
      <header>
        <h1>Header do Site</h1>
        <nav>
          <Link to="/">Home</Link> <Link to="/private">Página Privada</Link>{" "}
          {auth.user && <span onClick={handleLogout}>Sair</span>}
        </nav>
      </header>
      <hr />

      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route
          path="/private"
          element={
            <RequireAuth>
              <Private />
            </RequireAuth>
          }
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
