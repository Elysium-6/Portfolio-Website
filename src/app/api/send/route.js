import { Resend } from "resend";

function getResendClient() {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    return null;
  }

  return new Resend(apiKey);
}

export async function POST(request) {
  try {
    const { email, subject, message } = await request.json();

    if (!email || !subject || !message) {
      return Response.json(
        { error: "Missing required form fields." },
        { status: 400 }
      );
    }

    const resend = getResendClient();

    if (!resend) {
      return Response.json(
        { error: "Missing RESEND_API_KEY environment variable." },
        { status: 500 }
      );
    }

    const toEmail = process.env.RESEND_TO_EMAIL || "you@example.com";
    const fromEmail = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";

    const data = await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      replyTo: email,
      subject: `[Portfolio Contact] ${subject}`,
      html: `
        <p><strong>From:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, "<br />")}</p>
      `,
    });

    return Response.json({ success: true, data });
  } catch (error) {
    console.error("Failed to send email via Resend:", error);

    return Response.json(
      { error: "Failed to send email." },
      { status: 500 }
    );
  }
}
