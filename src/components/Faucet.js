import React from "react"
import { useState, useContext, useCallback } from "react"
import { Web3Context } from "web3-hooks"
import { contextCoin, contextIco } from "../context/ContextWrapper"
import { ethers } from "ethers"

// import { Alert, AlertIcon, Input, Button, Flex, Spacer, Heading, Text, HStack, Spinner, useToast, useDisclosure } from "@chakra-ui/react"
// import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from "@chakra-ui/react"
import FaucetBtn from "./FaucetBtn"
import useContractTransaction from "../hooks/useContractTransaction"

import useCoinRead from "../hooks/useCoinRead"

const Faucet = () => {
  const coin = useContext(contextCoin)
  const ico = useContext(contextIco)

  const { coinAddress } = useCoinRead({ coin })

  const [web3State, login] = useContext(Web3Context)
  const contractICO = useContext(contextIco)
  // const [promise, setPromise] = useState(null)
  // const [promise2, setPromise2] = useState(null)
  // const [promise3, setPromise3] = useState(null)
  // const [promise4, setPromise4] = useState(null)

  /* ethers
            ethers.utils.formatEther(b.toString()),
`${owner} approved ${spender} for ${ethers.utils.formatEther(
            amount.toString()
  */

  const [LoadingBuy, setBuyPromise] = useContractTransaction("1 Gwei was just transfered to an account")

  const [LoadingTransfer, setTransferPromise] = useContractTransaction("1 Gwei was transfered to an buy a coin")

  const [LoadingFaucet, setPromiseFaucet] = useContractTransaction("new hook for faucet")

  const handleTest1 = async () => {
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

  const handleTest2 = async () => {
    if (contractICO) {
      try {
        const weiValue = ethers.utils.formatEther("1000000000")
        const etherValue = ethers.utils.parseEther(weiValue)

        const tx = await ico.buyTokens({
          value: etherValue,
          gasLimit: "1000000"
        })
        await tx.wait()
      } catch (e) {
        console.log(e.message)
      }
    }
  }

  const handleFaucet = () => {
    if (contractICO) {
      setPromiseFaucet(prev => contractICO.faucetCoin())
    }
  }
  const handleTransferEther = async () => {
    const weiValue = ethers.utils.formatEther("1000000000")
    const etherValue = ethers.utils.parseEther(weiValue)

    if (contractICO) {
      setTransferPromise(prev =>
        web3State.signer.sendTransaction({
          to: "0x586DFCa72e32f1b5382624A689fe6078E65166F3",
          value: etherValue
        })
      )
    }
  }

  const handleBuyCoin = async () => {
    const weiValue = ethers.utils.formatEther("1000000000")
    const etherValue = ethers.utils.parseEther(weiValue)
    console.log("coinAddress", coinAddress)
    console.log("etherValue", weiValue)

    if (contractICO) {
      setBuyPromise(prev =>
        ico.buyTokens({
          value: etherValue
          // gasLimit: "1000000"
        })
      )
    }
  }

  return (
    <>
      <div className="w-full" onClick={handleFaucet}>
        <FaucetBtn isLoading={LoadingFaucet} text="Faucet 1 coin" loadingText="A coin is transfered..." />
      </div>

      <div className="w-full" onClick={handleTransferEther}>
        <FaucetBtn isLoading={LoadingTransfer} text="Donate 1 Gwei to 0x586..." loadingText="A coin is transfered..." />
      </div>

      <div className="w-full" onClick={handleBuyCoin}>
        <FaucetBtn isLoading={LoadingBuy} text="Buy 1 Token..." loadingText="A coin is bought..." />
      </div>
    </>
  )
}

export default Faucet
