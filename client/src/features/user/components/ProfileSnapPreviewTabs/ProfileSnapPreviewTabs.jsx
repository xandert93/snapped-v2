import { AppBar, Tabs } from '@material-ui/core';

// props => { textColor?, indicatorColor?, value, onChange, children }
export const ProfileSnapPreviewTabs = (props) => {
  return (
    <AppBar component="div" position="static" color="inherit">
      <Tabs variant="fullWidth" textColor="primary" {...props} />
    </AppBar>
  );
};
