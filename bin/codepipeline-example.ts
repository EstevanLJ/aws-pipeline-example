#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { CodepipelineExampleStack } from '../lib/codepipeline-example-stack';

const app = new cdk.App();
new CodepipelineExampleStack(app, 'CodepipelineExampleStack', {
  env: {
    account: '366267443344',
    region: 'us-east-1'
  }
});

app.synth();