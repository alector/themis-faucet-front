import React, { useEffect } from "react"
import { contextCoin } from "../context/ContextWrapper"
import { ThemisCoinAddress } from "../contracts/ThemisCoin"

import { Web3Context } from "web3-hooks"
import { useState, useContext } from "react"
import useCoinRead from "../hooks/useCoinRead"
import useCoinInquiry from "../hooks/useCoinInquiry"
import Faucet from "./Faucet"
import { Alert, AlertIcon, Input, Button, Flex, Spacer, Heading, Text, HStack, Spinner, useToast, useDisclosure } from "@chakra-ui/react"

const Coin = () => {
  const [web3State, login] = useContext(Web3Context)
  const coin = useContext(contextCoin)

  // find all read-only state properties (without need of enquiry)
  const { coinOwner, coinTotalSupply, coinAddress } = useCoinRead({ coin })

  // Inquiry coin state for balanceOf or alowance
  const [inquiryLoading, myTokenBalance] = useCoinInquiry(coin, "balanceOf", [web3State.account])
  const toast = useToast()

  const handleToast = async () => {
    toast({
      title: "Confirmed transaction",
      description: `storage is set wiht value: blabla\nTransaction hash: blabla`,
      status: "success",
      duration: 9000,
      isClosable: true
    })
  }
  return (
    <>
      <Faucet />
      <div>My TMC balance {myTokenBalance.toString()} </div>

      <div className="text-lg mt-10">Info about TMC</div>
      <div>Coin owner is {coinOwner} </div>
      <div>Coin Total supply is {coinTotalSupply} </div>
      <div>Coin address {coinAddress} </div>

      <button className="p-5 bg-red-500 text-white" onClick={handleToast}>
        Simple Toast
      </button>
    </>
  )
}

export default Coin
