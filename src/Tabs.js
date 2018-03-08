import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import AppBar from "material-ui/AppBar";
import Tabs, { Tab } from "material-ui/Tabs";
import Typography from "material-ui/Typography";
import Button from "material-ui/Button";

import Table from "./Table";
import Buttons from "./Buttons";
import SimpleMenu from "./SimpleMenu";

import interactive from "./Interactive";

const IButton = interactive(Button);

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired
};

const styles = theme => ({
  root: {
    flexGrow: 1,
    marginTop: theme.spacing.unit * 3,
    backgroundColor: theme.palette.background.paper
  }
});

class SimpleTabs extends React.Component {
  state = {
    value: 0
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Tabs value={value} onChange={this.handleChange}>
            <Tab label="Item One" />
            <Tab data-test="tab2" label="Item Two" />
            <Tab label="Item Three" href="#basic-tabs" />
          </Tabs>
        </AppBar>
        {value === 0 && (
          <TabContainer>
            <Table />
            <IButton
              data-tracking-key={`button-0`}
              data-test="foo"
              variant="raised"
              className={classes.button}
            >
              Default
            </IButton>
            <br />
            {new Array(10).fill(0,0,10).map((_,i) => (
              <div>
                <IButton
                  data-tracking-key={`button-${i+1}`}
                  data-test="foo"
                  variant="raised"
                  className={classes.button}
                >
                  Default
                </IButton>
                <div><div>1</div><div>2</div></div>
              </div>
            ))}
          </TabContainer>
        )}
        {value === 1 && (
          <TabContainer>
            <Buttons />
            <SimpleMenu />
          </TabContainer>
        )}
        {value === 2 && <TabContainer>Item Three</TabContainer>}
      </div>
    );
  }
}

SimpleTabs.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SimpleTabs);
