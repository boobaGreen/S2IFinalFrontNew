// custom hook to manage the HOME button

import { useNavigate } from "react-router-dom";

export function useMoveHome() {
  const navigate = useNavigate();
  return () => navigate(`/home`);
}
