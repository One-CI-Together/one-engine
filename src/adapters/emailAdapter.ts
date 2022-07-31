import AxiosAdapter from "./axiosAdapter";

export class EmailAdapter {
    private baseURL: string

    constructor(baseEmailURL: string) {
        this.baseURL = baseEmailURL;
    }

    public async send(data: {
        subject: string,
        content: string,
        to: string,
        senderString?: string
    }): Promise<bool> {
        const result = await AxiosAdapter.request({
            uri: `${this.baseURL}`,
            method: 'POST',
            json: {
                emails: [data]
            }
        });
        return result[1] === 200;
    }
}
