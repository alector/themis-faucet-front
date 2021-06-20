import { useState } from "react"

const handleClickSetStorage = async (contractICO, toast) => {
  const [isLoading, setIsLoading] = useState(false)
  try {
    setIsLoading(true)
    let tx = await contractICO.faucetCoin()
    await tx.wait()
    setIsLoading(false)
    toast({
      title: "Confirmed transaction",
      description: `We faucet one Coin. \nTransaction hash: ${tx.hash}`,
      status: "success",
      duration: 9000,
      isClosable: true
    })
  } catch (e) {
    setIsLoading(false)
    if (e.code === 4001) {
      toast({
        title: "Transaction signature denied",
        description: "You denied transaction signature.",
        status: "error",
        duration: 9000,
        isClosable: true
      })
    }
    console.log(e)
  }
  return isLoading
}

export default handleClickSetStorage
