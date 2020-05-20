import React, { Component, Fragment } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getUserList, toggleActive } from "../../actions/user";

export class Users extends Component {
    static propTypes = {
        users: PropTypes.object.isRequired,
        getUserList: PropTypes.func.isRequired,
        toggleActive: PropTypes.func.isRequired,
    };

    state = {
        limitItems: 5,
    };

    componentDidMount() {
        this.props.getUserList(this.state.limitItems, 0);
    }

    getUrlParameter = (url, name) => {
        name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
        var results = regex.exec(url);
        return results === null
            ? ""
            : decodeURIComponent(results[1].replace(/\+/g, " "));
    };

    OnNext = () => {
        const limit = this.getUrlParameter(this.props.users.next, "limit");
        const offset = this.getUrlParameter(this.props.users.next, "offset");
        this.props.getUserList(limit, offset);
    };

    OnPrevious = () => {
        const limit = this.getUrlParameter(this.props.users.previous, "limit");
        const offset = this.getUrlParameter(
            this.props.users.previous,
            "offset"
        );
        this.props.getUserList(limit, offset);
    };

    OnChageLimit = (e) => {
        this.setState({ limitItems: e.target.value });
        this.props.getUserList(e.target.value, 0);
    };

    render() {
        return (
            <Fragment>
                <table className="container">
                    <tbody>
                        <tr>
                            <td>
                                <h3 className="">Users</h3>
                            </td>
                            <td style={{ width: "100px" }}>
                                <div className="form-group">
                                    <select
                                        className="custom-select"
                                        name={this.state.limitItems}
                                        value={this.state.limitItems}
                                        onChange={this.OnChageLimit}
                                    >
                                        <option value="5">5</option>
                                        <option value="10">10</option>
                                        <option value="20">20</option>
                                        <option value="50">50</option>
                                    </select>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            <th>Types</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.users.results.map((user) => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.first_name}</td>
                                <td>{user.last_name}</td>
                                <td>{user.email}</td>
                                <td>
                                    {user.is_superuser ? (
                                        <span className="badge badge-success">
                                            Super
                                        </span>
                                    ) : (
                                        ""
                                    )}
                                    {user.is_staff ? (
                                        <span className="badge badge-primary">
                                            Admin
                                        </span>
                                    ) : (
                                        ""
                                    )}
                                    <span className="badge badge-secondary">
                                        User
                                    </span>
                                </td>
                                <td>
                                    {user.is_active ? (
                                        <button
                                            type="button"
                                            className="btn btn-success btn-sm"
                                            onClick={this.props.toggleActive.bind(
                                                this,
                                                user.id
                                            )}
                                        >
                                            Active
                                        </button>
                                    ) : (
                                        <button
                                            type="button"
                                            className="btn btn-danger btn-sm"
                                            onClick={this.props.toggleActive.bind(
                                                this,
                                                user.id
                                            )}
                                        >
                                            Disactive
                                        </button>
                                    )}
                                </td>
                                <td>
                                    <Link
                                        to={{
                                            pathname: "/admin/user/update",
                                            search: `?id=${user.id}`,
                                        }}
                                    >
                                        <button
                                            type="button"
                                            className="btn btn-primary btn-sm"
                                        >
                                            Edit
                                        </button>
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="text-center mt-5">
                    <button
                        type="button"
                        className="btn btn-outline-primary"
                        disabled={!this.props.users.previous}
                        style={{ width: "100px" }}
                        onClick={this.OnPrevious}
                    >
                        Previous
                    </button>
                    <span className="ml-1"></span>
                    <button
                        type="button"
                        className="btn btn-outline-primary"
                        disabled={!this.props.users.next}
                        style={{ width: "100px" }}
                        onClick={this.OnNext}
                    >
                        Next
                    </button>
                </div>
            </Fragment>
        );
    }
}

const mapStateToProps = (state) => ({
    users: state.user.users,
});

export default connect(mapStateToProps, { getUserList, toggleActive })(Users);
