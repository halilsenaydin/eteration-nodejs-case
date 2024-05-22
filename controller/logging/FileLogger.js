import fs from 'fs';

const LOG_PATH = ".//controller//system//logs"
export default class FileLogger {
    static log(log, path) {
        let jsonLog = JSON.stringify(log);
        fs.writeFileSync(`${path}//${Date.now()}.json`, jsonLog);
        // console.log("Logged Error!");
    }

    static errorLog(log) {
        let path = `${LOG_PATH}//error`
        FileLogger.log(log, path)
    }

    static eventLog(log) {
        let path = `${LOG_PATH}//event`
        FileLogger.log(log, path)
    }
}