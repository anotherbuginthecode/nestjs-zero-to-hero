import { Test, TestingModule } from '@nestjs/testing';
import { AppointmentService } from './appointment.service';
import { PatientModule } from '../patient/patient.module';
import { PatientService } from '../patient/patient.service';

describe('AppointmentService', () => {
  let service: AppointmentService;
  let patientService: PatientService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PatientModule],
      providers: [AppointmentService],
    }).compile();

    service = module.get<AppointmentService>(AppointmentService);
    patientService = module.get(PatientService)
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should schedule an appointment for a user on success', async () => {
    const {id: patientId} = await patientService.register({name: 'John Doe'})
    const startTime = new Date("2024-01-01T10:00:00Z");
    const endTime = new Date("2024-01-01T11:00:00Z");

    const newAppointment = await service.scheduleAppointment({
      patientId: patientId,
      startTime,
      endTime
    });

    expect(newAppointment).toEqual({
      patientId: patientId,
      startTime,
      endTime,
      confirmed: false
    });
  });

  it('should throw an error when end time is before start time', async () => {
    const startTime = new Date("2024-01-01T11:00:00Z");
    const endTime = new Date("2024-01-01T10:00:00Z");

    /**
     * We have to wrap our "scheduleAppointment" function in another arrow function
     * because we expect an error to be thrown. If we don't do that,
     * Jest won't be able to properly handle the error and it will accuse that the test failed.
     */
    await expect(() =>
      service.scheduleAppointment({
        patientId: 1,
        startTime,
        endTime,
      })
    ).rejects.toThrow("appointment's endTime should be after startTime");

  })

  it('Should throw an error when patient does not exist', async () => {
    const startTime = new Date("2024-01-01T10:00:00Z");
    const endTime = new Date("2024-01-01T11:00:00Z");

    await expect(
      service.scheduleAppointment({
        patientId: 1,
        startTime,
        endTime
      })
    ).rejects.toThrow('Patient does not exists')
  })

});
