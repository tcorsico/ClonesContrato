import * as React from "react";
import './App.css';
// Router-dom
import Layout from "./layout/Layout"
import { Routes, Route } from 'react-router-dom';
// Pages
import Home from './pages/Public/Home';
import Admin from './pages/Private/Admin/Admin';
import RequireAuth from './pages/Private/Admin/RequireAuth';
import TokenAdministrator from './pages/Private/TokenAdministrator/TokenAdministrator';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route element={<RequireAuth />}>
          <Route path="admin" element={<Admin />} />
        </Route>
        <Route path="my-tokens" element={<TokenAdministrator />} />
        <Route path="*" element={<><h1>404</h1><h3>Not found</h3></>} />
      </Route>
    </Routes>

  );
}

export default App;
