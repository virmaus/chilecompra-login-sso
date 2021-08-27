<html>

<head>
    <title>Lipigas</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width,user-scalable=no,initial-scale=1,maximum-scale=1,minimum-scale=1">
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <style type="text/css">
        @font-face {
          font-family: 'Roboto';
          font-style: normal;
          font-weight: 400;
          font-display: swap;
          src: local('Roboto'), local('Roboto-Regular'), url(https://fonts.gstatic.com/s/roboto/v20/KFOmCnqEu92Fr1Mu72xKKTU1Kvnz.woff2) format('woff2');
          unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;
        }
        
        @font-face {
          font-family: 'Roboto';
          font-style: normal;
          font-weight: 700;
          font-display: swap;
          src: local('Roboto Bold'), local('Roboto-Bold'), url(https://fonts.gstatic.com/s/roboto/v20/KFOlCnqEu92Fr1MmWUlfCRc4AMP6lbBP.woff2) format('woff2');
          unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;
        }
        
        .extraBoldRoboto {
            font-family: "Roboto", Arial, sans-serif !important;
            font-weight: 800 !important;
        }
        
         .normalRoboto {
            font-family: "Roboto", Arial, sans-serif !important;
            font-weight: 400 !important;
        }

        .breakOnDesktop {
            display: block;
        }

        @media (max-width: 599px) {
            .mobile-w-100 {
                display: block !important;
                width: 100% !important;
                box-sizing: border-box !important;
            }
            .width85 {
                width: 85% !important;
            }
            .centerMobile {
                text-align: center !important;
            }
            .h1Mobile {
                font-size: 25px !important;
            }
            .breakOnDesktop {
                display: initial !important;
            }
        }

    </style>
</head>

<body style="margin: 0; padding: 0; background-color: #F6F6F6">
    <center>
        <!--[if (gte mso 9)|(IE)]>
        <table align="center" border="0" cellspacing="0" cellpadding="0" width="580">
        <tr>
        <td>
        <![endif]-->
        <table width="100%" border="0" cellpadding="0" cellspacing="0" style="border-collapse: collapse; width: 100% !important; max-width: 580px !important; background-color: white">
            <tr>
                <td align="center" style="padding: 0px 0 0px 0; background-color: #F6F6F6">&nbsp;</td>
            </tr>
            <tr>
                <td align="center" style="padding: 0px 0 0px 0; background-color: #F6F6F6">&nbsp;</td>
            </tr>
            <tr>
                <td align="center" style="padding: 0px 0 0px 0;">
                    <img src="data:image/png;base64," width="600" height="90" alt="Logo-TERPEL" />
                </td>
            </tr>
            <tr>
                <td align="center">
                    <table bgcolor="#FFF" width="100%" border="0" cellpadding="0" cellspacing="0" style="border-collapse: collapse; max-width: 580px !important;">

                        <tr>
                            <td align="center" style="padding-bottom: 25px;">
                                <table width="75%" class="width85" border="0" cellpadding="0" cellspacing="0" style="border-collapse: collapse;">
                                    <tr>
                                        <td align="center" class="extraBoldRoboto h1Mobile" style="font-size: 16px; line-height: 1.4; color: #004f96;">
                                           &nbsp;
                                        </td>
                                    </tr>
                                    <tr>
                                        <td align="center" class="extraBoldRoboto h1Mobile" style="font-size: 36px; line-height: 1.4; color: #FF8C2B;">
                                            Restablecer contraseña
                                        </td>
                                    </tr>

                                </table>
                            </td>
                        </tr>

                        <tr>
                            <td align="center" style="padding-bottom: 45px;">
                                <table width="90%" class="width85" border="0" cellpadding="0" cellspacing="0" style="border-collapse: collapse;">

                                    <tr>
                                        <td class="normalRoboto centerMobile" style="font-size: 16px; line-height: 1.4; color: #484848; text-align: justify; padding-bottom: 15px;">
                                        ${kcSanitize(msg("passwordResetBodyHtml",link, linkExpiration, realmName, linkExpirationFormatter(linkExpiration)))?no_esc}
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>

                    </table>
                </td>
            </tr>
        </table>
        <!--[if (gte mso 9)|(IE)]>
        </td>
        </tr>
        </table>
        <![endif]-->
    </center>
</body>
</html>
