import type { Serverless } from 'serverless/aws';

const serverlessConfiguration: Serverless = {
  service: 'snazzle',
  frameworkVersion: '2',
  custom: {
    domainName: {
      dev: 'dev.snazzle.biz',
      prod: 'prod.snazzle.biz',
    },
    customDomain: {
      domainName: '${self:custom.domainName.${opt:stage, self:provider.stage}}',
      basePath: '',
      stage: '${self:provider.stage}',
      createRoute53Record: true,
    },
    webpack: {
      webpackConfig: './webpack.config.js',
      includeModules: true,
    },
  },
  plugins: ['serverless-webpack', 'serverless-domain-manager'],
  provider: {
    name: 'aws',
    runtime: 'nodejs12.x',
    profile: 'snazzler',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
    },
  },
  functions: {
    hello: {
      handler: 'handler.hello',
      events: [
        {
          http: {
            method: 'get',
            path: 'hello',
          },
        },
      ],
    },
  },
};

module.exports = serverlessConfiguration;
