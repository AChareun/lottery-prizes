import got from "got";

export class HttpAdapter {
    get(url: string | URL) {
        return got.get(url);
    }
}
