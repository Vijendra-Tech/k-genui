import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Cookies from 'js-cookie'
import {useMsal} from '@azure/msal-react'
import {useMsalAuthentication} from '@azure/msal-react'
import { use, useEffect, useState } from 'react'
import { InteractionType } from '@azure/msal-browser'
import { fetchData } from '../auth/msgraph-data'

interface UserMenuProps {
  open: boolean
  anchorEl: SVGElement | null
  handleClose: () => void
  handleLogout: () => void
}

function UserMenu({ open, anchorEl, handleClose,handleLogout }: UserMenuProps) {
  const email = Cookies.get('email')
  const {instance} = useMsal()
  const [graphData, setGraphData] = useState<any>(null)

  const {result, error} = useMsalAuthentication(InteractionType.Popup, {
    scopes: ['user.read']
  })

  useEffect(()=>{
      if(!graphData){
         return
      }
      if(!!error){
        console.log(error)
         return
      }
      if(result){
         const {accessToken} = result;
         fetchData('https://graph.microsoft.com/v1.0/me',accessToken).then(data => {
              console.log(data);
             setGraphData(data)
         }
        ).catch(error =>console.log(error)
        )
      }
  },[graphData,result,error])
  return (
    <Menu
      id="demo-positioned-menu"
      aria-labelledby="demo-positioned-button"
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'left'
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left'
      }}
    >
      {/* <MenuItem>{email}</MenuItem> */}
      <MenuItem>{instance.getActiveAccount()?.name}</MenuItem>
      <div className='flex w-80 h-24  flex-col gap-2 px-4 border border-purple-400'>
        <p>Access Token</p>
        <pre>{result?.accessToken}</pre>
      </div>
      <MenuItem>{instance.getActiveAccount()?.username}</MenuItem>

      <MenuItem
        onClick={() => {
          instance.logoutRedirect()
        }}
        sx={{
          '&:hover': {
            backgroundColor: '#EE4B2B',
            color: 'white'
          }
        }}
      >
        Logout
      </MenuItem>
    </Menu>
  )
}

export default UserMenu
