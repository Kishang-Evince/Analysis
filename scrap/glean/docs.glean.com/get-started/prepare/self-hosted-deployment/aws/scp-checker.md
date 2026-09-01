---
url: "https://docs.glean.com/get-started/prepare/self-hosted-deployment/aws/scp-checker"
canonical: "https://docs.glean.com/get-started/prepare/self-hosted-deployment/aws/scp-checker"
title: "AWS SCP checker"
description: "Run Glean's Service Control Policy (SCP) checker script to determine whether any SCPs in your AWS organization conflict with Glean's required IAM permissions."
fetched_at: "2026-09-01T13:29:50.226Z"
---
On this page

For customers who host Glean within their AWS environment, Glean provides a script to determine whether any Service Control Policies (SCPs) in your AWS organization conflict with Glean's required IAM permissions.

The script provides a *general assessment* of your SCPs to capture ones that could interfere with Glean. There may still be conflicts it cannot detect, because the script cannot test every possible IAM condition.

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

### AWS infrastructure requirements[​](#aws-infrastructure-requirements "Direct link to AWS infrastructure requirements")

1.  Create a separate AWS account just for Glean. If you followed the [AWS deployment guide](/get-started/prepare/self-hosted-deployment/aws/deploy-aws), this is already complete.
2.  Create an IAM principal. Glean recommends creating a permission set in AWS IAM Identity Center (AWS SSO) in the *organization root* account with *read-only* permissions for IAM. Attach the `SecurityAudit` AWS managed policy (`arn:aws:iam::aws:policy/SecurityAudit`) to this principal. You can delete this once the script has completed.

### Prepare Python[​](#prepare-python "Direct link to Prepare Python")

1.  Download the script: [glean\_scp\_checker.zip](https://glean-public-marketplace-resources.s3.amazonaws.com/glean_scp_checker.zip)
    
2.  Unzip the file. Open a terminal and navigate to the `customer_scp_checker` directory.
    
3.  Within the `customer_scp_checker` directory, create a virtual environment with Python 3.10 or later:
    
    ```
    python -m venv venv
    ```
    
4.  Activate the virtual environment:
    
    ```
    source venv/bin/activate
    ```
    
5.  Install the Python requirements inside the virtual environment:
    
    ```
    pip install .
    ```
    

## Review the script (optional)[​](#review-the-script-optional "Direct link to Review the script (optional)")

Because the script is run in the organization root account, you may want to review it before running. Feel free to examine the script. The included README describes the full logic flow. See [How it works](#how-it-works) for more information on the README.

## Run the script[​](#run-the-script "Direct link to Run the script")

Fetch the read-only IAM credentials from the prerequisites and export them into your terminal. Then run the following command inside the virtual environment:

```
# Make sure the read-only SecurityAudit AWS credentials are exported into this terminalpython scp_checker.py --glean-account-id YOUR-GLEAN-AWS-ACCOUNT-ID --glean-deployment-region REGION-YOU-ARE-DEPLOYING-GLEAN
```

The script outputs whether there are any conflicts.

## Resolve conflicts[​](#resolve-conflicts "Direct link to Resolve conflicts")

If the script outputs conflicts, reach out to your Glean contact. If you need to exempt only the Glean account from a specific SCP, add a condition to the SCP that allows the Glean account to be exempt:

```
"Condition": {  "StringNotEquals": {    "aws:PrincipalAccount": "GLEAN-AWS-ACCOUNT-ID"  }}
```

This condition enforces the SCP for all AWS accounts it applies to, except the Glean AWS account. This lets you maintain your security posture while explicitly exempting the Glean account.

## How it works[​](#how-it-works "Direct link to How it works")

The script is *read-only* and does not mutate any infrastructure resources.

It fetches all the SCPs associated with an AWS account's hierarchy in AWS Organizations, collecting the SCPs that apply to the Glean deployment account. It first describes the SCPs attached to the account directly, then walks up the account's organization hierarchy until it reaches the organization root, describing all attached SCPs along the way.

Once the script collects the SCPs, it examines the required IAM permissions that Glean needs to operate (defined in a JSON file under the `resources/` directory) and uses the [AWS IAM Policy Simulator](https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_testing-policies.html) to determine whether there is a conflict for a given permission. It passes the SCP policy statements along with the IAM policy to be tested to the simulator, which reports whether there is an explicit deny. An explicit deny means an SCP is blocking that action.

The IAM Policy Simulator does not require you to create any new roles or resources. It only needs read-only credentials. The script also tests for common global IAM condition keys:

-   `aws:PrincipalAccount`
-   `aws:PrincipalArn`
-   `aws:PrincipalOrgId`
-   `aws:PrincipalType`
-   `aws:RequestedRegion`

The script provides these global IAM condition keys to the simulator, which assesses them against the SCPs to determine whether there is a conflict.

### Caveats[​](#caveats "Direct link to Caveats")

The script cannot test everything. The IAM Policy Simulator does not support:

-   `NotAction` statements
-   `NotResource` statements

The script does not evaluate SCP statements with these keys, and there may be other conditionals the script cannot test for.
