import { useState, useEffect } from "react";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import RegistryPage from './RegistryPage';
import RegisterPage from './RegisterPage';

function IndexPage() {
  const { user, setIsAuthenticated, screems, index } = useAuth();
  const [showMenu, setShowMenu] = useState(false);
  const [selectedContent, setSelectedContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  index();
  useEffect(() => {
    //console.log("->screems: ", screems);
    //console.log("->user: ", user);
    setTimeout(() => {
      setLoading(false); // Once the data is loaded, set loading to "false"
    }, 1000);
  }, [index, screems, user]);

  if (loading) {
    return <div>Cargando datos...</div>;
  }

  const toggleMenu = () => {
    setShowMenu((prevShowMenu) => !prevShowMenu);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    navigate("/login");
  };

  const handleLinkClick = (content) => {
    setSelectedContent(content);
  };

  return (
<div className="flex h-screen">
    {/* Menú hamburguesa */}
    <div className="black flex-none" style={{ zIndex: 1 }}> 
        <button
          className="block lg:hidden p-2 rounded-md bg-blue-500 text-white mt-4"
          onClick={toggleMenu} // Al hacer clic en este botón, se mostrará u ocultará el menú
          style={{ outline: 'none' }}
        >
          ☰
        </button>
      </div>

    {/* Contenido del menú */}
    {showMenu && (
      <div className="bg-sky-400 p-4 flex flex-col">
        <h1 className="text-3xl font-bold underline">Menu de pantallas</h1>
        <p>Username: {user.username}</p>
        {/* Aquí puedes mostrar otros datos del usuario */}
        <ul className="pl-4">
          {screems.pantallas.map((pantalla, index) => (
            <li key={index}>
              <a
                href="#"
                onClick={() => handleLinkClick(pantalla.name)}
                className="text-blue-500 hover:underline"
              >
                {pantalla.name}
              </a>
            </li>
          ))}
        </ul>
        <button onClick={handleLogout} className="bg-red-500 text-white mt-4 px-4 py-2 rounded-md">
          Salir
        </button>
      </div>
    )}

    {/* Main Content */}
    <div className="flex-grow p-4">
      {selectedContent ? (
        // Render the content of the selected link
        selectedContent === 'registroRutas' ? (
          // Show the RegistryTable component when the selectedContent is "registro"
          <RegistryPage />
        ) : selectedContent === 'Registro' ? (
          // Show the UserRegistry component when the selectedContent is "registrousuarios"
          <RegisterPage />
        ) : (
          // Add your logic here to display the appropriate content based on the selectedContent
          <div>
            <h2>Content of {selectedContent}</h2>
            {/* Other content based on the selected link */}
          </div>
        )
      ) : (
        // Default content when no link is selected
        <div>
          <h2>Welcome!</h2>
          <p>Please select a link from the menu.</p>
        </div>
      )}
    </div>
  </div>

  
  
  );
}

export default IndexPage;
