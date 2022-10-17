# Deployment to AWS ECS

## ECS

Elastic Container Service (ECS) is a fully managed container orchestration service by AWS. Similar service is offered by other cloud providers such as Azure Container Instances.

![ECS diagram](images/overview-fargate.png)

### Clusters

An Amazon ECS cluster is a logical grouping of tasks or services. You can use clusters to isolate your applications. This way, they don't use the same underlying infrastructure.

### Task definitions

A task definition is a text file that describes one or more containers that form your application. It's in JSON format. The task definition functions as a blueprint for your application. It specifies the various parameters for your application. For example, you can use it to specify parameters for the operating system, which containers to use, which ports to open for your application, and what data volumes to use with the containers in the task. The specific parameters available for your task definition depend on the needs of your specific application.

### Tasks

A task is the instantiation of a task definition within a cluster. After you create a task definition for your application within Amazon ECS, you can specify the number of tasks to run on your cluster. You can run a standalone task, or you can run a task as part of a service.

### Services

You can use an Amazon ECS service to run and maintain your desired number of tasks simultaneously in an Amazon ECS cluster. How it works is that, if any of your tasks fail or stop for any reason, the Amazon ECS service scheduler launches another instance based on your task definition. It does this to replace it and thereby maintain your desired number of tasks in the service.

### Other important tops

#### Application Load balancer

An Application Load Balancer functions at the application layer, the seventh layer of the Open Systems Interconnection (OSI) model. After the load balancer receives a request, it evaluates the listener rules in priority order to determine which rule to apply, and then selects a target from the target group for the rule action. You can configure listener rules to route requests to different target groups based on the content of the application traffic. Routing is performed independently for each target group, even when a target is registered with multiple target groups. You can configure the routing algorithm used at the target group level. The default routing algorithm is round robin; alternatively, you can specify the least outstanding requests routing algorithm.

You can add and remove targets from your load balancer as your needs change, without disrupting the overall flow of requests to your application. Elastic Load Balancing scales your load balancer as traffic to your application changes over time. Elastic Load Balancing can scale to the vast majority of workloads automatically.

You can configure health checks, which are used to monitor the health of the registered targets so that the load balancer can send requests only to the healthy targets.

![Load balancer diagram](images/load-balancer.png)



## ECS cost for a our todo app with BE, FE and a DB with two load balancers

$2 per day ($0.60 ECS, $1.4 load balancer)

## Steps to deploy todo app on ECS through console

1. Build and pushed your images to a container registry like DockerHub.
2. Create a Cluster.
3. Create a service for api and database
  3.1 This service have one load balancer
  3.2 Create a task definition
    3.2.1 Add a container to this task for todo-api
    3.2.2 Add a container to this task for todo-db
      - DB container can refer directly to dockerHub for the db image
      - To persist DB data, you can create a Elastic File System and set it as DB volume
    3.2.3 This task would need a security group with inbound rules to open
      - Port 80 for users
      - Postgres (or database) port for the db
      - Have opening for the created elastic file to be abe to communicate to db
4. Create a service for frontend
  4.1 Create a load balancer for this service
  4.1 Create a task definition
  4.3 Create a security group that opens tcp port 80 for users

### Note on ECS

- Update the service to pick up the latest image by checking force deployment
- All the services/tasks should be within the same VPC
- Load balancer target group should register to the private ip of the running task, so those containers in the task can be accessible by loadbalancer DNS name.
- ECS can also be configured through AWS CLI via config files. (update this)
