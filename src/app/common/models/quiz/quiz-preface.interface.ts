export interface IQuizPreface {
    title: string,
    questions_count: number,
    time_in_minutes: number,
    attempts_remaining: number,
    /** Когда attempts_remaining == 0, показывает, когда появятся новые попытки */
    cooldown_timestamp?: number,
    previous_attempts: {
        percentage: number,
        datetime: string,
    }[]
}