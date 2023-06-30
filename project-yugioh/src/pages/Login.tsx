import Header from "../components/Header";
import useHandleChange from "../hooks/useHandleChange";

import style from './Login.module.css'

export default function Login() {
  const [email, setEmail] = useHandleChange("")
  const [password, setPassword] = useHandleChange("")
  const [renderForm, setRenderForm] = useHandleChange(false)
  const [name, setName] = useHandleChange("")
  const [nickname, setNickname] = useHandleChange("")
  const [confirmPass, setConfirmPass] = useHandleChange(false)

  const handleEnter = () => {
    console.log('login');
  }

  const handleFormSubmit = () => {
    console.log('new user');
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
              onClick={() => handleEnter() }
            >
              Let\'s Duel
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
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Confirm Password"
        />
        <button
          id="btn-submit"
          type="submit"
          disabled={!nickname || !name || !email || !password}
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
