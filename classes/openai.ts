import { Configuration, OpenAIApi } from "openai";
export default class OpenAI {

    private static _instance: OpenAI;
    private openai: OpenAIApi;

    private constructor() {

        const configuration = new Configuration({
            organization: "org-bIUWQ2tYOyEhUzmRLd66H3Zt",
            apiKey: process.env.OPENAI_API_KEY,
        });

        this.openai = new OpenAIApi(configuration);

        console.log('[GPT-4 - Online]');
    }

    // Singleton
    public static get instance() {
        return this._instance || (this._instance = new this());
    }

    createChatCompletion(model: any) {

        // openai.ChatCompletion.create(
        //     model = "gpt-3.5-turbo",
        //     messages = [
        //         { "role": "system", "content": "You are a helpful assistant." },
        //         { "role": "user", "content": "Who won the world series in 2020?" },
        //         { "role": "assistant", "content": "The Los Angeles Dodgers won the World Series in 2020." },
        //         { "role": "user", "content": "Where was it played?" }
        //     ]
        // )

        return this.openai.createChatCompletion(model);
    }

}
