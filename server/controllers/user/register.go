package controllers

import (
	"net/http"

	"github.com/ahmadammarm/go-react/server/config"
	"github.com/ahmadammarm/go-react/server/dto"
	"github.com/ahmadammarm/go-react/server/helpers"
	"github.com/ahmadammarm/go-react/server/models"
	"github.com/ahmadammarm/go-react/server/pkg"
	"github.com/gin-gonic/gin"
)

func RegisterUser(context *gin.Context) {
	var request = dto.UserCreateRequest{}

	if err := context.ShouldBindJSON(&request); err != nil {
		context.JSON(http.StatusUnprocessableEntity, pkg.NewErrorResponse("Invalid request data", map[string]string{"error": err.Error()}))
		return
	}

	user := models.User{
        Name:     request.Name,
		Username: request.Username,
		Email:    request.Email,
		Password: helpers.HashPassword(request.Password),
	}

	if err := config.Database.Create(&user).Error; err != nil {
		if helpers.IsDuplicateEntryError(err) {
			context.JSON(http.StatusConflict, pkg.NewErrorResponse("User already exists", map[string]string{"error": "Username or email already exists"}))
		} else {
			context.JSON(http.StatusInternalServerError, pkg.NewErrorResponse("Failed to create user", map[string]string{"error": err.Error()}))
		}
		return
	}

	context.JSON(http.StatusCreated, pkg.NewSuccessResponse("User created successfully", dto.UserCreateResponse{
		Id:        uint(user.Id),
		Name:      user.Name,
		Username:  user.Username,
		Email:     user.Email,
		CreatedAt: user.CreatedAt.Format("2006-01-02 15:04:05"),
		UpdatedAt: user.UpdatedAt.Format("2006-01-02 15:04:05"),
	}))
}
