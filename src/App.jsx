// src/App.jsx
import { BrowserRouter } from "react-router-dom";
import BookLayout from "./components/BookLayout";

export default function App() {
  return (
    <BrowserRouter basename="/RashidaLittleChampsDayCare/">
      <BookLayout />
    </BrowserRouter>
  );
}
