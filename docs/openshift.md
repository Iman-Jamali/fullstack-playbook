# OpenShift Container Platform

## [Overview](https://docs.openshift.com/container-platform/4.11/getting_started/openshift-overview.html)

## Setup development environment for OpenShift Container Platform

There are two ways to setup dev environment for Openshift. CodeReady Containers and hosted OpenShift Sandbox.

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

### Hosted OpenShift Sandbox

The sandbox is perfect for immediate access into OpenShift, runs free for 30 days and can work best for one who cannot run CodeReady Containers.

1. Get a Redhat account.
2. Go to OpenShfit Sandbox [page](https://developers.redhat.com/developer-sandbox) and start your sandbox for free.

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

[OC project-related documentation](https://docs.openshift.com/container-platform/4.11/cli_reference/openshift_cli/getting-started-cli.html#creating-a-project)

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

## CRC commands

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
