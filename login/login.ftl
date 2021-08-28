<#import "template.ftl" as layout>
<@layout.registrationLayout displayInfo=social.displayInfo displayWide=(realm.password && social.providers??); section>
    <#if section = "header">
        ${msg("doTitle")}
    <#elseif section = "form">
    <div id="kc-form" <#if realm.password && social.providers??>class="${properties.kcContentWrapperClass!}"</#if>>
      <div id="kc-form-wrapper" <#if realm.password && social.providers??>class="${properties.kcFormSocialAccountContentClass!} ${properties.kcFormSocialAccountClass!}"</#if>>
        <#if realm.password>


                <div id="tabs" style="display: block; width: 100%; margin: 0px;">
                    <ul class="resp-tabs-list tabs">
                        <li id="liClaveUnica" class="resp-tab-item tabs active" aria-controls="tabs_tab_item-0" role="tab">ClaveÚnica</li>
                        <li id="liRUT" class="resp-tab-item tabs" aria-controls="tabs_tab_item-1" role="tab">RUT Persona</li>
                        <li id="liExtranjero" class="resp-tab-item tabs" aria-controls="tabs_tab_item-2" role="tab">Extranjero</li>
                        <!--<div class="dat-obligatorios">Todos los datos son obligatorios</div> -->
                    </ul>
                    <div class="resp-tabs-container tabs">
                            <h2 class="resp-accordion tabs active" role="tab" aria-controls="tabs_tab_item-0">ClaveÚnica</h2><div class="resp-tab-content tabs resp-tab-content-active" aria-labelledby="tabs_tab_item-0" style="display:block">
                                <div class="form-center form-wrap">
                                    <p>Ingresa con tu Clave Única y accede a Mercado Público.</p>
                                    <br>
                                        <iframe src="https://api.claveunica.gob.cl/api/v1/accounts/app/logout" style="display: none;"></iframe>

                                    <a href="https://www.mercadopublico.cl/Home/Autenticacion/LoginClaveUnica">
                                        <img src="${url.resourcesPath}/img/btn_claveunica_202px.png" alt="ClaveÚnica" class="btn-clave-unica">
                                    </a>
                                    <br>
                                    <br>
                                    <br>
                                </div>
                            </div>

                            <ul class="nav nav-tabs" id="myTab" role="tablist">
                        <h2 class="resp-accordion tabs" role="tab" aria-controls="tabs_tab_item-1">RUT Persona</h2>
                    <form id="kc-form-login" onsubmit="login.disabled = true; return true;" action="${url.loginAction}" method="post">

                        <div class="resp-tab-content tabs" aria-labelledby="tabs_tab_item-1">
                            <div class="form-center form-wrap">
                                <div class="input-wrap">
                                     <div class="${properties.kcFormGroupClass!}">
                                        
                                <#if usernameEditDisabled??>
                                <input tabindex="1" id="username" class="${properties.kcInputClass!}" name="username" value="${(login.username!'')}" type="text" disabled />

                                    <#else>
                                        <input tabindex="1" id="username" class="${properties.kcInputClass!}" name="username" placeholder="Ej.: 15.786.435-k" value="${(login.username!'')}"  type="text" autofocus autocomplete="off" />
                                    </#if>
                                </div>

                                <div class="${properties.kcFormGroupClass!}">
                                    <label for="password" class="${properties.kcLabelClass!}">${msg("password")}</label>
                                    <input tabindex="2" id="password" class="${properties.kcInputClass!}" name="password" type="password" autocomplete="off" /> 
                                </div>
                                    
                                    </div>

                                </div>
                                <div class="alert down alerta-adv-pequeno alerta" style="display:none;">
                                </div>
                            <div id="kc-form-buttons" class="${properties.kcFormGroupClass!}">
                                <input type="hidden" id="id-hidden-input" name="credentialId" <#if auth.selectedCredential?has_content>value="${auth.selectedCredential}"</#if>/>
                                <input tabindex="4" class="${properties.kcButtonClass!} ${properties.kcButtonPrimaryClass!} ${properties.kcButtonBlockClass!} ${properties.kcButtonLargeClass!}" name="login" id="kc-login" type="submit" value="${msg("doLogIn")}"/>
                            </div>
                         </div>
                        </form>
                    </div>


                        <h2 class="resp-accordion tabs" role="tab" aria-controls="tabs_tab_item-2">Extranjero</h2><div class="resp-tab-content tabs" aria-labelledby="tabs_tab_item-2">
                            <form id="kc-form-login" onsubmit="login.disabled = true; return true;" action="${url.loginAction}" method="post">

                             <div class="form-center form-wrap">

                                <div class="input-wrap">
                                    <#if usernameEditDisabled??>
                                        <input tabindex="1" id="username" class="${properties.kcInputClass!}" name="username" value="${(login.username!'')}" type="text" disabled />
                                    <#else>
                                        <input tabindex="1" id="username" placeholder="Ingresar un Identificador" class="${properties.kcInputClass!}" name="username" value="${(login.username!'')}"  type="text" autofocus autocomplete="off" />
                                    </#if>
                                </div>

                                <div class="${properties.kcFormGroupClass!}">
                                    <label for="password" class="${properties.kcLabelClass!}">${msg("password")}</label>
                                    <input tabindex="2" id="password" class="${properties.kcInputClass!}" name="password" type="password" autocomplete="off" /> 
                                </div>
                                <div class="alert down alerta-adv-pequeno alerta" style="display:none">
                                </div>
                            <div id="kc-form-buttons" class="${properties.kcFormGroupClass!}">
                                <input type="hidden" id="id-hidden-input" name="credentialId" <#if auth.selectedCredential?has_content>value="${auth.selectedCredential}"</#if>/>
                                <input tabindex="4" class="${properties.kcButtonClass!} ${properties.kcButtonPrimaryClass!} ${properties.kcButtonBlockClass!} ${properties.kcButtonLargeClass!}" name="login" id="kc-login" type="submit" value="${msg("doLogIn")}"/>
                            </div>

                             </div>
                            
                        </div>

                            <div id="kc-form-buttons" class="${properties.kcFormGroupClass!}">
                                <input type="hidden" id="id-hidden-input" name="credentialId" <#if auth.selectedCredential?has_content>value="${auth.selectedCredential}"</#if>/>
                                <input tabindex="4" class="${properties.kcButtonClass!} ${properties.kcButtonPrimaryClass!} ${properties.kcButtonBlockClass!} ${properties.kcButtonLargeClass!}" name="login" id="kc-login" type="submit" value="${msg("doLogIn")}"/>
                            </div>
                    </form>
                        
                        </div>
                    </div>
        

                <div class="${properties.kcFormGroupClass!} ${properties.kcFormSettingClass!}">
                    <div id="kc-form-options">
                        <#if realm.rememberMe && !usernameEditDisabled??>
                            <div class="checkbox">
                                <label>
                                    <#if login.rememberMe??>
                                        <input tabindex="3" id="rememberMe" name="rememberMe" type="checkbox" checked> ${msg("rememberMe")}
                                    <#else>
                                        <input tabindex="3" id="rememberMe" name="rememberMe" type="checkbox"> ${msg("rememberMe")}
                                    </#if>
                                </label>
                            </div>
                        </#if>
                    </div>
                        <div class="${properties.kcFormOptionsWrapperClass!}">
                            <#if realm.resetPasswordAllowed>
                                <span><a tabindex="5" href="${url.loginResetCredentialsUrl}">${msg("doForgotPassword")}</a></span>
                            </#if>
                        </div>
                  </div>

                  <!-- boton de submit? -->

        </#if>
        </div>

        <#if realm.password && social.providers??>
            <div id="kc-social-providers" class="${properties.kcFormSocialAccountContentClass!} ${properties.kcFormSocialAccountClass!}">
                <ul class="${properties.kcFormSocialAccountListClass!} <#if social.providers?size gt 4>${properties.kcFormSocialAccountDoubleListClass!}</#if>">
                    <#list social.providers as p>
                        <li class="${properties.kcFormSocialAccountListLinkClass!}"><a href="${p.loginUrl}" id="zocial-${p.alias}" class="zocial ${p.providerId}"> <span>${p.displayName}</span></a></li>
                    </#list>
                </ul>
            </div>

        </#if>
      </div>
    <#elseif section = "info" >
        <#if realm.password && realm.registrationAllowed && !registrationDisabled??>
            <div id="kc-registration">
                <span>${msg("noAccount")} <a tabindex="6" href="${url.registrationUrl}">${msg("doRegister")}</a></span>
            </div>
        </#if>
    </#if>

</@layout.registrationLayout>
