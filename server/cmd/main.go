package main

import (
	"github.com/ahmadammarm/go-react/server/config"
	"github.com/gin-gonic/gin"
)

func main() {
    router := gin.Default()

    router.GET("/", func(context *gin.Context) {
        context.JSON(200, gin.H{
            "message": "Hello, Ammar",
        })
    })

    router.GET("/health", func(context *gin.Context) {
        context.JSON(200, gin.H{
            "status": "OK",
        })
    })

    router.Run(":" + config.GetPort("APP_PORT", "8080"))
}