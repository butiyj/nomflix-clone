import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./Routes/Components/Header";
import Home from "./Routes/Home";
import Search from "./Routes/Search";
import TV from "./Routes/TV";

function App() {
  console.log("App");
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route
          path={`${process.env.PUBLIC_URL}/tv/:id/*`}
          element={<TV />}
        ></Route>
        <Route path={`${process.env.PUBLIC_URL}/tv`} element={<TV />}></Route>
        <Route
          path={`${process.env.PUBLIC_URL}/search`}
          element={<Search />}
        ></Route>

        <Route
          path={`${process.env.PUBLIC_URL}/movies/:id/*`}
          element={<Home />}
        ></Route>
        <Route path={`${process.env.PUBLIC_URL}/`} element={<Home />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
