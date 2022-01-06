import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./components/Auth/Login";
import RequireAuth from "./components/Auth/RequireAuth";
import Footer from "./components/Footer/Footer";
import GlobalStyles from "./components/GlobalStyles";
import Banner02 from "./components/HomePage/Banner/Banner02";
import Banner03 from "./components/HomePage/Banner/Banner03";
import Banner04 from "./components/HomePage/Banner/Banner04";
import HomePage from "./components/HomePage/HomePage";
import InforScan from "./components/InforScan/InforScan";
import NavBar from "./components/NavBar/NavBar";
import AuthContext from "./context/auth";
import Register from "./components/Auth/Register";
import axios from "./util/http";
import "./App.css";

function App() {
  const [authUser, setAuthUser] = useState(null);
  const [checkingAuthUserDone, setCheckingAuthUserDone] = useState(false);
  const [showGoToTop, setShowGoToTop] = useState(false);

  useEffect(() => {
    /* success token*/
    // const token = localStorage.getItem("token");
    // if (!token) {
    //   setCheckingAuthUserDone(true);
    //   return;
    // }
    axios.get("/auth/login/success", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
      })
      .then((response) => {
        setAuthUser(response.data);
        // addJwt(token);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setCheckingAuthUserDone(true);
      });
  }, []);

  const handleGoToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 1000) {
        setShowGoToTop(true);
      } else {
        setShowGoToTop(false);
      }
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  if (!checkingAuthUserDone) {
    return (
      <div className="d-flex justify-content-center align-items-center">
        Checking signed-in user status ...
      </div>
    );
  }

  return (
    <GlobalStyles>
      <div className="App">
        <AuthContext.Provider value={{ user: authUser, setUser: setAuthUser }}>
          {showGoToTop && (
            <button className="btn btn-dark goToTop" onClick={handleGoToTop}>
              Go to top
            </button>
          )}
          <NavBar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/gioi-thieu" element={<Banner02 />} />
            <Route path="/huong-dan" element={<Banner03 />} />
            <Route
              path="/tao-the/:id"
              element={
                <RequireAuth mode="navigate">
                  <Banner04 />
                </RequireAuth>
              }
            />
            <Route
              path="/thong-tin-scan/:id"
              element={
                <RequireAuth mode="navigate">
                  <InforScan />
                </RequireAuth>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
          <Footer />
        </AuthContext.Provider>
      </div>
    </GlobalStyles>
  );
}

export default App;
