export type ContactPayload =
  | {
      type: "investor";
      name: string;
      email: string;
      affiliation?: string;
      investorType?: string;
      message?: string;
    }
  | {
      type: "presale";
      email: string;
    }
  | {
      type: "engineering";
      email: string;
    };

export async function submitContact(payload: ContactPayload): Promise<void> {
  const endpoint = process.env.NEXT_PUBLIC_CONTACT_ENDPOINT;

  if (!endpoint) {
    throw new Error(
      "Contact endpoint is not configured. Set NEXT_PUBLIC_CONTACT_ENDPOINT for static deployments.",
    );
  }

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("Contact request failed.");
  }
}
