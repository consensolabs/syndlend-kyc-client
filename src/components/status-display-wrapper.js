import React from 'react';
import 'antd/dist/antd.css';
import { Steps } from 'antd';

const { Step } = Steps;

function toDateTime(secs) {
    var t = new Date(); // Epoch
    t.setTime(secs*1000);
    return t;
}

const StatusFlowDisplayWrapper = (props) => {
    console.log(props.verified);
  return (
    <div>
        <Steps current={1} status={props.verified ? "finish" : "error"}>
            <Step title="Created" description={toDateTime(props.created).toLocaleString()} />
            <Step title="Verification" description={props.verified ? toDateTime(props.modified).toLocaleString() : "Pending"} />
            <Step title="Loan issued" description="None" />
        </Steps>,
    </div>
  );
};

export default StatusFlowDisplayWrapper;
