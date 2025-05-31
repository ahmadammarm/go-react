package pkg

type SuccessResponse struct {
	Message string      `json:"message"`
	Success bool        `json:"success"`
	Data    interface{} `json:"data"`
}

type ErrorResponse struct {
	Message string            `json:"message"`
	Success bool              `json:"success"`
	Errors  map[string]string `json:"errors"`
}

func NewSuccessResponse(message string, data interface{}) SuccessResponse {
	return SuccessResponse{
		Message: message,
		Success: true,
		Data:    data,
	}
}

func NewErrorResponse(message string, errors map[string]string) ErrorResponse {
	return ErrorResponse{
		Message: message,
		Success: false,
		Errors:  errors,
	}
}
