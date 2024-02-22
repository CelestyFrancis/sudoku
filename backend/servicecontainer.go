package main

import (
	// "fmt"
	// "strconv"
	"sync"

	// "unigames-backend/config"
	"unigames-backend/controllers"
	"unigames-backend/repositories"
	"unigames-backend/services"

	_ "github.com/lib/pq"
	logrus "github.com/sirupsen/logrus"
)

type IServiceContainer interface {
	InjectGamesController() controllers.GamesController
}

type kernel struct{}

func (k *kernel) InjectGamesController() controllers.GamesController {

	// config := config.Load()
	// //Opening connection to DB
	// port, err := strconv.Atoi(config.Database.Port)
	//
	// psqlInfo := fmt.Sprintf("host=%s port=%d user=%s "+"password=%s dbname=%s sslmode=disable", config.Database.Host, port, config.Database.User, config.Database.Password, config.Database.Dbname)
	// db, err := gorm.Open("postgres", psqlInfo)
	// if err != nil {
	// 	logrus.Panic(err)
	// }
	// // defer db.Close()
	logrus.Infof("Games service successfully connected!")

	// gormHandler.Conn = db

	gamesRepository := &repositories.GamesRepository{}
	gamesService := &services.GamesService{gamesRepository}
	gamesController := controllers.GamesController{gamesService}

	return gamesController
}

var (
	k             *kernel
	containerOnce sync.Once
)

func ServiceContainer() IServiceContainer {
	if k == nil {
		containerOnce.Do(func() {
			k = &kernel{}
		})
	}
	return k
}
