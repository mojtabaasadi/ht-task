import { useEffect, useState } from "react";
import { NavLink } from "react-router";

const links = [
  {to:'/',label:'Feed'},
  {to:'/bookmarks',label:'Bookmarks'},
]

const Header: React.FC = () => {
  const storedDarkMode = localStorage.getItem('darkMode')
  const [isDarkMode, setIsDarkMode] = useState<boolean>(storedDarkMode === 'true');

  useEffect(() => {

    const html = document.documentElement
    if (storedDarkMode === 'true' && !html.classList.contains('dark')) {
      document.documentElement.classList.add("dark");
    }
  })

  const toggleDarkMode = (newVal: boolean) => {
    if (newVal) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("darkMode", newVal.toString());
    setIsDarkMode(newVal)
  }

  return (
    <header className="dark:bg-gray-800 bg-gray-200 dark:text-white text-black p-4 flex justify-between items-center">
      <div className="flex gap-3 items-center">
        <h1 className="text-xl font-bold">Social Feed</h1>
        {links.map(link => (
        <NavLink to={link.to} key={link.label}>
          {({ isActive }) => (
            <span className={`rounded-md p-1 ${isActive ? 'bg-gray-700 dark:bg-gray-300 text-gray-200 dark:text-gray-700 ' : ''}`}>
              {link.label}
            </span>
          )}</NavLink>
        ))}
      </div>
      <button
        onClick={() => toggleDarkMode(!isDarkMode)}
        className="bg-gray-700 px-4 py-2 text-white rounded-md"
      >
        {isDarkMode ? "Light Mode" : "Dark Mode"}
      </button>
    </header>
  );
};

export default Header;
