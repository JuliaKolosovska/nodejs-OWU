import { removeOldToken } from "./remove-old-tokens.cron"

export const cronRunner=()=>{
    removeOldToken.start()
};
