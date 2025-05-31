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
    router.POST("/api/user", middleware.JWTMiddleware(), controllers.CreateUser)

    // Get an user by ID
    router.GET("/api/user/:id", middleware.JWTMiddleware(), controllers.GetUserByID)

    // Update an user by ID
    router.PUT("/api/user/:id", middleware.JWTMiddleware(), controllers.UpdateUserByID)

    // Delete an user by ID
    router.DELETE("/api/user/:id", middleware.JWTMiddleware(), controllers.DeleteUserByID)

	return router
}
