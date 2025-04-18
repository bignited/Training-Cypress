import { Course } from '../fixtures/course';
import './commands'

declare global {
    namespace Cypress {
        interface Chainable {
            login(username: string, password: string): Chainable<void>;
            fillForm(course: Course): Chainable<void>;
            createCourse(course: Course): Chainable<void>;
        }
    }
}