
import { useEffect, useState } from "react"
import { Contract } from '@ethersproject/contracts'
import { useEthers, useTokenBalance } from '@usedapp/core'
import { range } from "../utils";
import { BigNumber } from "ethers";


type TokenProps = {
    tokenId: number,
    metadataURI: string
}

export function useTokenList(contract: Contract, account: string | null | undefined) {

    const [tokens, setTokens] = useState<TokenProps[]>([])
    const { library: provider } = useEthers();

    const balanceResult = useTokenBalance(contract.address, account)

    useEffect(() => {
        const getTokensOfOwner = async (balance: BigNumber | undefined) => {
            if (provider && balance) {
                try {
                    const connectedContract = contract.connect(provider);
                    //console.log("[useTokenList] balance", balance)

                    const tokenList = await Promise.all(range(balance.toNumber()).map(async (i) => {
                        const tokenId = await connectedContract['tokenOfOwnerByIndex'](account, i)
                        const tokenURI = await connectedContract['tokenURI(uint256)'](tokenId)
                       
                        return { 
                            tokenId: tokenId.toNumber(),
                             metadataURI: tokenURI
                         }
                    }))
                    //console.log("[useTokenList] tokenList", tokenList)
                    setTokens(tokenList)
                }
                catch (error) {
                    console.error(error);
                    setTokens([])
                }

            }
        }

        getTokensOfOwner(balanceResult)

    }, [provider, account, balanceResult])

    return { tokens }
}