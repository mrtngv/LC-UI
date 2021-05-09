import React from "react"

function TrackPackageRow(props) {
    return (
        <ui5-table-row>
            <ui5-table-cell slot="default-1" first-in-row>{props.title}</ui5-table-cell>
            <ui5-table-cell slot="default-2">{props.value}</ui5-table-cell>
        </ui5-table-row>
    )
}

export default TrackPackageRow