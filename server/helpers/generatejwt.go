package helpers

import (
	"time"

	"github.com/ahmadammarm/go-react/server/config"
	"github.com/golang-jwt/jwt/v5"
)

var jwtSecretKey = []byte(config.GetEnv("JWT_SECRET"))

func GenerateJWT(username string) (string, error) {
	expirationTime := time.Now().Add(60 * time.Minute)

	claims := &jwt.RegisteredClaims{
		Subject:   username,
		ExpiresAt: jwt.NewNumericDate(expirationTime),
	}

	token, err := jwt.NewWithClaims(jwt.SigningMethodHS256, claims).SignedString(jwtSecretKey)

	if err != nil {
		return "", err
	}

	return token, nil
}
