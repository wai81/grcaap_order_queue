import { useGetIdentity, useLogout } from "@refinedev/core";
import React from "react";

export const Header = () => {
    const { mutate, isLoading } = useLogout();
    const { data: identity } = useGetIdentity();

    return (
        <>
            <h2>Добро пожаловать, <span>{identity?.name ?? ""}</span></h2>
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