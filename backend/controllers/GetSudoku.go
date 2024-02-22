package controllers

import (
	"net/http"

	logrus "github.com/sirupsen/logrus"
	"unigames-backend/constants"
	"unigames-backend/helpers"
)

func (gamesServices *GamesController) GetSudoku(w http.ResponseWriter, r *http.Request) {
	queryValues := r.URL.Query()
	difficulty := queryValues.Get("difficulty")
	if difficulty == "" {
		logrus.Warn("Error in params")
		helpers.RespondWithJSON(w, http.StatusBadRequest, "Error in params")
		return
	}
	if !constants.Difficulties[difficulty] {
		logrus.Warn("Error in params")
		helpers.RespondWithJSON(w, http.StatusBadRequest, "Error in params")
		return
	}
	sudoku, err := gamesServices.CreateSudoku(difficulty)
	if err != nil {
		logrus.Warn(err)
		helpers.RespondWithJSON(w, http.StatusBadRequest, "Couldn't create sudoku: " + err.Error())
		return
	}
	helpers.RespondWithJSON(w, http.StatusOK, sudoku)
	return
}
