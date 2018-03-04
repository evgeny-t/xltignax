import React from "react";
import Button from "material-ui/Button";
import Menu, { MenuItem } from "material-ui/Menu";

class SimpleMenu extends React.Component {
  state = {
    anchorEl: null
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { anchorEl } = this.state;

    return (
      <div>
        <Button
          aria-owns={anchorEl ? "simple-menu" : null}
          aria-haspopup="true"
          onClick={this.handleClick}
        >
          Open Menu
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          <MenuItem id="menu1" onClick={this.handleClose}>
            Profile
          </MenuItem>
          <MenuItem id="menu2" onClick={this.handleClose}>
            My account
          </MenuItem>
          <MenuItem id="menu3" onClick={this.handleClose}>
            Logout
          </MenuItem>
        </Menu>
      </div>
    );
  }
}

export default SimpleMenu;
