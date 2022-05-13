import { IQuizPreface } from "../../../../../models";

class FakeQuizPreface {
    private _preface: IQuizPreface = {
        title: 'Квиз 1',
        questions_count: 10,
        time_in_minutes: 1,
        attempts_remaining: 2,
        previous_attempts: []
    }

    private _previousAttempts: IQuizPreface['previous_attempts'] = [
        { datetime: `${(new Date()).toISOString()}`, percentage: 40 },
        { datetime: `${(new Date()).toISOString()}`, percentage: 80 },
    ]

    public decreaseAttempts(): void {
        if (this._preface.attempts_remaining === 2) {
            this._preface.previous_attempts.push(this._previousAttempts[0]);
            this._preface.attempts_remaining = 1;

            return;
        }

        if (this._preface.attempts_remaining === 1) {
            this._preface.previous_attempts.unshift(this._previousAttempts[1]);
            this._preface.attempts_remaining = 0;
            const unlock = Date.now() + 1000 * 10;
            this._preface.cooldown_timestamp = unlock;

            return;
        }
    }

    public getQuizPreface(sectionId: number): IQuizPreface {
        return {
            ...this._preface
        }
    }
}

export const fakeQuizPreface = new FakeQuizPreface();