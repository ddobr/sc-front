import { useEffect, useState } from "react";

const correctComments = ['Верно!', 'Всё так!', 'Именно!', 'Правильный ответ!', 'Зачёт!', '+1'];
const incorrectComments = ['Не совсем', 'Неверно', 'Вы ошиблись', 'Мимо', 'Не-а :(', 'Будьте внимательнее'];

export function useQuestionComment(correct: boolean): string {
    const [comment, setComment] = useState('');

    useEffect(() => {
        const idx = Math.floor(Math.random() * incorrectComments.length);
        setComment(correct ? correctComments[idx] : incorrectComments[idx]);
    }, [correct]);

    return comment;
}