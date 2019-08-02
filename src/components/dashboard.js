import React from "react";
import { connect } from 'react-redux';
import RequestedLoans from './requested-loans';
import IssuedLoans from './issued-loans';

class Dashboard extends React.Component {

  constructor(props) {
    super(props);
  }

  // 0-Borrower, 1-Agent, 2-Lender

  render() {

        return (<React.Fragment>
          <h2> Dashboard </h2>
          <RequestedLoans type={"pending"}/>
          <RequestedLoans type={"past"}/>
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
)(Dashboard);
