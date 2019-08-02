import React from "react";
import { connect } from 'react-redux';
import { Modal, Button, Table, Divider, Spin, Icon, Tag} from "antd";
import { UserService } from '../services';
import UserDetails from "./user-details";
import StatusFlowDisplayWrapper from "./status-display-wrapper.js";

const userService = new UserService();

const confirm = Modal.confirm;

class UserList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showForm: false,
            showSlider: false,
            spinning: true,
            usersInfo: [],
            userDetails: {}
        }
        this.showUserInfoModal = this.showUserInfoModal.bind(this);
        this.showStatusSliderModal = this.showStatusSliderModal.bind(this);
        this.updateVerificationStatus = this.updateVerificationStatus.bind(this);
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async componentDidMount() {
        console.log("asdasd");

        this.fetchUsersInfo();
    }

    fetchUsersInfo() {
        userService.fetchUsersInfo()
            .then(
                userList => {


                    this.setState({ usersInfo: userList.data, spinning: false });
                },
                error => {
                    console.log("Error while fetching loans:", error);
                }
            );
    }

    updateVerificationInfo(userId, status) {
        return userService.updateUserInfo({"user_id": userId, "verified": status})
            .then(
                response => {

                    console.log("Successfully updated user info:", response);
                },
                error => {
                    console.log("Error while fetching user info:", error);
                }
            );
    }

    showUserInfoModal = (userDetails) => {
        this.setState({
            showForm: true,
            userDetails: userDetails
        });
    };

    showStatusSliderModal = (userDetails) => {
        this.setState({
            showSlider: true,
            userDetails: userDetails
        });
    };

    handleOk = e => {
        this.setState({
            showForm: false,
            showSlider: false
        });
        this.fetchRequestedLoans();
    };

    handleCancel = e => {
        this.setState({
            showForm: false,
            showSlider: false
        });
    };

    showStatusFlow = (id) => {
        this.props.braidConnect.syndService.listLoanRequestDetails(id)
            .then(responseJson => {
                console.log("Status Flow:", responseJson)
                this.showStatusSliderModal();
            })
    }

    updateLoanStatus = (id, status) => {
        console.log("ID, Status:", id, status, this.props.braidConnect)
        const rpc = this.props.braidConnect;
        confirm({
            title: `Do you want to ${status} against Request ID: ${id}?`,
            okText: 'Confirm',
            onOk() {

            },
            onCancel() { },
        });
    };


    updateVerificationStatus = (userId, status) => {

        let context = this;
        confirm({
            title: `Do you want to verify the user with iD: ${userId}?`,
            okText: 'Confirm',
            onOk() {
                context.updateVerificationInfo(userId, status)
                    .then(
                        response => {
                            context.fetchUsersInfo();
                        },
                        error => {
                            console.log("Error while fetching loans:", error);
                        }
                    );
            },
            onCancel() { },
        });
    };


    render() {
        const statusList = ['open', 'verified', 'issued', 'proposed', 'locked', 'complete'];
        const actionList = ['verify', 'issue', 'propose', 'lock', 'complete'];
        const spinIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;
        const requestedLoanColumns = [
            {
                title: "ID",
                dataIndex: "user_id",
                key: "user_id "
            },
            {
                title: "User Name",
                dataIndex: "username",
                key: "username"
            },
            {
                title: "Email",
                dataIndex: "email",
                key: "email"
            },


            {
                title: "Verification Status",
                dataIndex: "verified",
                key: "verified",
                render: (verified, record) => (
                    <span onClick={() => {this.showStatusSliderModal(record)}}>
                        {
                            <Tag style={{cursor: 'pointer'}} color={verified ? 'green' : 'volcano'} key={verified ? 'VERIFIED' : 'PENDING'}>
                                {verified ? 'VERIFIED' : 'PENDING'}
                            </Tag>
                        }


      </span>
                ),

            },
            {
                title: "Details",
                dataIndex: "action",
                key: "action",
                render: (text, record) => (
                    <span>
                         <span style={{ color: '#01315a', cursor: 'pointer'}} onClick={() => {this.showUserInfoModal(record)}}>
                             <Icon type="info-circle" />
                         </span>
                     </span>
                 )
             }
        ];

        return (
            <React.Fragment>
                <div className="requests-bar">
                    <span
                        style={{
                            margin: "1em 0em",
                            fontSize: "1.17em",
                            fontWeight: 500
                        }}
                    >
                       User Details
                    </span>

                    <Button type="primary" onClick={e => { this.setState({ spinning: true }); this.fetchUsersInfo() }} shape="circle" icon="reload" size={'large'} style={{ float: "right", marginLeft: '15px' }} />

                    {/*<Button*/}
                        {/*type="primary"*/}
                        {/*icon="plus"*/}
                        {/*style={{ float: "right" }}*/}
                        {/*onClick={this.showLoanReqModal} >*/}
                        {/*ADD REQUEST*/}
                    {/*</Button>*/}

                    <Modal
                        title="User Details"
                        visible={this.state.showForm}
                        onOk={this.handleOk}
                        footer={null}
                        onCancel={this.handleCancel} >
                        <UserDetails handleOk={this.handleOk} userDetails={this.state.userDetails} updateVerificationStatus={this.updateVerificationStatus}/>
                    </Modal>
                </div>

                <Spin indicator={spinIcon} size="large" spinning={this.state.spinning}>
                    <Table
                        dataSource={this.state.usersInfo}
                        columns={requestedLoanColumns}
                        pagination={{ defaultPageSize: 5, showSizeChanger: true, pageSizeOptions: ['5', '10', '15', '20', '30'] }} />
                </Spin>

                <Modal
                    title="Status Timeline"
                    visible={this.state.showSlider}
                    onOk={this.handleOk}
                    footer={null}
                    onCancel={this.handleCancel} >

                    <StatusFlowDisplayWrapper verified={this.state.userDetails.verified} created={this.state.userDetails.created} modified={this.state.userDetails.modified} />

                </Modal>
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        braidConnect: state.braidConnect,
        braidStatus: state.braidStatus
    };
};

const mapDispatchToProps = dispatch => {
    return {};
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserList);
