import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Layout from "../pages/Layout";
import List from "../pages/List/index";
import Shop from "../pages/Shop";
import LinkShopForm from "../pages/LinkPost";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Navigate to="/list" replace />}></Route>
          <Route path="/list" element={<List />}></Route>
          <Route path="/:id" element={<Shop />}></Route>
          <Route path="/linkpost" element={<LinkShopForm />}></Route>
          <Route path="/linkpost/:id/edit" element={<LinkShopForm />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
