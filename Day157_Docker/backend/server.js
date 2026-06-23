// docker common commands lines.
// {docker build -t docker-test} . will build the image with the name docker-test
// {docker build -t docker-test }. vs {docker build -t docker-test:latest} both commands will build the image with the name docker-test and tag it as latest. The :latest tag is optional and is the default tag if no tag is specified. So both commands will have the same effect.
// docker run -p 3000:3000 docker-test will run the container and map port 3000 of the container to port 3000 of the host machine
// docker ps will list all the running containers
// docker stop <container_id> to stop the container with the specified container id
// docker rm <container_id> to remove the container with the specified container id
// docker compose up -d to start the container in detached mode 

import express from "express"
import app from "./src/app.js"


app.listen(3000, () => {
    console.log("Server is running on port 3000")
})