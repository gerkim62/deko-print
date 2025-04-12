const apiKey = process.env.UMSCOMMS_API_KEY;
const appId = process.env.UMSCOMMS_APP_ID;

if (!apiKey || !appId) {
  throw new Error(
    "Missing required environment variables: UMSCOMMS_API_KEY, UMSCOMMS_APP_ID, UMSCOMMS_SENDER_ID"
  );
}

type SendSmsParams = {
  phone: string;
  message: string;
};

type RawApiResponse = {
  message: string;
  [key: string]: unknown;
};

type SendSmsResponse =
  | {
      status: "SUCCESS";
      message: string;
      data: RawApiResponse;
    }
  | {
      status: "FAILED";
      message: string;
      data?: RawApiResponse;
    };

function isValidApiResponse(data: unknown): data is RawApiResponse {
  return (
    typeof data === "object" &&
    data !== null &&
    "message" in data &&
    typeof (data as Record<string, unknown>).message === "string"
  );
}

export async function sendSms({
  phone,
  message,
}: SendSmsParams): Promise<SendSmsResponse> {
  try {
    const response = await fetch(
      "https://comms.umeskiasoftwares.com/api/v1/sms/send",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          api_key: apiKey,
          app_id: appId,
          phone,
          message,
          sender_id: process.env.UMSCOMMS_SENDER_ID ?? "UMS_SMS",
        }),
      }
    );

    const data = await response.json();

    console.log("API Response:", data); // Log the API response for debugging

    if (isValidApiResponse(data)) {
      if (data.status !== "error") {
        return {
          status: "SUCCESS",
          message: "SMS sent successfully",
          data,
        };
      }

      return {
        status: "FAILED",
        message: data.message,
        data,
      };
    }

    return {
      status: "FAILED",
      message: "Invalid response from API",
    };
  } catch (error) {
    return {
      status: "FAILED",
      message:
        error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
}
