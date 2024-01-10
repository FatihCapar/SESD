const Ajv = require("ajv");
const ajv = new Ajv(); 
require("ajv-formats")(ajv);

const schema = {
  type: "object",
  properties: {
    Schueler: {
      type: "array",
      items: {
        type: "object",
        properties: {
          Vorname: { type: "string", maxLength: 10 },
          Nachname: { type: "string", maxLength: 10 },
          email: { type: "string", maxLength: 30, format: "email"  },
          Schule: { type: "string", maxLength: 30 },
          Schultyp: { type: "string", maxLength: 10 },
          Klasse: { type: "string", maxLength: 10 },
          SchulJahr: { type: "integer"},
          Schuladresse: {
            type: "array",
            items: {
              type: "object",
              properties: {
                Strasse: { type: "string", maxLength: 60 },
                PLZ: { type: "integer"},
                Ort: { type: "string" },
              },
              required: ["Strasse", "PLZ", "Ort"],
              additionalProperties: false,
            },
          },
          Privatadresse: {
            type: "array",
            items: {
              type: "object",
              properties: {
                Strasse: { type: "string", maxLength: 60 },
                PLZ: { type: "integer"},
                Ort: { type: "string", maxLength: 10 },
              },
              required: ["Strasse", "PLZ", "Ort"],
              additionalProperties: false,
            },
          },
        },
        required: [
          "Vorname",
          "Nachname",
          "email",
          "Schule",
          "Schultyp",
          "Klasse",
          "SchulJahr",
          "Schuladresse",
          "Privatadresse",
        ],
        additionalProperties: false,
      },
    },
  },
  required: ["Schueler"],
  additionalProperties: false,
};

const validate = ajv.compile(schema);

const data = {
  Schueler: [
    {
      Vorname: "Fatih",
      Nachname: "Capar",
      email: "fatih.studenthtldornbirn.at",
      Schule: "HTL Dornbirn",
      Schultyp: "HTL",
      Klasse: "4aWI",
      SchulJahr: 4,
      Schuladresse: [
        {
          Strasse: "Hoechsterstrasse 73",
          PLZ: 6850,
          Ort: "Dornbirn",
        },
      ],
      Privatadresse: [
        {
          Strasse: "Johann-Georg-Ulmerstrasse 23",
          PLZ: 6850,
          Ort: "Dornbirn",
        },
      ],
    },
  ],
};

const valid = validate(data);

if (!valid) console.log(validate.errors);

///////////////////////////////////////////////////////////////////

const Ajv2 = require("ajv");
const ajv2 = new Ajv2();

const schemaAJV2 = {
  type: "object",
  properties: {
    Employees: {
      type: "array",
      items: {
        type: "object",
        properties: {
          FirstName: { type: "string" },
          LastName: { type: "string" },
          Email: { type: "string"},
        },
        required: ["FirstName", "LastName", "Email"],
        additionalProperties: false,
      },
    },
  },
  required: ["Employees"],
  additionalProperties: false,
};

const validateAJV2 = ajv2.compile(schemaAJV2);

const dataAJV2 = {
  Employees: [
    {
      FirstName: "John",
      LastName: "Doe",
      Email: "john.doe@example.com",
    },
  ],
};

const validAJV2 = validateAJV2(dataAJV2);

if (!validAJV2) console.log("AJV Validation Errors:", validateAJV2.errors);
