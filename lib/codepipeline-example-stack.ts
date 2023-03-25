import * as cdk from "aws-cdk-lib";
import {
  CodePipeline,
  CodePipelineSource,
  ManualApprovalStep,
  ShellStep,
} from "aws-cdk-lib/pipelines";
import { Construct } from "constructs";
import { MyPipelineAppStage } from "./stages";

export class CodepipelineExampleStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const env = {
      account: "366267443344",
      region: "us-east-1",
    };

    const pipeline = new CodePipeline(this, "Pipeline", {
      pipelineName: "TestPipeline",
      synth: new ShellStep("Synth", {
        input: CodePipelineSource.gitHub(
          "EstevanLJ/aws-pipeline-example",
          "main"
        ),
        commands: ["npm ci", "npm run build", "npx cdk synth"],
      }),
    });

    const testingStage = pipeline.addStage(
      new MyPipelineAppStage(this, "test", {
        env,
      })
    );

    testingStage.addPost(
      new ManualApprovalStep("Manual approval before production")
    );

    const productionStage = pipeline.addStage(
      new MyPipelineAppStage(this, "production", {
        env,
      })
    );
  }
}
