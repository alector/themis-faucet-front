import React from "react"
import { useEffect } from "react"

const FaucetBtn = ({ isLoading, text, loadingText }) => {
  useEffect(() => {
    console.log("isLoaded inside FaucetBtn", isLoading)
  }, [isLoading])

  return (
    <>
      <div className="w-full p-8 flex flex-col justify-center items-center ">
        {isLoading && (
          <>
            <div className=" animate-ping h-6 w-6 rounded-full bg-blue-500 mb-4 "></div>
            <button className="w-1/2 p-4 bg-blue-100 text-white rounded-md w-50">{loadingText}</button>
          </>
        )}

        {!isLoading && (
          <>
            <div className=" h-6 w-6 rounded-full bg-blue-500 mb-4 bg-opacity-0"></div>
            <button className="w-1/2 p-4 bg-blue-400 text-white rounded-md">{text}</button>
          </>
        )}
      </div>
    </>
  )
}

export default FaucetBtn
