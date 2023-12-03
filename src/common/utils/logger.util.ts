// import { configLoggerType, consoleTransport, logger } from "react-native-logs";

// const defaultConfig: configLoggerType = {
//   levels: {
//     debug: 0,
//     info: 1,
//     warn: 2,
//     error: 3,
//   },
//   severity: "debug",
//   transport: consoleTransport,
//   transportOptions: {
//     colors: {
//       info: "blueBright",
//       warn: "yellowBright",
//       error: "redBright",
//     },
//   },
//   async: true,
//   dateFormat: "time",
//   printLevel: true,
//   printDate: true,
//   enabled: true,
// };

// class LoggerUtil {
//   public log: any;
//   public name: string;

//   constructor(name: string) {
//     this.log = logger.createLogger(defaultConfig);
//     this.name = name;
//   }

//   debug(message: string, ...args: any[]) {
//     this.log.debug(this.name + " | " + message, ...args);
//   }

//   info(message: string, ...args: any[]) {
//     this.log.info(this.name + " | " + message, ...args);
//   }

//   warn(message: string, ...args: any[]) {
//     this.log.warn(this.name + " | " + message, ...args);
//   }

//   error(message: string, ...args: any[]) {
//     this.log.error(this.name + " | " + message, ...args);
//   }

//   setSeverity(severity: string) {
//     this.log.setSeverity(severity);
//   }

//   setTransport(transport: any) {
//     this.log.setTransport(transport);
//   }

//   setTransportOptions(options: any) {
//     this.log.setTransportOptions(options);
//   }
// }

// export default new LoggerUtil("App");
