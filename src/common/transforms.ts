import moment from 'moment';
import { AppointmentEntity, PersonEntity } from '../store/main/types';

export const doctorTransforms = {
  toString: (entity: PersonEntity) =>
    `${entity.id}, ${entity.time.from}-${entity.time.to}` +
    (entity.name ? `, ${entity.name}` : '') +
    (entity.birthday
      ? `, ${moment(entity.birthday).format('DD.MM.YYYY')}`
      : ''),

  toObject: (text: string) => {
    let error = false;
    if (!text.includes(',')) return { error, value: null };

    const result = {
      id: 0,
      time: {
        from: 0,
        to: 0,
      },
      name: undefined as string | undefined,
      birthday: undefined as Date | undefined,
    };
    const params = text.split(',').map((param) => param.trim());

    result.id = +params[0];
    error = isNaN(result.id);
    if (error) return { error, value: null };

    const range = params[1].split('-', 2).map((param) => param.trim());

    result.time.from = +range[0];
    error = isNaN(result.time.from);
    if (error) return { error, value: null };

    result.time.to = +range[1];
    error = isNaN(result.time.to);
    if (error) return { error, value: null };

    const availableParams = [
      {
        regex: /(\d{2}\.){2}\d{4}/,
        func: (param: string) => {
          result.birthday = moment(param, 'DD.MM.YYYY').toDate();
        },
      },
      {
        regex: /^[A-Z][a-z]*(\s[A-Z][a-z]*)?$/,
        func: (param: string) => {
          result.name = param;
        },
      },
    ];

    for (let i = 0; i < params.length; i++) {
      const param = params[i];

      const availableId = availableParams.findIndex(({ regex }) =>
        regex.test(param),
      );

      if (availableId == -1) return { error: true, value: null };

      availableParams.splice(availableId, 1)[0].func(param);
    }

    return { error, value: result };
  },
};

export const patientTransforms = doctorTransforms;

export const appointmentTransforms = {
  toString: (entity: AppointmentEntity) =>
    `${entity.idPatient}, ${entity.idDoctor}` +
    (entity.time ? `, ${entity.time}` : ''),

  toObject: (text: string) => {
    let error = false;
    if (!text.includes(',')) return { error, value: null };

    const result = {
      idPatient: 0,
      idDoctor: 0,
      time: undefined as number | undefined,
    };
    const params = text.split(',').map((param) => param.trim());

    result.idPatient = +params[0];
    error = isNaN(result.idPatient);
    if (error) return { error, value: null };

    result.idDoctor = +params[1];
    error = isNaN(result.idDoctor);
    if (error) return { error, value: null };

    if (params.length == 3) {
      result.time = +params[2];
      error = isNaN(result.time);
      if (error) return { error, value: null };
    }

    return { error, value: result };
  },
};
