package routes

import (
	controllers "github.com/ahmadammarm/go-react/server/controllers/user"
	"github.com/ahmadammarm/go-react/server/middleware"
	"github.com/gin-gonic/gin"
)

func SetupRoutes() *gin.Engine {
	router := gin.Default()

	router.POST("/api/register", controllers.RegisterUser)
    router.POST("/api/login", controllers.LoginUser)

    // Get all users
    router.GET("/api/users", middleware.JWTMiddleware(), controllers.UserList)

	return router
}
