$(document).ready(function() {

  if(!$.browser){
    $.browser={
      chrome:false,
      mozilla:false,
      opera:false,
      msie:false,
      safari:false
    };
    var ua=navigator.userAgent;
        $.each($.browser,function(c,a){
        $.browser[c]=((new RegExp(c,'i').test(ua)))?true:false;
            if($.browser.mozilla && c =='mozilla'){$.browser.mozilla=((new RegExp('firefox','i').test(ua)))?true:false;};
            if($.browser.chrome && c =='safari'){$.browser.safari=false;};
        });
  };

  $('.video-player').append('<iframe src="//player.vimeo.com/video/115274012?title=0&amp;byline=0&amp;portrait=0" width="800" height="335" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>');
  var iframe = $("iframe").get(0);
  var player = $f(iframe);
  player.addEvent('ready', function(){ 
    if($.browser.mozilla){
      player.api('play');
    }
  });

  $('.boton-play').click(function(e){
    console.log('hhh');
    e.preventDefault();
    $('.ocultar').hide('slow');
    $('.video-basoa').fadeIn('slow');
    player.api('play');
    return false;
  });

  $('.cerrar').click(function(e){
    e.preventDefault();
    player.api('pause');
    $('.video-basoa').hide('slow');
    $('.ocultar').fadeIn('slow');
  })

  //Sistema de left dinamico para el slide de casas
  var left = '80%';
  if ($(this).width() >= 1280) {
    left = left;
  }
  else if ($(this).width() < 1280 && $(this).width()>= 980) {
    left = '70%';
  }

  //Sistema de Carrusel
  $('#belea-carrusel, #beigorri-carrusel, #okolin-carrusel, #bedats-carrusel, #recepcion-carrusel').carousel({interval:false});
  $('.controles a').click(function(e){
    var id = e.target.id;
    var arrayIdGeneral = id.split("-");
    var idIzquierda = '#'+arrayIdGeneral[0]+'-izquierda';
    $(idIzquierda).show();
  });

  //Sistema de onepage de portada con el modulo Fullpaje.js
  $('.home').fullpage({
    anchors: ['inicio', 'proponemos', 'ofrecemos', 'entorno', 'nosotros', 'compromisos', 'actividades'],
    resize: false,
    slidesColor: ['#C63D0F', '#1BBC9B', '#7E8F7C'],
    // css3: true ,
    slidesNavigation: true,
    afterLoad: function(anchorLink, index){
      $('.menu-home').removeClass('active');
      $('#'+anchorLink+'-menu').addClass('active');
    },
    afterSlideLoad: function( anchorLink, index, slideAnchor, slideIndex){
      if(anchorLink == '3rdPage'){
      }
    }   
  });

  //Sistema para el footer lateral
  //Ir a casas
  $('#boton-casas').click(function(e){
    $('.home-casas').transition({ left: 0 }, 800, 'ease');
    $('#boton-casas').transition({opacity:0}, 800, 'ease');
    $('#boton-reservar').transition({opacity:0}, 800, 'ease');
    $('#boton-regalar').transition({opacity:0}, 800, 'ease');
    $('#home').transition({opacity:0}, 2000, 'ease');
    setTimeout(function() {
      $('#boton-volver').transition({opacity:1}, 'ease');
      $('#boton-volver').removeClass('boton-opacity');
      $('#boton-casas').addClass('boton-opacity');
      $('#boton-regalar').addClass('boton-opacity');
      $('#boton-reservar').addClass('boton-opacity');
    }, 900);
  });

  //Volver a casas
  $('#boton-volver').click(function(e){
    $('#home').transition({opacity:1});
    $('.home-casas').transition({ left: left }, 800, 'ease');
    $('#boton-volver').transition({opacity:0}, 800, 'ease');
    setTimeout(function() {
      $('#boton-casas').transition({opacity:1}, 'ease');
      $('#boton-casas').removeClass('boton-opacity');
      $('#boton-reservar').transition({opacity:1}, 'ease');
      $('#boton-reservar').removeClass('boton-opacity');
      $('#boton-regalar').transition({opacity:1}, 'ease');
      $('#boton-regalar').removeClass('boton-opacity');
      $('#boton-volver').addClass('boton-opacity');
    }, 900);
  });

//Acceso a las casas mediante el menú
  $('.casas').click(function(e){
    e.preventDefault();
    $('.carrusel-off').each(function(index){
     $(this).transition({opacity:0, dalay:50});
     $(this).removeClass('active');
    });
    $('#'+e.target.id+'-carrusel-wrapper').transition({opacity:1, delay:50});
    $('#'+e.target.id+'-carrusel-wrapper').addClass('active');
  });


  $('.menu-casa').click(function(e){
    $('.menu-casa').removeClass('active-menu');
    $(this).addClass('active-menu');
  });

  $('.scroll-up').click(function(e){
    $.fn.fullpage.moveSectionUp();
  });

  $('.scroll-down').click(function(e){
    $.fn.fullpage.moveSectionDown();
  });

  $('.menu-home').click(function(e){
    $('.menu-home').removeClass('active');
    $(this).addClass('active');
  });
});

$(document).ready(function() {

  mandrill_client = new mandrill.Mandrill('jKVpYZGaJISrpyC23Uj4RQ');
  $( "#singlebutton" ).prop( "disabled", true );

  var allVals = [];
  function updateTextArea() {         
      console.log('select');
    $('#selec-suites :checked').each(function(e) {
      allVals.push($(this).val());
      console.log(allVals);
    });
  };  

  var tipo_regalo;
  $('#radios-tarjeta').click(function(){
    $('#bloque-direccion').show();
  });

  $('#radios-pdf').click(function(){
    $('#bloque-direccion').hide();
    $('#tarjeta-direccion').val('')
  });

  $('#pdf-email').focus(function(){
    $('#formulario-regalo').validator('validate');
    $( "#singlebutton" ).prop( "disabled", false );
  });


  $('#singlebutton').click(function(){
    var es_html ="<p>Esta es la inforamción del formulario rellenado para regalar una suite</p>";
    es_html += "<p> Estas son las suites selecionadas:  <p>";
    $('#selec-suites :checked').each(function(e) {
      es_html += "<p>"+ $(this).val() + "</p>";
    });
    es_html += "<p>¿Cuantas noches?</p>: " + $('#cuantasnoches').val() +"</p>";
    es_html += "<p>Estos son los extras añadidos: </p>";
    $('#extras :checked').each(function(e) {
      es_html += "<p>"+ $(this).val() + "</p>";
    });

    if($('#checkboxes-extras-4').is(':checked')){
      es_html += "<p>Otros extras: "+ $("#otrosextras").val() + "</p>";
    }

    if($('#radios-pdf').is(':checked')){
      tipo_regalo = '<p> El tipo de regalo es una <strong>tarjeta</strong> </p>'
    }else{
      tipo_regalo = '<p> El tipo de regalo es un <strong>pdf</strong> </p>'
    }
    es_html += tipo_regalo;
    es_html += "<p>Nombre : "+ $('#pdf-nombre').val() +"</p>";
    es_html += "<p>Correo : "+ $('#pdf-email').val() +"</p>";
    es_html += "<p>Dirección : "+ $('#tarjeta-direccion').val() +"</p>";

    console.log(es_html);


    // $("#formulario-regalo").hide();
    // $('#enviar-regalo').hide();
    // $("#alerta-regalo").show();

    var message = {
        "html": es_html,
        "subject": "Petición de regalo de suite",
        "from_email": "info@basoasuites.com",
        "from_name": "basoasuites.com",
        "to": [{
                "email": $('#pdf-email').val(),
                "name": "Recipient Name",
                "type": "to"
            }],
        "headers": {
            "Reply-To": "info@basoasuites.com"
        }
    };
    // mandrill_client.messages.send({"message": message}, function(result) {
    //     console.log(result);
    // }, function(e) {
    //     console.log('A mandrill error occurred: ' + e.name + ' - ' + e.message);
    // });

    var message = {
        "html": $('#confirmacion').val(),
        "subject": "Basoasuites.com",
        "from_email": "info@basoasuites.com",
        "from_name": "basoasuites.com",
        "to": [{
                "email": $('#pdf-email').val(),
                "name": "Recipient Name",
                "type": "to"
            }],
        "headers": {
            "Reply-To": "info@basoasuites.com"
        }
    };
    // mandrill_client.messages.send({"message": message}, function(result) {
    //     console.log(result);
    // }, function(e) {
    //     console.log('A mandrill error occurred: ' + e.name + ' - ' + e.message);
    // });
  });

});

