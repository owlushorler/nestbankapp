import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';


@Module({
  imports: [
    MongooseModule.forRoot("mongodb+srv://owlushorler:Shola3819@owlushorler.2hspzcb.mongodb.net/?retryWrites=true&w=majority&appName=owlushorler")
  ,UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
