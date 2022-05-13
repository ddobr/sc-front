import { BaseLayout } from "../../../common/components/layouts/base-layout";
// eslint-disable-next-line
import styles from './TestPage.module.scss';
import { observer } from 'mobx-react-lite';
import { CustomTable, RecipeSteps } from "../../../common/components/readable-content";


export const TestPage: React.FC = observer(() => {
    console.log('2');

    return (
        <BaseLayout>
            {// <EditorBlock />
            }

            <RecipeSteps steps={[
                'Налить 10% сливки в питчер',
                'Добавить в питчер эспрессо и ванильный сахар Добавить в питчер эспрессо и ванильный сахар Добавить в питчер эспрессо и ванильный сахар Добавить в питчер эспрессо и ванильный сахар Добавить в питчер эспрессо и ванильный сахар Добавить в питчер эспрессо и ванильный сахар',
                'Вспенить всё вместе',
                'Перелить в чашку для латте',
            ]} />

            <CustomTable 
                columns={['Нутриент', 'Кол-во', '% от нормы в 100 г']}
                rows={[
                    ['Калорийность', '268 кКал', '33.3%'],
                    ['Белки', '7.7 г', '62%'],
                    ['Углеводы', '12.5 г', '12%'],
                    ['Жиры', '120.5 г', '0.5%'],
                ]}
            />

        </BaseLayout>
    )
});
