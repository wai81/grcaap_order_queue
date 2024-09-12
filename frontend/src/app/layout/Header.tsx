import * as React from "react";

interface HeaderProps {
    title: string;
}

const Header: React.FC<HeaderProps> = ({title}) => {

    return (
        <div className={"title_header"}>
            <h1>{title}</h1>
        </div>
    )
}
export default Header;