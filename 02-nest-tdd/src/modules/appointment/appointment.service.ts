import { Injectable } from '@nestjs/common';
import { AppointmentInputDto } from './dto/appointment.dto';
import { Appointment } from './entities/appointment.entity';
import { PatientService } from '../patient/patient.service';

@Injectable()
export class AppointmentService {

  constructor(private patientService: PatientService){}

  public async scheduleAppointment(appointment: AppointmentInputDto): Promise<Appointment> {

    if(appointment.endTime < appointment.startTime){
      throw new Error("appointment's endTime should be after startTime")
    }

    // check if patient exists, if not throw error
    const patientExists = await this.patientService.doesPatientExists(appointment.patientId)

    if(!patientExists){
      throw new Error('Patient does not exists')
    }
    
    return {
      ...appointment,
      confirmed: false
    };
  }

}
