
import { useEffect, useState } from "react"
import { useEthers, useTokenBalance } from '@usedapp/core'
import { range } from "../utils";
import { BigNumber } from "ethers";
import { DeedRepository } from '../models/DeedRepository';


type TokenProps = {
    tokenId: number,
    metadataURI: string
}

export function useTokenList(tokenRepository: DeedRepository, account: string | null | undefined) {

    const [tokens, setTokens] = useState<TokenProps[]>([])
    const { library: provider } = useEthers();

    const balanceResult = useTokenBalance(tokenRepository.getContractAddress(), account)

    useEffect(() => {
        const getTokensOfOwner = async (balance: BigNumber | undefined) => {
            if (provider && account && balance) {
                try {
                    tokenRepository.setProvider(provider)
                    //console.log("[useTokenList] balance", balance)
                    //console.log(await tokenRepository.getCurrentBlock())
                    const tokenList = await Promise.all(range(balance.toNumber()).map(async (i) => {
                        const tokenId = await tokenRepository.getTokenOfOwnerByIndex(account, i)
                        const tokenURI = await tokenRepository.getTokenURI(tokenId)
                       
                        return { 
                            tokenId: tokenId,
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