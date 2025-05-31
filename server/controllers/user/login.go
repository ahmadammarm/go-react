package controllers

import (
	"net/http"

	"github.com/ahmadammarm/go-react/server/config"
	"github.com/ahmadammarm/go-react/server/dto"
	"github.com/ahmadammarm/go-react/server/helpers"
	"github.com/ahmadammarm/go-react/server/models"
	"github.com/ahmadammarm/go-react/server/pkg"
	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
)

func LoginUser(context *gin.Context) {
	var request = dto.UserLoginRequest{}
	var user = models.User{}

	if err := context.ShouldBindJSON(&request); err != nil {
		context.JSON(http.StatusUnprocessableEntity, pkg.ErrorResponse{
			Success: false,
			Message: "Validation Errors",
			Errors:  helpers.TranslateErrorMessage(err),
		})
		return
	}

	if err := config.Database.Where("email = ?", request.Email).First(&user).Error; err != nil {
		context.JSON(http.StatusUnauthorized, pkg.ErrorResponse{
			Success: false,
			Message: "User Not Found",
			Errors:  helpers.TranslateErrorMessage(err),
		})
		return
	}

	if err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(request.Password)); err != nil {
		context.JSON(http.StatusUnauthorized, pkg.ErrorResponse{
			Success: false,
			Message: "Invalid Credentials",
			Errors:  helpers.TranslateErrorMessage(err),
		})
		return
	}

	token := helpers.GenerateJWT(user.Email)

	context.JSON(http.StatusOK, pkg.SuccessResponse{
		Success: true,
		Message: "Login Success",
		Data: dto.UserResponse{
			Id:        uint(user.Id),
			Name:      user.Name,
			Username:  user.Username,
			Email:     user.Email,
			CreatedAt: user.CreatedAt.String(),
			UpdatedAt: user.UpdatedAt.String(),
			Token:     &token,
		},
	})
}
