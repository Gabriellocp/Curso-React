import React, { memo } from "react"
import Logo from "../logo/logo"
import Styles from './header-styles.scss'

const Header: React.FC = () => {
    return (
        <header className={Styles.header}>
            <div className={Styles.headerContent}>
                <Logo></Logo>
                <div className={Styles.userInfo}>
                    <span> Gabriel </span>
                    <a href="#"> Sair </a>
                </div>
            </div>
        </header>
    )
}

export default memo(Header)