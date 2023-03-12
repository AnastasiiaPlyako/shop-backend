import 'aws-sdk-client-mock-jest';
import { mockClient } from "aws-sdk-client-mock";
import { PublishCommand, SNSClient } from '@aws-sdk/client-sns';
import { main as catalogBatchProcess } from "./handler";

describe("catalogBatchProcess", () => {
    it("should work correctly", async () => {
        const snsMock = mockClient(SNSClient);
        const mockEvent = {
            Records: [
                {
                    body: JSON.stringify({
                        title: "Maple leaf. Canada",
                        id: "7567ec4b-b10c-48c5-9345-fc73c48a80aa",
                        description: "The symbol of Canada is a maple leaf",
                    }),
                },
            ],
        };
        await catalogBatchProcess(mockEvent);
        expect(snsMock).toHaveReceivedCommand(PublishCommand);
    })
})