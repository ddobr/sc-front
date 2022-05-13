import { IQuizSession } from "../../../../../models";

export class fakeQuizSessionService {
    public static fakeQuizSession: IQuizSession = {
        in_progress: false,
        course_id: 0,
        section_id: 0,
        end_timestamp: 0
    }

    public static getFakeQuizSession(): IQuizSession {
        return {...this.fakeQuizSession};
    }

    public static endSession(): void {
        this.fakeQuizSession = {
            in_progress: false,
            course_id: 0,
            section_id: 0,
            end_timestamp: 0
        }
    }

    public static startSession(min: number = 1): void {
        this.fakeQuizSession = {
            in_progress: true,
            course_id: 0,
            section_id: 0,
            end_timestamp: Date.now() + 1000 * 60 * min
        }
    }
}