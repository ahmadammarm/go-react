package helpers

import "golang.org/x/crypto/bcrypt"

func HashPassword(password string) (string) {
    hashedPassword, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
    if err != nil {
        panic("Failed to hash password: " + err.Error())
    }
    return string(hashedPassword)
}