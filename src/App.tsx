import './App.css'
import { loginRequest } from './auth/auth-config'
import LoginForm from './components/login-form'
import Router from './router'
import {AuthenticatedTemplate,UnauthenticatedTemplate,useMsal,MsalProvider} from '@azure/msal-react'

const WrappedApp = () => {
    const {instance} = useMsal()
    const activeAccount = instance.getActiveAccount()
    
    const handleRedirect  = () => {
      instance.loginRedirect({
        ...loginRequest,
        prompt: 'create'
      }).catch(e => {
         console.log(e);
         
      })
    }
   
    return (
      <div>
        <AuthenticatedTemplate>
          {
            activeAccount ?   <Router /> : null
          }
         
        </AuthenticatedTemplate>
        <UnauthenticatedTemplate>
         <LoginForm handleSSO={handleRedirect}/>
        </UnauthenticatedTemplate>
      </div>
    )

}

function App({instance}:{instance:any}) {
  return (
    <MsalProvider instance={instance}>
      <WrappedApp />
    </MsalProvider>
  )
}

export default App
