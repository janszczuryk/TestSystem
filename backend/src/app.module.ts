import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {UserModule} from './user/user.module';
import {config} from "../config/orm";

@Module({
    imports: [
        TypeOrmModule.forRoot({...config, autoLoadEntities: true}),
        UserModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {
}
