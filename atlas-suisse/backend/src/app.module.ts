import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrevoyanceModule } from './prevoyance/prevoyance.module';

@Module({
  imports: [PrevoyanceModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
