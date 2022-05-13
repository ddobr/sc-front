import { BaseLayout } from "../../../common/components/layouts/base-layout";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import { NewsArticlePage } from "./pages/news-article-page/news-article-page.component";
import { NewsListPage } from "./pages/news-list-page/news-list-page.component";
import { observer } from "mobx-react-lite";

const NewsPage: React.FC = observer(() => {
    const { path } = useRouteMatch();

    return (
        <BaseLayout>
            <Switch>
                <Route exact path={`${path}/:newsId`}>
                    <NewsArticlePage />
                </Route>
                <Route exact path={`${path}`}>
                    <NewsListPage />
                </Route>
            </Switch>
        </BaseLayout>
    )
});

export default NewsPage;