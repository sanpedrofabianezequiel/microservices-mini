

```
 patterns to create scalable microservices for a variety of app domains
```

```
into the project <post>
docker build .  || docker build -t microservice/posts:0.0.1 .
docker run <idDocker> || docker run microservice/posts 
```

# Commands helps
```
docker run -it microservice/posts sh
docker ps
docker exec -it <idDocker> sh
docker logs <idDocker>
```

# Commands helps Kubernetes
```
kubectl version
into the project <post>
°°°°wE NEED TO CREATE THE IMAGE FOR THE NEXT COMMANDS
 containers:
    - name: posts
      image: microservice/posts:0.0.1
°°°°THEN
kubectl apply -f posts.yaml
kubectl get pods
```

Structure:

- Kubernetes Cluster :Collection of nodes + a moster to manage them
- Node: Virtual machine that will run our containers
- Pod: 
- Deployment:Monitors a set of pods, and restar them if they crash
- Service: provide an easy to remember URL to access a running container


[Kubernet On](https://stackoverflow.com/questions/50490808/unable-to-connect-to-the-server-dial-tcp-18080-connectex-no-connection-c)