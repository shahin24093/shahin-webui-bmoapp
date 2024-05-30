import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as ec2 from 'aws-cdk-lib/aws-ec2'
import * as ecs from 'aws-cdk-lib/aws-ecs'
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class ShahinEcsCdkStack1 extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    // refering to existing vpc 
    const vpc = ec2.Vpc.fromLookup(this,'shahinExistingVpc', {
      vpcId: 'vpc-063afa0c24ec80cb8'
    });
    // defining ECS cluster info 
    const cluster = new ecs.Cluster(this,'shahin-ecs-cluster',{
      clusterName: 'shahin-ecs-multistage',
      vpc: vpc,
      enableFargateCapacityProviders: true ,
      containerInsights: true // enable cloudwatch monitoring 
    });
    // add ec2 capacity 
    // cluster.addCapacity('defaultashuScaleGroup',{
    //   instanceType: new ec2.InstanceType("t2.small"),
    //   desiredCapacity: 1, // container instances
    //   minCapacity: 1,
    //   maxCapacity: 5
    // });

    // task Definition of farget launch type 
    const shahinTaskDef = new ecs.FargateTaskDefinition(this,'shahin-frg-task1',{
      cpu:  256,
      memoryLimitMiB: 512
       
    });
    // adding container info 
    const container = shahinTaskDef.addContainer('shahincdkc1',{
      image: ecs.ContainerImage.fromRegistry('shahin24093/shahinpy:bmov82dac961d9c42b79c9c3afec3e1fe43b68157ccd'),
      memoryLimitMiB: 256,
      portMappings: [{ containerPort: 80 }]
    });

   
  }
}