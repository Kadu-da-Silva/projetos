import { useContext, useEffect } from "react";
import Header from "../components/Header";
import useHandleChange from "../hooks/useHandleChange";
import { validarEmail, validarSenha } from "../components/utils/validation";

import style from './Login.module.css'
import YugiohContext from "../context/YugiohContext";

export default function Login() {
  const [email, setEmail] = useHandleChange("")
  const [password, setPassword] = useHandleChange("")
  const [renderForm, setRenderForm] = useHandleChange(false)
  const [name, setName] = useHandleChange("")
  const [nickname, setNickname] = useHandleChange("")
  const [confirmPass, setConfirmPass] = useHandleChange("")
  const [errorMessage, setErrorMessage] = useHandleChange("");

  const {user, setUser} = useContext(YugiohContext)
  
  useEffect(() => {
    // Recuperar os dados do usuário do localStorage (se existirem) ao carregar a página
    const storedUsers = localStorage.getItem("users");
    if (storedUsers) {
      const parsedUsers = JSON.parse(storedUsers);
      setUser(parsedUsers);
    }
  }, [setUser]);

  const handleLogin = () => {
    if (!validarEmail(email)) {
      console.log("Email inválido");
      setErrorMessage("Invalid email");
      return;
    }
  
    if (!validarSenha(password)) {
      console.log("Senha inválida");
      setErrorMessage("Invalid password");
      return;
    }

    // Verificar se os dados de login estão corretos
    const foundUser = user.find(
      (u) => u.email === email && u.password === password
    );

    if (foundUser) {
      console.log("Login successful!");
      // Redirecionar o usuário para a página principal, por exemplo
    } else {
      console.log("Invalid email or password!");
      setErrorMessage("Invalid email or password");
    }
  }

  const handleFormSubmit = () => {
    if (!validarEmail(email)) {
      console.log("Email inválido");
      setErrorMessage("Invalid email");
      return;
    }
  
    if (!validarSenha(password)) {
      console.log("Senha inválida");
      setErrorMessage("Invalid password");
      return;
    }

    // Verificar se algum dos dados já existe
    const existingUser = user.find((u) => u.email === email || u.nickname === nickname);

    if (existingUser) {
      console.log("Email or nickname already exists!");
      setErrorMessage("Email or nickname already exists");
    } else {
      const newUser = {
        nickname: nickname,
        name: name,
        email: email,
        password: password,
      };

      // Adicionar o novo usuário ao estado global 'user' e ao localStorage
      setUser((prevUsers) => [...prevUsers, newUser]);
      localStorage.setItem(
        "users",
        JSON.stringify([...user, newUser])
      );
    }
  }

  return (
    <div className={style.container}>
      <Header/>
      <h2>{renderForm ? 'Welcome Duelist' : 'Duelist Ready?'}</h2>
      {!renderForm && (
        <div className={style.containerInputs}>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          {email && password && (
            <button
              id="btn-enter"
              type="submit"
              disabled={!email || !password}
              onClick={() => handleLogin() }
            >
              Let's Duel
            </button>
          )}
        </div>
      )}
      {renderForm && (
        <form action="">
          <input
          id="nickname"
          type="nickname"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          placeholder="Nickname"
        />
        <input
          id="name"
          type="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
        />
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <input
          id="confirm-password"
          type="password"
          value={confirmPass}
          onChange={(e) => setConfirmPass(e.target.value)}
          placeholder="Confirm Password"
        />
        {confirmPass !== password && confirmPass && <span>Passwords do not match.</span>}
        <button
          id="btn-submit"
          type="button"
          disabled={!nickname || !name || !email || !password || password !== confirmPass}
          onClick={() => handleFormSubmit()}
        >
          Create Account
        </button>
        </form>
      )}
      <button
        id="btn-confirm"
        type="button"
        onClick={() => setRenderForm(!renderForm)}
      >
        {renderForm ? 'I have Account' : 'I haven\'t Account'}
      </button>
    </div>
  )
}
