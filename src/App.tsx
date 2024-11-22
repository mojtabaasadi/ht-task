import React from "react";
import Header from "./components/Header";
import Feed from "./components/Feed";
import { BrowserRouter, Routes, Route } from "react-router";
import Bookmarks from "./components/Bookmark";
import "./App.css"

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <BrowserRouter>
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Feed />} />
            <Route path="/bookmarks" element={<Bookmarks />} />
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  );
};

export default App;
