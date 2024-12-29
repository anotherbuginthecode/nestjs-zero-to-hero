import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppointmentService } from './modules/appointment/appointment.service';
import { PatientModule } from './modules/patient/patient.module';
import { AppointmentModule } from './modules/appointment/appointment.module';

@Module({
  imports: [PatientModule, AppointmentModule],
  controllers: [AppController],
  providers: [AppService, AppointmentService],
})
export class AppModule {}
