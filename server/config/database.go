package config

import (
	"fmt"
	"log"

	"github.com/ahmadammarm/go-react/server/models"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var Database *gorm.DB

func ConnectDatabase() {
	dbUser := GetEnv("DB_USER")
	dbPassword := GetEnv("DB_PASSWORD")
	dbHost := GetEnv("DB_HOST")
	dbPort := GetEnv("DB_PORT")
	dbName := GetEnv("DB_NAME")

	dataSource := fmt.Sprintf("host=%s user=%s password=%s dbname=%s port=%s sslmode=disable TimeZone=Asia/Shanghai",
		dbHost, dbUser, dbPassword, dbName, dbPort)

	var err error

	Database, err = gorm.Open(postgres.Open(dataSource), &gorm.Config{})
	if err != nil {
		log.Fatalf("Failed to connect to the database: %v", err)
	}

	fmt.Println("Database connection established successfully")

	err = Database.AutoMigrate(&models.User{})
	if err != nil {
		log.Fatalf("Failed to migrate database: %v", err)
	}

	fmt.Println("Database migration completed successfully")
}
