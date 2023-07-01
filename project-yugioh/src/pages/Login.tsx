import { useContext, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate()
  
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
      alert("Email inválido");
      setErrorMessage("Invalid email");
      return;
    }
  
    if (!validarSenha(password)) {
      alert("Senha inválida");
      setErrorMessage("Invalid password");
      return;
    }

    // Verificar se os dados de login estão corretos
    const foundUser = user.find(
      (u) => u.email === email && u.password === password
    );

    if (foundUser) {
      console.log();
      ("Login successful!");
      navigate('/')
    } else {
      alert("Invalid email or password!");
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
      setErrorMessage("Create account Success!")
      setRenderForm(false)
    }
  }

  return (
    <div className={style.container}>
      <Header/>
      {errorMessage && renderForm && <span>{errorMessage}</span>}
      <h2>{renderForm ? 'Welcome' : 'Ready Duelist?'}</h2>
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
          {email && password && validarSenha(password) && validarEmail(email) && (
            <button
              id="btn-enter"
              type="submit"
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
        {!validarEmail(email) && email && <span>email incorrect</span>}
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        {!validarSenha(password) && password && <span>password needs six characters: &,%,$,#,@,A,1</span>}
        <input
          id="confirm-password"
          type="password"
          value={confirmPass}
          onChange={(e) => setConfirmPass(e.target.value)}
          placeholder="Confirm Password"
        />
        {confirmPass === password ? "password confirmed" : <span>password not confirmed</span>}
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
