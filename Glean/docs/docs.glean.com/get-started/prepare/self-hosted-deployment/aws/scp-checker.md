---
url: "https://docs.glean.com/get-started/prepare/self-hosted-deployment/aws/scp-checker"
canonical: "https://docs.glean.com/get-started/prepare/self-hosted-deployment/aws/scp-checker"
title: "AWS SCP checker"
description: "Run Glean's Service Control Policy (SCP) checker script to determine whether any SCPs in your AWS organization conflict with Glean's required IAM permissions."
fetched_at: "2026-10-13T08:50:26.673Z"
---
On this page

For customers who host Glean within their AWS environment, Glean provides a script to determine whether any Service Control Policies (SCPs) in your AWS organization conflict with Glean's required IAM permissions.

The script provides a *general assessment* of your SCPs to capture ones that could interfere with Glean. There may still be conflicts it cannot detect, because the script cannot test every possible IAM condition.

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

### AWS infrastructure requirements[​](#aws-infrastructure-requirements "Direct link to AWS infrastructure requirements")

1.  Create a separate AWS account just for Glean. If you followed the [AWS deployment guide](/get-started/prepare/self-hosted-deployment/aws/deploy-aws), this is already complete.
2.  Create or use an IAM principal in the Glean deployment account. The principal must allow `iam:SimulatePrincipalPolicy` on resource `*`:

```
{  "Version": "2012-10-17",  "Statement": [    {      "Effect": "Allow",      "Action": "iam:SimulatePrincipalPolicy",      "Resource": "*"    }  ]}
```

### Prepare Python[​](#prepare-python "Direct link to Prepare Python")

1.  Download the script: [glean\_scp\_checker.zip](https://glean-public-marketplace-resources.s3.amazonaws.com/glean_scp_checker.zip)
    
2.  Unzip the file into a new directory. Open a terminal and navigate to that directory.
    
3.  Create a virtual environment with Python 3.12 or later:
    

```
python -m venv venv
```

4.  Activate the virtual environment:

```
source venv/bin/activate
```

5.  Install the Python requirements inside the virtual environment:

```
pip install -r requirements.txt
```

## Review the script (optional)[​](#review-the-script-optional "Direct link to Review the script (optional)")

The script runs in the Glean deployment account. It does not retrieve SCP documents or create or modify AWS resources. See [How it works](#how-it-works) for details.

## Run the script[​](#run-the-script "Direct link to Run the script")

Obtain temporary credentials for a role in the Glean deployment account that permits `iam:SimulatePrincipalPolicy`. For example, with AWS SSO:

```
aws sso login --profile YOUR_SSO_PROFILE_NAMEeval "$(aws configure export-credentials \  --profile YOUR_SSO_PROFILE_NAME \  --format env)"
```

Confirm that these credentials belong to the Glean deployment account:

```
aws sts get-caller-identity
```

You should see output similar to:

```
{  "UserId": "AROAEXAMPLE:user@example.com",  "Account": "GLEAN_AWS_ACCOUNT_ID",  "Arn": "arn:aws:sts::GLEAN_AWS_ACCOUNT_ID:assumed-role/YourRole/user@example.com"}
```

The `Account` value must match the Glean deployment account, and the `Arn` must identify the role you intend to use. If either is incorrect, switch to the correct AWS profile before running the checker.

Run the script:

```
venv/bin/python scp_preflight.py \  --required-actions permissions_to_verify.json \  --region REGION-YOU-ARE-DEPLOYING-GLEAN
```

Run the checker once for each AWS Region where Glean will deploy. By default, it simulates the IAM role or user behind your current credentials. To evaluate another IAM role or user in the Glean deployment account, pass its Amazon Resource Name (ARN) with `--principal-arn`, such as `arn:aws:iam::ACCOUNT:role/RoleName`. Do not use an AWS Security Token Service (STS) assumed-role session ARN.

The script reports these results:

-   `[OK]`: The simulator reported every tested action as allowed.
-   `[NOT ALLOWED BY APPLICABLE SCPs]`: The applicable SCP set did not allow the action.
-   `[DENIED - NOT BY SCP]`: The simulation principal's policies or permissions boundary caused the denial.

## Resolve conflicts[​](#resolve-conflicts "Direct link to Resolve conflicts")

If the script reports conflicts, save the complete output and share it with your Glean contact and the AWS administrator responsible for your organization's SCPs. The administrator should review policies attached to the deployment account, its parent organizational units, and the organization root. Rerun the checker after any changes.

If you need to exempt only the Glean account from a specific SCP, add the following condition to the relevant `Statement` element in the SCP:

```
"Condition": {  "StringNotEquals": {    "aws:PrincipalAccount": "GLEAN-AWS-ACCOUNT-ID"  }}
```

This condition enforces the SCP for all AWS accounts it applies to, except the Glean AWS account. This lets you maintain your security posture while explicitly exempting the Glean account.

## How it works[​](#how-it-works "Direct link to How it works")

The script is *read-only* and does not mutate any infrastructure resources.

The checker sends Glean's required AWS actions to the [AWS IAM Policy Simulator](https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_testing-policies.html) through `iam:SimulatePrincipalPolicy` using a synthetic allow policy. AWS applies the deployment account's SCPs during the simulation. The checker does not download or display SCPs and does not need access to the AWS Organizations management account.

## Caveats[​](#caveats "Direct link to Caveats")

The checker cannot identify the specific SCP or distinguish an explicit SCP deny from the absence of an applicable SCP allow. AWS evaluates principal-based conditions using the checker identity, or the identity supplied with `--principal-arn`, which may differ from future Glean deployment roles.
