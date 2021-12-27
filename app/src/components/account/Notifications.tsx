import React, { useEffect } from 'react'
import { useNotifications, shortenAddress } from '@usedapp/core'
import { useToast, UseToastOptions } from '@chakra-ui/react'

const Notifications = () => {

    const { notifications, /*addNotification, removeNotification*/ } = useNotifications()
    const toast = useToast()

    const toasConfig: UseToastOptions = {
        duration: 5000,
        isClosable: true,
        position: 'bottom-right',
        status: 'info', //['success', 'error', 'warning', 'info']
        title: 'Info'
    }

    useEffect(() => {
        notifications.map((notification) => {

            switch(notification.type){
                case 'walletConnected':
                    toast({
                        ...toasConfig,
                        description: `Wallet ${shortenAddress(notification.address)} connected`,                 
                      });
                    break;
                case 'transactionStarted':
                    toast({
                        ...toasConfig,
                        description: `Transaction ${notification.transactionName} started`,                 
                      });
                    break
                case 'transactionSucceed':
                    toast({
                        ...toasConfig,
                        description: `Transaction ${notification.transactionName} succeed`,        
                        status: 'success',   
                        title: 'Success'       
                      });
                    break
                case 'transactionFailed':
                    toast({
                        ...toasConfig,
                        description: `Transaction ${notification.transactionName} failed`,        
                        status: 'error',     
                        title: 'Error'    
                      });
                    break
                default:
                    break;
            }
        })
      }, [notifications]);

    return (
        <></>
    )
}

export default Notifications