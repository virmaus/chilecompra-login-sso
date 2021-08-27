$(document).ready(function () {
    /*Caracteres Permitidos*/
    $("#txtRUT").validaFormatoCampo('0123456789k');
    $("#txtDNI").validaFormatoCampo('0123456789abcdefghijklmnñopqrstuvwxyz-');

    $('li[role="tab"], h2[role="tab"]').click(function (e) {
        resetearCampos();
        limpiarTextos();
    });


    $('#btnAccesoRUT , #btnAccesoDNI').click(function (e) {
        Acceso();
    });

    //$('#btnAccesoDNI').click(function (e) {
    //    Acceso();
    //});

    $(":text, :password").blur(function () {
        resetearCampos();
    });

    $(":text, :password").keydown(function (e) {
        if (e.keyCode == 13)
            Acceso();
    })

    $('#txtRUT').mask('00.000.000-d', { reverse: true, translation: { 'd': { pattern: /[0-9Kk]/ } } });


    cargarPaises();

});

function Acceso() {
    if ($("#liExtranjero").hasClass("active")) {
        if (validarExtranjero()) {
            AccesoUsuario();
        }
    }
    else {
        if (validarRUT()) {
            AccesoUsuario();
        }

    }
}

function limpiarTextos() {
    $(":text, :password").each(function () {
        $($(this)).val('');
    });
}

function resetearCampos() {
    $(":text").removeClass("invalid");
    $(":password").removeClass("invalid");
    $(".invalid-form").remove();
    $(".alerta").hide();
}

function validarRUT() {
    var validar = false;
    resetearCampos();


    var valorRUT = $("#txtRUT").val();
    var pass = $("#txtPass").val();

    var rutValido = $.Rut.validar(valorRUT);
    if (rutValido == 0 || valorRUT == '') {
        $("#txtRUT").addClass("invalid");
        $("#txtRUT").after("<span class='invalid-form'>El RUT ingresado es incorrecto, ingresa uno válido.</span>");
        validar = false;
    }
    else if (pass == "") {
        $("#txtPass").addClass("invalid");
        validar = false;
    }
    else
        validar = true;

    return validar;
}

function validarExtranjero() {
    var validar = false;
    resetearCampos();
    var valorDNI = $("#txtDNI").val();
    var pass = $("#txtPassDNI").val();

    if (valorDNI == "") {
        $("#txtDNI").addClass("invalid");
        validar = false;
    }
    else if (pass == "") {
        $("#txtPassDNI").addClass("invalid");
        validar = false;
    }
    else
        validar = true;

    return validar;
}

function AccesoUsuario() {
    var url = "/Home/Autenticacion/NuevoLogin";
    var pass, identificacion;
    var tipo = "";
    var valorPais = 0;
    if ($("#liExtranjero").hasClass("active")) {
        identificacion = $("#txtDNI").val();
        pass = $("#txtPassDNI").val();
        //        valorPais = $("#ddlPaises").val();
        tipo = "dni";
    }
    else {
        identificacion = $("#txtRUT").val();
        pass = $("#txtPass").val();
        tipo = "nacional";
    }
                                
    gcaptcha = $("#g-recaptcha-response").val();
    console.log("gcaptcha " + gcaptcha);
    
    $.ajax({
        type: "POST",
        dataType: "json",
        async: false,
        cache: false,
        url: url,
        data: { Rut: identificacion, contraseña: pass, tipoUsuario: tipo, idPais: valorPais, gcaptcha: gcaptcha },
        success: function (data) {
            if (!data.ErrorLogin) {
                if (!data.tieneOrganizaciones)
                    window.location.href = "../../../../Portal/Modules/Menu/Menu.aspx"
                else
                    ObtenerOrganizaciones(identificacion, pass, data.sessionID, "login");
            }
            else {
                if (data.MensajeLogin == 'actualizarclave') {
                    ActualizarClave(identificacion, pass, '0');
                }
                else if (data.MensajeLogin == 'actualizarclavepororg') {
                    ObtenerOrganizaciones(identificacion, pass, data.sessionID, "actualizaClave");
                }
                else {
                    $(":password").after("<span class='invalid-form'>" + data.MensajeLogin + "</span>");
                    $(".alerta").show();
                    switch (data.MensajeLogin) {

                        case "Usuario inactivo":
                            $(".alerta").html("Comuníquese con el administrador ChileCompra de su organismo o empresa para solicitar la activación");
                            break;
                        case "Usuario bloqueado":
                            $(".alerta").html('Tu cuenta se ha bloqueado por uno de los siguientes motivos: 1. Superaste la cantidad de intentos permitidos, en tal caso tu cuenta estará bloqueada por 15 minutos. 2. Si eres comprador, tu estado de acreditación puede no estar vigente.');
                            break;
                        case "Contraseña no válida":
                            $(".alerta").html('Por seguridad, tu acceso se bloqueará al quinto intento de contraseña no válida.');
                            break;
                        case "Este es el primer acceso a la plataforma":
                        case "La contraseña ha expirado":
                            $(".alerta").html('Debe actualizar su contraseña ingresando por el acceso usuario ubicado en la parte superior derecha');
                            break;
                        default:
                            $(".alerta").html("Puedes comunicarte con la Mesa de Ayuda al:<strong>600 7000 600</strong> ó <strong>02 23536310</strong>");

                    }
                }
            }
        },
        error: function (xhr, status, error) {
            var err = eval("(" + xhr.responseText + ")");
            alert(err.Message);
        }
    });
}

function LevantarActualizarRut() {
    var esRut, identificacion;
    if ($("#liExtranjero").hasClass("active")) {
        identificacion = $("#txtDNI").val();
        esRut = false;
    }
    else {
        identificacion = $("#txtRUT").val();
        esRut = true;
    }

    $.ajax({
        type: "POST",
        dataType: "html",
        async: false,
        cache: false,
        url: "/Home/Autenticacion/CampanaRutUsuario",
        data: { identificador: identificacion, esrut: esRut },
        success: function (data) {
            $("#Actualizar").html(data);
            $('#myModalRut').modal('show');
        },
        error: function (xhr, status, error) {
            var err = eval("(" + xhr.responseText + ")");
            alert(err.Message);
        }
    });
}

function ActualizarClave(p_identificacion, p_contrasena, p_codUsuario) {
    $.ajax({
        type: "POST",
        dataType: "html",
        async: false,
        cache: false,
        url: "/Home/Autenticacion/ActualizarClave",
        data: { rut: p_identificacion, contrasenaAntigua: p_contrasena, codigoUsuario: p_codUsuario },
        success: function (data) {
            $("#Actualizar").html(data);
            $('#myModal2').modal('show');
        },
        error: function (xhr, status, error) {
            var err = eval("(" + xhr.responseText + ")");
            alert(err.Message);
        }
    });
}

function ObtenerOrganizaciones(p_identificacion, p_contrasena, p_session, p_tipo) {

    $.ajax({
        type: "POST",
        dataType: "html",
        async: false,
        cache: false,
        url: "/Home/Autenticacion/ObtenerOrganizaciones",
        data: { rut: p_identificacion, pass: p_contrasena, session: p_session, tipo: p_tipo },
        success: function (data) {
            $("#OrganizacionesUsuario").html(data);
            $('#myModal').modal('show');
        },
        error: function (xhr, status, error) {
            var err = eval("(" + xhr.responseText + ")");
            alert(err.Message);
        }
    });
}

function SeleccionarPorOrganizacion(p_tipo) {
    var marcaEmp = false;
    var codigoEmp = 0;
    var session = $("#hdSession").val();
    var codUsuario = '0';
    $(".rdbOrganismo").each(function (index) {
        if ($(this).is(':checked')) {
            marcaEmp = true;
            codigoEmp = $(this).val();

            if (p_tipo == "actualizaClave")
                codUsuario = $(this).attr("data");
        }
    });

    if (!marcaEmp) {
        alert("Debe checkear al menos un organismo");
        return false;
    }

    if (p_tipo == 'login') {
        var url = "/Home/Autenticacion/LoginPorOrganizacion";
        var data = JSON.stringify({ CodigoEmpresa: codigoEmp, sessionId: session });
        $.ajax({
            type: "POST",
            data: data,
            url: url,
            contentType: "application/json; charset=utf-8",
            async: false,
            success: function (result) {
                window.location.href = "../../../../Portal/Modules/Menu/Menu.aspx"
            },
            error: function (xhr, status, error) {
                alert('Ha ocurrido un error. Favor intente nuevamente.');
                respuesta = false;
            }
        });
    }
    else {
        var pass, identificacion;
        if ($("#liExtranjero").hasClass("active")) {
            identificacion = $("#txtDNI").val();
            pass = $("#txtPassDNI").val();
        }
        else {
            identificacion = $("#txtRUT").val();
            pass = $("#txtPass").val();
        }
        $('#myModal').modal('hide');
        ActualizarClave(identificacion, pass, codUsuario);
    }


}

function cargarPaises() {
    var url = "/Home/RecuperacionContrasena/ObtenerPaises";
    $.ajax({
        type: "GET",
        dataType: "json",
        async: false,
        cache: false,
        url: url,
        data: "",
        success: function (data) {
            data = JSON.stringify(data);
            data = jQuery.parseJSON(data);
            $("#ddlPaises").append('<option value="0"> Selecciona una Opción</option>');
            $.each(data, function (key, value) {
                $("#ddlPaises").append('<option value="' + value.idPais + '"> ' + value.nombrePais + '</option>');
            });

        },
        error: function (xhr, status, error) {
            var err = eval("(" + xhr.responseText + ")");
            alert(err.Message);
        }
    });
}

