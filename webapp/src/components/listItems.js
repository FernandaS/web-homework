import React from 'react';
import PropTypes from 'prop-types';

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import DescriptionIcon from '@material-ui/icons/Description';
import { LinkWithSearch } from './linkWithSearch';

// eslint-disable-next-line react/prop-types
export const mainListItems = ({ t }) => (
  <div>
    <ListItemLink icon={<DashboardIcon />} primary={t('Dashboard')} to="/" />
    <ListItemLink icon={<DescriptionIcon />} primary={t('Transactions')} to="/transactions" />
  </div>
);

function ListItemLink(props) {
  const { icon, primary, to } = props;

  const renderLink = React.useMemo(
    // eslint-disable-next-line react/display-name
    () => React.forwardRef((itemProps, ref) => <LinkWithSearch ref={ref} to={to} {...itemProps} />),
    [to]
  );

  return (
    <ListItem button component={renderLink}>
      {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
      <ListItemText primary={primary} />
    </ListItem>
  );
}

ListItemLink.propTypes = {
  icon: PropTypes.element,
  primary: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired
};
