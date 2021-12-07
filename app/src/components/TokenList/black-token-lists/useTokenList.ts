import { useEffect, useState } from 'react'
import { useEthers } from '@usedapp/core';

interface TokenList {
    name: string
    logoURI: string
    tokens: TokenInfo[]
  }

  interface TokenInfo {
    readonly chainId: number;
    readonly address: string;
    readonly name: string;
    readonly decimals: number;
    readonly symbol: string;
    readonly logoURI?: string;
    readonly tags?: string[];
    readonly extensions?: {
        readonly [key: string]: string | number | boolean | null;
    }; 
}

const tokens : TokenInfo[] = [
    {
        "chainId": 1337,
        "address": "0x9A9e71AB75e067F3a1FBdD3CFbcF4c6D66DAC570",
        "name": "BlackOne",
        "symbol": "BONE",
        "decimals": 18,
        "logoURI": ""
      },
]

export function useTokenList(tags?: string[]) {
    const { chainId } = useEthers()
    const [tokenList, setTokenList] = useState<TokenList>();

    useEffect(() => {
        setTokenList({
            name: "Black Default List",
            logoURI: "",
            tokens: (tokens as TokenInfo[]).filter((token) => {
              const sameChainId = token.chainId === chainId
              if (!tags) {
                return sameChainId
              }
              return sameChainId && token.tags && token.tags.some((tag) => tags.includes(tag))
            }),
          })
    }, [])
    
    return tokenList;
}