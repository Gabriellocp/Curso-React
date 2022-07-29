import { ApiContext } from "@/presentation/contexts"
import { useLogout } from "@/presentation/hooks"
import React, { memo, useContext } from "react"
import Logo from "../logo/logo"
import Styles from './header-styles.scss'

const Header: React.FC = () => {
    const handleLogout = useLogout()
    const { getCurrentAccount } = useContext(ApiContext)
    const logout: React.MouseEventHandler = (event: React.MouseEvent): void => {
        event.preventDefault()
        handleLogout()
    }
    return (
        <header className={Styles.header}>
            <div className={Styles.headerContent}>
                <Logo></Logo>
                <div className={Styles.userInfo}>
                    <span data-testid='username'> {getCurrentAccount().name} </span>
                    <a data-testid='logout' href="#" onClick={logout} > Sair </a>
                </div>
            </div>
        </header>
    )
}

export default memo(Header)