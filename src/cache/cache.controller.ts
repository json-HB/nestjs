import {
  Controller,
  Get,
  CACHE_MANAGER,
  Inject,
  CacheInterceptor,
  UseInterceptors,
} from '@nestjs/common';

@Controller('cache')
export class CacheController {
  @Get()
  get() {
    return 'ok';
  }
}
