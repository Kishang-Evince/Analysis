---
url: "https://docs.glean.com/security/cloud-prem/aws/cost-controls"
canonical: "https://docs.glean.com/security/cloud-prem/aws/cost-controls"
title: "AWS cost reduction recommendations"
description: "Learn how to configure AWS cost visibility and reduce compute, database, and AWS Config costs"
fetched_at: "2026-09-01T13:29:57.068Z"
---
On this page

Use this page to configure cost visibility in your Amazon Web Services (AWS) account and review Glean's recommendations for compute, database, and configuration costs. The page covers Amazon Elastic Kubernetes Service (EKS), Amazon Relational Database Service (RDS), and AWS Config.

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

Before you begin, confirm that you can sign in to the AWS management or payer account and access the existing Cost and Usage Report. If your organization uses AWS Organizations, enable all features in the organization before you enable EKS split cost allocation data. For more information, see [Getting started with AWS Organizations](https://docs.aws.amazon.com/organizations/latest/userguide/orgs_getting-started.html).

## Procedure[​](#procedure "Direct link to Procedure")

### Enable detailed cost visibility[​](#enable-detailed-cost-visibility "Direct link to Enable detailed cost visibility")

Enable two AWS cost allocation features so Glean can analyze infrastructure costs for your deployment and identify cost reduction opportunities:

-   **EKS split cost allocation data**: Attributes compute costs to Kubernetes namespaces, deployments, and pods
-   **User-defined cost allocation tags**: Attributes costs to Glean services, node groups, node pools, teams, and database roles

Both features are free, take about 5 minutes to configure, and can be turned off at any time. Data typically appears in the AWS Cost and Usage Report within 24–48 hours.

note

These features provide Glean with billing metadata only. They don't provide access to your application data, query logs, user information, workloads, or AWS environment. Your Glean deployment remains available if you don't enable these features, but Glean will have less information available to identify cost reduction opportunities.

You must complete these procedures from the AWS management or payer account. If you use AWS Organizations, [enable all features in the organization](https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_org_support-all-features.html) before enabling EKS split cost allocation data. If another team or managed service provider administers the payer account, share these procedures with them.

### Enable EKS split cost allocation data[​](#enable-eks-split-cost-allocation-data "Direct link to Enable EKS split cost allocation data")

1.  Sign in to the [AWS Billing and Cost Management console](https://console.aws.amazon.com/costmanagement/) from the management or payer account.
2.  Go to **Cost Management preferences**.
3.  Under **General**, find **Split cost allocation data**.
4.  Select **Amazon Elastic Kubernetes Service (Amazon EKS)**.
5.  For the allocation method, select **Resource requests**.
6.  Click **Save preferences**.

Confirm that the existing Cost and Usage Report includes split cost allocation data:

1.  In the **Billing and Cost Management console**, go to **Legacy Pages → Cost and Usage Reports**.
2.  Edit the existing Cost and Usage Report.
3.  Under **Report content**, select **Split cost allocation data**.
4.  Save the report.

For more information, see [Enabling split cost allocation data](https://docs.aws.amazon.com/cur/latest/userguide/enabling-split-cost-allocation-data.html) in the AWS documentation.

### Activate user-defined cost allocation tags[​](#activate-user-defined-cost-allocation-tags "Direct link to Activate user-defined cost allocation tags")

1.  Sign in to the [AWS Billing and Cost Management console](https://console.aws.amazon.com/costmanagement/) from the management or payer account.
    
2.  Go to **Cost allocation tags**
    
3.  Search for and select the following tag keys:
    
    | Tag key | Purpose |
    | --- | --- |
    | `Name` | Attributes costs across EC2, EBS, RDS, and other resources by their human-readable labels |
    | `glean-product` | Attributes costs to a Glean product area |
    | `glean-component` | Attributes costs to a specific component or Kubernetes workload |
    | `glean-team` | Attributes costs to the responsible Glean team |
    | `karpenter.sh/nodepool` | Attributes Karpenter-managed capacity costs by node pool |
    | `eks:nodegroup-name` | Attributes Amazon EKS managed capacity costs by node group |
    | `glean_config_index` | Attributes Amazon RDS costs by database role |
    
4.  Click **Activate**.
    

For more information, see [User-defined cost allocation tags](https://docs.aws.amazon.com/awsaccountbilling/latest/aboutv2/custom-tags.html) in the AWS documentation.

### Turn off detailed cost visibility[​](#turn-off-detailed-cost-visibility "Direct link to Turn off detailed cost visibility")

You can turn off either feature without affecting the availability of your Glean deployment:

-   For split cost allocation data, return to **Cost Management preferences** and clear **Amazon Elastic Kubernetes Service (Amazon EKS)** under **Split cost allocation data**.
-   For cost allocation tags, return to **Cost allocation tags**, select the active tags, and click **Deactivate**.

### Cost visibility FAQ[​](#cost-visibility-faq "Direct link to Cost visibility FAQ")

### What data does Glean receive?

Glean receives AWS billing metadata from the existing Cost and Usage Report. This metadata includes AWS resource costs and the deployment, service, node group, node pool, namespace, and workload identifiers used to attribute those costs.

Glean does not receive application data, query logs, user information, or additional access to your AWS environment through these features.

### Do these changes affect your security posture?

These settings enrich the billing metadata already included in the AWS Cost and Usage Report. They don't grant Glean new permissions or access to workloads, resources, or customer data.

### Do these features cost anything?

AWS doesn't charge for either billing feature. They add cost attribution data to the existing Cost and Usage Report.

### Will enabling these features immediately reduce costs?

No. Enabling these features provides more detailed billing data. Glean can use that data to identify targeted cost reduction opportunities, such as idle capacity, oversized workload requests, and the cost difference between spot and on-demand capacity.

### What happens if you don't enable these features?

Your Glean deployment continues to operate normally. Glean can still review high-level service spending, but can't reliably attribute compute costs to specific services, workloads, node groups, or node pools.

### Can you turn these features off later?

Yes. You can turn off either feature at any time without affecting the availability of your Glean deployment.

### Who can enable these features?

An administrator of the AWS management or payer account must enable them. If your organization uses a managed service provider for AWS billing, ask that provider to complete the procedures.

### What if the AWS console doesn't match these instructions?

Registered support contacts can request help through the [Glean support portal](https://support.glean.com). If you don't have a registered support contact, contact your Glean account executive.

## AWS compute costs[​](#aws-compute-costs "Direct link to AWS compute costs")

Glean extensively uses compute resources to run various workloads, and purchasing a savings plan can help reduce compute costs. **Glean recommends Savings Plans over Reserved Instances,** as the former is an AWS preference. Reference: [Reserved Instances for Amazon EC2 overview (Amazon Elastic Compute Cloud)](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-reserved-instances.html).

To purchase a savings plan, you can follow: [Purchasing a custom Savings Plan commitment](https://docs.aws.amazon.com/savingsplans/latest/userguide/purchase-sp-direct.html)

1.  In step 3, select **Compute Savings Plan**.
    
2.  To find the *hourly commitment*, Glean recommends the following steps:
    
    -   Find the AWS recommended *hourly commitment* for **Compute Savings Plan** based on usage for the last 30 days. Reference: [Customizing Savings Plans recommendations](https://docs.aws.amazon.com/savingsplans/latest/userguide/sp-rec-customizing.html)
    -   Glean recommends that customers **commit only for 70%** of the AWS recommended hourly commitment because Glean actively works to reduce compute spend. Multiply the recommended value by 0.7 to arrive at the final *hourly commitment*.
    
    **Example:** If AWS recommends an *hourly commitment* of $3/hour, the recommended commitment is $2.1/hour (0.7 \* $3/hour).
    
    -   Use **Savings Plan Purchase Analyzer** to get insights on estimated savings for the hourly commitment. Reference: [Announcing Savings Plans Purchase Analyzer | AWS Cloud Financial Management](https://aws.amazon.com/blogs/aws-cloud-financial-management/announcing-savings-plans-purchase-analyzer/)

## AWS RDS database costs[​](#aws-rds-database-costs "Direct link to AWS RDS database costs")

Glean customer-hosted deployments utilize Amazon RDS for database workloads. AWS now offers Savings Plans for [Amazon RDS](https://aws.amazon.com/blogs/aws/introducing-database-savings-plans-for-aws-databases/), which can help reduce database costs. Glean recommends Database Savings Plans as a way to achieve significant cost savings on predictable RDS usage.

To purchase an RDS Savings Plan, follow the AWS guide [Purchasing a custom Savings Plan commitment](https://docs.aws.amazon.com/savingsplans/latest/userguide/purchase-sp-direct.html) and select **Database Saving Plans**.

### Calculate your commitment[​](#calculate-your-commitment "Direct link to Calculate your commitment")

1.  To find the hourly commitment, Glean recommends the following steps:
    -   Find the AWS recommended hourly commitment for the **Database Savings Plan** based on usage for the last 30 days. For more information, see [Customizing Savings Plans recommendations](https://docs.aws.amazon.com/savingsplans/latest/userguide/sp-rec-customizing.html).
        
    -   Glean recommends that customers commit for 80% of the AWS recommended hourly commitment. RDS workloads in Glean deployments tend to be more stable than compute workloads, allowing for a higher commitment level. Multiply the recommended value by 0.8 to arrive at the final *hourly commitment*. For example, if AWS recommends an hourly commitment of $2/hour, the recommended commitment is $1.6/hour (0.8 \* $2/hour).
        
    -   Use **Savings Plan Purchase Analyzer** to get insights on estimated savings for the hourly commitment. For more information, see [Announcing Savings Plans Purchase Analyzer | AWS Cloud Financial Management](https://aws.amazon.com/blogs/aws-cloud-financial-management/announcing-savings-plans-purchase-analyzer/).
        

## Configuration costs in AWS[​](#configuration-costs-in-aws "Direct link to Configuration costs in AWS")

AWS Config is an AWS feature for keeping an inventory of AWS resources and tracking their changes over time. Config is billed based on the quantity of configuration changes that are recorded. **AWS Config is not required by Glean and can be disabled. AWS Config may be part of your organization's overall AWS policy, so it may be applied to the Glean environment as well**. By keeping AWS Config enabled, the customer is choosing to bear the additional AWS costs not required or scoped by Glean.

-   Many resources in the Glean deployment change frequently, so if not tuned, a customer may see an expensive AWS Config bill.
    
-   To reduce costs, but still maintain the value that Config provides, Glean recommends that customers set AWS Config to: **Record all resources *except these:***
    
    -   AWS::Config::ResourceCompliance
    -   AWS::EC2::EIP
    -   AWS::EC2::Fleet
    -   AWS::EC2::Instance
    -   AWS::EC2::NetworkInterface
    -   AWS::EC2::Volume
    -   AWS::SSM::AssociationCompliance
    -   AWS::SSM::ManagedInstanceInventory
    -   AWS::SSM::PatchCompliance
-   **Notes:**
    
    -   These resources can be noisy and often don't provide significant value in recording critical configuration change history. Ignoring the resources above should significantly reduce AWS Config costs.
    -   There may be additional noisy resources that a CloudWatch dashboard should help identify. If desired, create a CloudWatch dashboard using the following *to identify the noisiest AWS resources that Config records (ensure that the region below is updated with the region of Glean deployment)*:

```
{    "widgets": [        {            "type": "metric",            "x": 0,            "y": 0,            "width": 6,            "height": 6,            "properties": {                "metrics": [                    [ { "expression": "SORT(SEARCH('{AWS/Config,ResourceType} MetricName=\"ConfigurationItemsRecorded\" NOT ResourceType=\"All\"',\"Sum\",86400),MAX, DESC, 10)", "label": "Config", "id": "config" } ]                ],                "view": "timeSeries",                "stacked": false,                "region": "ADD-REGION-HERE",                "stat": "Average",                "period": 300,                "start": "-PT672H",                "title": "Config resource types"            }        }    ]}
```
