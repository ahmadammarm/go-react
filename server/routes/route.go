package routes

import (
	controllers "github.com/ahmadammarm/go-react/server/controllers/user"
	"github.com/ahmadammarm/go-react/server/controllers/user/auth"
	"github.com/ahmadammarm/go-react/server/middleware"
	"github.com/gin-gonic/gin"
)

func SetupRoutes() *gin.Engine {
	router := gin.Default()

	router.POST("/api/register", auth.RegisterUser)
    router.POST("/api/login", auth.LoginUser)

    // Get all users
    router.GET("/api/users", middleware.JWTMiddleware(), controllers.UserList)

    // Create a new user
    router.POST("/api/users", middleware.JWTMiddleware(), controllers.CreateUser)

	return router
}
