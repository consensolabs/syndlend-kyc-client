import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Layout, Menu, Dropdown, Icon } from "antd";
import { setActiveRole } from '../actions';

const { Header } = Layout;

const Menubar = ({ activeRoleId, onRoleChange }) => {

    const handleMenuClick = (e) => {
        onRoleChange(e.key);
    };

    const menu = (
        <Menu onClick={handleMenuClick}>
        <Menu.Item key="0">
            <span> Home </span>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="1">
            <NavLink to="/settings">
            <span> Settings </span>
            </NavLink>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="2">
            <NavLink to="/logout">
            <span> Logout </span>
            </NavLink>
        </Menu.Item>
        </Menu>
    );

    const roleMap = {
        '0': 'Verifier',
        '1': 'Settings',
        '2': 'Logout',
    }
    return (
        <Header className="header">
        <div className="logo" />
        <Dropdown.Button
          className="user-btn"
          overlay={menu}
          icon={<Icon type="bank" />}
        >
            Verifier
        </Dropdown.Button>
        <Menu theme="dark" mode="horizontal" style={{ lineHeight: "64px" }} />
      </Header>
    )
}

const mapStateToProps = state => {
  return {
    activeRoleId: state.activeRoleId
  };
};

const mapDispatchToProps = dispatch => {
    return {
        onRoleChange: activeRoleId => {
            dispatch(setActiveRole(activeRoleId));
        }
    };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Menubar);
