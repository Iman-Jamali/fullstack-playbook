# Why use Kubernetes

- Create container on crash/remove
- Scale the number of running container on change of workload (auto scaling)
- Incoming traffic distributed equally among running containers. (Load balancing)
- Other cloud providers, offer similar service such as Azure containers and AWS ECS. 
  - One problem with these services is locked-in issue.
  - Another problem is knowledge/skills/config or code is not transferrable to other similar service on other cloud providers.

## Kubernetes essentials

- Pod: The smallest unit, that holds one or more containers and excecuting (running) containers along with their resources such as volumes, IP and run config.
- Worker Node: Worker nodes run the containers. They're machines/vms that run the containers. (In a AWS world, worker node would be compared to EC2).
  - kubelet: A service running on the worker node that does the actual communication with the master node, so the master node can control the pods on that worker node.
  - kube-proxy: A proxy service that is responsible for handling incoming and outgoing traffic to ensure everything working as desired and only allowed traffic is able to reach the pods/leave the worker node.
  - Proxy: A tool Kubernetes set up on a worker node to control the network traffic of the pods on that worker node. They can specify how pods running inside of them, can be reached from the outside world.

- Multiple worker nodes can then be controlled by Master Node, particuallyr through the Control Plane. Typically you don't interact directly with worker nodes and pods, instead, let the Control Plane do that. A developer can define the desired end state and Kubernetes take that into account. So master node is another server that has the control plan running on it which is responsible for interacting with worker nodes and pods running on them. Master node and worker nodes can be on the same machine or different machine/servers.
  - API Server: A service on the master node that is the counterpoint for the kubelet services running on the worker nodes. Help the communication between worker and master node.
  - Scheduler: Watches for new Pods, select worker nodes to run them on. Check if pods are healthy and replace them if needed.
  - Kube-Controller-Manager: Watches and controls Worker Nodes, correct number of Pods & more
  - Cloud-Controller-Manager: Similar to Kube-Controller-Manger but for a specific Cloud Provider. It knows how to interact with Cloud Provider resources (e.g., AWS and Azure). Basically translate instructions to the Cloud provider (e.g., AWS, Azure).

- All the pods, proxy in worker nodes and master node, amongs other things, forms a cluster with one network that all the different parts are connected. And the your master node is able to send instructions to a cloud provider API so it can create its cloud provider specific resources to replicate this desired state/picture on that cloud provider.

What Kubernetes do?

- Create objects (e.g., pods) and manage them
- Monitor Pods and re-create them, scale Pods, etc.
- Kubernetes utilizes the provided (cloud) resources to apply your configs/goals

What you to do/setup?

- Create the cluster and the node instances (worker and master nodes)
- Setup API Server, kubelet and other Kubernetes services / software on Nodes
- Create other (cloud) provider resources that might be needed (e.g., load balancer, file systems)

### Overview of core components

- Cluster: A set of Node machines which are running the Containerized Application (Worker Nodes) or control other Nodes (Master Node).
- Nodes: Physical or virtual machine with a certain hardware capacity which hosts one or multiple Pods and communicates with the Cluster.
  - Master Node: Cluster Control Plane, managing the Pods across Worker Nodes
  - Worker Node: Hosts Pods, running App Containers (+ resources)
- Pods: Pods hold the actual running App Containers + their required resources (e.g, volumes).
- Containers: Normal (Docker) Containers
- Services: A logical set (group) of Pods with a unique, Pod- and Container-independent IP address

### Installation

kubectl: kube-control is a tool to send instruction to the Cluster. For instance, to create a new deployment, delete/change a deployment. A developer can use kubectl to send instruction to master node to work with worker nodes. Another word, kubectl able the developer to set/modify configuration of Kubernetes. kubectl is the tool you need to communicate with your cluster whether it is locally (via Minikube) or on the cloud (e.g., on AWS).

Minikube: a tool that make it easy to run Kubernetes locally. Minikube runs a single-node Kubernetes cluster inside a VM (via Docker, Virtual Box etc) on your laptop.

### Kubernetes Objects

Kubernetes objects are persistent entities in the Kubernetes system. Kubernetes uses these entities to represent the state of your cluster. They can describe:

- What containerized applications are running (and on which nodes)
- The resources available to those applications
- The policies around how those applications behave, such as restart policies, upgrades, and fault-tolerance

Pod Object:

- The smallest "unit" Kubernetes interacts with
  - Contains and runs one or multiple containers (most common use case id "one container per Pod")
  - Pods contain shared resources (e.g., volumes) for all Pod containers
  - Has a cluster-internal IP by default. Containers inside a Pod can communicate via localhost.
- Pods are designed to be ephemeral: Kubernetes will start, stop and replace them as needed.
- For pods to be manged for you, you need a "Controller" (e..g, a "Deployment")

Deployment Object:

- Control one/more Pods
- A desired state is set and Kubernetes changes the actual state. Define which Pods and containers to run and the number of instances
- Deployments can be paused, deleted and rolled back
- Deployments can be scaled dynamically (and automatically)
- Deployments managed a Pod for you, you can also create multiple Deployments. You therefore typically don't directly control Pods, instead you use Deployments to set up the desired and state

Behind the scene of the command `kubectl create deployment --image ...`
Add the image

Service Object:

- Exposes Pods to the Cluster or externally
  - Each Pod has an internal IP by default - it changes when a Pod is replaced/recreated. Finding Pods is hard if the IP changes all the time.
- Services group Pods with a shared IP
- Services can allow external access to Pods
- Without Services, Pods are very hard to reach and communication is difficult
- Reaching a Pod from outside the Cluster is not possible at all without Services

Imperative Kubernetes commands:

```bash
# Create deployment by specifying an image in a container registry 
$ kubectl create deployment first-app --image=imanjamali/kub-first-app

# How many deployment exists in the cluster
$ kubectl get deployments

# How many pods exists in the deployment
$ kubectl get pods

# Open minikube dashboard on your local.
$ minikube dashboard

# Takes a deployment and and expose it as a new Kubernetes service
$ kubectl expose deployment first-app --type=LoadBalancer --port=8080 

# Return services
$ kubectl get services

# Minikube gives local access to the service by mapping a special port to an IP
$ minikube service first-app

# scale (number of running pods) for a deployment by specifying the deployment name and number of replicas
$ kubectl scale deployment/first-app --replicas=3


# How to update a deployment with a new version of an image

# update your docker image with a new tag and push it to the registry
$ docker build -t imanjamali/kub-first-app:2
# Setting a new version of an image in a deployment. This will update the image in the deployment and the pods will be restarted based on the new image
$ kubectl set image deployment/first-app kub-first-app=imanjamali/kub-first-app:2
# Check the status of the rollout after setting the deployment with the new image
$ kubectl rollout status deployment/first-app


# How roll back the deployment if the new image was not running properly

# Undo the latest deployment
$ kubectl rollout undo deployment/first-app
# Show the different deployment versions. History of the deployment
$ kubectl rollout history deployment/first-app
# See the details of a specific deployment version
$ kubectl rollout history deployment/first-app --revision=3
# Roll back a deployment to a specific version
$ kubectl rollout undo deployment/first-app --to-revision=1

# Restart a deployment
$ kubectl rollout restart deployment <deployment-name>

# How to remove deployment related resources
$ kubectl delete service first-app
$ kubectl delete deployment first-app

# How to view logs of a pod
$ kubectl logs <pod-name>
```

For declarative approach you may need the [API reference of Kubernetes](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.25/#-strong-api-overview-strong-)

```bash
# Declaratively create deployment and service by referencing their yaml files
$ kubectl apply -f deployment.yaml -f service.yaml
# Declaratively delete deployment and service by referencing their yaml files
$ kubectl delete -f deployment.yaml -f service.yaml
# Run the service locally
$ minikube service <name-of-the-service>
```

### Kubernetes Storage and data [docs](https://kubernetes.io/docs/concepts/storage/volumes/)

State is date that is generated and used by the app which must not be lost.
  
  - User generated data like user account. Often stored in databases and files.
  - Intermediate results derived by the app. Often stored in memory, temporary databases and files.
  In Kubernetes, both of the above data are stored in `Volumes` and it is Kubenetes that needs to be configured to add volumes to the containers.

#### Kubernetes and Volumes

- At its core, a volume is a directory, possibly with some data in it, which is accessible to the containers in a pod.
- How that directory comes to be, the medium that backs it, and the contents of it are determined by the particular volume type used.
- To use a volume, specify the volumes to provide for the Pod in `.spec.volumes` and declare where to mount those volumes into containers in `.spec.containers[*].volumeMounts`.
- For each container defined within a Pod, you must independently specify where to mount each volume that the container uses.
- Volumes cannot mount within other volumes
- A volume cannot contain a hard link to anything in a different volume

- Kubernetes can mount volumes to the containers
  - Different type of volumes and drivers are supported
    - "Local" volumes. (created on Nodes)
    - Cloud-provider specific volumes
  - Volumes lifetime depends on the Pod lifetime
    - Volumes survives the container restart and the removal
    - Volumes are removed when Pods are destroyed.

Differences between Docker and Kubernetes volumes:

- Kubernetes Support different drivers and types
- Docker has no driver/type support

- Kubernetes volumes are not necessary persistent (survives container removal but removed by Pod removal)
- Docker volumes are persistent until manually cleared. (survives container removal).

Some of the Kubernetes volume types:

##### emptyDir

An emptyDir volume is first created when a Pod is assigned to a node, and exists as long as that Pod is running on that node. As the name says, the emptyDir volume is initially empty. All containers in the Pod can read and write the same files in the emptyDir volume, though that volume can be mounted at the same or different paths in each container. When a Pod is removed from a node for any reason, the data in the emptyDir is deleted permanently. Use cases:

- scratch space, such as for a disk-based merge sort
- checkpointing a long computation for recovery from crashes
- holding files that a content-manager container fetches while a webserver container serves the data

Depending on your environment, emptyDir volumes are stored on whatever medium that backs the node such as disk or SSD, or network storage. However, if you set the `emptyDir.medium` field to `"Memory"`, Kubernetes mounts a tmpfs (RAM-backed filesystem) for you instead. While tmpfs is very fast, be aware that unlike disks, tmpfs is cleared on node reboot and any files you write count against your container's memory limit.

> Note: If the `SizeMemoryBackedVolumes` feature gate is enabled, you can specify a size for memory backed volumes. If no size is specified, memory backed volumes are sized to 50% of the memory on a Linux host.

emptyDir configuration example:

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: test-pd
spec:
  containers:
  - image: registry.k8s.io/test-webserver
    name: test-container
    volumeMounts:
    - mountPath: /cache
      name: cache-volume
  volumes:
  - name: cache-volume
    emptyDir: {}
```

##### hostPath

A hostPath volume mounts a file or directory from the host node's filesystem into your Pod.

This is not something that most Pods will need, but it offers a powerful escape hatch for some applications. Use cases:

- Running a container that needs access to Docker internals; use a hostPath of `/var/lib/docker`
- Running cAdvisor in a container; use a `hostPath` of `/sys`
- Allowing a Pod to specify whether a given hostPath should exist prior to the Pod running, whether it should be created, and what it should exist as

In addition to the required path property, you can optionally specify a type for a hostPath volume. Some of the supported values for `type` are:

- Empty string (default) is for backward compatibility, which means that no checks will be performed before mounting the hostPath volume.
- `DirectoryOrCreate`: If nothing exists at the given path, an empty directory will be created there as needed with permission set to 0755, having the same group and ownership with Kubelet.
- `Directory`: A directory must exist at the given path
- `FileOrCreate`: If nothing exists at the given path, an empty file will be created there as needed with permission set to 0644, having the same group and ownership with Kubelet.
- `File`: A file must exist at the given path

`hostPath` configuration example:

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: test-pd
spec:
  containers:
  - image: registry.k8s.io/test-webserver
    name: test-container
    volumeMounts:
    - mountPath: /test-pd
      name: test-volume
  volumes:
  - name: test-volume
    hostPath:
      # directory location on host
      path: /data
      # this field is optional
      type: Directory
```

##### secret

A secret volume is used to pass sensitive information, such as passwords, to Pods. You can store secrets in the Kubernetes API and mount them as files for use by pods without coupling to Kubernetes directly. secret volumes are backed by tmpfs (a RAM-backed filesystem) so they are never written to non-volatile storage.

- You must create a Secret in the Kubernetes API before you can use it.
- A container using a Secret as a subPath volume mount will not receive Secret updates.

##### configMap

A ConfigMap provides a way to inject configuration data into pods. The data stored in a ConfigMap can be referenced in a volume of type configMap and then consumed by containerized applications running in a pod.

- When referencing a ConfigMap, you provide the name of the ConfigMap in the volume. You can customize the path to use for a specific entry in the ConfigMap. The following configuration shows how to mount the log-config ConfigMap onto a Pod called configmap-pod:
  - The log-config ConfigMap is mounted as a volume, and all contents stored in its log_level entry are mounted into the Pod at path /etc/config/log_level. Note that this path is derived from the volume's mountPath and the path keyed with log_level.

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: configmap-pod
spec:
  containers:
    - name: test
      image: busybox:1.28
      volumeMounts:
        - name: config-vol
          mountPath: /etc/config
  volumes:
    - name: config-vol
      configMap:
        name: log-config
        items:
          - key: log_level
            path: log_level
```

- You must create a ConfigMap before you can use it.
- A container using a ConfigMap as a subPath volume mount will not receive ConfigMap updates.
- Text data is exposed as files using the UTF-8 character encoding. For other character encodings, use `binaryData`.

#### Out-of-tree volume plugins

The out-of-tree volume plugins include Container Storage Interface (CSI), and also FlexVolume (which is deprecated). These plugins enable storage vendors to create custom storage plugins without adding their plugin source code to the Kubernetes repository.

Previously, all volume plugins were "in-tree". The "in-tree" plugins were built, linked, compiled, and shipped with the core Kubernetes binaries. This meant that adding a new storage system to Kubernetes (a volume plugin) required checking code into the core Kubernetes code repository.

Both CSI and FlexVolume allow volume plugins to be developed independent of the Kubernetes code base, and deployed (installed) on Kubernetes clusters as extensions.

##### `csi`

Container Storage Interface (CSI) defines a standard interface for container orchestration systems (like Kubernetes) to expose arbitrary storage systems to their container workloads.

Once a CSI compatible volume driver is deployed on a Kubernetes cluster, users may use the csi volume type to attach or mount the volumes exposed by the CSI driver.

A csi volume can be used in a Pod in three different ways:

- through a reference to a PersistentVolumeClaim
- with a generic ephemeral volume
- with a CSI ephemeral volume if the driver supports

#### Persistent Volumes

Managing storage is a distinct problem from managing compute instances. The PersistentVolume subsystem provides an API for users and administrators that abstracts details of how storage is provided from how it is consumed. To do this, we introduce two new API resources: `PersistentVolume` and `PersistentVolumeClaim`.

- A `PersistentVolume` (PV) is a piece of storage in the cluster that has been provisioned by an administrator or dynamically provisioned using Storage Classes. It is a resource in the cluster just like a node is a cluster resource. PVs are volume plugins like Volumes, but have a lifecycle independent of any individual Pod that uses the PV. This API object captures the details of the implementation of the storage, be that NFS, iSCSI, or a cloud-provider-specific storage system.
- A `PersistentVolumeClaim` (PVC) is a request for storage by a user. It is similar to a Pod. Pods consume node resources and PVCs consume PV resources. Pods can request specific levels of resources (CPU and Memory). Claims can request specific size and access modes (e.g., they can be mounted ReadWriteOnce, ReadOnlyMany or ReadWriteMany, see AccessModes).

While PersistentVolumeClaims allow a user to consume abstract storage resources, it is common that users need PersistentVolumes with varying properties, such as performance, for different problems. Cluster administrators need to be able to offer a variety of PersistentVolumes that differ in more ways than size and access modes, without exposing users to the details of how those volumes are implemented. For these needs, there is the StorageClass resource.

These are Pod and Node independent Volumes that data persist regardless of Pod existence.

Persistent Volume is a separate resource than Nodes and Pods that are created inside of Cluster detached from Nodes and Pods.

Persistent Volume Claim are created in a Pod that can reach out to stand-alone Persistent Volumes to have access them.

- Volumes
  - Volume is attached to Pod and Pod lifecycle
  - Defined and created together with Pod
  - Hard to administer on a global level
- Persistent Volumes
  - Volume is a standalone Cluster resource (not attached to a Pod or Node)
  - Created standalone, claimed via a PVC
  - Can be defined once and used multiple times

### Environment variables

#### ConfigMaps

A ConfigMap is an API object used to store non-confidential data in key-value pairs. Pods can consume ConfigMaps as environment variables, command-line arguments, or as configuration files in a volume.

A ConfigMap allows you to decouple environment-specific configuration from your container images, so that your applications are easily portable.

> Caution: ConfigMap does not provide secrecy or encryption. If the data you want to store are confidential, use a Secret rather than a ConfigMap, or use additional (third party) tools to keep your data private.

A ConfigMap is an API object that lets you store configuration for other objects to use. Unlike most Kubernetes objects that have a spec, a ConfigMap has data and binaryData fields. These fields accept key-value pairs as their values. Both the data field and the binaryData are optional. The data field is designed to contain UTF-8 strings while the binaryData field is designed to contain binary data as base64-encoded strings.

Here's an example ConfigMap that has some keys with single values, and other keys where the value looks like a fragment of a configuration format.

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: game-demo
data:
  # property-like keys; each key maps to a simple value
  player_initial_lives: "3"
  ui_properties_file_name: "user-interface.properties"

  # file-like keys
  game.properties: |
    enemy.types=aliens,monsters
    player.maximum-lives=5    
  user-interface.properties: |
    color.good=purple
    color.bad=yellow
    allow.textmode=true    
```

There are four different ways that you can use a ConfigMap to configure a container inside a Pod:

- Inside a container command and args
- Environment variables for a container
- Add a file in read-only volume, for the application to read
- Write code to run inside the Pod that uses the Kubernetes API to read a ConfigMap

Here's an example Pod that uses values from game-demo to configure a Pod:

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: configmap-demo-pod
spec:
  containers:
    - name: demo
      image: alpine
      command: ["sleep", "3600"]
      env:
        # Define the environment variable
        - name: PLAYER_INITIAL_LIVES # Notice that the case is different here
                                     # from the key name in the ConfigMap.
          valueFrom:
            configMapKeyRef:
              name: game-demo           # The ConfigMap this value comes from.
              key: player_initial_lives # The key to fetch.
        - name: UI_PROPERTIES_FILE_NAME
          valueFrom:
            configMapKeyRef:
              name: game-demo
              key: ui_properties_file_name
      volumeMounts:
      - name: config
        mountPath: "/config"
        readOnly: true
  volumes:
    # You set volumes at the Pod level, then mount them into containers inside that Pod
    - name: config
      configMap:
        # Provide the name of the ConfigMap you want to mount.
        name: game-demo
        # An array of keys from the ConfigMap to create as files
        items:
        - key: "game.properties"
          path: "game.properties"
        - key: "user-interface.properties"
          path: "user-interface.properties"
```

#### Secrets

A Secret is an object that contains a small amount of sensitive data such as a password, a token, or a key. Such information might otherwise be put in a Pod specification or in a container image. Using a Secret means that you don't need to include confidential data in your application code.

Because Secrets can be created independently of the Pods that use them, there is less risk of the Secret (and its data) being exposed during the workflow of creating, viewing, and editing Pods. Kubernetes, and applications that run in your cluster, can also take additional precautions with Secrets, such as avoiding writing secret data to nonvolatile storage.

Secrets are similar to ConfigMaps but are specifically intended to hold confidential data.

Secret config files should be gitignored.

How to create secrets?

- Command line
- Generator
- Configuration file:
A config file in YAML/JSON that has two data maps: `data` adn `stringData`. `data` requires values to be encoded in base64 whereas the `stringData` allows to provide values as plain strings (they will be encoded for you on create/update).

To encode a string in base64 in terminal run `$ echo -n 'my-string' | base64`

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: example-app
type: Opaque
data:
  app-user: YWRtaW5pc3RyYXRvcg==
  app-password: cGFzc3dvcmQ=
stringData:
  Dbconnection:
  Server=tcp:myserver.database.net,1433;Database=myDB;User ID=mylogin@myserver;Password=myPassword;Trusted_Connection=False;Encrypt=True;
  config.yaml: |-
        LogLevel: Warning
        API_TOKEN: NcNIMcMYMAMg.MGwjPnPfEBgqMl8Q
        API_URI: https://www.myapp.com/api
```

How to access secrets?

- As container environment variable.

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: mypod
spec:
  containers:
    - name: myapp
    image: ubuntu
    env:
      - name: PASSWORD
        valueFrom:
          secretKeyRef:
            name: mysecret
            key: password
```

- As files in a volume mounted on one or more of its containers.

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: mypod
spec:
  containers:
    - name: myapp
    image: ubuntu
    volumeMounts:
      - name: secrets
      mountPath: "/etc/secrets"
      readOnly: true
volumes:
  - name: secrets
  secret:
    secretName: mysecret
    defaultMode: 0400
    items:
      - key: username
      path: my-username
```

### Kubernetes Network

There are five types of Services:

- ClusterIP (default): Internal clients send requests to a stable internal IP address. Not reachable from outside of the Cluster.
- NodePort: Clients send requests to the IP address of a node on one or more nodePort values that are specified by the Service. Reachable from outside of the Cluster. In case there are multiple nodes and pods move between the nodes (due to replica creation and launches on a different node) would lead to different ip addresses.
- LoadBalancer: Clients send requests to the IP address of a network load balancer. Reachable from outside of the Cluster. This automatically distribute incoming requests across all pods regardless of the node they run on. The IP address is independent from the node on which pod runs.

Kubernetes have environment varables that amongs other things, share the ip of the generated pods. For example one can use `<service-name>_SERVICE_HOST` to access the ip of a service of type ClusterIP with name of `<service-name>`.

#### CoreDNS

CoreDNS is a flexible, extensible DNS server that can serve as the Kubernetes cluster DNS. Like Kubernetes, the CoreDNS project is hosted by the CNCF.

You can use CoreDNS instead of kube-dns in your cluster by replacing kube-dns in an existing deployment, or by using tools like kubeadm that will deploy and upgrade the cluster for you.

Amongst other things, Kubernetes built-in CoreDNS can auto generate domain names for services. For example one deployment can use `<service-name>.default` (e.g., `auth-service.default`) as the address to connect to another service in that cluster. (`default` is the namespace)

### Kubernetes Namespaces [docs](https://kubernetes.io/docs/concepts/overview/working-with-objects/namespaces/)

In Kubernetes, namespaces provides a mechanism for isolating groups of resources within a single cluster. Names of resources need to be unique within a namespace, but not across namespaces. Namespace-based scoping is applicable only for namespaced objects (e.g. Deployments, Services, etc) and not for cluster-wide objects (e.g. StorageClass, Nodes, PersistentVolumes, etc).

Namespaces are intended for use in environments with many users spread across multiple teams, or projects. For clusters with a few to tens of users, you should not need to create or think about namespaces at all. Start using namespaces when you need the features they provide.

When to Use Multiple Namespaces?

- Namespaces provide a scope for names. Names of resources need to be unique within a namespace, but not across namespaces. Namespaces cannot be nested inside one another and each Kubernetes resource can only be in one namespace.
- Namespaces are a way to divide cluster resources between multiple users (via resource quota).
- It is not necessary to use multiple namespaces to separate slightly different resources, such as different versions of the same software: use labels to distinguish resources within the same namespace.

List all the current namespaces in a cluster:

```bash
$ kubectl get namespace
```

### Deployment options

- Custom Data Center: Install and configure everything on your own including machines and Kubernetes Software.
- Cloud Provider
  - Install and configure most things on your own: 
    - Create and connect machines
    - Install and configure software.
    - Can be done manually or [kOps](https://github.com/kubernetes/kops)
  - Use a manged service
    - Define cluster architecture
    - Service like AWS EKS or Azure Kubernetes (AKS)
