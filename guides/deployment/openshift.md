# OpenShift Container Platform

## [Overview](https://docs.openshift.com/container-platform/4.11/getting_started/openshift-overview.html)

## Setup development environment for OpenShift Container Platform

There are two ways to setup dev environment for Openshift. CodeReady Containers and hosted OpenShift Sandbox.

### Hosted OpenShift Sandbox

The sandbox is perfect for immediate access into OpenShift, runs free for 30 days and can work best for one who cannot run CodeReady Containers.

1. Get a Redhat account.
2. Go to OpenShfit Sandbox [page](https://developers.redhat.com/developer-sandbox) and start your sandbox for free.

### CodeReady Containers

Red Hat CodeReady Containers (CRC) provides a minimal, preconfigured OpenShift 4 cluster on a laptop or desktop machine for development and testing purposes. CRC is delivered as a platform inside of the VM. Now, let's look at how to configure it!

CodeReady Container installation steps:

1. Get a Redhat account and log into [redhat openshift console](https://console.redhat.com/openshift/create/local)
2. Once logged in ant at [cluster local downalod page](https://console.redhat.com/openshift/create/local), Download the CodeReady Container installer.
3. Install the CRC following the instruction for your OS. Run `crc setup`.
4. Download pull secret and store it.
5. Run `crc start --pull-secret-file <path-to-pull-secret-fil>`.

If you get an error like `ERRO Cluster is not ready: cluster operators are still not stable after 10m0.495989372s` After starting `crc`, as a workaround, do the following:

```bash
crc cleanup
crc setup
crc start
crc start --pull-secret-file <path-to-pull-secrect-file>
```

Some of the CRC commands:

```bash
# Print the commands, flags and description. Can be used with sub commands e.g., crc cleanup --help
crc --help
crc <sub-command> --help

# Set up prerequisites for using CRC
crc setup

# Start the instance
crc start

# Stop the instance
crc stop

# Display status of the OpenShift cluster
crc status

# Undo config changes. You need to run crc setup and crc start after that to have crc up and running again.
crc cleanup
```

### OpenShift CommandLine

With the OpenShift command-line interface (CLI), the oc command, you can create applications and manage OpenShift Container Platform projects from a terminal. The OpenShift CLI is ideal in the following situations:

- Working directly with project source code
- Scripting OpenShift Container Platform operations
- Managing projects while restricted by bandwidth resources and the web console is unavailable

#### [Installing the OpenShift CLI (Linux)](https://docs.openshift.com/container-platform/4.11/cli_reference/openshift_cli/getting-started-cli.html)

1. Navigate to the [OpenShift Container Platform downloads page](https://access.redhat.com/downloads/content/290) on the Red Hat Customer Portal.
2. Select the appropriate version in the Version drop-down menu.
3. Unpack the archive: `$ tar xvzf <file>`
4. Place the `oc` binary in a directory that in on your `PATH`. You can have a `bin` directory added to your home by `mkdir ~/bin` and have that path added to your `PATH` (by adding a line `export PATH=$PATH:$HOME/bin` to your `~/.zshrc`). Moving `oc` binary file to your `~/bin` directory make `oc` command accessible throughout your terminal.

## [OpenShift Architecture](https://docs.openshift.com/container-platform/4.11/architecture/architecture.html)

[Installation and update](https://docs.openshift.com/container-platform/4.11/architecture/architecture-installation.html)
[Red Hat OpenShift Cluster Manager](https://docs.openshift.com/container-platform/4.11/architecture/ocm-overview-ocp.html)
[Control plane architecture](https://docs.openshift.com/container-platform/4.11/architecture/control-plane.html)
[Understanding OpenShift Container Platform development](https://docs.openshift.com/container-platform/4.11/architecture/understanding-development.html)

## Web console

[Web Console Overview](https://docs.openshift.com/container-platform/4.11/web_console/web-console-overview.html)
[About the web terminal in the web console](https://docs.openshift.com/container-platform/4.11/web_console/odc-about-web-terminal.html)

## Authentication and Authorization

[Overview of authentication and authorization](https://docs.openshift.com/container-platform/4.11/authentication/index.html)
[Understanding authentication](https://docs.openshift.com/container-platform/4.11/authentication/understanding-authentication.html)

## OpenShift Resources

### Users

user account on Openshift. Many organizations integrate with a single authentication provider (OAuth) in order to simplify authentication for their employees

Openshift users the user resource to manage permissions for a single person. Users can be created and managed many different ways, but developers usually are not responsible for managing them.

[OC cli user-related commands documentation](https://docs.openshift.com/container-platform/4.11/cli_reference/openshift_cli/getting-started-cli.html#cli-logging-in_cli-developer-commands)

```bash
#---- User-related commands in OpenShift CLI----

# displays the currently logged in user
oc whoami

# logout the user from openshift cli
oc logout

# Log in to OpenShift with the given username and cluster URL. You'll be prompted for the password.
oc login -u <user-name> <cluster-URL>
```

### Projects

OpenShift uses concept of projects to divide up applications. It also allow OpenShift to guarantee resource availability for applications through the use of quotas. Quota represents an upper bound on the CPU and Memory and persistent storage that all pods in the project can use. Quota prevent any single project from taking over all of OpenShift resources, while a quota does limit the amount of resources available to your application. It also guarantees the availability of those same resources.

OpenShift uses project to group together related resources. What those resources are will depend on your application (e.g., fe, backend server, database and etc).

[OC project-related documentation: creating a project](https://docs.openshift.com/container-platform/4.11/cli_reference/openshift_cli/getting-started-cli.html#creating-a-project)

[OC project-related documentation: working with projects](https://docs.openshift.com/container-platform/4.11/applications/projects/working-with-projects.html)

```bash
#---- Project-related commands in OpenShift CLI----

# displays the current project in your cluster
oc project

# displays all the projects in your cluster
oc projects

# Create a new project
oc new-project todo-app

# Switch to a project
oc project <project-name>
```

### Pods

A pod is one or more containers deployed together on one host, and the smallest compute unit that can be defined, deployed, and managed.

Pods are the rough equivalent of a machine instance (physical or virtual) to a Container. Each pod is allocated its own internal IP address, therefore owning its entire port space, and containers within pods can share their local storage and networking.

Pods have a lifecycle; they are defined, then they are assigned to run on a node, then they run until their container(s) exit or they are removed for some other reason. Pods, depending on policy and exit code, might be removed after exiting, or can be retained to enable access to the logs of their containers.

OpenShift Container Platform treats pods as largely immutable; changes cannot be made to a pod definition while it is running. OpenShift Container Platform implements changes by terminating an existing pod and recreating it with modified configuration, base image(s), or both. Pods are also treated as expendable, and do not maintain state when recreated. Therefore pods should usually be managed by higher-level controllers, rather than directly by users.

### DeploymentConfigs

The Deployment and DeploymentConfig API objects in OpenShift Container Platform provide two similar but different methods for fine-grained management over common user applications. They are composed of the following separate API objects:

- A DeploymentConfig or Deployment object, either of which describes the desired state of a particular component of the application as a pod template.
- DeploymentConfig objects involve one or more replication controllers, which contain a point-in-time record of the state of a deployment as a pod template. Similarly, Deployment objects involve one or more replica sets, a successor of replication controllers.
- One or more pods, which represent an instance of a particular version of an application.

#### Building blocks of a deployment

Deployments and deployment configs are enabled by the use of native Kubernetes API objects ReplicaSet and ReplicationController, respectively, as their building blocks.

Users do not have to manipulate replication controllers, replica sets, or pods owned by DeploymentConfig objects or deployments. The deployment systems ensure changes are propagated appropriately.

##### Replication controllers

A replication controller ensures that a specified number of replicas of a pod are running at all times. If pods exit or are deleted, the replication controller acts to instantiate more up to the defined number. Likewise, if there are more running than desired, it deletes as many as necessary to match the defined amount.

A replication controller configuration consists of:

- The number of replicas desired, which can be adjusted at run time.
- A Pod definition to use when creating a replicated pod.
- A selector for identifying managed pods.

A selector is a set of labels assigned to the pods that are managed by the replication controller. These labels are included in the Pod definition that the replication controller instantiates. The replication controller uses the selector to determine how many instances of the pod are already running in order to adjust as needed.

The replication controller does not perform auto-scaling based on load or traffic, as it does not track either. Rather, this requires its replica count to be adjusted by an external auto-scaler.

The following is an example definition of a replication controller:

```yaml
apiVersion: v1
kind: ReplicationController
metadata:
  name: frontend-1
spec:
  replicas: 1  
  selector:    
    name: frontend
  template:    
    metadata:
      labels:  
        name: frontend 
    spec:
      containers:
      - image: openshift/hello-openshift
        name: helloworld
        ports:
        - containerPort: 8080
          protocol: TCP
      restartPolicy: Always
```

##### Replica sets

Similar to a replication controller, a ReplicaSet is a native Kubernetes API object that ensures a specified number of pod replicas are running at any given time. The difference between a replica set and a replication controller is that a replica set supports set-based selector requirements whereas a replication controller only supports equality-based selector requirements.

The following is an example ReplicaSet definition:

```yaml
apiVersion: apps/v1
kind: ReplicaSet
metadata:
  name: frontend-1
  labels:
    tier: frontend
spec:
  replicas: 3
  selector: 
    matchLabels: 
      tier: frontend
    matchExpressions: 
      - {key: tier, operator: In, values: [frontend]}
  template:
    metadata:
      labels:
        tier: frontend
    spec:
      containers:
      - image: openshift/hello-openshift
        name: helloworld
        ports:
        - containerPort: 8080
          protocol: TCP
      restartPolicy: Always
```

##### DeploymentConfig objects

Building on replication controllers, OpenShift Container Platform adds expanded support for the software development and deployment lifecycle with the concept of DeploymentConfig objects. In the simplest case, a DeploymentConfig object creates a new replication controller and lets it start up pods.

However, OpenShift Container Platform deployments from DeploymentConfig objects also provide the ability to transition from an existing deployment of an image to a new one and also define hooks to be run before or after creating the replication controller.

The DeploymentConfig deployment system provides the following capabilities:

- A DeploymentConfig object, which is a template for running applications.
- Triggers that drive automated deployments in response to events.
- User-customizable deployment strategies to transition from the previous version to the new version. A strategy runs inside a pod commonly referred as the deployment process.
- A set of hooks (lifecycle hooks) for executing custom behavior in different points during the lifecycle of a deployment.
- Versioning of your application to support rollbacks either manually or automatically in case of deployment failure.
- Manual replication scaling and autoscaling.

When you create a DeploymentConfig object, a replication controller is created representing the DeploymentConfig object’s pod template. If the deployment changes, a new replication controller is created with the latest pod template, and a deployment process runs to scale down the old replication controller and scale up the new one.

Instances of your application are automatically added and removed from both service load balancers and routers as they are created. As long as your application supports graceful shutdown when it receives the TERM signal, you can ensure that running user connections are given a chance to complete normally.

The OpenShift Container Platform DeploymentConfig object defines the following details:

- The elements of a ReplicationController definition.
- Triggers for creating a new deployment automatically.
- The strategy for transitioning between deployments.
- Lifecycle hooks.

Each time a deployment is triggered, whether manually or automatically, a deployer pod manages the deployment (including scaling down the old replication controller, scaling up the new one, and running hooks). The deployment pod remains for an indefinite amount of time after it completes the deployment to retain its logs of the deployment. When a deployment is superseded by another, the previous replication controller is retained to enable easy rollback if needed.

Example DeploymentConfig definition

```yaml
apiVersion: apps.openshift.io/v1
kind: DeploymentConfig
metadata:
  name: frontend
spec:
  replicas: 5
  selector:
    name: frontend
  template: { ... }
  triggers:
  - type: ConfigChange 
  - imageChangeParams:
      automatic: true
      containerNames:
      - helloworld
      from:
        kind: ImageStreamTag
        name: hello-openshift:latest
    type: ImageChange  
  strategy:
    type: Rolling
```

##### Deployments

Kubernetes provides a first-class, native API object type in OpenShift Container Platform called Deployment. Deployment objects serve as a descendant of the OpenShift Container Platform-specific DeploymentConfig object.

Like DeploymentConfig objects, Deployment objects describe the desired state of a particular component of an application as a pod template. Deployments create replica sets, which orchestrate pod lifecycles.

For example, the following deployment definition creates a replica set to bring up one hello-openshift pod:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: hello-openshift
spec:
  replicas: 1
  selector:
    matchLabels:
      app: hello-openshift
  template:
    metadata:
      labels:
        app: hello-openshift
    spec:
      containers:
      - name: hello-openshift
        image: openshift/hello-openshift:latest
        ports:
        - containerPort: 80
```

##### Comparing Deployment and DeploymentConfig objects

Both Kubernetes Deployment objects and OpenShift Container Platform-provided DeploymentConfig objects are supported in OpenShift Container Platform; however, it is recommended to use Deployment objects unless you need a specific feature or behavior provided by DeploymentConfig objects.

### [Networking](https://docs.openshift.com/container-platform/4.12/networking/understanding-networking.html)

Cluster Administrators have several options for exposing applications that run inside a cluster to external traffic and securing network connections:

- Service types, such as node ports or load balancers
- API resources, such as Ingress and Route

By default, Kubernetes allocates each pod an internal IP address for applications running within the pod. Pods and their containers can network, but clients outside the cluster do not have networking access. When you expose your application to external traffic, giving each pod its own IP address means that pods can be treated like physical hosts or virtual machines in terms of port allocation, networking, naming, service discovery, load balancing, application configuration, and migration.

**OpenShift Container Platform DNS**
If you are running multiple services, such as front-end and back-end services for use with multiple pods, environment variables are created for user names, service IPs, and more so the front-end pods can communicate with the back-end services. If the service is deleted and recreated, a new IP address can be assigned to the service, and requires the front-end pods to be recreated to pick up the updated values for the service IP environment variable. Additionally, the back-end service must be created before any of the front-end pods to ensure that the service IP is generated properly, and that it can be provided to the front-end pods as an environment variable.

For this reason, OpenShift Container Platform has a built-in DNS so that the services can be reached by the service DNS as well as the service IP/port.

**OpenShift Container Platform Ingress Operator**
When you create your OpenShift Container Platform cluster, pods and services running on the cluster are each allocated their own IP addresses. The IP addresses are accessible to other pods and services running nearby but are not accessible to outside clients. The Ingress Operator implements the IngressController API and is the component responsible for enabling external access to OpenShift Container Platform cluster services.

The Ingress Operator makes it possible for external clients to access your service by deploying and managing one or more HAProxy-based Ingress Controllers to handle routing. You can use the Ingress Operator to route traffic by specifying OpenShift Container Platform Route and Kubernetes Ingress resources. Configurations within the Ingress Controller, such as the ability to define endpointPublishingStrategy type and internal load balancing, provide ways to publish Ingress Controller endpoints.

**Comparing routes and Ingress**
The Kubernetes Ingress resource in OpenShift Container Platform implements the Ingress Controller with a shared router service that runs as a pod inside the cluster. The most common way to manage Ingress traffic is with the Ingress Controller. You can scale and replicate this pod like any other regular pod. This router service is based on HAProxy, which is an open source load balancer solution.

The OpenShift Container Platform route provides Ingress traffic to services in the cluster. Routes provide advanced features that might not be supported by standard Kubernetes Ingress Controllers, such as TLS re-encryption, TLS passthrough, and split traffic for blue-green deployments.

Ingress traffic accesses services in the cluster through a route. Routes and Ingress are the main resources for handling Ingress traffic. Ingress provides features similar to a route, such as accepting external requests and delegating them based on the route. However, with Ingress you can only allow certain types of connections: HTTP/2, HTTPS and server name identification (SNI), and TLS with certificate. In OpenShift Container Platform, routes are generated to meet the conditions specified by the Ingress resource.

#### [Route](https://docs.openshift.com/container-platform/4.12/rest_api/network_apis/route-route-openshift-io-v1.html)

A route allows developers to expose services through an HTTP(S) aware load balancing and proxy layer via a public DNS entry. The route may further specify TLS options and a certificate, or specify a public CNAME that the router should also accept for HTTP and HTTPS traffic. An administrator typically configures their router to be visible outside the cluster firewall, and may also add additional security, caching, or traffic controls on the service content. Routers usually talk directly to the service endpoints.

Once a route is created, the host field may not be changed. Generally, routers use the oldest route with a given host when resolving conflicts.

Routers are subject to additional customization and may support additional controls via the annotations field.

Because administrators may configure multiple routers, the route status field is used to return information to clients about the names and states of the route under each router. If a client chooses a duplicate name, for instance, the route status conditions are used to indicate the route cannot be chosen.

To enable HTTP/2 ALPN on a route it requires a custom (non-wildcard) certificate. This prevents connection coalescing by clients, notably web browsers. We do not support HTTP/2 ALPN on routes that use the default certificate because of the risk of connection re-use/coalescing. Routes that do not have their own custom certificate will not be HTTP/2 ALPN-enabled on either the frontend or the backend.

### Storage

OpenShift Container Platform supports multiple types of storage, both for on-premise and cloud providers. You can manage container storage for persistent and non-persistent data in an OpenShift Container Platform cluster.

#### Storage types

OpenShift Container Platform storage is broadly classified into two categories, namely ephemeral storage and persistent storage.

##### Ephemeral storage

Pods and containers are ephemeral or transient in nature and designed for stateless applications. Ephemeral storage allows administrators and developers to better manage the local storage for some of their operations. For more information about ephemeral storage overview, types, and management, see [Understanding ephemeral storage](https://docs.openshift.com/container-platform/4.12/storage/understanding-ephemeral-storage.html#understanding-ephemeral-storage).

##### Persistent storage

Stateful applications deployed in containers require persistent storage. OpenShift Container Platform uses a pre-provisioned storage framework called persistent volumes (PV) to allow cluster administrators to provision persistent storage. The data inside these volumes can exist beyond the lifecycle of an individual pod. Developers can use persistent volume claims (PVCs) to request storage requirements. For more information about persistent storage overview, configuration, and lifecycle, see [Understanding persistent storage](https://docs.openshift.com/container-platform/4.12/storage/understanding-persistent-storage.html#understanding-persistent-storage).

#### Container Storage Interface (CSI)

CSI is an API specification for the management of container storage across different container orchestration (CO) systems. You can manage the storage volumes within the container native environments, without having specific knowledge of the underlying storage infrastructure. With the CSI, storage works uniformly across different container orchestration systems, regardless of the storage vendors you are using. For more information about CSI, see [Using Container Storage Interface (CSI)](https://docs.openshift.com/container-platform/4.12/storage/container_storage_interface/persistent-storage-csi.html#persistent-storage-csi).

##### Dynamic Provisioning

Dynamic Provisioning allows you to create storage volumes on-demand, eliminating the need for cluster administrators to pre-provision storage. For more information about dynamic provisioning, [see Dynamic provisioning](https://docs.openshift.com/container-platform/4.12/storage/dynamic-provisioning.html#dynamic-provisioning).

## OpenShift CLI Documentation

OpenShift has an internal detailed documentation on functionality and usage of all ot its resources. Documentation is accessible through this command: `oc explain <resource>`.

```bash
oc explain pod

oc explain pod.spec.containers

oc explain deployment

oc explain deployment.spec

oc explain deployment.spec.template.spec.container.ports
```

In addition `oc help` or `oc --help` can show top-level commands in OpenShift CLI. It also can be used to print documentation about a specific command.

```bash
# top-level help
oc --help

# help for a specific command
oc get --help
oc describe --help
oc policy --help
```

## OpenShift CLI commands

[OpenShift CLI developer commands](https://docs.openshift.com/container-platform/4.2/cli_reference/openshift_cli/developer-cli-commands.html)

[OpenShift CLI admin commands](https://docs.openshift.com/container-platform/4.2/cli_reference/openshift_cli/administrator-cli-commands.html)

```bash
# Show a high-level overview of the current project
oc status

# Show pods.  --watch option will show pods life-cycles
oc get pods
oc get pods --watch

# Create a new pod
oc create -f <path-to-pod-yaml>

# Start a shell in a pod on OpenShift
oc rsh <pod-name>

# Delete a pod
oc delete pod <pod-name>
```
