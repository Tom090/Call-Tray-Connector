export type CallTrayConnectorInput = {
	connectorName: string;
	connectorVersion: string;
	operation: string;
	authID: string;
	input?: object;
	/**
	 * @optional
	 */
	returnOutputSchema?: boolean;
};