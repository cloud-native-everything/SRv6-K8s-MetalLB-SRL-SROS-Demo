package main

import (
	"os"
	"fmt"
	"sync"
        "gopkg.in/yaml.v2"
        "io/ioutil"
	"log"
	"sigs.k8s.io/kind/pkg/cmd"
	"nokia-lab/pkg/kind"
	"nokia-lab/pkg/dockerapi"
)

var wg = sync.WaitGroup{}

type Kind_Data struct {
    Cluster []Cluster_Data `yaml:"clusters"`
}

type Cluster_Data struct {
    //
    Name string    `yaml:"name"`
    Config  string    `yaml:"config"`
    Kubeconfig  string    `yaml:"kubeconfig"`
    Image string `yaml:"image"` 
}

func main() {
	DockerNet.DockerNetworkCreate()
	os.Exit(10)
        kindVars := getVars()
        //fmt.Println(kindVars.Cluster[0])
	runKind(*kindVars)
}


// Main is the kind main(), it will invoke Run(), if an error is returned
// it will then call os.Exit

func runKind(karray Kind_Data) {
        
	KindExec := func(Args *[]string) {
		if err := kindApp.Run(cmd.NewLogger(), cmd.StandardIOStreams(), *Args); err != nil {
                    os.Exit(1)
                }
		wg.Done()
	}

	fmt.Println("--->", karray.Cluster)
	fmt.Println(len(karray.Cluster))
        for i := 0; i < len(karray.Cluster); i++ {
		aux := []string{"create" , "cluster" , "--name" , karray.Cluster[i].Name}
		aux = append( aux, "--image", karray.Cluster[i].Image)
		aux = append( aux, "--config", karray.Cluster[i].Config)
		aux = append( aux, "--kubeconfig", karray.Cluster[i].Kubeconfig)
		fmt.Println("--->", aux)
		wg.Add(1)
		go KindExec(&aux)

	}
        wg.Wait()
}

func checkerr(err error) {
    if err != nil {
        log.Fatal(err)
    }
}

func getVars() (kdata *Kind_Data) {
        gtt_config, err := ioutil.ReadFile("./kind-instances.yaml")
        checkerr(err)
        err = yaml.Unmarshal(gtt_config, &kdata)
        return kdata

}
