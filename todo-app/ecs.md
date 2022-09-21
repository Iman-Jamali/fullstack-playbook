# Deployment to AWS ECS

## How to update the image on your local

- Rebuilding the image and tag it `docker build -t imanjamali/todo-api --platform linux/amd64 -f ./todo-api/Dockerfile.prod  ./todo-api`
- Push the updated image to Docker Hub `docker push imanjamali/todo-api`
- Update the container on ECS
  - select your latest task's revision and click `create new revision`
  - Once a new revision is created, select that revision under your task definitions and hit `run task`
  - Select the service and click `deploy`

image architecture
- multi-arch image using buildx


Multi-stage docker build

## ECS
### Cluster
### Service
### Task

## ECS cost for a typical fe be db with two load balancers
$2 per day (.60 ECS, 1.4 load balancer)

## App Architecture / diagram

Find that under 147 video



