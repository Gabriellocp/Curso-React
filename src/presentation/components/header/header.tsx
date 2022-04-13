import { ApiContext } from "@/presentation/contexts"
import React, { memo, useContext } from "react"
import { useHistory } from "react-router-dom"
import Logo from "../logo/logo"
import Styles from './header-styles.scss'

const Header: React.FC = () => {
    const { setCurrentAccount } = useContext(ApiContext)
    const history = useHistory()
    const logout: React.MouseEventHandler = (event: React.MouseEvent): void => {
        event.preventDefault()
        setCurrentAccount(undefined)
        history.replace('/login')
    }
    return (
        <header className={Styles.header}>
            <div className={Styles.headerContent}>
                <Logo></Logo>
                <div className={Styles.userInfo}>
                    <span> Gabriel </span>
                    <a data-testid='logout' href="#" onClick={logout} > Sair </a>
                </div>
            </div>
        </header>
    )
}

export default memo(Header)