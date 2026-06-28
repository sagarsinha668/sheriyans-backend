# user ---> (request) ---> services(having fix ip address) ---> (send request to pods)-->pods(having varying  IP location)
# How to make image and container in docker ?
steps to make docker imgage are:
1. make `.dockerignore` file
2. make `dockerfile `file
3. run cmd `docker build . -t imagename:latest` {to make image}
4. run cmd `docker run -p 3000:3000 imagename`
5. cmd ` docker ps ` to see all containers
6. cmd `docker stop containerID` to stop particular container
7. cmd `docker rm containerID` to remove container
8. make folder `k8s` under it make `deployement.yml` and explain every things.
9. then run `kubectl apply -f ./k8s/deployment.yml`
10. make `service.yml` file, make sure target port and label should same in devployment and service file.
11. cmd `kubectl apply -f ./k8s/service.yml`
12. make `ingress.yml` file 
13. cmd `kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.12.1/deploy/static/provider/cloud/deploy.yaml` for ingress controll setup
14. rum cmd `kubectl apply -f ./k8s/ingress.yml`
15. run cmd  `ingress.network.k8s.io/express-ingress created`



