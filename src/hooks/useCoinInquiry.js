import { useState, useEffect, useContext } from "react"
import { Web3Context } from "web3-hooks"

function useCoinInquiry(contract, type, args) {
  const [web3State] = useContext(Web3Context)
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState(0)

  useEffect(() => {
    if (contract) {
      const getCoinState = async () => {
        let find
        let myPromise
        try {
          setIsLoading(true)

          if (type === "balanceOf") {
            myPromise = contract.balanceOf(...args)
          }

          if (type === "allowance") {
            myPromise = contract.allowance(...args)
          }

          find = await myPromise
          setResult(prev => find)
        } catch (e) {
          console.log(e.message)
        } finally {
          setIsLoading(false)
        }
      }
      getCoinState()
    }
  }, [contract, type, args])

  return [isLoading, result]
}

export default useCoinInquiry
