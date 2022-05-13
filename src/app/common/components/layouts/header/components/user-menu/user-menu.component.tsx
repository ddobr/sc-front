import { Menu, MenuItem, MenuProps, withStyles } from '@material-ui/core';
import React, { useState } from 'react';
import avatar from '../../../../../../../assets/img/avatar.png';
import { logout } from '../../../../../methods/auth';
import { observer } from 'mobx-react-lite';

import styles from './user-menu.module.scss'
import { meState } from '../../../../../root-state';


const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
    marginTop: '5px'
  },
})(observer((props: MenuProps) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'left',
    }}
    transformOrigin={{
      vertical: 'top',

      horizontal: 'left',
    }}
    {...props}
  />
)));


export const UserMenu: React.FC = observer(() => {
  const userInfo = meState.profile;
  const [anchorElement, setAnchorElement] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElement(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorElement(null);
  };

  return (
    <>
      <span className={styles.userMenuWrapper} >
        <div className={styles.userMenu} onClick={e => handleClick(e)}>
          <button className={styles.name}>{userInfo?.first_name} {userInfo?.last_name}</button>
          <img alt={'Аватар'} className={styles.avatar} src={avatar}></img>
        </div>
      </span>
      <StyledMenu
        id="account-menu"
        anchorEl={anchorElement}
        keepMounted
        open={Boolean(anchorElement)}
        onClose={handleClose}
      >
        <MenuItem disableRipple onClick={() => {logout(); }}><a href='/'>Выйти</a></MenuItem>
      </StyledMenu>
    </>
  )
});
