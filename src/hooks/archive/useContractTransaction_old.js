import { useToast } from "@chakra-ui/react"
import { useCallback, useEffect, useState } from "react"

const useContractTransaction = ({ promise, message }) => {
  let tx
  const [Loading, setLoading] = useState(false)
  const [value, setValue] = useState("started")

  const toast = useToast()

  useEffect(() => {
    const setTransaction = async (promise, message, setLoading, Loading) => {
      try {
        setLoading(prev => true)

        tx = await promise
        await tx.wait()
        setLoading(prev => false)

        toast({
          title: "Confirmed transaction",
          description: `${message}. \nTransaction hash: ${tx.hash}`,
          status: "success",
          duration: 9000,
          isClosable: true
        })
      } catch (e) {
        setLoading(prev => false)
        console.log(e.message)

        if (e.code === 4001) {
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

    if (promise) {
      setTransaction(promise, message, setLoading, Loading, setValue, value)
    } else {
      setLoading(false)
    }
  }, [promise])

  return [Loading]
}

export default useContractTransaction
