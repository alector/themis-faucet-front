import React, { useEffect } from "react"
import { contextCoin } from "../context/ContextWrapper"
import { ThemisCoinAddress } from "../contracts/ThemisCoin"

import { Web3Context } from "web3-hooks"
import { useState, useContext } from "react"

const Coin = () => {
  const [web3State, login] = useContext(Web3Context)
  const coin = useContext(contextCoin)
  const [coinOwner, setOwner] = useState("")
  const [totalSupply, setTotalSupply] = useState(0)
  const [myTokenBalance, setTokenBalance] = useState(0)

  useEffect(() => {
    if (coin) {
      const getCoinState = async () => {
        try {
          let owner = await coin.owner()
          setOwner(prev => owner)

          let total = await coin.totalSupply()

          // let total = 3
          setTotalSupply(prev => total.toString())

          let myTokenBalance = await coin.balanceOf(web3State.account)
          setTokenBalance(prev => myTokenBalance)
        } catch (e) {
          console.log(e.message)
        }
      }
      getCoinState()
    }
  }, [coin, web3State.account])

  return (
    <>
      <div>My TMC balance {myTokenBalance.toString()} </div>

      <div className="text-lg mt-10">Info about TMC</div>
      <div>Coin owner is {coinOwner} </div>
      <div>Coin Total supply is {totalSupply} </div>
    </>
  )
}

export default Coin
