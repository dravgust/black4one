import React from 'react'
import { useTransactions, shortenTransactionHash } from '@usedapp/core'

const Transactions = () => {

    const { transactions } = useTransactions()

    return(
        <>
            {transactions.map((tx, index) => (
                <div key={index}>
                    {shortenTransactionHash(tx.transaction.hash)}
                </div>
            ))}
        </>
    )
}

export default Transactions