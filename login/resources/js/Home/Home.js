$(document).ready(function () {
    $(window).on('load', function () { // makes sure the whole site is loaded
        $('#status').fadeOut(); // will first fade out the loading animation
        $('#preloader').delay(1).fadeOut(1); // will fade out the white DIV that covers the website.
       $('body').delay(1).css({ 'overflow': 'visible' });
    });

    $(function () {
        $('#popModal_ex2').click(function () {
            $('#popModal_ex2').popModal({
                html: $('#content2'),
                placement: 'bottomLeft',
                showCloseBut: true,
                onDocumentClickClose: true,
                inline: true,
                overflowContent: false,
                onOkBut: function () { },
                onCancelBut: function () { },
                onLoad: function () { $("#login_home").attr('src', '/Portal/LoginHome.aspx'); },
                onClose: function () { }
            });

        });
    });

    $(function () {

        // Create the dropdown base
        $("<select />").appendTo(".menu-mobile");

        // Create default option "Go to..."
        $("<option />", {
            "selected": "selected",
            "value": "",
            "text": "Menú"
        }).appendTo(".menu-mobile select");

        // Populate dropdown with menu items
        $(".menu-side a").each(function () {
            var el = $(this);
            $("<option />", {
                "value": el.attr("href"),
                "text": el.text()
            }).appendTo(".menu-mobile select");
        });

        // To make dropdown actually work
        // To make more unobtrusive: http://css-tricks.com/4064-unobtrusive-page-changer/
        $(".menu-mobile select").change(function () {
            window.location = $(this).find("option:selected").val();
        });

    });


    $(window).bind("load resize slid.bs.carousel", function () {
        var imageHeight = $(".active .holder").height();
        $(".controllers").height(imageHeight);
    });

    //$("#encabezado").barra();


    /* Seidor - Juan Carlos Peña V. - 13-05-2015 */
    /* Desmarcar menu Inicio y marcar menú paraguas */
    var strUrl = window.location.pathname;
    var arrayUrl = strUrl.split('/');
    var cantArrayUrl = arrayUrl.length;
    var currentPage = arrayUrl[cantArrayUrl - 1];

    $('#idHome').addClass('paraguasSelected');
    $('#subMenInicio').addClass('current');
    if (currentPage == 'Reclamos') {
        $('#idReclamo').addClass('paraguasSelected');
        $('#idHome').removeClass('paraguasSelected');
    }
    if (currentPage != 'home' && currentPage != 'Home') {
        $('#subMenInicio').removeClass('current');
    }
    else {
        $('#subMenInicio').addClass('current');
    }
    /* Fin marcaciones menú */
});

function popUpPass(windowname, src) {
    $('#popModal_ex2').popModal("hide");
    $("#ifrmCambioContrasena").attr('src', src);

    popup(windowname);
   }

function toTop() {
	window.parent.$("body").animate({ scrollTop: 0 }, 'slow');
}