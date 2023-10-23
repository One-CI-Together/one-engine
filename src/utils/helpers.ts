export class Helpers {
    public static async wait(seconds: number) {
        const s = new Promise((resolve) => {
            setTimeout(() => resolve(true), seconds * 1000)
        });
        return s;
    }
}