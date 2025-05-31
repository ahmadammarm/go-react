package config

import (
    "github.com/joho/godotenv"
    "os"
    "log"
)

func LoadEnv() {
    err := godotenv.Load()
    if err != nil {
        log.Fatalf("Error loading .env file")
    }
}

func GetEnv(key string) string {
    value, exists := os.LookupEnv(key)
    if !exists || value == "" {
        log.Printf("Warning: Environment variable %s is not set or empty", key)
    }
    return value
}