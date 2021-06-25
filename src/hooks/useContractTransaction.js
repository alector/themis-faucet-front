import { useToast } from "@chakra-ui/react"
import { useEffect, useState } from "react"

const useContractTransaction3 = message => {
  // let tx
  const [txLoading, setTxLoading] = useState(false)
  const [promise, setPromise] = useState(null)
  const toast = useToast()

  const setTransaction = async message => {
    try {
      setTxLoading(prev => true)

      const tx = await promise
      await tx.wait()
      setTxLoading(prev => false)

      // const tx = {}
      // tx.hash = "blabla"

      toast({
        title: "Confirmed transaction",
        description: `${message}. \nTransaction hash: ${tx.hash}`,
        status: "success",
        duration: 9000,
        isClosable: true
      })
    } catch (e) {
      setTxLoading(prev => false)
      console.log(e.message)

      if (e.code === 4001) {
        console.log("ERROR 4001", e.message)
        toast({
          title: "Transaction signature denied",
          description: "You denied transaction signature.",
          status: "error",
          duration: 9000,
          isClosable: true
        })
      }
    }
  }

  // useEffect(() => {
  //   console.log(">>>> audomatic print:", txLoading)
  // }, [txLoading])

  useEffect(() => {
    if (promise) {
      // setTxLoading(true)
      setTransaction(promise, message)
    } else {
      setTxLoading(false)
    }
  }, [promise])

  return [txLoading, setPromise]
}

export default useContractTransaction3
