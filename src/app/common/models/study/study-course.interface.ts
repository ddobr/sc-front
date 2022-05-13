import { IStudySection } from ".";

export interface IStudyCourse {
    id: number,
    description: string,
    title: string,
    sections: IStudySection[],
    percentage: number
}