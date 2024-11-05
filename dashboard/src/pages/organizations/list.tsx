import React from "react";
import { BaseRecord } from "@refinedev/core";
import { useTable, List, BooleanField, DateField } from "@refinedev/antd";
import { Table, Space } from "antd";

export const OrganizationList = () => {
    const { tableProps } = useTable({
        syncWithLocation: true,
    });

    return (
        <List>
            <Table {...tableProps} rowKey="id">
                <Table.Column dataIndex="id" title="Id" />
                <Table.Column dataIndex="title" title="Title" />
                <Table.Column dataIndex="fullname" title="Fullname" />
                <Table.Column
                    dataIndex={["is_active"]}
                    title="Is Active"
                    render={(value: any) => <BooleanField value={value} />}
                />
                <Table.Column
                    dataIndex={["created_at"]}
                    title="Created At"
                    render={(value: any) => <DateField value={value} />}
                />
            </Table>
        </List>
    );
};
