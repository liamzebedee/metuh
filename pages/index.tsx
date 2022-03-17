import { verifyMessage } from 'ethers/lib/utils'
import { useAccount, useSignMessage, useSignTypedData } from 'wagmi'
import React from 'react'

import { useConnect } from 'wagmi'
import dynamic from 'next/dynamic'


// WORKAROUND: https://github.com/tmm/wagmi/issues/28
const WalletConnection = dynamic(() => import('@/components/wallet'), { ssr: false })


import { useRef, useState, useEffect } from 'react'
import { ethers } from 'ethers'



// All properties on a domain are optional
const domain = {
    name: 'Ether Mail',
    version: '1',
    chainId: 1,
    verifyingContract: '0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC',
}

// The named list of all type definitions
const types = {
    DispatcherAuth: [
        { name: 'wallet', type: 'address' },
        { name: 'sessionPubkey', type: 'bytes32' }
    ],
}


export const SignMessage = () => {
    // const previousMessage = useRef<string>()
    // const [message, setMessage] = useState('')
    const [{ data, error, loading }, signTypedData] = useSignTypedData()

    // const recoveredAddress = React.useMemo(() => {
    //     if (!data || !previousMessage.current) return undefined
    //     return verifyMessage(previousMessage.current, data)
    // }, [data, previousMessage])

    // return (
        
    // )

    const [{ data: accountData }, disconnect] = useAccount({
        fetchEns: true,
    })

    const [keypair, setKeypair] = useState(null)
    
    async function performAuth() {
        const wallet = ethers.Wallet.createRandom()

        const msg = {
            wallet: accountData.address,
            sessionPubkey: wallet.publicKey
        }

        console.debug(msg)

        await signTypedData({
            domain,
            types,
            value: msg
        })
    }

    useEffect(() => {
        if (accountData && keypair == null) {
            if (!loading && !error) performAuth()
        }
    }, [accountData, keypair])

    return <></>
}



export default function IndexPage() {
    return <div>
        <h1>Welcome to web3</h1>
        <WalletConnection/>
        <SignMessage/>
    </div>
}