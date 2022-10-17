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