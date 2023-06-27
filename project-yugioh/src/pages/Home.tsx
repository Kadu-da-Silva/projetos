import { useContext } from "react";
import Header from "../components/Header";
import YugiohContext from "../context/YugiohContext";

export default function Home() {
  const { loading } = useContext(YugiohContext)

  if (loading) return <div>Loading...</div>

  return (
    <>
      <Header />
    </>
  )
}
