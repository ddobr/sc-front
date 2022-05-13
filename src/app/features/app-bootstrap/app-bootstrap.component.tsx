import { useEffect } from 'react';
import { AppLoading } from '../../common/components/ui-no-interact/AppLoading';
import { loggedIn } from '../../common/methods/auth';
import { UserRole } from '../../common/models';
import { UserPage } from '../UserPage';
import { LoginPage } from '../LoginPage/LoginPage';
import { PageWrapper } from './components/page-wrapper/page-wrapper.component';
import { ModalsContainer } from './components/modals-container/modals-container.component';
import { useLocation } from 'react-router';
import { observer } from 'mobx-react-lite';
import { meState } from '../../common/root-state';


const Routing: React.FC = observer(() => {
    const userInfo = meState.profile;
    const isLoggedIn = loggedIn();

    useEffect(() => {
        if (loggedIn() && userInfo?.email === undefined) {
            meState.fetchProfile();

        }
    }, [isLoggedIn, userInfo?.email]);
    
    if (!loggedIn()) {
        return <LoginPage/>
    };

    if (userInfo === null) {
        return <AppLoading />
    }
    
    if (userInfo.role === UserRole.Barista) {
        return <UserPage />
    }

    return <h1>User page isn't implemented yet.</h1>
});

const AppBootstrap: React.FC = observer(() => {
    const location = useLocation();

    useEffect(() => {
        window.scrollTo({top: 0});
    }, [location.pathname]);

    return (
        <>
        <PageWrapper>
            <Routing />
        </PageWrapper>
        <ModalsContainer />
        </>
    )
});

export default AppBootstrap;