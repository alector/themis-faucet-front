import { useState, useEffect, useContext } from "react"
import { Web3Context } from "web3-hooks"

function useCoinRead({ coinContract }) {
  const [web3State] = useContext(Web3Context)
  const [isLoading, setIsLoading] = useState(false)
  const [totalSupply, setTotalSupply] = useState(0)
  const [owner, setOwner] = useState(0)

  useEffect(() => {
    if (coinContract) {
      const getCoinState = async () => {
        try {
          setIsLoading(true)

          let coinOwner = await coinContract.owner()
          setOwner(prev => coinOwner)

          let total = await coinContract.totalSupply()
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
  }, [coinContract, web3State.account])

  return { isLoading, owner, totalSupply }
}

export default useCoinRead
