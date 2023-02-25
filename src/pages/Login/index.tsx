import { ChangeEvent, FormEvent, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/Auth/AuthContext";

const initialState = {
  email: "",
  password: "",
};

export function Login() {
  const [userData, setUserData] = useState(initialState);

  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;

    setUserData({ ...userData, [name]: value });
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (userData.email && userData.password) {
      const isLogger = await auth.signIn(userData.email, userData.password);
      if (isLogger) {
        navigate("/");
      } else {
        alert("Não deu certo");
      }
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>Email</div>
      <input
        type="email"
        name="email"
        value={userData.email}
        placeholder="Digite seu email"
        onChange={handleChange}
        required
      />
      <div>Senha</div>
      <input
        type="password"
        name="password"
        value={userData.password}
        placeholder="Digite sua senha"
        onChange={handleChange}
        required
      />

      <button type="submit">Logar</button>
    </form>
  );
}
