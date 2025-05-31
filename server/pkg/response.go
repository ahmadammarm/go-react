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
