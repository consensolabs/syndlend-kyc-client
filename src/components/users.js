import React from "react";
import { connect } from 'react-redux';
import UserList from './user-list';

class Users extends React.Component {

  constructor(props) {
    super(props);
  }

  // 0-Borrower, 1-Agent, 2-Lender

  render() {

        return (<React.Fragment>
          <h2> Users </h2>
          <UserList />
        </React.Fragment>);



    }

}

const mapStateToProps = state => {
  return {
    activeRoleId: state.activeRoleId
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Users);
