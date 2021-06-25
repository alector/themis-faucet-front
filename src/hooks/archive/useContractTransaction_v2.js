import { useToast } from "@chakra-ui/react"
import { useCallback, useEffect, useState } from "react"

const useContractTransaction2 = ({ promise, message }) => {
  // let tx
  const [txLoading, setTxLoading] = useState(false)

  const toast = useToast()

  // const setTransaction = useCallback(
  //   async (promise, message, setTxLoading) => {
  //     if (toast) {
  //       console.log("=========> Toast is yummy...")
  //     } else {
  //       console.log("=========> What is toast?")
  //     }

  //     if (setTxLoading) {
  //       console.log("=====> setTxLoading exists")
  //       console.log("txLoading", txLoading)
  //     }

  //     try {
  //       setTxLoading(prev => true)

  //       const tx = await promise
  //       await tx.wait()
  //       // const tx = {}
  //       // tx.hash = "blabla"

  //       setTxLoading(prev => false)
  //       toast({
  //         title: "Confirmed transaction",
  //         description: `${message}. \nTransaction hash: ${tx.hash}`,
  //         status: "success",
  //         duration: 9000,
  //         isClosable: true
  //       })
  //     } catch (e) {
  //       setTxLoading(prev => false)

  //       if (e.code === 4001) {
  //         console.log("ERROR 4001", e.message)
  //         toast({
  //           title: "Transaction signature denied",
  //           description: "You denied transaction signature.",
  //           status: "error",
  //           duration: 9000,
  //           isClosable: true
  //         })
  //       }
  //     }
  //   },
  //   [promise]
  // )

  const setTransaction = async (promise, message) => {
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
      console.log(e.message)
      setTxLoading(prev => false)

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

  return [txLoading]
}

export default useContractTransaction2
