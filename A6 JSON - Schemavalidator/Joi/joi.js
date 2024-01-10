const Joi = require('joi');

const schema = Joi.object({
  Schueler: Joi.array().items(
    Joi.object({
      Vorname: Joi.string().max(10),
      Nachname: Joi.string().max(10),
      email: Joi.string().max(30),
      Schule: Joi.string().max(30),
      Schultyp: Joi.string().max(10),
      Klasse: Joi.string().max(10),
      SchulJahr: Joi.number().integer(),
      Schuladresse: Joi.array().items(
        Joi.object({
          Strasse: Joi.string().max(60),
          PLZ: Joi.number().integer(),
          Ort: Joi.string(),
        })
      ),
      Privatadresse: Joi.array().items(
        Joi.object({
          Strasse: Joi.string().max(60),
          PLZ: Joi.number().integer(),
          Ort: Joi.string().max(10),
        })
      ),
    })
  )
});

const data = {
  Schueler: [
    {
      Vorname: 'Fatih',
      Nachname: 'Capar',
      email: 'fatih.student@htldornbirn.at',
      Schule: 'HTL Dornbirn',
      Schultyp: 'HTL',
      Klasse: '4aWI',
      SchulJahr: 4,
      Schuladresse: [
        {
          Strasse: 'Hoechsterstrasse 73',
          PLZ: 6850,
          Ort: 'Dornbirn',
        },
      ],
      Privatadresse: [
        {
          Strasse: 'Johann-Georg-Ulmerstrasse 23',
          PLZ: 6850,
          Ort: 'Dornbirn',
        },
      ],
    },
  ],
};

const { error, value } = schema.validate(data);

if (error) {
  console.error('Validation failed:', error.details);
} else {
  console.log('Validation passed:', value);
}
