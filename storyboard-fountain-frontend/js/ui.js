;(function() {
  'use strict';

  var resizeView = function() {
    var toolbarHeight = 50;
    var timelineHeight = 0;
    var boardslistWidth = 400;
    var captionHeight = 50;
    var canvasSidePadding = 40;

    var windowWidth = $(window).width();
    var windowHeight = $(window).height();

    var canvasDim = [windowWidth-boardslistWidth, windowHeight-toolbarHeight-timelineHeight];

    $(".drawing-canvas").css('width', canvasDim[0]);
    $(".drawing-canvas").css('height', canvasDim[1]);

    $(".drawing-canvas .caption").css('height', captionHeight);

    $(".boards-list").css('height', canvasDim[1]);

    if (((canvasDim[0]-(canvasSidePadding*2))/(canvasDim[1]-(canvasSidePadding*2)-captionHeight)) >= (2.35/1)) {
      var canvasHeight = (canvasDim[1]-(canvasSidePadding*2)-captionHeight);
      var canvasWidth = (canvasDim[1]-(canvasSidePadding*2)-captionHeight) * (2.35/1);
      $(".drawing-canvas .canvas, .drawing-canvas img").css('width', canvasWidth);
      $(".drawing-canvas .canvas, .drawing-canvas img").css('height', canvasHeight);

      $(".drawing-canvas .canvas, .drawing-canvas img").css('top', ((canvasDim[1] - canvasHeight)/2)-captionHeight+toolbarHeight);
      $(".drawing-canvas .canvas, .drawing-canvas img").css('left', ((canvasDim[0] - canvasWidth)/2));

      $(".drawing-canvas .caption").css('left', ((canvasDim[0] - canvasWidth)/2));
      $(".drawing-canvas .caption").css('top', ((canvasDim[1] - canvasHeight)/2)-captionHeight+toolbarHeight+canvasHeight);
      $(".drawing-canvas .caption").css('width', canvasWidth);
    } else {
      var canvasHeight = (windowWidth-boardslistWidth-(canvasSidePadding*2))*(1/2.35);
      var canvasWidth = windowWidth-boardslistWidth-(canvasSidePadding*2);

      $(".drawing-canvas .canvas, .drawing-canvas img").css('width', canvasWidth);
      $(".drawing-canvas .canvas, .drawing-canvas img").css('height', canvasHeight);

      $(".drawing-canvas .canvas, .drawing-canvas img").css('top', ((canvasDim[1] - canvasHeight)/2)-captionHeight+toolbarHeight);
      $(".drawing-canvas .canvas, .drawing-canvas img").css('left', ((canvasDim[0] - canvasWidth)/2));

      $(".drawing-canvas .caption").css('left', ((canvasDim[0] - canvasWidth)/2));
      $(".drawing-canvas .caption").css('top', ((canvasDim[1] - canvasHeight)/2)-captionHeight+toolbarHeight+canvasHeight);
      $(".drawing-canvas .caption").css('width', canvasWidth);
    }
  }

  resizeView();


  $('.tab').click(function(){
    $(this).parent().children().removeClass('selected');
    $(this).addClass('selected');
  })

  $('#tab-script').click(function(){
    $('#script').show();
    $('#boards').hide();
  })

  $('#tab-boardlist').click(function(){
    $('#script').hide();
    $('#boards').show();
  })
 

  $(window).resize(resizeView);

  var confirmExit = function() {
    if (storyboardState.getDirty()) {
      window.setTimeout(storyboardState.forceSave, 1000);
      return "Not finished saving yet. Are you sure?";
    }
  };

  window.onbeforeunload = confirmExit;

  $(window).keydown(function(e){
    console.log(e.keyCode);

    switch (e.keyCode) {
      // shade
      case 49:
        sketchpane.setLayer(0);
        sketchpane.setBrush({size: 20, opacity: 15});
        break;
      // pencil
      case 50:
        sketchpane.setLayer(1);
        sketchpane.setBrush({size: 1, opacity: 0});
        break;
      // pen
      case 51:
        sketchpane.setLayer(2);
        sketchpane.setBrush({size: 4, opacity: 60});
        break;
      case 103:
        sketchpane.setColor([0,0,0]);
        break;
      case 104: 
        sketchpane.setColor([200,200,200]);
        break;
      case 105: 
        sketchpane.setColor([255,255,255]);
        break;
      case 100: 
        sketchpane.setColor([255,0,0]);
        break;
      case 101: 
        sketchpane.setColor([0,255,0]);
        break;
      case 102: 
        sketchpane.setColor([0,0,255]);
        break;
      case 90:
        sketchpane.undo();
        break;
      case 88:
        sketchpane.redo();
        break;
      // n
      case 78:
        fountainManager.newBoard();
        break;
      // up and back
      case 37:
      case 38:
        e.preventDefault();
        fountainManager.goNext(-1);
        break;
      // next and forward
      case 39:
      case 40:
        e.preventDefault();
        fountainManager.goNext(1);
        break;
      case 67:
        sketchpane.copy();
        break;
      case 86:
        sketchpane.paste();
        break;
      case 76:
        sketchpane.toggleLightboxMode();
        break;
      case 46:
        fountainManager.deleteBoard();
        break;

     }
  });

}).call(this);