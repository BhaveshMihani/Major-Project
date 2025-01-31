import { Routes, Route } from "react-router-dom";
import HomePage from "./Pages/home/HomePage";

import AuthCallBackPage from "./Pages/auth-callback/AuthCallBackPage";
import { AuthenticateWithRedirectCallback } from "@clerk/clerk-react";
import MainLayout from "./layout/MainLayout";
import ChatPage from "./Pages/chat/ChatPage";
import AlbumPage from "./Pages/album/AlbumPage";
import AdminPage from "./Pages/admin/AdminPage";

function App() {
  //token=>

  return (
    <>
      <Routes>
        <Route
          path="/sso-callback"
          element={
            <AuthenticateWithRedirectCallback
              signInForceRedirectUrl={"/auth-callback"}
            />
          }
        />

        <Route path="/auth-callback" element={<AuthCallBackPage />} />

        <Route path="/admin" element={<AdminPage />} />

        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/albums/:albumId" element={<AlbumPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
