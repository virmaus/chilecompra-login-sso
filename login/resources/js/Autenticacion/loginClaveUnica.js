jQuery.loginClaveUnica = function (options) {

    var defaults = {
        urls: {
            logout: {
                "endpoint": null,
                "redirect": null
            }
        }
    };

    var config = jQuery.extend(defaults, options);

    /*
        Función que se ejecuta en el onclick del acceso de usuarios.
    */
    jQuery.loginClaveUnica.seleccionarPorOrganizacionClaveUnica = function seleccionarPorOrganizacionClaveUnica() {
        $("#mensajeLogin").hide();
        var marca = false;
        var organismo = 0;
        var usuario = 0;

        $(".rdbOrganismoEmpresa").each(function (index) {
            if ($(this).is(':checked')) {
                marca = true;
                organismo = $(this).val();
                usuario = $(this).attr("data");
            }
        });

        if (!marca) {
            alert("Para ingresar a Mercado Público debe seleccionar al menos un organismo comprador o empresa proveedora.");
            return false;
        }

        $.ajax({
            type: "POST",
            data: JSON.stringify({ organismo: organismo, usuario: usuario }),
            url: "/Home/Autenticacion/LoginPorOrganizacionClaveUnica",
            contentType: "application/json; charset=utf-8",
            async: false,
            success: function (data) {
                var mensaje2 = "";

                if (!data.ErrorLogin) {
                    //jQuery.loginClaveUnica.logout();
                    window.location.href = "../../../../Portal/Modules/Menu/Menu.aspx";
                }
                else {
                    switch (data.MensajeLogin) {
                        case "Usuario inactivo":
                            mensaje2 = "Comunícate con el administrador ChileCompra de tu organismo o empresa para solicitar la activación";
                            break;
                        case "Usuario bloqueado":
                            mensaje2 = 'Te recomendamos revisar el estado de tu acreditación en el sitio <a href="http://formacion.chilecompra.cl/" target="_blank"> formación.chilecompra.cl <\a>';
                            break;
                        default:
                            mensaje2 = "Puedes comunicarte con la Mesa de Ayuda al: 600 7000 600 ó 02 23536310";
                    }

                    $("#textoLogin").html("<strong>" + data.MensajeLogin + ":  </strong>" + mensaje2);

                    $("#mensajeLogin").show();
                }
            },
            error: function (xhr, status, error) {
                alert('Ha ocurrido un error. Favor intente nuevamente.');
                respuesta = false;
            }
        });
    };

    /*
        Función que cierra la sesión de ClaveÚnica.
        http://claveunica.soporte.digital.gob.cl/support/solutions/articles/36000182622-paso-7-cierre-de-sesi%C3%B3n
    */
    jQuery.loginClaveUnica.logout = function logout() {

        // llamada al endpoint de logout
        window.location.href = config.urls.logout.endpoint;

        // redireccion al cabo de 1 segundo a un handler de logout en la aplicación integradora
        setTimeout(function () {

            window.location.href = config.urls.logout.redirect;

        }, 1000);

    };

    /*
        Función que cierra la sesión de ClaveÚnica
    */
    jQuery.loginClaveUnica.logout2 = function logout2() {

        window.open('https://api.claveunica.gob.cl/api/v1/accounts/app/logout', '_parent');

    };
};
