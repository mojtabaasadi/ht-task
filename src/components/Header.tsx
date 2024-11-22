import { useEffect, useState } from "react";

const Header: React.FC = () => {
  const storedDarkMode = localStorage.getItem('darkMode')
  const [isDarkMode, setIsDarkMode] = useState<boolean>(storedDarkMode === 'true');

  useEffect(() => {
    const html = document.documentElement
    if(storedDarkMode === 'true' && !html.classList.contains('dark')){
      document.documentElement.classList.add("dark");
    }
  },[])

  const toggleDarkMode = (newVal:boolean) => {
    if (newVal) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("darkMode", newVal.toString());
    setIsDarkMode(newVal)
  }

  return (
    <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">Social Feed</h1>
      <button
        onClick={() => toggleDarkMode(!isDarkMode)}
        className="bg-gray-700 px-4 py-2 rounded-md"
      >
        {isDarkMode ? "Light Mode" : "Dark Mode"}
      </button>
    </header>
  );
};

export default Header;
