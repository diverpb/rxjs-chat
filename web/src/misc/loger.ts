import { Config } from "@rxjs-chat/common"
import { Api } from './api';

export const log = (...args: any[]) => {
    Api.post(Config.log, args);
}