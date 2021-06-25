import { useState, useEffect, useContext } from "react"
import { Web3Context } from "web3-hooks"
import { ethers } from "ethers"
const useCoinRead = ({ coin }) => {
  const [web3State] = useContext(Web3Context)
  const [isLoading, setIsLoading] = useState(false)
  const [coinTotalSupply, setTotalSupply] = useState(0)
  const [coinOwner, setOwner] = useState(0)
  const [coinAddress, setCoinAddress] = useState(0)
  const [signerBalance, setSignerBalance] = useState(0)
  const [contractBalance, setContractBalance] = useState(0)

  useEffect(() => {
    if (coin) {
      const getCoinState = async () => {
        try {
          setIsLoading(true)

          let owner = await coin.owner()
          setOwner(prev => owner)

          let total = await coin.totalSupply()
          setTotalSupply(prev => total.toString())

          let addr = await coin.address
          setCoinAddress(prev => addr)

          let signer = await coin.signer
          let sbalance = await signer.getBalance()
          setSignerBalance(prev => sbalance.toString())

          let provider = await coin.provider
          let cbalance = await provider.getBalance()
          setContractBalance(prev => cbalance.toString())

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

  return { isLoading, coinOwner, coinTotalSupply, coinAddress, signerBalance, contractBalance }
}

export default useCoinRead
