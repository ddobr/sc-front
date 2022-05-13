import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { user } from "../../../../common/api";
import { ScButton } from "../../../../common/components/button";
import { AppCodeInput, AppInput } from "../../../../common/components/AppInput";
import { loggedIn, setToken } from "../../../../common/methods/auth";
import { isValidEmail } from "../../../../common/services/validate-email.service";
import { observer } from "mobx-react-lite";

import styles from './EmailLoginPage.module.scss';


export const EmailLoginPage: React.FC = observer(() => {
    const [email, setEmail] = useState('');
    const [stage, setStage] = useState<'enter-email' | 'enter-code'>('enter-email');

    const emailEnterHandler = () => {
        user.sendCode(email);
        setStage('enter-code');
    }

    const emailChangeHandler = (email: string) => {
        setEmail(email);
    }

    const goBackHandler = () => {
        setEmail('');
        setStage('enter-email');
    }

    return (
        <div className={styles.container}>
            <div className={styles.menu}>
                <div className={styles.sideDecoration}>
                </div>

                <div className={styles.formSide}>
                    {
                        stage === 'enter-email'
                        && <EnterEmailComponent 
                            onEnter={emailEnterHandler}
                            onEmailChange={emailChangeHandler}
                        />
                    }
                    {
                        stage === 'enter-code'
                        && <CodeEnterComponent 
                            email={email}
                            onClickBack={goBackHandler}
                        />
                    }
                </div>
            </div>
        </div>
    );
});

interface EnterEmailProps {
    onEnter: () => void,
    onEmailChange: (email: string) => void,
}
const EnterEmailComponent: React.FC<EnterEmailProps> = observer(({
    onEmailChange,
    onEnter
}) => {
    const [error, setError] = useState<'no-email' | 'incorrect' | null>(null);
    const [email, setEmail] = useState('');

    const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        sendCodeHandler();
    }

    const sendCodeHandler = () => {
        if (isValidEmail(email)) {
            onEnter();
        } else {
            if (email === '') {
                setError('no-email')
            } else {
                setError('incorrect');
            }
        }
    }

    const inputHandler = (e: React.FormEvent<HTMLInputElement>) => {
        setError(null);
        setEmail(e.currentTarget.value);
        onEmailChange(e.currentTarget.value);
    }

    return (
        <form
            className={styles.emailEnter}
            onSubmit={(e) => submitHandler(e)}
        >
            <h2 className={styles.title}
            >Авторизация</h2>
            <div
                className={styles.control}
            >
                <AppInput 
                    className={styles.emailInput}
                    placeholder={'example@gmail.com'}
                    inputMode={'email'}
                    autoComplete={'email'}
                    onInput={inputHandler}
                    value={email}
                    errorText={
                        error !== null 
                        ? (error === 'no-email' 
                            ? 'Введите адрес электронной почты' 
                            : 'Неверный адрес электронной почты'
                        ) 
                        : undefined
                    }
                />
            </div>

            <ScButton
                className={styles.btn}
                onClick={sendCodeHandler}
            >Выслать код</ScButton>
        </form>
    )
});

interface CodeEnterProps {
    onClickBack: () => void,
    email: string
}
const CodeEnterComponent: React.FC<CodeEnterProps> = observer(({
    onClickBack,
    email
}) => {
    const [code, setCode] = useState('');
    const [error, setError] = useState<'no-code' | 'incorrect' | null>(null);
    const history = useHistory();


    useEffect(() => {
        setCode('');
    }, []);

    const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    }

    const codeChangeHandler = (code: string) => {
        setError(null);
        setCode(code);
    }

    const sendTokenHandler = () => {
        if (code === '') {
            setCode('');
            setError('no-code');
            return;
        }

        if (code.length < 4) {
            setCode('');
            setError('incorrect');
            return;
        }

        user.validateCodeGetToken(email, code).response
            .then((value) => {
                setToken(value.data.token);

                if (loggedIn()) {
                    history.go(0);
                }
            })
            .catch(() => {
                setError('incorrect');
                setCode('');
            })
    }

    return (
        <form 
            onSubmit={(e) => submitHandler(e)}
            className={styles.codeEnter}
        >
            <h2
                className={styles.title}
            >Авторизация</h2>
            <p
                className={styles.desc}
            >
                На почту <span className={styles.highlight}>{email}</span> был выслан код для входа на сайт. 
                Введите код, чтобы авторизоваться.
            </p>

            {
                error !== null &&
                <p className={styles.error}></p>
            }

            <div
                className={styles.control}
            >
                <AppCodeInput 
                    defaultCode={code}
                    onCodeChange={codeChangeHandler}
                />
            </div>

            <div
                className={styles.buttons}
            >
                <ScButton
                    onClick={sendTokenHandler}
                    disabled={error !== null || code.length < 4}
                    className={styles.loginBtn}
                >{error !== null ? 'Неверный код' : 'Войти'}</ScButton>

                <ScButton
                    onClick={onClickBack}
                    appearance={'transparent'}
                >Изменить адрес</ScButton>
            </div>

        </form>
    )
});
