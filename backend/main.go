package main

import (
	"net/http"
	"unigames-backend/loggers"

	logrus "github.com/sirupsen/logrus"
)

func main() {
	loggers.Init()
	port := "8080"
	logrus.Infof("Service running on port: %s", port)
	http.ListenAndServe(":"+port, ChiRouter().InitRouter())
}
