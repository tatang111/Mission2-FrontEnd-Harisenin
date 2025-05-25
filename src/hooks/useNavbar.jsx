import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const useNavbar = () => {
  const [showPofile, setShowProfile] = useState(false);
  const [isSubscribe, setIsSubscribe] = useState(() => {
    const saved = localStorage.getItem("isSubscribe");
    return saved ? JSON.parse(saved) : null;
  });
  const navigate = useNavigate();
  const location = useLocation();

  const handleShowProfile = () => {
    setShowProfile(!showPofile);
  };

  const handleUbahPremium = () => {
    if (isSubscribe) return;
    navigate("/langganan");
  };

  const handleKeluar = () => {
    localStorage.setItem("infoUser", JSON.stringify(""));
    navigate("/");
  };

  return {
    showPofile,
    location,
    handleShowProfile,
    handleUbahPremium,
    handleKeluar,
  };
};
