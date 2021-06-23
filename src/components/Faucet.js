import React from "react"
import { useState, useContext, useCallback } from "react"
import { Web3Context } from "web3-hooks"
import { contextCoin } from "../context/ContextWrapper"
import { ethers } from "ethers"

import { contextIco } from "../context/ContextWrapper"
import { Alert, AlertIcon, Input, Button, Flex, Spacer, Heading, Text, HStack, Spinner, useToast, useDisclosure } from "@chakra-ui/react"
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from "@chakra-ui/react"
import FaucetBtn from "./FaucetBtn"
import useContractTransaction from "../hooks/useContractTransaction"
import useContractTransaction2 from "../hooks/useContractTransaction_v2"
import useCoinRead from "../hooks/useCoinRead"

const Faucet = () => {
  const coin = useContext(contextCoin)
  const { coinAddress } = useCoinRead({ coin })

  const [txTrigger, setTrigger] = useState(0)
  const [txLoading, setTxLoading] = useState(false)

  const [web3State, login] = useContext(Web3Context)
  const contractICO = useContext(contextIco)
  const [promise, setPromise] = useState(null)
  const [promise2, setPromise2] = useState(null)
  const [promise3, setPromise3] = useState(null)

  /* ethers
            ethers.utils.formatEther(b.toString()),
`${owner} approved ${spender} for ${ethers.utils.formatEther(
            amount.toString()
  */

  const [Loading1] = useContractTransaction({ promise: promise, message: "We faucet a coin" })

  const [Loading2] = useContractTransaction2({ promise: promise2, message: "We faucet a coin" })

  const [Loading3] = useContractTransaction2({ promise: promise3, message: "1 Gwei was just transfered to an account" })

  // console.log("this is myLoading", myLoading)
  // setTxLoading(myLoading)

  const handleClickFaucet = () => {
    if (contractICO) {
      setPromise(contractICO.faucetCoin())
      console.log("hello")
    }
  }

  const handleClickFaucet2 = () => {
    if (contractICO) {
      setPromise2(prev => contractICO.faucetCoin())
    }
  }

  const handleTest = async () => {
    if (contractICO) {
      try {
        const weiValue = ethers.utils.formatEther("1000000000")
        const etherValue = ethers.utils.parseEther(weiValue)

        const tx = await web3State.signer.sendTransaction({
          to: "0x586DFCa72e32f1b5382624A689fe6078E65166F3",
          value: etherValue
        })
        await tx.wait()
      } catch (e) {
        console.log(e.message)
      }
    }
  }

  const handleTransferEther = async () => {
    const weiValue = ethers.utils.formatEther("1000000000")
    const etherValue = ethers.utils.parseEther(weiValue)

    if (contractICO) {
      setPromise3(prev =>
        web3State.signer.sendTransaction({
          to: "0x586DFCa72e32f1b5382624A689fe6078E65166F3",
          value: etherValue
        })
      )
    }
  }

  // const handleClickFaucet2 = useCallback(() => {
  //   if (contractICO) {
  //     setProm(contractICO.faucetCoin())
  //   }
  // }, [prom])

  // const handleClickFaucet = async () => {
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
      <p>is Loading {Loading1 ? "yes" : "no"}</p>
      <div className="w-full" onClick={handleClickFaucet}>
        <FaucetBtn isLoading={Loading1} text="Faucet 1 coin" loadingText="A coin is transfered..." />
      </div>

      <div className="w-full" onClick={handleClickFaucet2}>
        <FaucetBtn isLoading={Loading2} text="Faucet 1 coin (second hook)" loadingText="A coin is transfered..." />
      </div>

      <div className="w-full" onClick={handleTransferEther}>
        <FaucetBtn isLoading={Loading3} text="Donate 1 Gwei to 0x586..." loadingText="A coin is transfered..." />
      </div>
    </>
  )
}

export default Faucet
