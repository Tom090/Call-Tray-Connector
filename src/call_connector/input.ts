export type CallConnectorInput = {
	connectorName: string;
	connectorVersion: string;
	operation: string;
	authId: string;
	input?: object;
	/**
	 * @advanced true
	 */
	returnOutputSchema?: boolean;
};