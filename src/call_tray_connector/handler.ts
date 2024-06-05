import { OperationHandlerSetup } from '@trayio/cdk-dsl/connector/operation/OperationHandlerSetup';
import { CallTrayConnectorAuth } from '../CallTrayConnectorAuth';
import { CallTrayConnectorInput } from './input';
import { CallTrayConnectorOutput } from './output';
import { globalConfigHttp } from '../GlobalConfig';

export const callTrayConnectorHandler = OperationHandlerSetup.configureHandler<
	CallTrayConnectorAuth,
	CallTrayConnectorInput,
	CallTrayConnectorOutput
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
						authId: input.authID,
						input: input.input,
					})
			)
			.handleResponse((ctx, input, response) => response.parseWithBodyAsJson())
	)
);