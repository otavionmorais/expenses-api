import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  async getVersion(): Promise<string> {
    const { version } = await import('../package.json');
    return version;
  }
}
