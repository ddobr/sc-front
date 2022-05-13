import { IBookmark, IUser, UserRole } from "../../../../models"

export const fakeUserBookmark: IBookmark = {
    current_course_id: 0, 
    current_section_id: 1, 
    current_chapter_id: 2, 
    current_page_id: 1,
}

export const fakeBarista: IUser = {
    id: '1',
    first_name: 'Иван',
    last_name: 'Петров',
    middle_name: 'Баристович',
    role: UserRole.Barista,
    joined: '12.05.2021',
    email: 'test@gmail.com',
    telegram: '@barista',
    phone_number: '88005553535',
}
