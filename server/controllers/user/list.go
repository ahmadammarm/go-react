package controllers

import (
	"net/http"

	"github.com/ahmadammarm/go-react/server/config"
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