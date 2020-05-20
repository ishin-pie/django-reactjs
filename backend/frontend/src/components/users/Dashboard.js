import React, { Fragment } from "react";
import Users from "./Users";

export default function Dashboard() {
    return (
        <Fragment>
            <div className="mt-5">
                <Users />
            </div>
        </Fragment>
    );
}
