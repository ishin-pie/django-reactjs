import React, { Component, Fragment } from "react";
import { withAlert } from "react-alert";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { STATUS_SUCCESS, STATUS_ERROR } from "../../actions/constants";

export class Alerts extends Component {
    static propTypes = {
        message: PropTypes.object.isRequired,
    };

    componentDidUpdate(prevProps) {
        const { alert, message } = this.props;

        if (message !== prevProps.message) {
            if (message.status === STATUS_SUCCESS) {
                alert.success(message.message);
            }
            if (message.status === STATUS_ERROR) {
                alert.error(message.message);
            }
        }
    }

    render() {
        return <Fragment />;
    }
}

const mapStateToProps = (state) => ({
    message: state.message,
});

export default connect(mapStateToProps)(withAlert()(Alerts));
