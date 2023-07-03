import { useContext, useEffect } from "react";
import Header from "../components/Header";
import YugiohContext from "../context/YugiohContext";

import style from './Home.module.css'

export default function Home() {
  const { loading, error } = useContext(YugiohContext)

  useEffect(() => {
    document.title = "Yu-Gi-Oh"
  }, [])

  if (loading) return <div>Loading...</div>
  if (error) return <div>Sorry, this page is not access</div>

  return (
    <div className={style.container}>
      <Header />
    </div>
  )
}
