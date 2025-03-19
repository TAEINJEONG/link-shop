import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Layout from "../pages/Layout";
import List from "../pages/List/index";
import Shop from "../pages/Shop";
import LinkPost from "../pages/LinkPost";
import LinkEdit from "../pages/LinkPost/[id]/edit";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Navigate to="/list" replace />}></Route>
          <Route path="/list" element={<List />}></Route>
          <Route path="/:id" element={<Shop />}></Route>
          <Route path="/linkpost" element={<LinkPost />}></Route>
          <Route path="/linkpost/:id/edit" element={<LinkEdit />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
