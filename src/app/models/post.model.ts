export enum States { SAD, HAPPY, STRESSED, ANGRY, TIRED, }
export interface Post {
    state: States;
    createdTime: string;
    note: string;
}
