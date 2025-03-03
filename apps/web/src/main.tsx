import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Shortener from "./pages/URLShortener.tsx";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Shortener />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
