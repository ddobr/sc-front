import { user } from "../../api";
import { IQuizSession } from "../../models";
import { sessionsState } from "../../root-state";


class SessionsService {
    private _session: IQuizSession | null = null;
    private _timeoutId: any = null;

    public getQuizSession(): void {
        user.getQuizSession().response
            .catch()
            .then(response => response.data)
            .then((session: IQuizSession) => {
                this._session = session;
                this.setQuizSendTimeout(session);
                sessionsState.setQuizSession(session);
            })
    }

    private setQuizSendTimeout(session: IQuizSession): void {
        if (this._timeoutId !== null && this._timeoutId !== undefined) {
            clearInterval(this._timeoutId);
        }

        if (session && session.in_progress) {
            const millisecondsRemaining = session.end_timestamp - Date.now();
            if (millisecondsRemaining > 0) {
                this._timeoutId = setTimeout(() => {
                    user.answerSectionQuiz(session.section_id, []);
                }, millisecondsRemaining);
            }
        }
    }
}

export const sessionsService = new SessionsService();