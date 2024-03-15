import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { Query, Resolver } from '@nestjs/graphql';
import { AppService } from './app.service';
@Controller()
export class AppResolver {
  constructor(private readonly appService: AppService) {}

  @Query(() => String)
  getHello(): string {
    return this.appService.getHello();
  }
}
