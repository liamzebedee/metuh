metuh
=====

A generalized meta-transaction library for Ethereum-flavour chains.

 * Not overengineered like all of OpenZeppelin.
 * Inspired heavily by the Lens Dispatcher architecture.


## How it works.


```
Frontend/Dapp:
    Login
        unlock the web3 provider
        sign a piece of data
            Sign in with ethereum = I am this addy.  also here's a keypair client-side I just madeup. and timestamp/expiry.
        send to server

    Ethers
        instantiate the ethers MetaTxProvider
        provider hooks sendTx
            it takes the tx, signs it using the session keypair
            it sends that tx to a Relayer API backend

Relayer API endpoint
    receives tx
    recovers pubkey from sig/msg
    matches pubkey to 
    executes meta-tx on the contract

Contract:
    Dispatcher
        execute(bytes32 sig, address target, bytes data)
            decode metatx
            recover addy
            verify siggy
            set msg.sender to recovered address
            execute tx
```