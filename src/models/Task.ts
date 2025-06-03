export class Task {
    public id: number;
    public task: string;
    public done: boolean;

    constructor(id: number, task: string, done: boolean) {
        this.id = id;
        this.task = task;
        this.done = done;
    }
}