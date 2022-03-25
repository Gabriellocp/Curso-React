import React from "react"
import Styles from './response-icon-styles.scss'

export enum IconName {
    noResponse = '👎',
    hasResponse = '👍'
}
type Props = {
    iconName: IconName
}

const ResponseIcon: React.FC<Props> = ({ iconName }: Props) => {
    const statusColor = iconName === IconName.noResponse ? Styles.red : Styles.green
    return (
        <div className={[Styles.showResponse, statusColor].join(' ')}>
            {iconName}
        </div>
    )
}

export default ResponseIcon