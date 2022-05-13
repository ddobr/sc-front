import { fakeQuizSessionService } from "../../api/User/Fake/Mocks/quiz/fake-section-quiz-session.mock";

class TestingService {
    public createQuizSession(minutes: number = 60) {
        fakeQuizSessionService.startSession(minutes);
    }

    public removeQuizSession() {
        fakeQuizSessionService.endSession();
    }
}

const testingService = new TestingService();

if (process.env.REACT_APP_IS_FAKE_API === 'true') {
    (window as any).testing = testingService;
}

export { testingService }