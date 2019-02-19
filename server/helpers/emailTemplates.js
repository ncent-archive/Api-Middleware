"use strict";

module.exports = {
    confirmationCodeHtml(token) {
        return (`<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">

<html>

<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <base href=".">


  <meta name="viewport" content="initial-scale=1.0, maximum-scale=1.0">

  <style type="text/css" inline="false">
    img {
      display: block;
    }

    /* ---- ROUNDED CONTAINER ---- */
    .container {
      -webkit-border-radius: 12px;
      -moz-border-radius: 12px;
      -ms-border-radius: 12px;
      -o-border-radius: 12px;
      border-radius: 12px;
      overflow: hidden;
      table-layout: fixed;
    }

    .container td .text {
      overflow: hidden;
    }

    /* ---- PROFILE ---- */

    .profile-avatar {
      width: 60px;
      height: 60px;
      border-radius: 30px;
      display: block;
      overflow: hidden;
    }

    .profile-avatar-placeholder {
      width: 60px;
      height: 60px;
      text-align: center;
      text-transform: uppercase;
      border: 2px solid #CCC;
      border-radius: 30px;
      color: #CCC;
      font-size: 24px;
      text-decoration: none;
      font-family: -apple-system, BlinkMacSystemFont, Helvetica Neue, Helvetica, Arial, sans-serif;
    }

    .profile-name {
      font-size: 18px;
      font-weight: 500;
      line-height: 24px;
      letter-spacing: 0.2px;
      color: #333;
      font-family: -apple-system, BlinkMacSystemFont, Helvetica Neue, Helvetica, Arial, sans-serif;
    }

    .profile-description {
      font-size: 16px;
      font-weight: 400;
      line-height: 24px;
      letter-spacing: 0.2px;
      color: #999;
      font-family: -apple-system, BlinkMacSystemFont, Helvetica Neue, Helvetica, Arial, sans-serif;
    }

    .amount-text {
      font-weight: 400;
      letter-spacing: -1px;
      font-family: -apple-system, BlinkMacSystemFont, Helvetica, Arial, sans-serif;
    }

    /* ---- STATUS ICON ---- */
    .status-icon {
      border-radius: 50%;
    }

    .status-icon.reported {
      border-radius: 0;
    }

    /* ---- TITLE ---- */
    .title {
      font-family: -apple-system, BlinkMacSystemFont, Helvetica Neue, Helvetica, Arial, sans-serif;
      font-size: 16px;
      font-weight: 400;
      letter-spacing: 0.2px;
      line-height: 22px;
      color: black;
    }

    .title a {
      color: #333;
      text-decoration: none;
    }

    /* ---- BODY TEXT ---- */
    .secondary,
    .secondary a {
      color: #999;
      font-family: -apple-system, BlinkMacSystemFont, Helvetica Neue, Helvetica, Arial, sans-serif;
      font-size: 16px;
      line-height: 24px;
      font-weight: 400;
    }

    /* ---- DETAIL LIST ROWS ---- */

    .detail-list-padding {
      padding: 0 56px;
    }

    .detail-row .secondary {
      line-height: 24px;
      letter-spacing: 0.3px;
    }

    .detail-row-text {
      color: #999;
      font-family: -apple-system, BlinkMacSystemFont, Helvetica Neue, Helvetica, Arial, sans-serif;
      font-size: 14px;
      line-height: 24px;
      font-weight: 300;
      letter-spacing: 0.2px;
    }


    /* ---- MINOR BUTTON LIST ---- */

    .minor-button {
      color: #333;
      display: block;
      font-family: -apple-system, BlinkMacSystemFont, Helvetica Neue, Helvetica, Arial, sans-serif;
      font-size: 18px;
      font-weight: 400;
      line-height: 63px;
      letter-spacing: 0.22px;
      text-decoration: none;
      text-align: center;
      width: 100%
    }

    .divider-top {
      border-top: 1px solid #E5E5E5;
    }

    .divider-bottom {
      border-bottom: 1px solid #D9D9D9;
    }

    .divider-left {
      border-left: 1px solid #D9D9D9;
    }

    .center {
      text-align: center;
    }

    /* ---- CONFIRMATION CODE ---- */
    .code {
      font-family: -apple-system, BlinkMacSystemFont, Helvetica Neue, Helvetica, Arial, sans-serif;
      font-size: 40px;
      color: #333333;
      font-weight: 400;
      padding-left: 10px;
      /* Match letter-spacing to properly center text */
      letter-spacing: 10px;
      line-height: 48px;
    }

    /* ---- CTA LEGAL AGREEMENT ---- */
    .cta-agreement {
      font-size: 13px;
      font-family: -apple-system, BlinkMacSystemFont, Helvetica Neue, Helvetica, Arial, sans-serif;
      line-height: 19px;
      font-weight: 300;
      color: #cbcbcb;
      padding: 0 28px;
    }

    .cta-agreement a {
      color: #cbcbcb;
    }

    /* ---- BUTTONS ---- */
    td.button {
      border: 1px solid #E6E6E6;
      display: block;
      -webkit-border-radius: 8px;
      -moz-border-radius: 8px;
      -ms-border-radius: 8px;
      -o-border-radius: 8px;
      border-radius: 8px;
    }

    a.primary-button {
      color: #00D64F;
      display: inline-block;
      font-size: 18px;
      font-weight: 500;
      font-family: -apple-system, BlinkMacSystemFont, Helvetica Neue, Helvetica, Arial, sans-serif;
      text-decoration: none;
      width: 212px;
      text-align: center;
      line-height: 70px;
      letter-spacing: 0.2px;
    }

    /* ---- PROMO FOOTER ---- */

    .promo-title {
      font-family: -apple-system, BlinkMacSystemFont, Helvetica Neue, Helvetica, Arial, sans-serif;
      font-size: 16px;
      font-weight: 400;
      line-height: 24px;
      letter-spacing: 0.2px;
      color: #333;
    }

    .promo-secondary {
      font-family: -apple-system, BlinkMacSystemFont, Helvetica Neue, Helvetica, Arial, sans-serif;
      font-size: 16px;
      font-weight: 400;
      line-height: 24px;
      letter-spacing: 0.2px;
      color: #999;
      padding: 0 10px;
    }

    .promo-link {
      font-family: -apple-system, BlinkMacSystemFont, Helvetica Neue, Helvetica, Arial, sans-serif;
      width: 100%;
      color: #00D64F;
      font-weight: 400;
      text-decoration: none;
      font-size: 18px;
      letter-spacing: 0.22px;
      line-height: 63px;
      text-align: center;
      display: block;
    }

    /* ---- FIRST TIME FOOTER ---- */
    .first-time-footer {
      table-layout: fixed;
    }

    .first-time-footer-text {
      color: #999;
      font-family: -apple-system, BlinkMacSystemFont, Helvetica Neue, Helvetica, Arial, sans-serif;
      font-size: 14px;
      line-height: 24px;
    }

    .first-time-footer-text a {
      text-decoration: none;
      color: #00D64F;
      font-weight: 500;
    }


    /* ---- FOOTER ---- */

    /* Hide soft hyphens in email addresses. */
    .optional-hyphen {
      color: #fff;
    }

    .email {
      text-decoration: none;
      cursor: text;
    }

    .footer {
      font-size: 14px;
      font-family: -apple-system, BlinkMacSystemFont, Helvetica Neue, Helvetica, Arial, sans-serif;
      line-height: 24px;
      font-weight: 300;
      text-align: center;
      color: #999;
    }

    .footer a {
      color: #999;
      text-decoration: none;
    }

    .footer.with-links a {
      text-decoration: underline;
    }

    .footer-meta-separator {
      color: #999;
    }


    /* ---- WELCOME EMAIL ---- */

    .welcome-title {
      font-family: -apple-system, BlinkMacSystemFont, Helvetica Neue, Helvetica, Arial, sans-serif;
      font-size: 24px;
      font-weight: 300;
      line-height: 29px;
      letter-spacing: 0.2px;
      color: #333333;
    }

    .welcome-subtitle {
      font-family: -apple-system, BlinkMacSystemFont, Helvetica Neue, Helvetica, Arial, sans-serif;
      font-size: 14px;
      font-weight: 300;
      line-height: 20px;
      letter-spacing: 0.2px;
      color: #999999;
    }

    .welcome-column-padding {
      padding: 24px;
    }

    .welcome-footer-icon {
      padding: 0 12px 0;
      vertical-align: middle;
      text-align: center;
    }

    /* ---- INVITE EMAIL ---- */

    .invite-step-title {
      font-family: -apple-system, BlinkMacSystemFont, Helvetica Neue, Helvetica, Arial, sans-serif;
      font-size: 16px;
      font-weight: 400;
      letter-spacing: 0.2px;
      line-height: 22px;
      color: #333;
      text-align: center;
    }

    .invite-step-description {
      text-align: center;
    }

    /* ---- STAGING MESSAGE ---- */

    .staging-warning-v3 {
      -webkit-border-radius: 0 0 12px 12px;
      -moz-border-radius: 0 0 12px 12px;
      -ms-border-radius: 0 0 12px 12px;
      -o-border-radius: 0 0 12px 12px;
      border-radius: 0 0 12px 12px;
    }

    .email {
      text-decoration: none;
      color: #999999;
      cursor: text;
    }

    p {
      margin: 1em 0;
    }

    @media screen and (min-width: 415px) {
      .container {
        width: 375px !important;
      }
    }
  </style>
  <style>
    /* These styles get inlined before sending. */
    .amount-color {
      color: #BFBFBF;
    }
  </style>
</head>

<body style="margin:0;padding:0;min-width: 100%;background-color:#F7F7F7;" class="vsc-initialized">


  <!-- Max-width Table -->
  <table class="email-v3" width="100%" cellspacing="0" cellpadding="0" border="0" bgcolor="#F7F7F7">
    <tbody>
      <tr>
        <td></td>
        <td width="415">
          <!-- Max-width Table -->

          <!-- Padding Between Screen and Content Table -->
          <table width="100%" cellspacing="0" cellpadding="0" border="0">
            <tbody>
              <tr>
                <td width="20"></td>
                <td width="100%">
                  <!-- Padding Between Screen and Content Table -->



                  <!-- Content Column Table -->
                  <table width="100%" cellspacing="0" cellpadding="0">
                    <tbody>
                      <tr>
                        <td height="50">

                        </td>
                      </tr>
                      <tr>
                        <td align="center">
                          <table align="center" class="container" border="0" cellpadding="0" cellspacing="0" bgcolor="#ffffff" width="100%">

                            <tbody>
                              <tr>
                                <td height="48">

                                </td>
                              </tr>


                              <tr>
                                <td align="center">

                                </td>
                              </tr>
                              <tr>
                                <td height="24">

                                </td>
                              </tr>


                              <tr>
                                <td align="center" style="padding: 0 48px">
                                  <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%">



                                    <tbody>
                                      <tr>
                                        <td align="center" class="title">
                                          <div class="text">Sign In&nbsp;Code</div>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td height="16">

                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </td>
                              </tr>

                              <tr>
                                <td height="22">

                                </td>
                              </tr>
                              <tr>
                                <td align="center" class="code">
                                  <div class="text">${token}</div>
                                </td>
                              </tr>
                              <tr>
                                <td height="24">

                                </td>
                              </tr>

                              <tr>
                                <td align="center" style="padding: 0 48px">
                                  <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%">

                                    <tbody>
                                      <tr>
                                        <td align="center" class="secondary">
                                          <div class="subtitle text">Here is the sign in code <br>you&nbsp;requested</div>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td height="22">

                                        </td>
                                      </tr>



                                      <tr>
                                        <td height="36" align="center">
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </td>
                              </tr>


                            </tbody>
                          </table>
                        </td>
                      </tr>





                      <!-- Large Gap between content and footer text areas -->
                      <tr>
                        <td>
                          <table align="center" class="container" border="0" cellpadding="0" cellspacing="0" width="280">
                            <tbody>
                              <tr>
                                <td height="24">

                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>

                      <tr>
                        <td>
                          <table align="center" border="0" cellpadding="0" cellspacing="0" width="280">
                            <tbody>
                              <tr>
                                <td align="center" class="footer with-links">

                                </td>
                              </tr>
                              <tr>
                                <td height="24">

                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>


                      <tr>
                        <td height="70">

                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <!-- Content Column Table -->


                  <!-- Padding Between Screen and Content Table -->
                </td>
                <td width="20"></td>
              </tr>
            </tbody>
          </table>
          <!-- Padding Between Screen and Content Table -->


          <!-- Max-width Table -->
        </td>
        <td></td>
      </tr>
    </tbody>
  </table>
  <!-- Max-width Table -->



</body>

</html>`);
    }
};
