import "react-toastify/dist/ReactToastify.css";
import { useContext } from "react";

import { BrowserRouter } from "react-router-dom";
import AuthProvider from "./contexts/auth";
import Routes from "./routes";

import { ToastContainer } from "react-toastify";
import { LocalProvider } from "./contexts/local";
import { AuthContext } from "./contexts/auth";

function App() {
  return (
    <AuthProvider>
      <LocalProvider>
        <BrowserRouter>
          <ToastContainer autoClose={2000} />
          <Routes />
        </BrowserRouter>
      </LocalProvider>
    </AuthProvider>
  );
}

export default App;
