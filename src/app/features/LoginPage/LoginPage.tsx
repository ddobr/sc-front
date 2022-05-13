import { useState } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { loggedIn, login } from '../../common/methods/auth';
import { index } from '../../common/services/routing-service/navigation-urls';
import { EmailLoginPage } from './components';
import styles from './LoginPage.module.scss';
import { observer } from 'mobx-react-lite';
import { meState } from '../../common/root-state';

export const LoginPage: React.FC = observer(() => {
    return (
        <Switch>
            <Route 
                exact
                path={index()}
                component={EmailLoginPage}
            />
            <Redirect 
                to={index()}
            />
        </Switch>
    )
});


export const LoginPageComponent: React.FC = observer(() => {
    const [form, setForm] = useState<'login' | 'reset'>('login');

    const changeForm = () => {
        setForm(form === 'login' ? 'reset' : 'login');
    }

    return (
        <div className={styles.container}>
            <div className={styles.menu}>
                <div className={styles.sideDecoration}>
                </div>

                <div className={styles.formSide}>
                    {
                        form === 'login' 
                            ? <LoginForm callback={changeForm}/> 
                            : <ResetForm callback={changeForm}/>
                    }
                </div>
            </div>
        </div>
    )
});

interface Props {
    callback: () => void
}

const LoginForm: React.FC<Props> = observer(({callback}) => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [failed, setFailed] = useState(false);
    const [showErrors, setShowErrors] = useState(false);

    
    const isCorrectName = () => {
        return name.length !== 0;
    };
    
    const isCorrectPassword = () => {
        return password.length !== 0;
    };
    
    const handleAuthFail = () => {
        setFailed(true);
    }

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setShowErrors(false); 
        setFailed(false);
        if (e.target.name === 'login') {
            setName(e.target.value);
        } else if (e.target.name === 'password') {
            setPassword(e.target.value);
        }
    }

    const handleClick = () => {
        setFailed(false);
        setShowErrors(false);
    }

    const handleSumbit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!isCorrectName() || !isCorrectPassword()) {
            setShowErrors(true);
        } else {
            await login(name, password)

            if (loggedIn()) {
                meState.fetchProfile();
            } else {
                handleAuthFail();
            }
        }
    }

    return (
        <form className={styles.form} onSubmit={handleSumbit}>
            <h1 className={styles.formTitle}>Войдите</h1>
            {
                failed && <p className={styles.warningText}>Неверные логин или пароль</p>
            }
            <input 
                className={styles.input}
                placeholder={'Логин'}
                style={{backgroundColor: (showErrors && !isCorrectName()) ? 'var(--light-grey)' : ''}}
                type={'text'}
                name={`login`}
                onChange={handleInput}
                onClick={handleClick}
            />
            <input 
                className={styles.input}
                placeholder={'Пароль'}
                style={{backgroundColor: (showErrors && !isCorrectPassword()) ? 'var(--light-grey)' : ''}}
                type={'password'}
                name={`password`}
                onChange={handleInput}
                onClick={handleClick}
            />
            <input
                type={'submit'}
                value={'Войти'}
            />
            <button 
                className={styles.transparentButton}
                onClick={callback}
            >
                Забыли пароль?
            </button>
        </form>
    )
});

const ResetForm: React.FC<Props> = observer(({callback}) => {
    const [stage, setStage] = useState<'filling' | 'sent'>('filling');
    const [email, setEmail] = useState('');
    const [showErrors, setShowErrors] = useState(false);

    const isCorrectEmail = () => {
        return email.length !== 0;
    };

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setShowErrors(false); 
        if (e.target.name === 'email') {
            setEmail(e.target.value);
        }
    }

    const handleSumbit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!isCorrectEmail()) {
            setShowErrors(true);
        } else {
            setStage('sent');
        }
    }

    return (
        <>
        {
            stage === 'filling' 
            &&  <>
                <h1 className={styles.formTitle}>Восстановление пароля</h1>
                <form className={styles.form} onSubmit={handleSumbit}>
                    <input 
                        className={styles.input}
                        placeholder={'Почта'}
                        style={{backgroundColor: (showErrors && !isCorrectEmail()) ? 'var(--light-grey)' : ''}}
                        value={email}
                        type={'text'}
                        name={`email`}
                        onChange={(e) => handleInput(e)}
                    />
                    <input
                        type={'submit'}
                        value={'Выслать пароль'}
                    />
                </form>
                <button 
                    className={styles.transparentButton}
                    onClick={callback}
                >
                    Назад
                </button>
                </>
        }
        {
            stage === 'sent'
            &&  <>
                <h1 className={styles.formTitle}>Мы выслали пароль на почту</h1>
                <h1 style={{color: 'var(--main-orange)'}} className={styles.formTitle}>{email}</h1>
                <p>Забирай и заходи быстрее</p>
                <button className={styles.submit} onClick={callback}>Спасибо</button>
                </>
        }
        </>
    )
});
