import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "../pages/Layout";
import ShopList from "../pages/ShopList/index";
import ShopDetail from "../pages/ShopDetail";
import ShopForm from "../pages/ShopForm";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/list" element={<ShopList />}></Route>
          <Route path="/:id" element={<ShopDetail />}></Route>
          <Route path="/linkpost" element={<ShopForm />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
