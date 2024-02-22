package repositories

type GamesRepository struct {
}

//CheckIfAdmin- Checks with the db whether the user is admin
// func (repository *ProjectsRepository) CheckIfAdmin(userId int) (bool, error) {
// 	var user models.Users
// 	tx := repository.BeginTransaction()
// 	err := tx.Table("users").Where("eid=?", userId).Find(&user).Error
// 	if err != nil {
// 		tx.Rollback()
// 		return false, err
// 	}
// 	tx.Commit()
// 	return user.Isadmin, nil
// }
