$(document).ready(function(){
    // Matter aliases
 var Engine = Matter.Engine,
        World = Matter.World,
        Bodies = Matter.Bodies,
        Body = Matter.Body,
        Composite = Matter.Composite,
        Composites = Matter.Composites,
        Common = Matter.Common,
        Constraint = Matter.Constraint,
        Events = Matter.Events,
        MouseConstraint = Matter.MouseConstraint,
        Mouse = Matter.Mouse;



    var _engine,
        _mouseConstraint,
        _sceneEvents = [],
        _useInspector = window.location.hash.indexOf('-inspect') !== -1,
        _isMobile = /(ipad|iphone|ipod|android)/gi.test(navigator.userAgent);
    
    // initialise the demo

    function init(){
        var container = document.getElementById('canvas-container');

        // some example engine options
        var options = {
            positionIterations: 0,
            velocityIterations: 0,
            enableSleeping: false
        };

        // create a Matter engine
        // NOTE: this is actually Matter.Engine.create(), see the aliases at top of this file
        _engine = Engine.create(container, options);

        // add a mouse controlled constraint
        _mouseConstraint = MouseConstraint.create(_engine);
        World.add(_engine.world, _mouseConstraint);

        // run the engine
        Engine.run(_engine);

        // default scene function name
        _sceneName = 'chains';
        
        // get the scene function name from hash
        if (window.location.hash.length !== 0) 
            _sceneName = window.location.hash.replace('#', '').replace('-inspect', '');
        // set up a scene with bodies
        //Demo[_sceneName]();
        casas();
    };

    // call init when the page has loaded fully

    // if (window.addEventListener) {
    //     window.addEventListener('load', Demo.init);
    // } else if (window.attachEvent) {
    //     window.attachEvent('load', Demo.init);
    // }

    init();

    function casas() {
      var _world = _engine.world,
      groupId = Body.nextGroupId();
      reset();
      // _world.bounds.max.x = 80;
      // _world.bounds.max.y = 80
      groupId = Body.nextGroupId( );        

      var texture = './1.png';
      var ropeB = Composites.stack(60, 0, 14, 1, 80, 80, function(x, y, column, row) {
        return Bodies.rectangle(100, 20, 10, 10, { groupId: groupId, render: { fillStyle: '#b4c9c1', strokeStyle: '#b4c9c1' } });
      });
      
      Composites.chain(ropeB, 0, 0, 0, 0, { stiffness: 0.4, length: 4});

      ropeB.bodies[13]['render']['sprite']['texture'] = texture; 

      Composite.add(ropeB, Constraint.create({ 
          bodyB: ropeB.bodies[0],
          pointB: { x: 0, y: 0 },
          pointA: { x: 85, y: 0 },
          stiffness: 0.2
        }));

      World.add(_world, ropeB);

      $('#boton-casas').click(function(e){
        ropeB.bodies[13].positionPrev.x -= 40;
        ropeB.bodies[13].positionPrev.y += 20;
      })
    };
    
    function reset() {
      var _world = _engine.world;

      World.clear(_world);
      Engine.clear(_engine);

      // clear scene graph (if defined in controller)
      var renderController = _engine.render.controller;
      if (renderController.clear)
          renderController.clear(_engine.render);

      // clear all scene events
      for (var i = 0; i < _sceneEvents.length; i++)
          Events.off(_engine, _sceneEvents[i]);

      if (_mouseConstraint.events) {
          for (i = 0; i < _sceneEvents.length; i++)
              Events.off(_mouseConstraint, _sceneEvents[i]);
      }

      _sceneEvents = [];

      // reset id pool
      Common._nextId = 0;

      // reset random seed
      Common._seed = 0;

      _engine.enableSleeping = true;
      _engine.world.gravity.y = 1;
      _engine.world.gravity.x = 0;
      _engine.timing.timeScale = 1;

      var offset = 5;
      World.add(_world, []);

      _mouseConstraint = MouseConstraint.create(_engine);
      World.add(_world, _mouseConstraint);
      
      var renderOptions = _engine.render.options;
      renderOptions.wireframes = false;
      renderOptions.hasBounds = false;
      renderOptions.showDebug = false;
      renderOptions.showBroadphase = false;
      renderOptions.showBounds = false;
      renderOptions.showVelocity = false;
      renderOptions.showCollisions = false;
      renderOptions.showAxes = false;
      renderOptions.showPositions = false;
      renderOptions.showAngleIndicator = false;
      renderOptions.showIds = false;
      renderOptions.showShadows = false;
      renderOptions.showSleeping = false;
      renderOptions.background = '#b4c9c1';
      // renderOptions.background = '#ffffff';

      if (_isMobile)
          renderOptions.showDebug =false ;
    };
  

});