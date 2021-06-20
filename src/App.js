import "./App.css"
import ContextWrapper from "./context/ContextWrapper"
import { Web3Context } from "web3-hooks"
import { useContext, useState } from "react"
import Coin from "./components/Coin"

function App() {
  const [web3State, login] = useContext(Web3Context)

  const addressPreview = addr => {
    if (addr) {
      const preview = addr.slice(0, 7) + "..." + addr.slice(37, 41)
      return preview.toUpperCase()
    }

    return ""
  }

  const balancePreview = bal => {
    if (bal.length >= 5) {
      return bal.slice(0, 5)
    }

    return bal
  }

  return (
    <div className="App">
      <div className="header h-15 p-5 h-full   bg-blue-500  flex items-center ">
        <div className="left flex-auto flex justify-start">
          <div>Themis Coin</div>
        </div>
        <div className="right flex text-white">
          {!web3State.isLogged && (
            <button onClick={login} className="p-2 w-60 bg-red-400 w-30 flex justify-center items-center rounded-md text-white text-lg font-bold hover:bg-red-600 text-center ">
              Login
            </button>
          )}

          {web3State.isLogged && (
            <>
              <div className="p-3">
                {web3State.networkName} (id:{web3State.chainId}){" "}
              </div>

              <div className="p-3"> Ether: {balancePreview(web3State.balance)}</div>

              <div className=" p-3 ">My account: {addressPreview(web3State.account)}</div>
            </>
          )}
        </div>
      </div>

      {web3State.isLogged && (
        <section className="h-screen bg-gray-100 flex flex-col justify-center items-center">
          <Coin />
        </section>
      )}
    </div>
  )
}

export default App
