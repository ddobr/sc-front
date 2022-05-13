import React, { useState } from 'react';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { observer } from 'mobx-react-lite';
import { LinkCard } from '../../../../../common/components/navigation/link-card';
import { toCourseContents } from '../../../../../common/services/routing-service/navigation-urls';
import { isAnyMobile } from '../../../../../common/services/is-mobile.service';
import { studyState } from '../../../../../common/root-state';

import styles from './CourseList.module.scss';
import { CourseStateChip } from './components/course-state-chip/course-state-chip.component';


export const CourseListComponent: React.FC = observer(() => {
    const courses = studyState.allCourses;
    
    const cards = courses?.map((e) => 
        <LinkCard
            available={true}
            linkPath={toCourseContents(e.id)}
            sideText={<CourseStateChip percentage={e.percentage} />} 
            title={e.title} 
            key={e.id}
        />
    ); 

    return (
        <>
            <div className={styles.header}>
                <h2>Мои курсы</h2>

                { isAnyMobile === false &&
                    <Dropdown 
                        options={[{value: 'all', label: 'Все'}, {value: 'available', label: 'Доступные'}]}
                    /> 
                }
            </div>
            
            <nav className={styles.page}>
                {cards}
            </nav>
        </>
    )
});

interface DropdownProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    options: {value: string, label: string}[],
    onChangeValue?: (value: string) => void,
}

const Dropdown: React.FC<DropdownProps> = observer(({options, onChangeValue, ...props}) => {
    const [opened, setOpened] = useState(false);
    const [value, setValue] = useState(options[0]);

    const onChooseHandler = (option: {value: string, label: string}) => {
        setOpened(false);
        if (option.value !== value.value) {
            setValue(option);
            if (onChangeValue)
                onChangeValue(option.value);
        }
    };

    const optionsComponents = options.filter(e => e.label !== value.label).map(el => 
        <div key={el.value} className={styles.filterOption} onClick={() => onChooseHandler(el)}>
            {el.label}
        </div>
    );

    return (
        <div tabIndex={0} 
            onClick={() => setOpened(!opened)} 
            className={styles.filter} 
            onBlur={() => setOpened(false)} 
            id={props.id}
        >
            <div
                className={styles.filterHeader}
            >
                <p>{value.label}</p>
                <ArrowBackIosIcon
                            className={styles.icon}
                            style={{'fontSize': '1rem', 'transform': opened ? 'rotate(90deg)' : 'rotate(270deg)'}} 
                />
            </div>
            {opened && 
                <div className={styles.filterMenu}>
                    {optionsComponents}
                </div>
            }
        </div>
    )
});
