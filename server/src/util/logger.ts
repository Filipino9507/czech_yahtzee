const log = (header: string, message: string, color: string) => {
    console.log(`%c[${header}] ${message}`, `color:${color}`);
};

export const logInfo = (header: string, message: string) => {
    log(header, message, "white");
};

export const logError = (header: string, message: string) => {
    log(header, message, "red");
};
