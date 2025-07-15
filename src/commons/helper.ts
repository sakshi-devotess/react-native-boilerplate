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

export function validationErrorsCheck(validationErrors) {
  let allError = [];

  validationErrors.forEach((error) => {
    const errorObject = nestedValidationErrorsCheck(error);
    allError = allError.concat(errorObject);
  });

  return allError;
}
