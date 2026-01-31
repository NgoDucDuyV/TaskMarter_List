import { RouterProvider } from "react-router-dom"
import { router } from "./app/router"
import { createContext } from "react";

function App() {

  return (
    <>
        <RouterProvider router={router} />
    </>
  )
}

export default App
