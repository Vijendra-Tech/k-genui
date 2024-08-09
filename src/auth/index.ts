import {PublicClientApplication, EventType, AccountInfo} from '@azure/msal-browser'

import {msalConfig} from './auth-config'

const msalInstance = new PublicClientApplication(msalConfig)

if(!msalInstance.getActiveAccount() && msalInstance.getAllAccounts().length > 0) {
  msalInstance.handleRedirectPromise().then(() => {
    const account = msalInstance.getActiveAccount()
    if(account) {
      msalInstance.setActiveAccount(account)
    }
  })
}

msalInstance.addEventCallback((event) => {
    if(event.eventType === EventType.LOGIN_SUCCESS && event.payload) {
        console.log('login success', event)
        const account = event.payload as AccountInfo
        msalInstance.setActiveAccount(account)
    }
})

export {msalInstance}
