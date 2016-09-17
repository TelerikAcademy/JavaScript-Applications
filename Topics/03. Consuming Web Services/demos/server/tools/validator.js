const PERSON_MIN_NAME_LENGTH = 3,
  PERSON_MAX_NAME_LENGTH = 30,
  PERSON_MIN_AGE = 0,
  PERSON_MAX_AGE = 150;

module.exports = {
  validatePerson: function(person) {
    if (typeof person !== 'object' || person === null) {
      return {
        err: 'Person cannot be null'
      };
    }
    if (typeof person.name !== 'string' ||
      person.name.length < PERSON_MIN_NAME_LENGTH ||
      person.name.length > PERSON_MAX_NAME_LENGTH) {

      return {
        err: `Name must be a string with length between ${PERSON_MIN_NAME_LENGTH} and ${PERSON_MAX_NAME_LENGTH}`
      };
    }

    if (typeof person.age !== 'number' ||
      person.age < PERSON_MIN_AGE ||
      person.age > PERSON_MAX_AGE) {
      return {
        err: `Age must be a number between ${PERSON_MIN_AGE} and ${PERSON_MAX_AGE}`
      };
    }
    return null;
  }
};
