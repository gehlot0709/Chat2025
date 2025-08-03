import { useState } from "react";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";

export default function LoginRegisterWrapper() {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <div>
      {showLogin ? (
        <LoginPage onSwitch={() => setShowLogin(false)} />
      ) : (
        <RegisterPage onSwitch={() => setShowLogin(true)} />
      )}
    </div>
  );
}
