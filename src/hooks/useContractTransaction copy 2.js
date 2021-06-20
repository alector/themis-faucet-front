import { useToast } from "@chakra-ui/react"
import { useCallback, useEffect, useState } from "react"

const useContractTransaction = async promise => {
  let tx
  const [fLoading, setfLoading] = useState(false)
  const [value, setValue] = useState("started")

  const toast = useToast()

  useEffect(() => {
    const setTransaction = async (promise, setfLoading, fLoading, setValue, value) => {
      // console.log("inside useEffect")
      // executeCallback()

      setfLoading(true)
      setValue("1")
      console.log("---> value 1", value)

      try {
        console.log("==========\n1. Loading should be TRUE", fLoading)
        tx = await promise
        await tx.wait()
        setfLoading(prev => false)
        console.log("2. Loading should be FALSE", fLoading)

        setValue("2")
        console.log("---> value 2", value)

        toast({
          title: "Confirmed transaction",
          description: `We faucet one Coin. \nTransaction hash: ${tx.hash}`,
          status: "success",
          duration: 9000,
          isClosable: true
        })
      } catch (e) {
        setfLoading(prev => false)
        console.log("3. Loading should be FALSE", fLoading)

        if (e.code === 4001) {
          toast({
            title: "Transaction signature denied",
            description: "You denied transaction signature.",
            status: "error",
            duration: 9000,
            isClosable: true
          })
        }
        setfLoading(prev => false)
        console.log("4. Loading should be FALSE", fLoading)

        console.log(e)
      }
    }

    if (promise) {
      setTransaction(promise, setfLoading, fLoading, setValue, value)
    } else {
      setfLoading(false)
    }
  }, [promise])

  return fLoading
}

export default useContractTransaction
