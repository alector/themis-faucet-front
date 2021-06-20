import React from "react"
import { ThemisCoinAddress, ThemisCoinAbi } from "../contracts/ThemisCoin"
import { ThemisIcoAddress, ThemisIcoAbi } from "../contracts/ThemisICO"
// import { Web3Provider } from "web3-hooks"
import { useContract } from "web3-hooks"

export const contextCoin = React.createContext(null)
export const contextIco = React.createContext(null)

const ContextWrapper = props => {
  const myCoin = useContract(ThemisCoinAddress, ThemisCoinAbi)
  const myICO = useContract(ThemisIcoAddress, ThemisIcoAbi)

  return (
    <contextCoin.Provider value={myCoin}>
      <contextIco.Provider value={myICO}>
        <div>{props.children}</div>
      </contextIco.Provider>
    </contextCoin.Provider>
  )
}

export default ContextWrapper
