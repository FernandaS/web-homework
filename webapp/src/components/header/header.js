import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { css } from '@emotion/core';

const styles = theme => css`
  .root {
    flex-grow: 1;
  }
  ,
  .menubutton: {
    margin-right: ${theme.spacing(2)}px;
  }
`;

export function DenseAppBar() {
  return (
    <div css={styles}>
      <AppBar position="static">
        <Toolbar variant="dense">
          <IconButton aria-label="menu" className="menubutton" color="inherit" edge="start">
            <MenuIcon />
          </IconButton>
          <Typography color="inherit" variant="h6">
            Divvy
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}
