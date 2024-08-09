import {LogLevel} from '@azure/msal-browser';

export const msalConfig = {
  auth: {
    clientId: '5f202171-eb43-47d3-b43e-fdb3b4bfc4c1',
    authority:
      'https://login.microsoftonline.com/761d8139-1fe3-4ce3-972b-a8e08e80028f',
    redirectUri: 'http://localhost:5173',
    postLogoutRedirectUri: 'http://localhost:5173/login',
    navigateToLoginRequestUrl: false
  },
  cache: {
    cacheLocation: 'sessionStorage',
    storeAuthStateInCookie: false
  },
  system: {
    loggerOptions: {
      loggerCallback: (
        level: LogLevel,
        message: string,
        containsPii: boolean
      ) => {
        if (containsPii) {
          return
        }
        switch (level) {
          case LogLevel.Error:
            console.error(message)
            return
          case LogLevel.Info:
            console.info(message)
            return
          case LogLevel.Verbose:
            console.debug(message)
            return
          case LogLevel.Warning:
            console.warn(message)
            return
        }
      },
      logLevel: LogLevel.Verbose
    }
  }
}

export const loginRequest = {
    scopes:['user.read']
}