import { useAccount, useConnect } from "wagmi"

const WalletConnection = () => {
    const [{ data: connectData, error: connectError }, connect] = useConnect()
    const [{ data: accountData }, disconnect] = useAccount({
        fetchEns: true,
    })

    if (accountData) {
        return (
            <div>
                <img src={accountData.ens?.avatar} alt="ENS Avatar" />
                <div>
                    {accountData.ens?.name
                        ? `${accountData.ens?.name} (${accountData.address})`
                        : accountData.address}
                </div>
                <div>Connected to {accountData.connector.name}</div>
                <button onClick={disconnect}>Disconnect</button>
            </div>
        )
    }


    return (
        <div>
            {connectData.connectors.map((connector) => (
                <button
                    disabled={!connector.ready}
                    key={connector.id}
                    onClick={() => connect(connector)}
                >
                    {connector.name}
                    {!connector.ready && ' (unsupported)'}
                </button>
            ))}

            {connectError && <div>{connectError?.message ?? 'Failed to connect'}</div>}
        </div>
    )
}

export default WalletConnection