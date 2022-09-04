What is a container?

A container is a standard unit of software. A package of code and dependencies to run that code (e.g., NodeJS code + NodeJS runtime)

Docker is just a tool to create/manage containers.

Picnic Basket food+dish vs resturant analogy
Benefits of contianers
- Same environment for development and production
- Shared a common development environment/setup for dev team
- Prevent installatoin of a project's dependencies on a computer that may conflict with other projects on the same computer.
- 

 Virtual Machine (VM) vs Containers
- VM: Virtual machine is a virtual operating system with all the dependencies needed to run a program + the program itself. The issue with VM is that for each app, a whole new VM is created. Wastes resources. Performance is not good. Reproducibility for another app is trickey beanuse of configuration needed for each VM.
- Container: Each OS has a built-in support for Containers. On top of that sits, Docker engine that hosts and shares all the resources between all containers. Each container is a lightweight virtual machine with the app and its dependencies (run-time). Containers are low inpmact on OS and uses minimal resources. They Encapluase apps/environment instead of whole machines.


- Docker  
  - Image: The template for a container that contains the coe and required dependencies/runtimes
    - Images are layered
    - Images are Read-Only
    - Image layers are cached and reused
    - Every instruction in an image creates a cacheable layer - layers help with image-rebuilding and sharing
  - Container: The concrete instance/running "unit of software" of an image
    - Containers do not copy code and environment from the image
    - A container uses the image's layers, code and environment, and adds extra layer on top of it, running app and allocate resources. So multiple containers shares the same image's code and environment.
    - Containers are read-writeable
    - Multiple containers can run the same image without interference because they are isolated from each other.
    - Containers are separated from each other and have no shared data or state by default
  - Volume (manged by Docker): A directory on the host filesystem that is mounted into the a container
    - Volumes are read-writeable
    - Volumes are persistent if a container is shut down and removed.
    - Upon (re)start of a container, the mounted volume become available to that container.
    - Changes in the volume on the host side or container are in effect to the both sides.
    - The volume location is unknown and is managed by `docker volume` command.
    - Great for storing data that should be persisted but not necessary to be edited by the developer.
    - Data types in Docker
      - Application (source code + dependencies + runtime) => Stored in an image Read-Only layer
      - Temporary app data (app state, temp data, etc) => Stored in a container's memory or filesystem and is Read-Writeable. Stopping a container won't delete the data store in container's filesystem, but removing the container will delete that.
      - Persistent app data (user data) => Stored in filesystem and database in a container and volumes
    - Volumes can improve the performance of a container for data access.
      - Anonymous:
        - Created per single container. Not sharable between containers
        - Is specified by the directory path inside the container filesystem (e.g., `/app/data`)
        - volumes are removed automatically, when a container is removed.
        - Per container start, a new anonymous volume is created and previous one is left.
        - Unused anonymous volumes can be removed by `docker volume rm <volume_name>` or `docker volume prune`
        - Can be used to prioritize container-internal paths over the external paths (e.g., node_modules).
      - Named: A volume that is
        - Not tied to a container. Can be accessed/shared by multiple containers.
        - Is specified by the directory path inside the container filesystem and a name divided by a colon (e.g., `myData:/app/data`).
        - Persist even on container removal. Can be reused.
        - Won't be recreated on container (re)start.
        - Named volumes need to be defined under top-level `volumes` block in `docker compose` file
  - Bind Mount (manged by user): When you use a bind mount, a file or directory on the host machine is mounted into a container.
    - The file or directory is referenced by its full path on the host machine (e.g. `/Users/iman/code/fullstack-playbook/todo-app/todo-be:/app`).
    - Read-Writeable
    - Not tied to a container. Can be accessed/shared by multiple containers.
    - The file or directory does not need to exist on the Docker host already.
    - It is created on demand if it does not yet exist.
    - Bind mounts are very performant, but they rely on the host machine’s filesystem having a specific directory structure available.
    - Best fit for persistent and editable data.
    - Never shown under `docker volume ls` command, since it is not manged by Docker.
    - Bind mount can be read-only to prevent the container to change it. Can be set by `:ro` at the end of the path.
  - Network communication types
    - container-to-public(Internet): It works out of the box.
    - container-to-host: instead of using `localhost`, use special address `host.docker.internal`.
    - container-to-container:
      - Create two separate containers (on their own default networks) and one connect to another by inspecting ip of the target container and put that in the request address.
      - Create a network and have two or more container running inside that network. In this case containers can use their names as addresses to communicate to each other. Docker will resolve that name internally and replace it with the correct ip address.
      - Docker network has a driver that specifies the behavior of the network. By deafult, networks use `bridge` as driver. Other types of drives include:
        - host: For standalone containers, isolation between container and host system is removed (i.e. they share localhost as a network)
        - overlay: Multiple Docker daemons (i.e. Docker running on different machines) are able to connect with each other. Only works in "Swarm" mode which is a dated / almost deprecated way of connecting multiple containers
        - macvlan: You can set a custom MAC address to a container - this address can then be used for communication with that container
        - none: All networking is disabled.
        - Third-party plugins: You can install third-party plugins which then may add all kinds of behaviors and functionalities

## [Volumes configuration](https://stackoverflow.com/questions/43844639/how-do-i-add-cached-or-delegated-into-a-docker-compose-yml-volumes-list)
The purpose of using volumes configuration on docker is to share data between the host and the docker container and ensure data consistency between both (What happens in A(host/container) is represented in B(host/container) and vice versa) . The mounted volume is "part" of the container and relevant. The common usage is to store shared data backup both in container and on file system in machine. If the container is removed, volume still exists and is independent of container state it will be reused and loaded from last persisted state.

- Use `cached`: when the host performs changes, the container is in read only mode.
- Use `delegated`: when docker container performs changes, host is in read only mode.
- Use `default`: When both container and host actively and continuously perform changes on data.
- Ensure you use an updated docker-compose and docker version on your machine

## Docker Utility container
A docker utility container can help you setup your initial project without needing to have the tools/depenceis installed on your machine.

### Node
Use this command to run a node container and bind the `/app` directory inside that container to your current working directory.

```bash
  docker run -it --rm -v $(pwd):/app node:16.16.0-buster bash
```


## [Dockerignore](https://docs.docker.com/engine/reference/builder/#dockerignore-file)
To increase the build’s performance, exclude the unnecessary files and directories. The indicated files and directories will be excluded during the image build time (COPY command).

For example, for a Node project, you will ignore `node_modules` directory.


## [Docker commands](https://docs.docker.com/engine/reference/run/)

```bash
# Print all options
docker command --help

# Build an image
docker built -t <image-name:tag> -f <dockerfile-path> <context-path>

# Create and run a container off an image
docker run -p <host-port>:<container-port> -it --name <a-name-for-container> <image-name:tag>

# Stop/Start one or more running containers
docker stop <container-name/container-id>
docker start <container-name/container-id>

# Remove one or more containers
docker rm <container-name/container-id>
```

```bash
# List all containers
docker image ls

# Remove images
docker image rm <image-name:tag>

# Inspect an image
docker image inspect <image-name:tag>

```

```bash
# attache to a running container
docker attach <container-name/container-id>

# Display the logs of a container, can use -f/--follow to follow the logs
docker logs <container-name/container-id>

# interact with a container in a terminal
docker -i -t <container-name/container-id>
# or
docker -it <container-name/container-id>

# Copy a file to/from container
docker cp <local-path> <container-name/container-id>:<file-path>
docker cp <container-name/container-id>:<file-path> <local-path>

```

```bash
# Lists docker compose commands
docker compose --help 

# Building the images 
docker compose build

# Create and start containers (images if not built yet)
docker compose up

# Stop and remove containers, networks
# If plan you want to remove containers add -v/--volumes
docker compose down
```
