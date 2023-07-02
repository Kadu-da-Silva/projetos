import { useContext, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import Header from "../components/Header";
import useHandleChange from "../hooks/useHandleChange";
import { validEmail, validPassword } from "../components/utils/validation";

import style from './Login.module.css'
import YugiohContext from "../context/YugiohContext";
import { User } from "../types/type";

export default function Login() {
  const [email, setEmail] = useHandleChange("")
  const [password, setPassword] = useHandleChange("")
  const [renderForm, setRenderForm] = useHandleChange(false)
  const [name, setName] = useHandleChange("")
  const [nickname, setNickname] = useHandleChange("")
  const [confirmPass, setConfirmPass] = useHandleChange("")
  const [errorMessage, setErrorMessage] = useHandleChange("");

  // Dados do LocalStorage convertidos para JSON
  const [users, setUsers] = useState<User[]>([]) // Lida com vários users

  // Estado global com os dados do usuário que logou
  const {setUser} = useContext(YugiohContext)
  const navigate = useNavigate()
  
  useEffect(() => {
    // Recuperar os dados do usuário do localStorage (se existirem) ao carregar a página
    const storedUsers = localStorage.getItem("users");
    if (storedUsers) {
      const parsedUsers = JSON.parse(storedUsers);
      setUsers(parsedUsers);
    }
  }, [setUsers]);

  const handleLogin = () => {
    // Verificar se os dados de login estão corretos
    const foundUser = users.find(
      (u) => u.email === email && u.password === password
    );

    // Verificar se existe algum usuario com os dados
    if (foundUser) {
      navigate('/')
      // Chave para iniciar sessão
      localStorage.setItem("isLoggedIn", "true");
      // Dados do usuário que logou
      const userDates = {
        nickname: foundUser.nickname,
        name: foundUser.name,
        email: foundUser.email,
        password: foundUser.password
      }
      setUser([userDates]);
    } else {
      setErrorMessage("Invalid email or password");
    }
  }

  const handleFormSubmit = () => {
    // Verificar se algum dos dados já existe
    const existingNick = users.find((u) => u.nickname === nickname);
    const existingEmail = users.find((u) => u.email === email);

    if (existingNick) {
      setErrorMessage("Nickname already exists");
    } else if (existingEmail) {
      setErrorMessage("Email already exists");
    } else {
      const newUser = {
        nickname: nickname,
        name: name,
        email: email,
        password: password,
      };

      // Adicionar o novo usuário ao localStorage
      localStorage.setItem("users", JSON.stringify([...users, newUser]));

      navigate('/')
      // Chave para iniciar sessão
      localStorage.setItem("isLoggedIn", "true");
      // Dados do usuário que logou
      setUser([newUser]);
    }
  }

  return (
    <div className={style.container}>
      <Header/>
      {errorMessage && renderForm && <span>{errorMessage}</span>}
      <h2>{renderForm ? 'Welcome' : 'Ready Duelist?'}</h2>
      {!renderForm && (
        <div className={style.containerInputs}>
          {errorMessage && <span>{errorMessage}</span>}
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
          {email && password && validPassword(password) && validEmail(email) && (
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
          {errorMessage.includes('Nickname') && <span>{errorMessage}</span>}
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
        {!validEmail(email) && email && <span>email incorrect</span>}
        {errorMessage.includes('Email') && <span>{errorMessage}</span>}
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        {!validPassword(password) && password && <span>password need more six characters and a: &,%,$,#,@,A,1</span>}
        <input
          id="confirm-password"
          type="password"
          value={confirmPass}
          onChange={(e) => setConfirmPass(e.target.value)}
          placeholder="Confirm Password"
        />
        {confirmPass && confirmPass !== password && <span>password not confirmed</span>}
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
        onClick={() => {
          setRenderForm(!renderForm)
          setNickname('')
          setName('')
          setErrorMessage('')
          setEmail('')
          setPassword('')
          setConfirmPass('')
        }}
      >
        {renderForm ? 'I have Account' : 'I haven\'t Account'}
      </button>
    </div>
  )
}
