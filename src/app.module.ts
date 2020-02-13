import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule } from "./config/config.module";
import { ConfigService } from "./config/config.service";
import { Configuration } from "./config/config.keys";
import { CourseModule } from "./modules/course/course.module";

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: "postgres",
        host: configService.get(Configuration.DB_HOST),
        port: 5432,
        username: configService.get(Configuration.DB_USERNAME),
        password: configService.get(Configuration.DB_PASSWORD),
        database: configService.get(Configuration.DB_DATABASE),
        entities: [__dirname + "/**/*.entity{.ts,.js}"],
        synchronize: true
      }),
      inject: [ConfigService]
    }),
    CourseModule,
    ConfigModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {
  static port: number | string;
  constructor(private readonly _configService: ConfigService) {
    AppModule.port = this._configService.get(Configuration.APP_PORT);
  }
}
