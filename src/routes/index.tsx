import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "../pages/Layout";
import List from "../pages/List/index";
import Shop from "../pages/Shop";
import LinkPost from "../pages/LinkPost";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/list" element={<List />}></Route>
          <Route path="/:id" element={<Shop />}></Route>
          <Route path="/linkpost" element={<LinkPost />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
