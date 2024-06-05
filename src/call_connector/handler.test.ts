import { OperationHandlerTestSetup } from '@trayio/cdk-dsl/connector/operation/OperationHandlerTest';
import { OperationHandlerResult } from '@trayio/cdk-dsl/connector/operation/OperationHandler';
import { callConnectorHandler } from './handler';
import '@trayio/cdk-runtime/connector/operation/OperationHandlerTestRunner';

OperationHandlerTestSetup.configureHandlerTest(callConnectorHandler, (handlerTest) =>
	handlerTest
		.usingHandlerContext('test')
		.nothingBeforeAll()
		.testCase('should call Slack connector and send a message', (testCase) =>
			testCase
				.givenNothing()
				.when(() => ({
					connectorName: 'slack',
					connectorVersion: '1.0',
					operation: 'send_message',
					authId: '3e9ccecc-e22d-4285-86b1-96817003de52',
					input: {
						channel: 'C07513RS7U1',
						text: 'hello'
					}
				}))
				.then(({ output }) => {
					// console.log(output);
					const outputValue =
						OperationHandlerResult.getSuccessfulValueOrFail(output);
					expect(outputValue.outcome).toEqual('success');
				})
				.finallyDoNothing()
		)
		.nothingAfterAll()
);