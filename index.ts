import * as pulumi from '@pulumi/pulumi'
import * as aws from '@pulumi/aws'
import { Utils } from './utils'
import { policies } from "./policies"

const stackConfig = new pulumi.Config('iam-ci-users')
const config = {
    path: stackConfig.require('path')
}

const usersFile = Utils.loadYamlFile(config.path)

usersFile.usernames.forEach((userName: string) => {
    const nameNoHyphens = userName.replace(/-/g, '')
    const policyDocument = policies.find((element) => element['Id'] == nameNoHyphens)

    const user = new aws.iam.User(nameNoHyphens, {
        name: userName,
        path: '/',
        tags: { 'Name': userName },
        forceDestroy: true
    })
/*
    const userCreds = new aws.iam.AccessKey(`${nameNoHyphens}Key`, { user: user.name },{
        dependsOn: user
    })

    accessId = userCreds.id
    secretKey = userCreds.secret
*/
    const userPolicy = new aws.iam.UserPolicy(`${nameNoHyphens}Policy`, {
        user: user.name,
        policy: policyDocument
    },{
        dependsOn: user
    })
})
/*
export let accessId
export let secretKey
*/
