import { Transforms } from "../utils/transforms";

export class Builder {
    public static async log(data: {
        title: string,
        body: string,
    }): Promise<string> {
        return Transforms.fromFile(
            'log.html',
            [
                Transforms.toTitle(data.title),
                data.body,
            ]
        );
    }
}