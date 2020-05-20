import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { updateUser } from "../../actions/user";

export class Update extends Component {
    static propTypes = {
        users: PropTypes.object.isRequired,
        updateSuccess: PropTypes.bool.isRequired,
        updateUser: PropTypes.func.isRequired,
    };

    state = {
        id: null,
        first_name: "",
        last_name: "",
        email: "",
        is_staff: null,
        is_superuser: null,
    };

    componentDidMount() {
        const params = new URLSearchParams(this.props.location.search);
        const userinfo = this.props.users.results.filter(
            (user) => user.id == params.get("id")
        );
        // console.log(userinfo[0]);
        this.setState({
            id: userinfo[0].id,
            first_name: userinfo[0].first_name,
            last_name: userinfo[0].last_name,
            email: userinfo[0].email,
            is_staff: userinfo[0].is_staff,
            is_superuser: userinfo[0].is_superuser,
        });
    }

    // componentDidUpdate(prevProps) {
    //     const updateSuccess = this.props.updateSuccess;
    //     if (updateSuccess !== prevProps.updateSuccess) {
    //         if (updateSuccess) {
    //             console.log("Success");
    //             this.props.history.push("/admin");
    //         }
    //     }
    // }

    onSubmit = (e) => {
        e.preventDefault();
        this.props.updateUser(this.state);
        // if (this.props.updateSuccess) {
        //     console.log("success");
        // }
    };

    onChange = (e) => this.setState({ [e.target.name]: e.target.value });

    render() {
        const {
            id,
            first_name,
            last_name,
            email,
            is_staff,
            is_superuser,
        } = this.state;
        return (
            <div className="col-md-6 m-auto">
                <div className="card card-body mt-5">
                    <h2 className="text-center">User Update</h2>
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <label>First name</label>
                            <input
                                type="text"
                                className="form-control"
                                name="first_name"
                                onChange={this.onChange}
                                value={first_name}
                            />
                        </div>
                        <div className="form-group">
                            <label>Last name</label>
                            <input
                                type="text"
                                className="form-control"
                                name="last_name"
                                onChange={this.onChange}
                                value={last_name}
                            />
                        </div>
                        <div className="form-group">
                            <label>Email</label>
                            <input
                                type="email"
                                className="form-control"
                                name="email"
                                onChange={this.onChange}
                                value={email}
                            />
                        </div>
                        <div className="form-group mt-5 text-center">
                            <button type="submit" className="btn btn-primary">
                                Save
                            </button>
                            <Link to="/admin">
                                <button
                                    type="button"
                                    className="btn btn-outline-primary ml-2"
                                >
                                    Back
                                </button>
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    users: state.user.users,
    updateSuccess: state.user.updateSuccess,
});

export default connect(mapStateToProps, { updateUser })(Update);
