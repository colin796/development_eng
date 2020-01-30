package main

import (
	"io"
	"log"
	"os"
	"time"

	"mls_bootcamp/controller"
	"mls_bootcamp/services"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

var myLogger *log.Logger

func main() {
	myLogger = log.New(os.Stdout, "INFO : ", log.Ldate|log.Ltime|log.Lshortfile)

	// 0) Backfill
	backfillStartDate := time.Now().AddDate(0, 0, -1)
	backfillCounts := 60
	services.BackfillAPICall(backfillStartDate, backfillCounts) // service (utils는 시스템적인 (ex. 시간프로세싱))
	// 얘는 기능적

	// 1) Scheduler for daily API Call (everyday on 9am)
	cronInput := "0 8 * * *"
	services.DailyCronAPI(cronInput)

	// 2) Web Handler
	f, _ := os.Create("gin.log")
	gin.DefaultWriter = io.MultiWriter(f, os.Stdout)

	r := gin.Default()

	config := cors.DefaultConfig()
	config.AllowOrigins = []string{"http://localhost:3000"}
	r.Use(cors.New(config))
	//router.Use(cors.Default())

	r.GET("/api/read/:dt/:region", controller.ReadHandler) // view/20200101/강남구
	r.POST("/api/delete/:dt/:region", controller.DeleteHandler)
	r.POST("/api/create", controller.CreateHandler)

	r.Run(":8080")
}
