package helpers

import (
	"fmt"
	"strings"

	"github.com/go-playground/validator/v10"
	"gorm.io/gorm"
)

func TranslateErrorMessage(err error) map[string]string {
	errorsMap := make(map[string]string)

	if validationErrors, ok := err.(validator.ValidationErrors); ok {
		for _, fieldError := range validationErrors {
			field := fieldError.Field()
			switch fieldError.Tag() {
			case "required":
				errorsMap[field] = fmt.Sprintf("%s is required", field)
			case "email":
				errorsMap[field] = fmt.Sprintf("%s must be a valid email address", field)
			case "unique":
				errorsMap[field] = fmt.Sprintf("%s already exists", field)
			case "min":
				errorsMap[field] = fmt.Sprintf("%s must be at least %s characters long", field, fieldError.Param())
			case "max":
				errorsMap[field] = fmt.Sprintf("%s must be at most %s characters long", field, fieldError.Param())
			case "numeric":
				errorsMap[field] = fmt.Sprintf("%s must be a number", field)
			default:
				errorsMap[field] = fmt.Sprintf("Invalid value for %s: %s", field, fieldError.Tag())
			}
		}
	}

	if err != nil {
		if strings.Contains(err.Error(), "unique") {
			if strings.Contains(err.Error(), "email") {
				errorsMap["email"] = "Email already exists"
			}
		} else if err == gorm.ErrRecordNotFound {
			errorsMap["Error"] = "Record not found"
		}
	}

	if len(errorsMap) == 0 {
		errorsMap["Error"] = "An unexpected error occurred"
	}

	return errorsMap
}

func IsDuplicateEntryError(err error) bool {
	if err == nil {
		return false
	}
	if strings.Contains(err.Error(), "unique constraint") || strings.Contains(err.Error(), "duplicate key value violates unique constraint") {
		return true
	}
	return false
}
