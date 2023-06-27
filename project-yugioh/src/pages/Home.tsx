import { useContext } from "react";
import Header from "../components/Header";
import YugiohContext from "../context/YugiohContext";

export default function Home() {
  const { loading, error } = useContext(YugiohContext)

  if (loading) return <div>Loading...</div>
  if (error) return <div>Sorry, this page is not access</div>

  return (
    <>
      <Header />
    </>
  )
}
