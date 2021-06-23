import React from "react"
import { useEffect } from "react"

const FaucetBtn = ({ isLoading, text, loadingText }) => {
  // useEffect(() => {
  //   console.log("isLoaded inside FaucetBtn", isLoading)
  // }, [isLoading])

  return (
    <>
      <div className="w-full p-8 flex flex-col justify-center items-center ">
        {!isLoading && (
          <>
            <button className="flex h-12 items-center  w-1/2 p-2 bg-blue-500 text-white rounded-md ">
              <div className=" h-6 w-6 rounded-full bg-blue-200 "></div>
              <div className="pl-5  flex items-center">{text}</div>
            </button>
          </>
        )}

        {isLoading && (
          <>
            <button className="flex h-12 items-center  w-1/2 p-2 bg-blue-300 text-white rounded-md">
              <div className=" animate-ping h-6 w-6 rounded-full bg-blue-200 "></div>

              <div className="pl-5  flex items-center">{loadingText}</div>
            </button>
          </>
        )}
      </div>
    </>
  )
}

export default FaucetBtn
