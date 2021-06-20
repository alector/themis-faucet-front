import { useState, useEffect, useContext } from "react"
import { Web3Context } from "web3-hooks"

const useCoinRead = ({ coin }) => {
  const [web3State] = useContext(Web3Context)
  const [isLoading, setIsLoading] = useState(false)
  const [coinTotalSupply, setTotalSupply] = useState(0)
  const [coinOwner, setOwner] = useState(0)

  useEffect(() => {
    if (coin) {
      const getCoinState = async () => {
        try {
          setIsLoading(true)

          let coinOwner = await coin.owner()
          setOwner(prev => coinOwner)

          let total = await coin.totalSupply()
          setTotalSupply(prev => total.toString())

          // let myTokenBalance = await coin.balanceOf(web3State.account)
          // setTokenBalance(prev => myTokenBalance)
        } catch (e) {
          console.log(e.message)
        } finally {
          setIsLoading(false)
        }
      }
      getCoinState()
    }
  }, [coin, web3State.account])

  return { isLoading, coinOwner, coinTotalSupply }
}

export default useCoinRead
