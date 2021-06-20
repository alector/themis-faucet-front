import { useToast } from "@chakra-ui/react"
import { useCallback, useEffect, useState } from "react"

const useContractTransaction = promise => {
  let tx
  const [Loading, setLoading] = useState(false)
  const [value, setValue] = useState("started")

  const toast = useToast()

  useEffect(() => {
    const setTransaction = async (promise, setLoading, Loading, setValue, value) => {
      // console.log("inside useEffect")
      // executeCallback()

      setValue(prev => "start useEffect")
      console.log("---> value 1", value)

      try {
        setLoading(prev => true)
        setValue(prev => "start Trying")

        console.log("==========\n1. Loading should be TRUE", Loading)
        tx = await promise
        await tx.wait()
        setLoading(prev => false)
        console.log("2. Loading should be FALSE", Loading)

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
        setLoading(prev => false)
        console.log("3. Loading should be FALSE", Loading)

        if (e.code === 4001) {
          toast({
            title: "Transaction signature denied",
            description: "You denied transaction signature.",
            status: "error",
            duration: 9000,
            isClosable: true
          })
        }
        setLoading(prev => false)
        console.log("4. Loading should be FALSE", Loading)

        console.log(e)
      }
    }

    if (promise) {
      setTransaction(promise, setLoading, Loading, setValue, value)
    } else {
      setLoading(false)
    }
  }, [promise])

  return { Loading, value }
}

export default useContractTransaction
