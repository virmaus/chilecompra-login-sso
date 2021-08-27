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
          $('.slider').bxSlider({
                pager:false
            });

            $('#tabs').easyResponsiveTabs({
              type: 'default', //Types: default, vertical, accordion
              width: 'auto', //auto or any width like 600px
              fit: true, // 100% fit in a container
              tabidentify: 'tabs', // The tab groups identifier
              activate: function(event) { // Callback function if tab is switched
              }
            });

        $('.info-bloq-head').equalizeHeights();
        $('.cont-bloq-wrap').equalizeHeights();

         $( 'a[data-target="#modalprecio"]' ).on( 'click', function( event ) {

            setTimeout(function(){
                 $('.equal').equalizeHeights();
                

            }, 100);
        });



        $('.banner-wrap').css('margin-top', - $('.banner-wrap').height()/2);
        $('.banner-principal').css('height', $('.banner-principal img').height());


        $('a[href="#tab2primary"]').one('shown.bs.tab', function (e) {
            $('.slider-2').bxSlider(
                {
                pager:false
            }
                );
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

        $(".info-desplegable h4").click(function () {
            $(this).parent().siblings().removeClass('open');
            console.log($(this).parent().siblings().find('.fifth'));
            $(this).parent().toggleClass('open');
        });

        $('.vista1').click(function(event){
            event.preventDefault();
            $('.prev1').fadeIn();
            $('.prev2').hide();
            $('.prev3').hide();
            $('.prev4').hide();
            
        });
        
        $('.vista2').click(function(event){
             event.preventDefault();

            $('.prev2').fadeIn();
            $('.prev1').hide();
            $('.prev3').hide();
            $('.prev4').hide();
            
        });
        
        $('.vista3').click(function(event){
             event.preventDefault();

            $('.prev3').fadeIn();
            $('.prev1').hide();
            $('.prev2').hide();
            $('.prev4').hide();
            
        });
        
        $('.vista4').click(function(event){
             event.preventDefault();

            $('.prev4').fadeIn();
            $('.prev1').hide();
            $('.prev2').hide();
            $('.prev3').hide();
            
        });

        $('.pasos').css('margin-bottom', $('.step-tooltip').height()* 5);


      
        


        


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
             $('.banner-wrap').css('margin-top', - $('.banner-wrap').height()/2);
             $('.banner-principal').css('height', $('.banner-principal img').height());
             $('.pasos').css('margin-bottom', $('.step-tooltip').height()* 5);
             $('.info-bloq-head').equalizeHeights();
             $('.cont-bloq-wrap').equalizeHeights();
            
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

//(function ($, window, document, undefined) {
//    $.widget("mobile.mmp", $.mobile.widget, {
//        options:{
//            text:'Multiple Month Picker',
//            theme:'a',
//            id:'mmp',
//            months: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sept', 'Oct', 'Nov', 'Dic'],
//            value: []
//        },
//        value: function (value) {
//            if ( value === undefined ) {
//                return this.options.value;
//            }
//     
//            this.options.value = value;
//            this._values = ',' + value.join(',') + ',';
//            this._check();
//        },
//        _currentYear: (new Date()).getFullYear(),
//        _values : ',',
//        _check: function() {
//            var that = this;
//            this.element.find('input').each(function() {
//                if(that._values.indexOf(',' + $(this).val() + ',') >= 0) {
//                    $(this).prop('checked', true).checkboxradio('refresh');
//                } else {
//                    $(this).prop('checked', false).checkboxradio('refresh');
//                }
//            });
//        },
//        _create:function () {
//            this.element.css('text-align', 'center');
//            
//            this.element.append('<div id="mmp-header" class="cal-header" data-role="controlgroup" data-type="horizontal"></div>');
//            this.element.children('div').append('<button id="btnPreviousYear" data-iconpos="notext" data-icon="arrow-l">Previous year</button>');
//            this.element.children('div').append('<span id="yearLabel">' + this._currentYear + '</span>');
//            this.element.children('div').append('<button id="btnNextYear" data-iconpos="notext" data-icon="arrow-r">Next year</button>');
//            
//            for(var i=0; i<4; i++) {
//                this.element.append('<fieldset id="mmp-months-row-' + i + '" data-role="controlgroup" data-type="horizontal" class="rowCal"></fieldset>');
//                for(var j=0; j<3; j++) {
//                    var month = this._currentYear + '-' + this._zeros(1 + j + 3*i, 2);
//                    this.element.find('#mmp-months-row-' + i).append('<input type="checkbox" name="' + month + '" id="' + month + '" value="' + month + '" data-wrapper-class="mmp-month" />');
//                    this.element.find('#mmp-months-row-' + i).append('<label for="' + month + '" style="width: text-align: center;">' + this.options.months[j + 3*i] + '</label>');
//                }
//            }
//            
//           
//            
//            $('body').trigger('create');
//            
//            var that = this;
//            
//            this.element.find('#btnPreviousYear').click(function() {
//                that._currentYear--;
//                that.element.html('');
//                that._create();
//            });
//            
//            this.element.find('#btnNextYear').click(function() {
//                that._currentYear++;
//                that.element.html('');
//                that._create();
//            });
//            
//            this.element.children('fieldset').find('label');
//            this.element.children('fieldset').find('input').click(function() {
//                var value = $(this).val();
//                if($(this).is(':checked')) {
//                    if(that._values.indexOf(',' + value + ',') < 0) {
//                        that._values += value + ',';
//                    }
//                } else {
//                    if(that._values.indexOf(',' + value + ',') >= 0) {
//                        that._values = that._values.replace(',' + value + ',', ',');
//                    }
//                }
//                if(that._values == ',') {
//                    that.options.value = [];
//                } else {
//                    that.options.value = that._values.substring(1, that._values.length - 1).split(',');
//                    that.options.value.sort();
//                }
//            });
//            
//            this._check();
//        },
//        _zeros: function(text, size) {
//            var temp = text + '';
//            while(temp.length < size) {
//                temp = '0' + temp;
//            }
//            return temp;
//        }
//    });
//})(jQuery, window, document);


$(document).ready(function() {
//        $('#mmp').mmp();
//        $('#mmp2').mmp();

//        $('#ok').click(function () {
//            alert($('#mmp').mmp('value'));
//        });

//        $('#load').click(function () {
//            $('#mmp').mmp('value', ['2014-01', '2014-05', '2014-08']);
//        });
    });




(function($) {

          // Browser supports HTML5 multiple file?
          var multipleSupport = typeof $('<input/>')[0].multiple !== 'undefined',
              isIE = /msie/i.test( navigator.userAgent );

          $.fn.customFile = function() {

            return this.each(function() {

              var $file = $(this).addClass('custom-file-upload-hidden'), // the original file input
                  $wrap = $('<div class="file-upload-wrapper">'),
                  $input = $('<input type="text" class="file-upload-input" />'),
                  // Button that will be used in non-IE browsers
                  $button = $('<button type="button" class="file-upload-button btn btn-sec right">Adjuntar Archivo</button>'),
                  // Hack for IE
                  $label = $('<label class="file-upload-button" for="'+ $file[0].id +'">Select a File</label>');

              // Hide by shifting to the left so we
              // can still trigger events
              $file.css({
                position: 'absolute',
                left: '-9999px'
              });

              $wrap.insertAfter( $file )
                .append( $file, $input, ( isIE ? $label : $button ) );

              // Prevent focus
              $file.attr('tabIndex', -1);
              $button.attr('tabIndex', -1);

              $button.click(function () {
                $file.focus().click(); // Open dialog

              });

              $input.click(function () {
                $file.focus().click(); // Open dialog
                
              });

              $file.change(function() {

                var files = [], fileArr, filename;

                // If multiple is supported then extract
                // all filenames from the file array
                if ( multipleSupport ) {
                  fileArr = $file[0].files;
                  for ( var i = 0, len = fileArr.length; i < len; i++ ) {
                    files.push( fileArr[i].name );
                  }
                  filename = files.join(', ');

                // If not supported then just take the value
                // and remove the path to just show the filename
                } else {
                  filename = $file.val().split('\\').pop();
                }

                $input.val( filename ) // Set the value
                  .attr('title', filename) // Show filename in title tootlip
                  .focus(); // Regain focus

              });

              $input.on({
                blur: function() { $file.trigger('blur'); },
                keydown: function( e ) {
                  if ( e.which === 13 ) { // Enter
                    if ( !isIE ) { $file.trigger('click'); }
                  } else if ( e.which === 8 || e.which === 46 ) { // Backspace & Del
                    // On some browsers the value is read-only
                    // with this trick we remove the old input and add
                    // a clean clone with all the original events attached
                    $file.replaceWith( $file = $file.clone( true ) );
                    $file.trigger('change');
                    $input.val('');
                  } else if ( e.which === 9 ){ // TAB
                    return;
                  } else { // All other keys
                    return false;
                  }
                }
              });

            });

          };

          // Old browser fallback
          if ( !multipleSupport ) {
            $( document ).on('change', 'input.customfile', function() {

              var $this = $(this),
                  // Create a unique ID so we
                  // can attach the label to the input
                  uniqId = 'customfile_'+ (new Date()).getTime(),
                  $wrap = $this.parent(),

                  // Filter empty input
                  $inputs = $wrap.siblings().find('.file-upload-input')
                    .filter(function(){ return !this.value }),

                  $file = $('<input type="file" id="'+ uniqId +'" name="'+ $this.attr('name') +'"/>');

              // 1ms timeout so it runs after all other events
              // that modify the value have triggered
              setTimeout(function() {
                // Add a new input
                if ( $this.val() ) {
                  // Check for empty fields to prevent
                  // creating new inputs when changing files
                  if ( !$inputs.length ) {
                    $wrap.after( $file );
                    $file.customFile();
                  }
                // Remove and reorganize inputs
                } else {
                  $inputs.parent().remove();
                  // Move the input so it's always last on the list
                  $wrap.appendTo( $wrap.parent() );
                  $wrap.find('input').focus();
                }
              }, 1);

            });
          }

}(jQuery));

$(document).ready(function() {

$('input[type=file]').customFile();

});