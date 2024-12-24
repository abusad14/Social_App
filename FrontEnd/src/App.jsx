import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Profile from "./components/Profile";
import UpdateProfile from "./components/UpdateProfile";
import DeleteProfile from "./components/DeleteProfile";
import PostPage from "./components/PostPage";
import OthersProfile from "./components/OthersProfile";

const App = () => {
  const routes = createBrowserRouter([
    { path: "/", element: <Signup /> },
    { path: "/profile/my/:id", element: <Profile /> },
    { path: "/profile/:id", element: <OthersProfile /> },
    { path: "/profile/delete/:id", element: <DeleteProfile /> },
    { path: "/profile/update/:id", element: <UpdateProfile /> },
    { path: "/login", element: <Login /> },
    { path: "/home", element: <Home /> },
    { path: "/home/sharePost", element: <PostPage /> },
  ]);
  return (
    <>
      <RouterProvider router={routes}></RouterProvider>
      {/* <UpdateProfile /> */}
    </>
  );
};

export default App;
