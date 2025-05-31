package main

import (
	"github.com/ahmadammarm/go-react/server/config"
	"github.com/gin-gonic/gin"
)

func main() {

    config.LoadEnv()

    config.ConnectDatabase()

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

    router.Run(":" + config.GetEnv("APP_PORT"))
}