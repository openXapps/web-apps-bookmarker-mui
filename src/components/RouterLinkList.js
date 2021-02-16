import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { Link } from 'react-router-dom';

export const RouterLinkList = ({ to, primary, icon }) => {

  // With Ref as per material-ui.com/guides/composition/#caveat-with-refs
  const renderLinkRef = React.useMemo(
    () => React.forwardRef((itemProps, ref) => {
      return (
        <Link to={to} ref={ref} {...itemProps} />
      )
    }),
    [to],
  );

  // Without Ref - Does not work
  // const renderLink = (itemProps) => {
  //   return (
  //     <Link to={to} {...itemProps} />
  //   )
  // };

  return (
    <li>
      <ListItem button component={renderLinkRef}>
        {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
        <ListItemText primary={primary} />
      </ListItem>
    </li>
  );
}

// ListItemLink.propTypes = {
//   icon: PropTypes.element,
//   primary: PropTypes.string.isRequired,
//   to: PropTypes.string.isRequired,
// };

