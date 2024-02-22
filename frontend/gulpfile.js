gulp.task('watch', function () {
    gulp.watch('./src/assets/scss/*.scss', ['sass']);
});

gulp.task('default', ['sass', 'watch']);
