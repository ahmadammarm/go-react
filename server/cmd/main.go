package main

import (
	"github.com/ahmadammarm/go-react/server/config"
	"github.com/ahmadammarm/go-react/server/routes"
)

func main() {

    config.LoadEnv()

    config.ConnectDatabase()

    router := routes.SetupRoutes()

    router.Run(":" + config.GetEnv("APP_PORT"))
}