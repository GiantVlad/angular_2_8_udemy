export class LoggingService {
  logStatusChanged(status: string) {
    console.log(`A server status has been changed. New status is ${status}`);
  }
}
