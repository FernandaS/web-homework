import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Home } from './pages/home';
import { Transactions } from './pages/transactions';
import { AddTransaction } from './pages/transactions/new-transaction-page';
import { EditTransaction } from './pages/transactions/edit-transaction-page';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

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

import { NumberConvertorProvider } from './context/number-conversion-context';

// const layoutStyle = css`
//   display: grid;
//   grid-row-gap: 24px;
// `;

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex'
  },
  toolbar: {
    paddingRight: 24 // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginRight: 36
  },
  menuButtonHidden: {
    display: 'none'
  },
  title: {
    flexGrow: 1
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9)
    }
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto'
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4)
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column'
  },
  fixedHeight: {
    height: 240
  }
}));

function AppRouter() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const [isRomanNumeral, setRomanNumeral] = React.useState(false);

  const toggleRomanNumeral = () => setRomanNumeral(!isRomanNumeral);

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Router>
      <NumberConvertorProvider value={{ isRomanNumeral, toggleRomanNumeral }}>
        <div className={classes.root}>
          <CssBaseline />
          <AppBar className={clsx(classes.appBar, open && classes.appBarShift)} position="absolute">
            <Toolbar className={classes.toolbar}>
              <IconButton
                aria-label="open drawer"
                className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
                color="inherit"
                edge="start"
                onClick={handleDrawerOpen}
              >
                <MenuIcon />
              </IconButton>
              <Typography className={classes.title} color="inherit" component="h1" noWrap variant="h6">
                Divvy
              </Typography>
            </Toolbar>
          </AppBar>
          <Drawer
            classes={{
              paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose)
            }}
            open={open}
            variant="permanent"
          >
            <div className={classes.toolbarIcon}>
              <IconButton onClick={handleDrawerClose}>
                <ChevronLeftIcon />
              </IconButton>
            </div>
            <Divider />
            <List>{mainListItems}</List>
          </Drawer>

          <main className={classes.content}>
            <div className={classes.appBarSpacer} />
            <Container className={classes.container} maxWidth="lg">
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
      </NumberConvertorProvider>
    </Router>
  );
}

export default AppRouter;
