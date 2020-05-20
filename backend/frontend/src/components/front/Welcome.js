import React, { Fragment } from "react";
import { Link } from "react-router-dom";

export default function Welcome() {
    return (
        <Fragment>
            <div
                className="card bg-light mx-auto mt-5 center"
                style={{ maxWidth: "25rem" }}
            >
                <div className="card-header">Django REST API + ReactJS</div>
                <div className="card-body">
                    <h4 className="card-title">Hello World!</h4>
                    <p className="card-text">
                        This is a simple Django REST API project with ReactJS!
                    </p>
                    <strong>Key Features:</strong>
                    <ul>
                        <li>Token based authentication</li>
                        <li>User Management</li>
                        <li>Backend and Frontend Integration</li>
                    </ul>
                </div>
            </div>
            <div className="mt-5 text-center">
                <Link to="/admin">Admin Page</Link>
            </div>
        </Fragment>
    );
}
