/**
 * Recursively parses nested validation errors from class-validator.
 *
 * This function traverses nested validation errors to extract all constraint violations
 * into a flat array of error objects, preserving context like property path and index (for arrays).
 *
 * @param {any} validationError - A validation error object from class-validator.
 * @param {string[]} parentIndex - An array representing the path of indexes (for nested arrays).
 * @param {string[]} fieldPath - An array representing the property path.
 * @returns {Array<object>} - A flat array of parsed error objects.
 */
const nestedValidationErrorsCheck = (
  validationError,
  parentIndex = [],
  fieldPath = [],
) => {
  let errorObject = [];
  if (
    Array.isArray(validationError.children) &&
    validationError.children.length > 0
  ) {
    validationError.children.forEach((childError) => {
      const currentIndex = childError.property;

      const fullIndexPath = [...parentIndex, currentIndex];
      const fieldPath = [validationError.property, currentIndex];

      const nestedErrors = nestedValidationErrorsCheck(
        childError,
        fullIndexPath,
        fieldPath,
      );

      errorObject = errorObject.concat(nestedErrors);
    });
  } else {
    const errors = Object.values(validationError.constraints || {});
    errorObject.push({
      index: parentIndex,
      fieldPath: fieldPath,
      target: validationError.target?.constructor?.name,
      error: {
        [validationError.property]: Object.values(validationError.constraints)[
          errors.length - 1
        ],
      },
    });
  }

  return errorObject;
};

/**
 * Flattens a list of class-validator errors (including nested ones) into an array of simplified objects.
 *
 * Useful for formatting validation errors in a consistent, structured way.
 *
 * @param {Array<any>} validationErrors - Array of validation errors from class-validator's `validate()` method.
 * @returns {Array<object>} - Flat array of validation error details.
 */
export function validationErrorsCheck(validationErrors) {
  let allError = [];

  validationErrors.forEach((error) => {
    const errorObject = nestedValidationErrorsCheck(error);
    allError = allError.concat(errorObject);
  });

  return allError;
}
