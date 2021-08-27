<#macro registrationLayout bodyClass="" displayInfo=false displayMessage=true displayRequiredFields=false displayWide=false showAnotherWayIfPresent=true>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"  "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" class="${properties.kcHtmlClass!}">

<head class="container no-print" role="banner" id="encabezado">
    <meta charset="utf-8">
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta name="robots" content="noindex, nofollow">

    <script src="${url.resourcesPath}/js/jquery-3.4.1.min.js" type="text/javascript"></script>
    <script src="${url.resourcesPath}/js/RecuperacionContrasena/easyResponsiveTabs.js" type="text/javascript"></script>
    <script src="${url.resourcesPath}/js/RecuperacionContrasena/jquery.bxslider.min.js" type="text/javascript"></script>
    <script src="${url.resourcesPath}/js/RecuperacionContrasena/modernizr.js" type="text/javascript"></script>
    <script src="${url.resourcesPath}/js/RecuperacionContrasena/script.js" type="text/javascript"></script>
    <script src="${url.resourcesPath}/js/RecuperacionContrasena/jquery.ValidaFormatCampo.js" type="text/javascript"></script>
    <script src="${url.resourcesPath}/js/RecuperacionContrasena/Rut.js" type="text/javascript"></script>
    <script src="${url.resourcesPath}/js/Autenticacion/Login.js" type="text/javascript"></script>
    <script src="${url.resourcesPath}/js/Autenticacion/loginClaveUnica.js" type="text/javascript"></script>
    <script src="${url.resourcesPath}/js/RecuperacionContrasena/jquery.dataTables.min.js" type="text/javascript"></script>

    <style>
    img.btn-clave-unica {
        position: relative !important;
        width: 160px !important;
        left: calc( 50% - 80px );
    }
    </style>
    <style>
    .cssTextboxCC {
            border: 1px #ccc solid;
            width: 80%;
            margin-left: 1em;
            padding: .4em;
        }
    </style>

    <#if properties.meta?has_content>
        <#list properties.meta?split(' ') as meta>
            <meta name="${meta?split('==')[0]}" content="${meta?split('==')[1]}"/>
        </#list>
    </#if>
    <title>${msg("loginTitle",(realm.displayName!''))}</title>
    <link rel="icon" href="${url.resourcesPath}/img/favicon.ico" />
    <#if properties.styles?has_content>
        <#list properties.styles?split(' ') as style>
            <link href="${url.resourcesPath}/${style}" rel="stylesheet" />
        </#list>
    </#if>
    <#if properties.scripts?has_content>
        <#list properties.scripts?split(' ') as script>
            <script src="${url.resourcesPath}/${script}" type="text/javascript"></script>
        </#list>
    </#if>
    <#if scripts??>
        <#list scripts as script>
            <script src="${script}" type="text/javascript"></script>
        </#list>
    </#if>

        <div id="ccBarraOpciones">
            <nav id="ccBarra" class="menu-transversal ohidden">
                <div class="row">
                    <ul><li class="active"><a href="http://www.chilecompra.cl/" id="idChComp" target="_blank" class="">ChileCompra</a></li><li class=""><a href="http://www.mercadopublico.cl/" id="idHome" target="_top" class="paraguasSelected">Mercado Público</a></li><li class=""><a href="http://capacitacion.chilecompra.cl/" id="idFormacion" target="_blank" class="">Capacitación</a></li><li class=""><a href="https://ayuda.mercadopublico.cl/" id="idServ" target="_blank" class="">Centro de Ayuda</a></li></ul>
                </div>
            </nav>

    <nav class="row" id="encabezado">
        <div class="col-md-3">
             <a href="http://www.mercadopublico.cl/Home/" class="logo header" target="_self">
                <img src="${url.resourcesPath}/img/logo-chilecompra-original.png" alt="Imagen de logotipo de Mercado Público">
            </a> 
        </div>
    </nav>
        </div>

</head>

<body class="${properties.kcBodyClass!}">
  <div class="${properties.kcLoginClass!}">
    <div id="kc-header" class="${properties.kcHeaderClass!}">
      <div id="kc-header-wrapper" class="${properties.kcHeaderWrapperClass!}">${kcSanitize(msg("loginTitleHtml",(realm.displayNameHtml!'')))?no_esc}</div>
    </div>
    
    <div class="${properties.kcFormCardClass!} <#if displayWide>${properties.kcFormCardAccountClass!}</#if>">
      <header class="${properties.kcFormHeaderClass!}">
        <#if realm.internationalizationEnabled  && locale.supported?size gt 1>
            <div id="kc-locale">
                <div id="kc-locale-wrapper" class="${properties.kcLocaleWrapperClass!}">
                    <div class="kc-dropdown" id="kc-locale-dropdown">
                        <a href="#" id="kc-current-locale-link">${locale.current}</a>
                        <ul>
                            <#list locale.supported as l>
                                <li class="kc-dropdown-item"><a href="${l.url}">${l.label}</a></li>
                            </#list>
                        </ul>
                    </div>
                </div>
            </div>
        </#if>
        <#if !(auth?has_content && auth.showUsername() && !auth.showResetCredentials())>
            <#if displayRequiredFields>
                <div class="${properties.kcContentWrapperClass!}">
                    <div class="${properties.kcLabelWrapperClass!} subtitle">
                        <span class="subtitle"><span class="required">*</span> ${msg("requiredFields")}</span>
                    </div>
                    <div class="col-md-10">
                        <h1 id="kc-page-title"><#nested "header"></h1>
                    </div>
                </div>
            <#else>
                <h1 id="kc-page-title"><#nested "header"></h1>
            </#if>
        <#else>
            <#if displayRequiredFields>
                <div class="${properties.kcContentWrapperClass!}">
                    <div class="${properties.kcLabelWrapperClass!} subtitle">
                        <span class="subtitle"><span class="required">*</span> ${msg("requiredFields")}</span>
                    </div>
                    <div class="col-md-10">
                        <#nested "show-username">
                        <div class="${properties.kcFormGroupClass!}">
                            <div id="kc-username">
                                <label id="kc-attempted-username">${auth.attemptedUsername}</label>
                                <a id="reset-login" href="${url.loginRestartFlowUrl}">
                                    <div class="kc-login-tooltip">
                                        <i class="${properties.kcResetFlowIcon!}"></i>
                                        <span class="kc-tooltip-text">${msg("restartLoginTooltip")}</span>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            <#else>
                <#nested "show-username">
                <div class="${properties.kcFormGroupClass!}">
                    <div id="kc-username">
                        <label id="kc-attempted-username">${auth.attemptedUsername}</label>
                        <a id="reset-login" href="${url.loginRestartFlowUrl}">
                            <div class="kc-login-tooltip">
                                <i class="${properties.kcResetFlowIcon!}"></i>
                                <span class="kc-tooltip-text">${msg("restartLoginTooltip")}</span>
                            </div>
                        </a>
                    </div>
                </div>
                
            </#if>
        </#if>
      </header>
      <div id="kc-content">
        <div id="kc-content-wrapper">

          <#-- App-initiated actions should not see warning messages about the need to complete the action -->
          <#-- during login.                                                                               -->
          <#if displayMessage && message?has_content && (message.type != 'warning' || !isAppInitiatedAction??)>
              <div class="alert alert-${message.type}">
                  <#if message.type = 'success'><span class="${properties.kcFeedbackSuccessIcon!}"></span></#if>
                  <#if message.type = 'warning'><span class="${properties.kcFeedbackWarningIcon!}"></span></#if>
                  <#if message.type = 'error'><span class="${properties.kcFeedbackErrorIcon!}"></span></#if>
                  <#if message.type = 'info'><span class="${properties.kcFeedbackInfoIcon!}"></span></#if>
                  <span class="kc-feedback-text">${kcSanitize(message.summary)?no_esc}</span>
              </div>
          </#if>

          <#nested "form">

          <#if auth?has_content && auth.showTryAnotherWayLink() && showAnotherWayIfPresent>
          <form id="kc-select-try-another-way-form" action="${url.loginAction}" method="post" <#if displayWide>class="${properties.kcContentWrapperClass!}"</#if>>
              <div <#if displayWide>class="${properties.kcFormSocialAccountContentClass!} ${properties.kcFormSocialAccountClass!}"</#if>>
                  <div class="${properties.kcFormGroupClass!}">
                    <input type="hidden" name="tryAnotherWay" value="on" />
                    <a href="#" id="try-another-way" onclick="document.forms['kc-select-try-another-way-form'].submit();return false;">${msg("doTryAnotherWay")}</a>
                  </div>
              </div>
          </form>
          </#if>

          <#if displayInfo>
              <div id="kc-info" class="${properties.kcSignUpClass!}">
                  <div id="kc-info-wrapper" class="${properties.kcInfoAreaWrapperClass!}">
                      <#nested "info">
                  </div>
              </div>
          </#if>
        </div>
      </div>


    </div>
  </div>

    <div id="ccFooterPublico" class="cc-footer-publico footer-simple padding-md">
    <div class="container">
     <div class="row">
        <div class="col-sm-6 logotipo-negativo text-center">
        <img src="${url.resourcesPath}/img/indice.png">
        </div>
        <div class="col-sm-6 text-left">
         <ul class="list-unstyled">
            <li>Dirección ChileCompra</li>
            <li>Ministerio de Hacienda, Gobierno de Chile</li>
            <li>Monjitas 392 - Piso 8, Santiago de Chile (7N)</li>
            <li>Mesa de ayuda: 600 7000 600 – +56 44 220 1003</li>  
            <li><a href="http://www.chilecompra.cl/terminos-y-condiciones-de-uso/">Términos y condiciones</a></li>
         </ul>
        </div>
      </div>
     </div>
    </div>

    <script src="${url.resourcesPath}/js/jquery.tokeninput.js" type="text/javascript"></script>
    <script src="${url.resourcesPath}/js/jquery.defaultvalue.js" type="text/javascript"></script>
    <script src="${url.resourcesPath}/js/fancybox/jquery.fancybox.js" type="text/javascript"></script>
</body>
</html>
</#macro>
