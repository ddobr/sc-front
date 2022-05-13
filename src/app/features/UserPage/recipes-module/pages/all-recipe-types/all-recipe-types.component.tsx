import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { user } from "../../../../../common/api";
import { BaseLayout } from "../../../../../common/components/layouts/base-layout";
import { PageHeading } from "../../../../../common/components/layouts/page-heading";
import { LinkCard } from "../../../../../common/components/navigation/link-card";
import { Divider, Skeleton } from "../../../../../common/components/ui-no-interact";
import { IRecipeType } from "../../../../../common/models";
import { toRecipeType } from "../../../../../common/services/routing-service/navigation-urls";

import styles from './all-recipe-types.module.scss';


/**  /recipes */
export const AllRecipeTypes: React.FC = observer(() => {

    const [types, setTypes] = useState<IRecipeType[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const reqTypes = user.getRecipeTypes();
        const unsubscribeTypes = reqTypes.cancelFn;

        reqTypes.response
            .catch((e) => console.error('Failed to get recipe types'))
            .then(response => {
                if (response) {
                    setTypes(response.data);
                    setLoading(false);
                }
            })

        return () => {
            unsubscribeTypes && unsubscribeTypes();
        }

    }, [])

    return (
        <BaseLayout>
        <PageHeading title="Рецепты" goBackLink />
        <section>
            <LinkCard title="Избранное" />
            <Divider />
        </section>
        {
            loading && 
            <>
                <Skeleton height="80px"/>
                <Skeleton height="80px"/>
            </>
        }
        {
            !loading &&
            types.map(recipeType => 
                <LinkCard key={recipeType.id} title={recipeType.title} linkPath={toRecipeType(recipeType.id)} />    
            )
        }
        </BaseLayout>
    )
})