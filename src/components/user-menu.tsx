import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Cookies from 'js-cookie'

interface UserMenuProps {
  open: boolean
  anchorEl: SVGElement | null
  handleClose: () => void
  handleLogout: () => void
}

function UserMenu({ open, anchorEl, handleClose,handleLogout }: UserMenuProps) {
  const email = Cookies.get('email')
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
        <MenuItem>{email}</MenuItem>
        <MenuItem
          onClick={handleLogout}
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
