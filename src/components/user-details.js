import React from 'react';
import 'antd/dist/antd.css';
import {
  Select,
  Icon,
    Switch,
    Divider,
    Rate,
    Tag,
    Row,
    Col,
} from 'antd';

const { Option } = Select;

const DescriptionItem = ({ title, content }) => (
    <div
        style={{
            fontSize: 14,
            lineHeight: '22px',
            marginBottom: 7,
            color: 'rgba(0,0,0,0.65)',
        }}
    >
        <p
            style={{
                marginRight: 8,
                display: 'inline-block',
                color: 'rgba(0,0,0,0.85)',
            }}
        >
            {title}:
        </p>
        {content}
    </div>
);



class UserDetails extends React.Component {

  constructor(props) {
    super(props);
    console.log('const');
    this.state = {userVerified: this.props.userDetails.verified}
  }




        componentDidUpdate(prevProps, prevState, snapshot) {


            if (prevProps.userDetails.verified !== this.props.userDetails.verified) {

                this.setState({
                    userVerified: this.props.userDetails.verified,
                });
            }
        }


    updateVerificationInfo() {

        this.setState({userVerified: !this.state.userVerified});
        this.props.updateVerificationStatus(this.props.userDetails.user_id, !this.state.userVerified);
    }


    verificationStatus() {

      return (

          this.props.readOnly ?
              <Tag style={{cursor: 'pointer'}} color={this.props.userDetails.verified ? 'green' : 'volcano'} key={this.props.userDetails.verified  ? 'VERIFIED' : 'PENDING'}>
                  {this.props.userDetails.verified  ? 'VERIFIED' : 'PENDING'}
              </Tag>:

          <Switch checked={this.state.userVerified} onChange={()=> {this.updateVerificationInfo()}} />
      );
    }






  render() {

      const pStyle = {
          fontWeight: 'bold',
          fontSize: 16,
          color: 'rgba(0,0,0,0.85)',
          lineHeight: '24px',
          display: 'block',
          marginBottom: 16,
      };


      return (
        <div>
            <p style={pStyle}>
                <Icon type="info-circle" theme="filled" />{" "}
                Basic Info
            </p>

            <Row>
                <Col span={12}>
                    <DescriptionItem title="Full Name" content={this.props.userDetails.username}/>
                </Col>
                <Col span={12}>
                    <DescriptionItem title="Email" content={this.props.userDetails.email}/>
                </Col>
            </Row>
            <Row>
                <Col span={12}>
                    <DescriptionItem title="DOB/ Founded" content={this.props.userDetails.dob} />
                </Col>
                <Col span={12}>
                    <DescriptionItem title="Nationality" content={this.props.userDetails.nationality} />
                </Col>
            </Row>
            <Divider/>


            <p style={pStyle}>
                <Icon type="bank" theme="filled" /> {" "}
                Due Diligence Actions
            </p>

            <Row>
                <Col span={12}>
                    <DescriptionItem title="Verification Status" content={this.verificationStatus() } />
                </Col>

            </Row>
            <Row>
                <Col span={12}>
                    <DescriptionItem title="Credit Rating" content=<Rate allowHalf defaultValue={2.5}  />/>
                </Col>
            </Row>
            <Divider/>

            <p style={pStyle}>
                <Icon type="contacts" theme="filled" /> {" "}
                Contact
            </p>

            <Row>
                <Col span={12}>
                    <DescriptionItem title="Address" content={this.props.userDetails.address}/>
                </Col>
                <Col span={12}>
                    <DescriptionItem title="Contact" content={this.props.userDetails.contact}/>
                </Col>
            </Row>
        </div>
    );
  }
}


export default UserDetails;
