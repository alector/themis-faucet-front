import React from "react"
import { useState, useContext } from "react"
import { Web3Context } from "web3-hooks"

import { contextIco } from "../context/ContextWrapper"
import { Alert, AlertIcon, Input, Button, Flex, Spacer, Heading, Text, HStack, Spinner, useToast, useDisclosure } from "@chakra-ui/react"
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from "@chakra-ui/react"
import FaucetBtn from "./FaucetBtn"
import useContractTransaction from "../hooks/useContractTransaction"

const Faucet = () => {
  const [txTrigger, setTrigger] = useState(0)
  const [txLoading, setTxLoading] = useState(false)

  const [web3State, login] = useContext(Web3Context)
  const contractICO = useContext(contextIco)
  const [promise, setPromise] = useState(null)
  let isLoading
  // const toast = useToast()
  // const [isLoading] = useCoinTransaction(txTrigger, contractICO, "faucetCoin")

  const { Loading, value } = useContractTransaction(promise)
  // console.log("this is myLoading", myLoading)
  // setTxLoading(myLoading)

  const handleClickFaucet = () => {
    if (contractICO) {
      setPromise(contractICO.faucetCoin())
    }

    // setTrigger(prev => 1)
    // setTrigger(0)

    // const [isLoading] = useCoinTransaction(txTrigger, contractICO, "faucetCoin")
  }

  // const handleClickSetStorage = async () => {
  //   try {
  //     setIsLoading(true)
  //     let tx = await contractICO.faucetCoin()
  //     await tx.wait()
  //     setIsLoading(false)
  //     toast({
  //       title: "Confirmed transaction",
  //       description: `We faucet one Coin. \nTransaction hash: ${tx.hash}`,
  //       status: "success",
  //       duration: 9000,
  //       isClosable: true
  //     })
  //   } catch (e) {
  //     setIsLoading(false)
  //     if (e.code === 4001) {
  //       toast({
  //         title: "Transaction signature denied",
  //         description: "You denied transaction signature.",
  //         status: "error",
  //         duration: 9000,
  //         isClosable: true
  //       })
  //     }
  //     console.log(e)
  //   }
  // }

  // const handleClick = () => {
  //   console.log("CLICKED BTN!!!")
  //   // setLoading(prev => !prev)
  //   setIsLoading(prev => true)
  //   setTimeout(() => {
  //     setIsLoading(prev => false)
  //   }, 2000)
  // }
  return (
    <>
      <div className="w-full" onClick={handleClickFaucet}>
        <p>loading: {Loading ? "Loading" : "Not Loading"}</p>
        <p>Value: {value}</p>

        <FaucetBtn isLoading={Loading} text="Faucet 1 coin" loadingText="A coin is transfered..." />
      </div>
    </>
  )
}

export default Faucet
