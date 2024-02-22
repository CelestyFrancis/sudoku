package models

//Users - To store user details
type Users struct {
	Eid     int `gorm:"primary_key" ; "AUTO_INCREMENT"`
	Name    string
	Email   string
	Isadmin bool
	Image   string
	Status  int
}
