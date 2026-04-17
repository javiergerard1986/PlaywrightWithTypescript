interface EnvConfig{
    baseURL: string;
    apiUrl: string;
    extraHTTPHeaders?: {
        [key: string]: string;
    }
}

export class Environment {
    private static configs: Record<string, EnvConfig> = {
        DEV: {
            baseURL: "https://dev.example.com",
            apiUrl: "https://api.dev.example.com",
            extraHTTPHeaders: {
                Authorization: 'Barear dev_token',
            }
        },
         TEST: {
            baseURL: "https://test.example.com",
            apiUrl: "https://api.test.example.com",
            extraHTTPHeaders: {
                Authorization: 'Barear test_token',
            }
        },
         STAGE: {
            baseURL: "https://stage.example.com",
            apiUrl: "https://api.stage.example.com",
            extraHTTPHeaders: {
                Authorization: 'Barear stage_token',
            }
        },
        PROD: {
            baseURL: "https://prod.example.com",
            apiUrl: "https://api.prod.example.com",
            extraHTTPHeaders: {
                Authorization: 'Barear prod_token',
            }
        },
        DEFAULT: {
            baseURL: "https://thefreerangetester.github.io/sandbox-automation-testing/",
            apiUrl: "https://api.gihub.com/",
            extraHTTPHeaders: {
                Authorization: 'Barear default_token',
            }
        }
    }

    static getConfig(): EnvConfig {
        const env = process.env.ENVIRONMENT || "DEFAULT";
        return Environment.configs[env] || Environment.configs.DEFAULT;
    }

}