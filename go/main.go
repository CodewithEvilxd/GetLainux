package main

import (
	"fmt"
	"os"

	"github.com/codewithevilxd/GetLainux/go/internal/ui"
)

func main() {
	if err := ui.Run(); err != nil {
		fmt.Fprintf(os.Stderr, "Error: %v\n", err)
		os.Exit(1)
	}
}
