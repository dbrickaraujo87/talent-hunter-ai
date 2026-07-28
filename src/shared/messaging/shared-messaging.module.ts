//Módulo que exporta o ProxyRouterService
import { Module } from '@nestjs/common';
import { ProxyRouterService } from './proxy-router.service';

@Module({
  providers: [ProxyRouterService],
  exports: [ProxyRouterService],
})
export class SharedMessagingModule {}
