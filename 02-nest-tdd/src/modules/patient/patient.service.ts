import { Injectable } from '@nestjs/common';
import { PatientInputDto } from './dto/patient.dto';
import { Patient } from './entities/patient.entities';

@Injectable()
export class PatientService {

  private readonly patientList: Patient[] = [];
  private counterIndex = 1;

  public async register(patientDto: PatientInputDto): Promise<Patient> {

    const newPatient = {
      id:  this.counterIndex++,
      name: patientDto.name
    }

    this.patientList.push(newPatient)

    return newPatient
  }

  public async doesPatientExists(patientId: number):  Promise<boolean> {
    return this.patientList.some(p => p.id == patientId)
  }
}
