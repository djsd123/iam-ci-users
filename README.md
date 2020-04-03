# iam-ci-users
IAM user accounts for automation

### Prerequisites 

* [nodejs](https://nodejs.org/en/download/) or [yarn](https://classic.yarnpkg.com/en/docs/install)
* [pulumi](https://www.pulumi.com/docs/get-started/install/#install-pulumi)
* [typescript](https://www.typescriptlang.org/index.html#download-links)

### Usage

**Install Dependencies**:

`yarn install`

or

`npm install`


**Select Credentials**:

Add the name of your local IAM profile to [Pulumi.yaml](Pulumi.yaml). See [Named Profiles](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-profiles.html)

```yaml
    aws:profile:
      default: "myprofile"

```

**Add Users**:

* Firstly, add usernames of the IAM users you want to create to the [usernames file](./usernames.yaml)

```yaml
usernames:
  - bob
  - jenkins
  - hudson
  - my-new-user
```

* Now create an IAM policy in the [policies file](./policies.ts) and append the policy to the exported policies array. 
I find that using the [policy document interfaces](https://github.com/pulumi/pulumi-aws/blob/master/sdk/nodejs/iam/documents.ts) 
tends to be more predictable when deploying pulumi programs

**Note**
  * The value of the `Id` field in the `aws.iam.PolicyDocument` object must be the same as the user's __username__ you want 
  to attach it to (**without hyphens(-)**) for the user policy to be applied.  For example; if I added the username 
  `jenkins-test-user` to the [usernames file](./usernames.yaml).  Then the value of the `Id` field in the `aws.iam.PolicyDocument` 
  I wanted applied to that user should be `jenkinstestuser`.  Usernames without hyphens are unaffected. 
  
```typescript
import * as aws from '@pulumi/aws'

export const policies: aws.iam.PolicyDocument[] = []

const statement: aws.iam.PolicyStatement[] = [{
    Sid: 's3All',
    Action: [
        "s3:*",
    ],
    Effect: 'Allow',
    Resource: '*'
}]

const policy: aws.iam.PolicyDocument = {
    Version: '2012-10-17',
    Id: 'mynewuser',
    Statement: statement
}

policies.push(policy)
```

**Deploy**

Create a new project and stack

```bash
pulumi new
```

Create the users

```bash
pulumi up
```
