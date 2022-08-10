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
      - Anonymous:
        - Is specified by the directory path inside the container filesystem (e.g., `/app/data`)
        - volumes are removed automatically, when a container is removed.
        - Per container start, a new anonymous volume is created and previous one is left.
        - Unused anonymous volumes can be removed by `docker volume rm <volume_name>` or `docker volume prune`
      - Named: A volume that is
        - Is specified by the directory path inside the container filesystem and a name divided by a colon (e.g., `myData:/app/data`).
        - Persist even on container removal.
        - Won't be recreated on container (re)start.
  - Bind Mount (manged by user): When you use a bind mount, a file or directory on the host machine is mounted into a container.
    - The file or directory is referenced by its full path on the host machine (e.g. `/Users/iman/code/fullstack-playbook/todo-app/todo-be:/app`).
    - Read-Writeable
    - The file or directory does not need to exist on the Docker host already.
    - It is created on demand if it does not yet exist.
    - Bind mounts are very performant, but they rely on the host machine’s filesystem having a specific directory structure available.
    - Best fit for persistent and editable data.

- Data types in Docker
  - Application (source code + dependencies + runtime) => Stored in an image Read-Only layer
  - Temporary app data (app state, temp data, etc) => Stored in a container's memory or filesystem and is Read-Writeable. Stopping a container won't delete the data store in container's filesystem, but removing the container will delete that.
  - Persistent app data (user data) => Stored in filesystem and database in a container and volumes




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

