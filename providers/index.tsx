import { Provider as WagmiProvider, chain, allChains } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'
import { WalletLinkConnector } from 'wagmi/connectors/walletLink'

// API key for Ethereum node
// Two popular services are Infura (infura.io) and Alchemy (alchemy.com)
const infuraId = process.env.INFURA_ID

// Chains for connectors to support
const supportedChains = [
    chain.polygonTestnetMumbai,
    chain.hardhat,
    chain.localhost
]

// Set up connectors
const connectors = ({ chainId }: { chainId?: number | undefined }) => {
    // WalletLink support code:
    // const rpcUrl =
    //     supportedChains.find((x) => x.id === chainId)?.rpcUrls?.[0]
    // if(!rpcUrl) throw new Error(`RPC URL not found for chain ${chainId}`)

    return [
        new InjectedConnector({
            chains: supportedChains,
            options: { shimDisconnect: true },
        }),
        new WalletConnectConnector({
            chains: supportedChains,
            options: {
                infuraId,
                qrcode: true,
            },
        }),
    ]
}


export const Providers = ({ children }: {
    children: any
}): JSX.Element => 
    <WagmiProvider autoConnect connectors={connectors}>
        { children }
    </WagmiProvider>;

