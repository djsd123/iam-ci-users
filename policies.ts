import * as aws from '@pulumi/aws'

export const policies: aws.iam.PolicyDocument[] = []

/////////////// USER POLICY STATEMENTS ////////////////////////////

////////////// S3 STATIC WEBSITE /////////////////////////////
const s3_static_website_statement: aws.iam.PolicyStatement[] = [{
    Sid: 'Stmt1585742777480',
    Action: [
        "cloudfront:CreateDistribution",
        "cloudfront:CreateDistributionWithTags",
        "cloudfront:DeleteDistribution",
        "cloudfront:GetDistribution",
        "cloudfront:GetDistributionConfig",
        "cloudfront:GetStreamingDistributionConfig",
        "cloudfront:ListDistributions",
        "cloudfront:ListTagsForResource",
        "cloudfront:TagResource",
        "cloudfront:UpdateDistribution"
    ],
    Effect: 'Allow',
    Resource: '*'
},
    {
        Sid: 'Stmt1585744164414',
        Action: [
            "route53:ChangeResourceRecordSets",
            "route53:ChangeTagsForResource",
            "route53:GetChange",
            "route53:GetHostedZone",
            "route53:ListHostedZones",
            "route53:ListHostedZonesByName",
            "route53:ListTagsForResource"
        ],
        Effect: 'Allow',
        Resource: '*'
    },
    {
        Sid: 'Stmt1585744577220',
        Action: [
            "s3:CreateBucket",
            "s3:DeleteBucket",
            "s3:DeleteBucketWebsite",
            "s3:DeleteObject",
            "s3:GetBucketAcl",
            "s3:GetBucketLogging",
            "s3:GetBucketWebsite",
            "s3:GetObject",
            "s3:GetObjectAcl",
            "s3:GetObjectVersion",
            "s3:ListBucket",
            "s3:PutBucketAcl",
            "s3:PutBucketLogging",
            "s3:PutBucketWebsite",
            "s3:PutObject",
            "s3:PutObjectAcl"
        ],
        Effect: 'Allow',
        Resource: '*'
    }
]

const s3_static_website: aws.iam.PolicyDocument = {
    Version: '2012-10-17',
    Id: 's3staticwebsite',
    Statement: s3_static_website_statement
}

policies.push(s3_static_website)

////////////////////////////////////////////////////////////////

////////////// GENERIC ///////////////////////////////////////

const generic_statement: aws.iam.PolicyStatement[] = [{
    Sid: 's3Acl',
    Action: [
        "s3:GetObjectVersion",
    ],
    Effect: 'Allow',
    Resource: '*'
}]

const generic: aws.iam.PolicyDocument = {
    Version: '2012-10-17',
    Id: 'generic',
    Statement: generic_statement
}

policies.push(generic)

///////////////////////////////////////////////////////////////
