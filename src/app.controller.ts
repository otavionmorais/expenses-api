import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags } from '@nestjs/swagger';
import { ApiOperation } from '@nestjs/swagger';

@Controller()
@ApiTags('Application')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/version')
  @ApiOperation({
    summary: 'Get application version',
  })
  getVersion(): Promise<string> {
    return this.appService.getVersion();
  }
}
