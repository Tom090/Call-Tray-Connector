import { OperationHandlerSetup } from '@trayio/cdk-dsl/connector/operation/OperationHandlerSetup';
import { CallTrayConnectorAuth } from '../CallTrayConnectorAuth';
import { CallConnectorInput } from './input';
import { CallConnectorOutput } from './output';
import { globalConfigHttp } from '../GlobalConfig';

export const callConnectorHandler = OperationHandlerSetup.configureHandler<
	CallTrayConnectorAuth,
	CallConnectorInput,
	CallConnectorOutput
>((handler) =>
	handler.withGlobalConfiguration(globalConfigHttp).usingHttp((http) =>
		http
			.post('/core/v1/connectors/:connectorName/versions/:connectorVersion/call')
			.handleRequest((ctx, input, request) =>
				request
					.addPathParameter('connectorName', input.connectorName)
					.addPathParameter('connectorVersion', input.connectorVersion)
					.withBodyAsJson({
						operation: input.operation,
						authId: input.authId,
						input: input.input
					})
			)
			.handleResponse((ctx, input, response) => response.parseWithBodyAsJson())
	)
);