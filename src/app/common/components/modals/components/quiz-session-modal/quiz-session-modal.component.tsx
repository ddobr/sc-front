import { isAnyMobile } from "../../../../services/is-mobile.service";
import { QuizSessionModalWebComponent } from "./web/quiz-session-modal.web.component";

export const QUIZ_SESSION_MODAL_TOKEN = 'QUIZ_SESSION_MODAL_TOKEN';

export const QuizSessionModal = isAnyMobile ? QuizSessionModalWebComponent : QuizSessionModalWebComponent;