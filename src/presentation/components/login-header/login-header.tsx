import React, { memo } from "react";
import Logo from "../logo/logo";
import Styles from "./login-header-styles.scss"

const LoginHeader: React.FC = () => {
    return (
        <header className={Styles.header}>
            <Logo></Logo>
            <h1>Curso React - Formulário</h1>
        </header>
    )
}

export default memo(LoginHeader)