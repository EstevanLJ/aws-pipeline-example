import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { Function, Runtime, Code } from 'aws-cdk-lib/aws-lambda';
import * as path from 'path';

export class MyLambdaStack extends cdk.Stack {
    constructor(scope: Construct, id: string, stageName: string, props?: cdk.StackProps) {
        super(scope, id, props);
        new Function(this, 'MyLambdaFunction', {
            runtime: Runtime.NODEJS_18_X,
            handler: 'handler.handler',
            code: Code.fromAsset(path.join(__dirname, 'lambda')),
            environment: {"stageName": stageName}
        });
    }
}