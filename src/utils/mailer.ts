import axios from 'axios'
import { POSTMARK_MAIL_URL, POSTMARK_MAIL_TOKEN, POSTMARK_MAIL_FROM } from '@/config/config'

const headers = [{
  "Name": "X-Postmark-Server-Token",
  "Value": `${POSTMARK_MAIL_TOKEN}`
}]

export const sendEmail = async (payload: any) => {
  const url = POSTMARK_MAIL_URL
  const from = POSTMARK_MAIL_FROM

  const options = {
    email: payload.to,
    From: from,
    To: payload.to,
    Cc: payload.cc ? payload.cc : null,
    Bcc: payload.bcc ? payload.bcc : null,
    Subject: payload.subject,
    Tag: payload.tag ? payload.tag : null,
    HtmlBody: payload.html ? payload.html : null,
    TextBody: payload.text ? payload.text : null,
    ReplyTo: "noreply@taxtech.com.ng",
    TrackOpens: true,
    TrackLinks: "HtmlOnly",
    MessageStream: "outbound"
  }

  const sentMail = await axios.post(`${url}/email`, options, { headers: { "X-Postmark-Server-Token": `${POSTMARK_MAIL_TOKEN}` } })
    .then((body) => { return { res: body } })
    .catch((err) => { return { res: err } })

  return sentMail
}

export const sendEmailWithAttachment = async (payload: any) => {
  const url = POSTMARK_MAIL_URL
  const from = POSTMARK_MAIL_FROM
  const allAttachments = [];

  if (typeof payload.attach !== 'undefined') {
    for (const att of payload.attach) {
      allAttachments.push({ 'ContentType': `application/${att.ext}`, 'Name': `${att.slipName}`, 'Content': att.theFile })
    }
  }

  const options = {
    email: payload.to,
    From: from,
    To: payload.to,
    Cc: payload.cc ? payload.cc : null,
    Bcc: payload.bcc ? payload.bcc : null,
    Subject: payload.subject,
    Tag: payload.tag ? payload.tag : null,
    HtmlBody: payload.html ? payload.html : null,
    TextBody: payload.text ? payload.text : null,
    ReplyTo: "noreply@taxtech.com.ng",
    TrackOpens: true,
    TrackLinks: "HtmlOnly",
    MessageStream: "outbound",
    Attachments: allAttachments,
  }

  const sentMail = await axios.post(`${url}/email`, options, { headers: { "X-Postmark-Server-Token": `${POSTMARK_MAIL_TOKEN}` } })
    .then((body) => { return { res: body } })
    .catch((err) => { return { res: err } })

  return sentMail
}

export const sendBatchEmail = async (batchEmail: any) => {
  const url = POSTMARK_MAIL_URL;
  const from = POSTMARK_MAIL_FROM;
  const options: any[] = []

  for (const email of batchEmail) {
    options.push({
      email: email.to,
      From: from,
      To: email.to,
      Cc: email.cc ? email.cc : null,
      Bcc: email.bcc ? email.bcc : null,
      Subject: email.subject,
      Tag: email.tag ? email.tag : null,
      HtmlBody: email.html ? email.html : null,
      TextBody: email.text ? email.text : null,
      ReplyTo: "noreply@taxtech.com.ng",
      TrackOpens: true,
      TrackLinks: "HtmlOnly",
      MessageStream: "outbound"
    })
  }

  const sentMail = await axios.post(`${url}/email/batch`, options, {
    headers: {
      "X-Postmark-Server-Token": `${POSTMARK_MAIL_TOKEN}`
    }
  })
    .then((body) => { return { res: body } })
    .catch((err) => { return { res: err } })

  return sentMail
}

export const sendGeneratedStatementMail = function (payload: any) {
  const { receiverName, start, end, name } = payload;
  return `
  <!DOCTYPE html>
  <html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office">
    <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="x-apple-disable-message-reformatting" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
      <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet" />
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css"
        integrity="sha512-5A8nwdMOWrSz20fDsjczgUidUBR8liPYU+WymTZP1lmY9G6Oc7HlZv156XqnsgNUzTyMefFTcsFH/tnJE/+xBg=="
        crossorigin="anonymous"
        referrerpolicy="no-referrer"
      />
      <title>Confirm Transaction</title>
      <!--[if mso]>
        <noscript>
          <xml>
            <o:OfficeDocumentSettings>
              <o:PixelsPerInch>96</o:PixelsPerInch>
            </o:OfficeDocumentSettings>
          </xml>
        </noscript>
      <![endif]-->
      <style>
        body,
        div,
        h1,
        p,
        button,
        a {
          font-family: "Poppins", sans-serif;
        }
        i {
          color: rgba(255, 255, 255, 0.9);
        }
        * {
          padding: 0;
          margin: 0;
        }
        p {
          font-size: 1rem;
        }
        @media (max-width: 500px) {
          p {
            font-size: 0.875rem;
          }
        }
        button:hover,
        a:hover {
          opacity: 0.75;
        }
        .main-container {
          padding: 1.5rem;
          margin: 1.5rem auto 0;
          max-width: 700px;
          width: 100%;
          background-color: white;
        }
        @media (max-width: 900px) {
          .main-container {
            width: 80%;
          }
        }
        @media (max-width: 500px) {
          .main-container {
            padding: 1rem;
          }
        }
        .page-header {
          color: rgba(0, 0, 0, 0.9);
          font-weight: 600;
          font-size: 1.5rem;
        }
        @media (max-width: 500px) {
          .page-header {
            font-size: 1.25rem;
          }
        }
        .page-text {
          color: rgba(0, 0, 0, 0.7);
          font-weight: 400;
        }
        .btn-container {
          margin: 2rem auto;
          max-width: 300px;
          width: 100%;
        }
        @media (max-width: 500px) {
          .btn-container {
            margin: 1.25rem auto;
          }
        }
        .social-container {
          background-color: #5cb23a;
          padding: 1rem 1.5rem;
          margin-top: 1.5rem;
          border-radius: 4px;
        }
        @media (max-width: 500px) {
          .social-container {
            padding: 1rem;
            margin-top: 1.25rem;
          }
        }
        .tax-text {
          text-align: center;
          color: rgba(255, 255, 255, 0.9);
          font-weight: 500;
          width: 80%;
          margin: auto;
        }
        @media (max-width: 500px) {
          .tax-text {
            width: 100%;
          }
        }
        .social-flex {
          margin-top: 2rem;
          display: flex;
          gap: 2rem;
          align-items: center;
          justify-content: center;
        }
        @media (max-width: 500px) {
          .social-flex {
            margin-top: 1.25rem;
          }
        }
        .social-link {
          font-size: 1.5rem;
        }
        .footer-link {
          font-size: 1rem;
          color: rgba(0, 0, 0, 0.5);
          text-decoration: none;
        }
        @media (max-width: 500px) {
          .footer-link {
            font-size: 0.875rem;
          }
        }
        .mail-text {
          width: 80%;
          margin: 1rem auto;
          text-align: center;
        }
        @media (max-width: 500px) {
          .mail-text {
            width: 100%;
          }
        }
      </style>
    </head>
    <body style="margin: 2rem 0; background-color: #f4f5fb">
      <div style="width: 115px; height: 45px; margin: 0 auto">
        <image
          src="https://www.taxitpay.com.ng/_next/static/media/taxitpay-logo.9c068d5e.png?imwidth=384"
          alt="TaxitPay Logo"
          style="width: 100%; height: 100%"
        />
      </div>
      <div class="main-container">
        <div>
          <h1 class="page-header">Account Statement Notification</h1>
          <hr style="margin: 12px 0; border: none; border-top: 1px solid rgba(0, 0, 0, 0.1)" />
          <p class="page-text">Hello ${receiverName}</p>
          <br />
          <p class="page-text">
            This is a mail from TaxiTPay providing the account statement of ${name} from ${start} to ${end}.
          </p>
          <p>
            Also attached in this email is the statement of account.
          </p>
          <br />
          <p class="page-text"> Best Regards. </p>
        </div>
  
        <div class="social-container">
          <div style="background-color: rgba(255, 255, 255, 0.16); border-radius: 6px; padding: 12px 0">
            <p class="tax-text">
              Taxtech®... developing efficient & effective technologies for the management of taxes.
            </p>
          </div>
          <div class="social-flex">
            <a href="" class="social-link"><i class="fa fa-facebook-official" aria-hidden="true"></i></a>
            <a href="" class="social-link"><i class="fa fa-twitter" aria-hidden="true"></i></a>
            <a href="" class="social-link"><i class="fa fa-youtube-play" aria-hidden="true"></i></a>
            <a href="" class="social-link"><i class="fa fa-linkedin-square" aria-hidden="true"></i></a>
          </div>
        </div>
  
        <footer style="margin-top: 2rem; color: rgba(0, 0, 0, 0.5)">
          <div style="display: flex; width: fit-content; margin: 0 auto">
            <a href="" class="footer-link">View web version</a>
            <div style="background-color: #c9c9c9; width: 6px; height: 6px; border-radius: 50%; margin: 9px 1rem 0;"></div>
            <a href="" class="footer-link">Unsubscribe</a>
          </div>
          <p style="margin-top: 1rem; text-align: center">
            &copy; 2015 - 2022 Taxaide Technologies Ltd. All rights reserved.
          </p>
          <p class="mail-text">
            If you have any questions or feedback, please feel free to send a mail to
            <a href="mailto:support@taxtech.com.ng" style="color: #5cb23a; font-weight: 600; text-decoration: none">
              support@taxtech.com.ng
            </a>
          </p>
        </footer>
      </div>
    </body>
  </html>
  `
}
