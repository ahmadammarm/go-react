package middleware

import (
	"net/http"
	"strings"

	"github.com/ahmadammarm/go-react/server/config"
	"github.com/gin-gonic/gin"
    "github.com/golang-jwt/jwt/v5"
)

var jwtSecretKey = []byte(config.GetEnv("JWT_SECRET"))

func JWTMiddleware() gin.HandlerFunc {
    return func(context *gin.Context) {
        tokenString := context.GetHeader("Authorization")
        if tokenString == "" {
            context.JSON(http.StatusUnauthorized, gin.H{
                "error": "Authorization header is required",
            })
            context.Abort()
            return
        }

        tokenString = strings.TrimPrefix(tokenString, "Bearer ")

        claims := &jwt.RegisteredClaims{}

        token, err := jwt.ParseWithClaims(tokenString, claims, func(token *jwt.Token) (interface{}, error){
            if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
                return nil, gin.Error{
                    Err:  http.ErrNotSupported,
                    Type: gin.ErrorTypePublic,
                }
            }
            return jwtSecretKey, nil
        })

        if err != nil || !token.Valid {
            context.JSON(http.StatusUnauthorized, gin.H{
                "error": "Invalid or expired token",
            })
            context.Abort()
            return
        }

        context.Set("username", claims.Subject)

        context.Next()
    }
}