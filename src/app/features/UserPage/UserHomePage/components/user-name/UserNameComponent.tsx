import { observer } from 'mobx-react-lite';
import React from 'react';
import { UserRole } from '../../../../../common/models';

import styles from './UserName.module.scss'

interface Props {
    name?: string,
    surname?: string,
    role?: UserRole,
}

export const UserNameComponent: React.FC<Props> = observer(({name, surname, role}) => {
    let roleRus: string = '';

    switch (role) {
        case UserRole.Barista:
            roleRus = 'Бариста';
            break;
        case UserRole.Admin:
            roleRus = 'Админ';
            break;
        case UserRole.Manager:
            roleRus = 'Менеджер';
            break;
    }

    return (
        <div className={styles.name}>
            <h1>{name} {surname}</h1>
            <p>{roleRus}</p>
        </div>
    )
});
