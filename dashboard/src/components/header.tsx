import { useGetIdentity, useLogout, useNavigation } from "@refinedev/core";
import React from "react";
import { Link } from "react-router-dom";

export const Header = () => {
    const { mutate, isLoading } = useLogout();
    const { data: identity } = useGetIdentity();

    const { listUrl, createUrl } = useNavigation();

    return (
        <>
            <h2>Добро пожаловать, <span>{identity?.name ?? ""}</span></h2>
            <Link to={listUrl("line_orders")}>Список закзов</Link>
            <Link to={createUrl("line_orders")}>Новый заказ</Link>
            <button
                type="button"
                disabled={isLoading}
                onClick={mutate}
            >
                Logout
            </button>
        </>
    );
};