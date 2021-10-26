import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Home } from './pages/home';
import { Transactions } from './pages/transactions';
import { AddTransaction } from './pages/transactions/new-transaction-page';
import { EditTransaction } from './pages/transactions/edit-transaction-page';
import { css } from '@emotion/core';
import { ThemeProvider } from 'emotion-theming';

import cn from 'classnames';
import { createTheme, ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Container from '@material-ui/core/Container';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

import { mainListItems } from './components/listItems';

import { RomanNumeralProvider } from './contexts/number-conversion-context';
import { I18nProvider } from './contexts/i18n-context';
import { useTranslation } from 'react-i18next';

const theme = createTheme({});
const drawerWidth = 240;

const styles = theme => css`
  .root {
    display: flex;
  }

  .toolbar {
    padding-right: 24px;
  }

  .toolbarIcon {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding: 0 8px;
    ${theme.mixins.toolbar}
  }

  .appBar {
    z-index: ${theme.zIndex.drawer + 1};
    transition: ${theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })};
  }

  .appBarShift {
    margin-left: (${drawerWidth}px);
    width: calc(100% - ${drawerWidth}px);
    transition: ${theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })};
  }

  .menuButton {
    margin-right: 36px;
  }

  .menuButtonHidden {
    display: none;
  }

  .title {
    flex-grow: 1;
  }

  .drawerPaper {
    position: relative;
    whitespace: nowrap;
    width: ${drawerWidth}px;
    transition: ${theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })};
  }

  .drawerPaperClose {
    overflow-x: hidden;
    transition: ${theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })};
    width: ${theme.spacing(7)}px;
    ${theme.breakpoints.up('sm')} {
      width: ${theme.spacing(9)}px;
    }
  }

  .appBarSpacer {
    ${theme.mixins.toolbar}
  }

  .content {
    flex-grow: 1;
    height: 100vh;
    overflow: auto;
  }

  .container {
    padding-top: ${theme.spacing(4)}px;
    padding-bottom: ${theme.spacing(4)}px;
  }

  .paper {
    padding: ${theme.spacing(2)}px;
    display: flex;
    overflow: auto;
    flex-direction: column;
  }

  .fixedHeight {
    height: 240px;
  }
`;

function AppRouter() {
  const [open, setOpen] = React.useState(true);
  const { t } = useTranslation();

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Router>
      <MuiThemeProvider theme={theme}>
        <ThemeProvider theme={theme}>
          <RomanNumeralProvider>
            <I18nProvider>
              <div css={styles} style={{ display: 'flex' }}>
                <CssBaseline />
                <AppBar className={cn('appBar', { appBarShift: open })} position="absolute">
                  <Toolbar className="toolbar">
                    <IconButton
                      aria-label="open drawer"
                      className={cn('menuButton', { menuButtonHidden: open })}
                      color="inherit"
                      edge="start"
                      onClick={handleDrawerOpen}
                    >
                      <MenuIcon />
                    </IconButton>
                    <Typography className="title" color="inherit" component="h1" noWrap variant="h6">
                      Divvy
                    </Typography>
                  </Toolbar>
                </AppBar>
                <Drawer
                  className={cn('drawerPaper', { drawerPaperClose: !open })}
                  classes={{
                    paper: cn('drawerPaper', { drawerPaperClose: !open })
                  }}
                  open={open}
                  variant="permanent"
                >
                  <div className="toolbarIcon">
                    <IconButton onClick={handleDrawerClose}>
                      <ChevronLeftIcon />
                    </IconButton>
                  </div>
                  <Divider />
                  <List>{mainListItems({ t })}</List>
                </Drawer>

                <main className="content">
                  <div className="appBarSpacer" />
                  <Container className="container" maxWidth="lg">
                    <Switch>
                      <Route exact path="/">
                        <Home />
                      </Route>
                      <Route exact path="/transactions">
                        <Transactions />
                      </Route>
                      <Route path="/transactions/add">
                        <AddTransaction />
                      </Route>
                      <Route path="/transaction/:id/edit">
                        <EditTransaction />
                      </Route>
                    </Switch>
                  </Container>
                </main>
              </div>
            </I18nProvider>
          </RomanNumeralProvider>
        </ThemeProvider>
      </MuiThemeProvider>
    </Router>
  );
}

export default AppRouter;
