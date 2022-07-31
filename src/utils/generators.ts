import { v4 as uuid4 } from 'uuid';


export class Generator {
    public static uuid(): string {
        return uuid4();
    }

    public static now(): Date {
        return new Date();
    }
}