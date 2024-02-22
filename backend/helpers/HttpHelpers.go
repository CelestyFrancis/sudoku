package helpers

import (
	"encoding/json"
	"net/http"

	logrus "github.com/sirupsen/logrus"
)

// RespondwithJSON- write json response format
func RespondWithJSON(w http.ResponseWriter, code int, payload interface{}) {
	w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
	response, _ := json.Marshal(payload)
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(code)
	w.Write(response)
}

// GetBodyParams- get the parameters from the request body
func GetBodyParams(w http.ResponseWriter, r *http.Request, data interface{}) error {
	err := json.NewDecoder(r.Body).Decode(&data)
	if err != nil {
		logrus.Warn(err)
		RespondWithJSON(w, 400, "Error in params"+err.Error())
		return err
	}
	return nil
}
