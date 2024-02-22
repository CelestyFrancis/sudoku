package interfaces

type IGamesService interface {
	CreateSudoku(string) ([][]int, error)
}
