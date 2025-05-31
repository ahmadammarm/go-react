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

func UserList(context *gin.Context) {
	var users []models.User

	config.Database.Find(&users)

	context.JSON(http.StatusOK, pkg.SuccessResponse{
		Success: true,
		Message: "User list retrieved successfully",
		Data:    users,
	})
}

func CreateUser(context *gin.Context) {

	var request = dto.UserCreateRequest{}

	if err := context.ShouldBindJSON(&request); err != nil {
		context.JSON(http.StatusUnprocessableEntity, pkg.ErrorResponse{
			Success: false,
			Message: "Validation Errors",
			Errors:  helpers.TranslateErrorMessage(err),
		})
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
			context.JSON(http.StatusConflict, pkg.ErrorResponse{
				Success: false,
				Message: "Duplicate entry error",
				Errors:  helpers.TranslateErrorMessage(err),
			})
		} else {
			context.JSON(http.StatusInternalServerError, pkg.ErrorResponse{
				Success: false,
				Message: "Failed to create user",
				Errors:  helpers.TranslateErrorMessage(err),
			})
		}
		return
	}

	context.JSON(http.StatusCreated, pkg.SuccessResponse{
		Success: true,
		Message: "User created successfully",
		Data: dto.UserResponse{
			Id:        uint(user.Id),
			Name:      user.Name,
			Username:  user.Username,
			Email:     user.Email,
			CreatedAt: user.CreatedAt.Format("2006-01-02 15:04:05"),
			UpdatedAt: user.UpdatedAt.Format("2006-01-02 15:04:05"),
		},
	})
}

func GetUserByID(context *gin.Context) {
	id := context.Param("id")
	var user models.User

	if err := config.Database.First(&user, id).Error; err != nil {
		context.JSON(http.StatusNotFound, pkg.ErrorResponse{
			Success: false,
			Message: "User not found",
			Errors:  helpers.TranslateErrorMessage(err),
		})
		return
	}

	context.JSON(http.StatusOK, pkg.SuccessResponse{
		Success: true,
		Message: "User retrieved successfully",
		Data: dto.UserResponse{
			Id:        uint(user.Id),
			Name:      user.Name,
			Username:  user.Username,
			Email:     user.Email,
			CreatedAt: user.CreatedAt.Format("2006-01-02 15:04:05"),
			UpdatedAt: user.UpdatedAt.Format("2006-01-02 15:04:05"),
		},
	})
}

func UpdateUserByID(context *gin.Context) {
    id := context.Param("id")
    var user models.User

    if err := config.Database.First(&user, id).Error; err != nil {
        context.JSON(http.StatusNotFound, pkg.ErrorResponse{
            Success: false,
            Message: "User not found",
            Errors:  helpers.TranslateErrorMessage(err),
        })
        return
    }

    var request dto.UserUpdateRequest
    if err := context.ShouldBindJSON(&request); err != nil {
        context.JSON(http.StatusUnprocessableEntity, pkg.ErrorResponse{
            Success: false,
            Message: "Validation Errors",
            Errors:  helpers.TranslateErrorMessage(err),
        })
        return
    }

    user.Name = request.Name
    user.Username = request.Username
    user.Email = request.Email

    if request.Password != "" {
        user.Password = helpers.HashPassword(request.Password)
    }

    if err := config.Database.Save(&user).Error; err != nil {
        context.JSON(http.StatusInternalServerError, pkg.ErrorResponse{
            Success: false,
            Message: "Failed to update user",
            Errors:  helpers.TranslateErrorMessage(err),
        })
        return
    }

    context.JSON(http.StatusOK, pkg.SuccessResponse{
        Success: true,
        Message: "User updated successfully",
        Data: dto.UserResponse{
            Id:        uint(user.Id),
            Name:      user.Name,
            Username:  user.Username,
            Email:     user.Email,
            CreatedAt: user.CreatedAt.Format("2006-01-02 15:04:05"),
            UpdatedAt: user.UpdatedAt.Format("2006-01-02 15:04:05"),
        },
    })
}
