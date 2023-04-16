# AWS EKS

Elastic Kubernetes Service is a managed service using Kubernetes on AWS without needing to install, operate and maintain your own Kubernetes control plane or nodes.

EKS has integration with:

- Amazon ECR for container images
- Elastic Load Balancing for load distribution
- IAM for authentication
- Amazon VPC for isolation

What is the difference between EKS and ECS?

- EKS
  - Manged service for Kubernetes deployments
  - No AWS-specific syntax or philosophy required
  - Use standard Kubernetes configurations and resources
- ECS
  - Managed service for Container deployments
  - AWS-specific syntax and philosophy applies
  - Use AWS- specific configuration and concepts

## Steps to get started with EKS - [official guide](https://docs.aws.amazon.com/eks/latest/userguide/[getting-started-console.html)

1. Create a cluster
  1.1. Create a VPC
  1.2. Create a cluster IAM role
  1.3. Create a cluster through AWS Console. Please note that your AWS CLI user and the user by which you create the cluster on the console has to be the same.
2. Connect your local to the cluster. This requires changes to your `kubeconfig` file that located in `~/.kube/config`.
  2.1. First backup your current `conf` file and rename it (e.g., `config.minikube`).
  2.2. Run the command below (always check the official guide for latest command).

    ```bash
    aws eks update-kubeconfig --region <my-region-code> --name <my-cluster-name>
    ```

3. Create nodes
4. If you need a volume, create an EFS following the below steps.
  4.1. Create a security group for your EFS. Make sure add your cluster VPC as the VPC for this security group. You need to have your security group inbound rule configure to communicate with the cluster's VPC, therefore add an inbound rule with type `NFS` and add the cluster's VPC `IPv4 CIDR` as the source.
  4.2. Go to EFS page and create a new EFS. For the EFS's VPC, select the cluster's VPC. On the network access page, remove the existing mount targets' Security groups and instead select the security group that was created in the last step.
  4.3 To add `aws-efs-csi-driver` follow the installation steps and examples [here](https://github.com/kubernetes-sigs/aws-efs-csi-driver)
