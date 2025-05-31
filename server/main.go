package main

import (
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

    router.Run(":8080")
}