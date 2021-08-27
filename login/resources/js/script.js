//////////////////////////////////////////////////////////////////////////////////////////////////
// validador de ruts /////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////
(function($){jQuery.fn.Rut=function(options){var defaults={digito_verificador:null,on_error:function(){},on_success:function(){},validation:true,format:true,format_on:'change'};var opts=$.extend(defaults,options);return this.each(function(){if(defaults.format){jQuery(this).bind(defaults.format_on,function(){jQuery(this).val(jQuery.Rut.formatear(jQuery(this).val(),defaults.digito_verificador==null));});}if(defaults.validation){if(defaults.digito_verificador==null){jQuery(this).bind('blur',function(){var rut=jQuery(this).val();if(jQuery(this).val()!=""&&!jQuery.Rut.validar(rut)){defaults.on_error();}else if(jQuery(this).val()!=""){defaults.on_success();}});}else
{var id=jQuery(this).attr("id");jQuery(defaults.digito_verificador).bind('blur',function(){var rut=jQuery("#"+id).val()+"-"+jQuery(this).val();if(jQuery(this).val()!=""&&!jQuery.Rut.validar(rut)){defaults.on_error();}else if(jQuery(this).val()!=""){defaults.on_success();}});}}});}})(jQuery);jQuery.Rut={formatear:function(Rut,digitoVerificador){var sRut=new String(Rut);var sRutFormateado='';sRut=jQuery.Rut.quitarFormato(sRut);if(digitoVerificador){var sDV=sRut.charAt(sRut.length-1);sRut=sRut.substring(0,sRut.length-1);}while(sRut.length>3){sRutFormateado="."+sRut.substr(sRut.length-3)+sRutFormateado;sRut=sRut.substring(0,sRut.length-3);}sRutFormateado=sRut+sRutFormateado;if(sRutFormateado!=""&&digitoVerificador){sRutFormateado+="-"+sDV;}else if(digitoVerificador){sRutFormateado+=sDV;}return sRutFormateado;},quitarFormato:function(rut){var strRut=new String(rut);while(strRut.indexOf(".")!=-1){strRut=strRut.replace(".","");}while(strRut.indexOf("-")!=-1){strRut=strRut.replace("-","");}return strRut;},digitoValido:function(dv){if(dv!='0'&&dv!='1'&&dv!='2'&&dv!='3'&&dv!='4'&&dv!='5'&&dv!='6'&&dv!='7'&&dv!='8'&&dv!='9'&&dv!='k'&&dv!='K'){return false;}return true;},digitoCorrecto:function(crut){largo=crut.length;if(largo<2){return false;}if(largo>2){rut=crut.substring(0,largo-1);}else
{rut=crut.charAt(0);}dv=crut.charAt(largo-1);jQuery.Rut.digitoValido(dv);if(rut==null||dv==null){return 0;}dvr=jQuery.Rut.getDigito(rut);if(dvr!=dv.toLowerCase()){return false;}return true;},getDigito:function(rut){var dvr='0';suma=0;mul=2;for(i=rut.length-1;i>=0;i--){suma=suma+rut.charAt(i)*mul;if(mul==7){mul=2;}else
{mul++;}}res=suma%11;if(res==1){return'k';}else if(res==0){return'0';}else
{return 11-res;}},validar:function(texto){texto=jQuery.Rut.quitarFormato(texto);largo=texto.length;if(largo<2){return false;}for(i=0;i<largo;i++){if(!jQuery.Rut.digitoValido(texto.charAt(i))){return false;}}var invertido="";for(i=(largo-1),j=0;i>=0;i--,j++){invertido=invertido+texto.charAt(i);}var dtexto="";dtexto=dtexto+invertido.charAt(0);dtexto=dtexto+'-';cnt=0;for(i=1,j=2;i<largo;i++,j++){if(cnt==3){dtexto=dtexto+'.';j++;dtexto=dtexto+invertido.charAt(i);cnt=1;}else
{dtexto=dtexto+invertido.charAt(i);cnt++;}}invertido="";for(i=(dtexto.length-1),j=0;i>=0;i--,j++){invertido=invertido+dtexto.charAt(i);}if(jQuery.Rut.digitoCorrecto(texto)){return true;}return false;}};


// console.log polyfill
window.log=function(){log.history=log.history||[];log.history.push(arguments);if(this.console){console.log(Array.prototype.slice.call(arguments))}};

(function (window, document, $, undefined) {
    "use strict"; //Modo estricto para prevenir errores y malas prácticas

    //Boolean que permite saber si existe el método "classList" en el navegador
    var classListEnabled = typeof(document.createElement('div').classList) === 'undefined' ? false : true;
    
    //Se almacena window y document en variables al comienzo para no utilizar memoria después
    var $window = $(window),
        $document = $(document);
    
    //Detecta la versión de Internet Explorer según su User Agent y retorna su versión
    function getInternetExplorerVersion() {
        var rv = -1; // Return value assumes failure.
        if (navigator.appName == 'Microsoft Internet Explorer') {
            var ua = navigator.userAgent;
            var re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
            if (re.exec(ua) != null)
                rv = parseFloat(RegExp.$1);
        }
        return rv;
    }

    // detecta IE10+ a través de la deteccion de los eventos pointers y coloca una clase "mspointers" en el HTML a través de Modernizr
    Modernizr.addTest('mspointers', function () { return window.navigator.msPointerEnabled; });
    // detecta IE9- a través del parseo del useragent y coloca una clase con la versión de IE en el HTML a través de Modernizr
    Modernizr.addTest('oldie', function () {
        var v = getInternetExplorerVersion();
        return v <= 9 && v > -1 ;
    });
    Modernizr.addTest('oldie-8', function () {
        var v = getInternetExplorerVersion();
        return v <= 8 && v > -1 ;
    });
    
    /////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////// PLUGINS

    //Igual la altura de las cajas
    $.fn.equalizeHeights = function () {
        var $items = $(this),
            heightArray = [];
        if( !$items.length ){ return; }
        $items.height('auto');
        $items.each(function(index, elem){ heightArray.push( $(elem).height() ); });
        $items.height( Math.max.apply( Math, heightArray ) ); 
        return this;
    };


    /////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////// HANDLERS

    window.handler = function(){
       
    };


    //Se almacenan las funciones dentro del prototipo del objeto por convención, recomendación y performance por sobre todo
    window.handler.prototype = {

        /////////////////////////////////////////////////////////////////////////////////////////////
        /////////////////////////////////////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////////////////////// INICIALIZADORAS

        //Funciones que se inicializan en el document.ready
        onReadySetup : function() {

            var options = [];


            $( '.dropdown-menu a' ).on( 'click', function( event ) {

                var $target = $( event.currentTarget ),
                val = $target.attr( 'data-value' ),
                $inp = $target.find( 'input' ),
                idx;

                if ( ( idx = options.indexOf( val ) ) > -1 ) {
                    options.splice( idx, 1 );
                    setTimeout( function() { $inp.prop( 'checked', false ) }, 0);
                } else {
                    options.push( val );
                    setTimeout( function() { $inp.prop( 'checked', true ) }, 0);
                }

                $( event.target ).blur();

                console.log( options );
                return false;
            });
         

            

        $('.destacados-home').equalizeHeights();
        $('.destacados-home h2').equalizeHeights();
        $('.licitaciones .col-6').equalizeHeights();
        

    



       
        $(".button-toggle").click(function () {
                $('.menu-main').toggleClass('open');
            });

         $(".toggle-search").click(function () {
                $(this).toggleClass('open');
                $('.categorias').toggleClass('open-cat');
            });
         $(".close-filt").click(function () {
            $(this).parent().hide();
         });

        $(".filter-wrap h4").click(function () {
        
        $(this).parent().toggleClass('open');

        });

		$('.equal-height').equalizeHeights();


       $(".info-desplegable .desplegable-head").click(function () {
            $(this).parent().siblings().removeClass('open');
            console.log($(this).parent().siblings().find('.fifth'));
            $(this).parent().toggleClass('open');
        });


        $(".adv-toggle-btn").click(function () {
                $(".campos-wrap").toggleClass('open');
               
            });

        $(".close-wrap").click(function () {
                $(".campos-wrap").removeClass('open');
                
        });

        

        


      
        


        


        },
        //Funciones que se inicializan en el window.load
        onLoadSetup : function(){
               

          
            
        },
        //Funciones que se inicializan en el evento scroll
       //Funciones que se inicializan en el evento scroll
        onScrollSetup : function(){

           
            
            },
        //Funciones que se inicializan en el evento resize
        onResizeSetup : function(){
              $('.destacados-home').equalizeHeights();
              $('.destacados h2').equalizeHeights();
              $('.licitaciones .col-6').equalizeHeights();
            
        },
        //Setea delegaciones automáticas a través del HTML
        eventsHandler : function( $elements ){
            if( ! $elements.length ){ return; }
            var self = this;
            $.each( $elements, function( index, elem ){
                var $item = $(elem),
                    func = $item.data('func'),
                    events = $item.data('event') ? $item.data('event') : 'click.handler';
                if( func && typeof( self[func] ) === 'function' ){
                    $item.on( events, $.proxy( self[ func ], self ) );
                    $item.data('delegated', true);
                } 
            });
    	},
        //Fallback para imágenes SVG
        svgFallback : function( $elements ){
            if( ! $elements.length ){ return; }
            var $item;

            $elements.each(function(index, elem){
                $item = $(elem);
                $item.attr('src', $item.data('svgfallback'));
            });
        },
        //Formatea strings según parámetros
        currency : function(value, decimals, separators) {
            decimals = decimals >= 0 ? parseInt(decimals, 0) : 2;
            separators = separators || ['.', "'", ','];
            var number = (parseFloat(value) || 0).toFixed(decimals);
            if (number.length <= (4 + decimals))
                return number.replace('.', separators[separators.length - 1]);
            var parts = number.split(/[-.]/);
            value = parts[parts.length > 1 ? parts.length - 2 : 0];
            var result = value.substr(value.length - 3, 3) + (parts.length > 1 ?
                separators[separators.length - 1] + parts[parts.length - 1] : '');
            var start = value.length - 6;
            var idx = 0;
            while (start > -3) {
                result = (start > 0 ? value.substr(start, 3) : value.substr(0, 3 + start))
                    + separators[idx] + result;
                idx = (++idx) % 2;
                start -= 3;
            }
            return (parts.length == 3 ? '-' : '') + result;
        },
        loadScripts : function(){
            var self = this;
           
        },
        validateForms : function(event){
            event.preventDefault();
            var checkRepeaterCharacters = function(str){
                for(var i = 0; i < str.length; i++){
                    var re = new RegExp("[^"+ str[i] +"]","g");
                    if(str.replace(re, "").length >= 4){
                        return true;
                    }
                }
                return false;
            }

            var checkConsecutiveNumbers = function(str, limit){
                var count = 0;
                for(var i = 0; i < str.length; i++){
                    if(parseInt(str[i], 10) == str[i + 1] - 1 ){
                        count++;
                    }else{
                        count = 0;
                    }
                    if(count == parseInt(limit, 10)){
                        return true;
                    }
                }
                return false;
            }

            var $form = event.type == 'submit' ? $(event.currentTarget) : $(event.currentTarget).parents('form');
            var $inputs = event.type == 'submit' ? $form.find('[required]') : $(event.currentTarget);
            var isValid = true;
            var emailRegEx = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            var numerosRegEx = /^\d+(?:\.\d{1,2})?$/;
            var setToFalse = function($input){
                isValid = false;
                $input.addClass('invalid-input');
            }

            $inputs.removeClass('invalid-input');

            $.each($inputs, function(index, element){
                var $element = $(element);
                var tagName = $(element).prop('tagName').toLowerCase();

                if(!$element.is(':visible')){
                    return true;
                }


                if(tagName == 'select' && $element.find('option:selected').val() == ""){
                    setToFalse($element);
                }
                if($element.attr('type') == 'checkbox' && $element.prop('checked') == false){
                    setToFalse($element);
                }
                if(tagName == 'input' && $element.val() == "" && event.type == 'submit'){
                    setToFalse($element);
                }
                if(tagName == 'input' && $element.attr('type') == 'email' && emailRegEx.test($element.val()) == false){
                    setToFalse($element);
                }
                if(tagName == 'input' && $element.hasClass('rut-input') && $.Rut.validar($element.val()) == false){
                    setToFalse($element);
                }
                if(tagName == 'input' && $element.hasClass('number-validation') && $element.val() != "" && numerosRegEx.test($element.val()) == false){
                    setToFalse($element);
                }
                if(tagName == 'input' && $element.hasClass('same-validation') && $element.val() != "" && ($element.val() != $('[name="nueva-clave"]').val())){
                    setToFalse($element);
                }
                
                if(tagName == 'input' && $element.hasClass('passwd2-validation') && $element.attr('type') == 'password' && $element.val() != "" && ($element.val() != $('.passwd1-validation').val())){
                    setToFalse($element);
                }

                if(tagName == 'input' && $element.hasClass('number-card-validation') && $element.val() != "" && (numerosRegEx.test($element.val()) == false || $element.val().length!=6)){
                    setToFalse($element);
                }

            });

            var $inputsPart = event.type == 'submit' ? $form.find('[data-add]') : $(event.currentTarget);
            $.each($inputsPart, function(index, element){
                var $element = $(element);
                var tagName = $(element).prop('tagName').toLowerCase();

                if(tagName == 'input' && $element.hasClass('number-validation') && $element.val() != "" && numerosRegEx.test($element.val()) == false){
                    setToFalse($element);
                }

            });

            
            if(isValid && event.type == 'submit'){
                $form.off('submit');
                $form.submit();
            }
        },
        /////////////////////////////////////////////////////////////////////////////////////////////
        /////////////////////////////////////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////////////////////// DELEGACIONES
    
    };

    
    /////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////// COMIENZO
    
    
    var Main = new window.handler(); //Se genera un nuevo objeto para almacenar las funciones
    $document.ready(function(){Main.onReadySetup();}); //Se inicializan las funcionalidades en el document.ready
    $window.on('load', function(){ Main.onLoadSetup(); }); //Se inicializan las funcionalidades en el window.ready

    //Se inicializan las funcionalidades los eventos scroll y resize
    $window.on({
        'scroll' : function(){Main.onScrollSetup()},
        'resize' : function(){Main.onResizeSetup()}
    });
    
    
        
} (this, document, jQuery));





