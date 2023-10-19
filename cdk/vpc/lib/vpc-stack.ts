import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as ec2 from 'aws-cdk-lib/aws-ec2';

const vpc_name = 'shimoda-vpc';
const vpc_cidr = '10.0.0.0/16';
const nat_cnt = 0;
const az_cnt = 1;
const public_subnet_name = 'PUBLIC';
const private_subnet_name = 'PRIVATE'


export class VpcStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    
    const vpc = new ec2.Vpc(this, 'vpc', {
      vpcName: vpc_name,
      cidr: vpc_cidr,
      enableDnsHostnames: true,
      enableDnsSupport: true,
      natGateways: nat_cnt,
      maxAzs: az_cnt,
      subnetConfiguration:[
        {
          cidrMask: 24,
          subnetType: ec2.SubnetType.PUBLIC,
          name: public_subnet_name
        },
        {
          cidrMask: 24,
          subnetType: ec2.SubnetType.PRIVATE_ISOLATED,
          name: private_subnet_name
        }
      ]
    });
  }
}