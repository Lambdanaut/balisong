// The Grid component allows an element to be located
// on a grid of tiles
Crafty.c('Grid', {
  init: function() {
    this.attr({
      w: Game.map_grid.tile.width,
      h: Game.map_grid.tile.height
    })
  },
 
  // Locate this entity at the given position on the grid
  at: function(x, y) {
    if (x === undefined && y === undefined) {
      return { x: this.x/Game.map_grid.tile.width, y: this.y/Game.map_grid.tile.height }
    } else {
      this.attr({ x: x * Game.map_grid.tile.width, y: y * Game.map_grid.tile.height });
      return this;
    }
  }
});
 
// An "Actor" is an entity that is drawn in 2D on canvas
//  via our logical coordinate grid
Crafty.c('Actor', {
  init: function() {
    this.requires('2D, Canvas, Grid');
  },
});

Crafty.c('Character', {
  init: function() {
    this.requires('Actor, Solid')
      .bind('EnterFrame', function () {
        this.x += this.dX;
        this.y += this.dY;
      });

    this.radius = 0;

    // Default Stats
    this.max_speed = 3;
  },

  //  this entity hits an entity with the "Solid" component
  stopOnSolids: function() {
    this.onHit('Solid', this.stopMovement);

    return this;
  },
  // Stops the movement
  stopMovement: function () {
    if (this.hit('Solid') != false) {
      if (this.dX != 0) {
        this.x -= this.dX;
        this.dX = 0;
      }
      if (this.dY != 0) {
        this.y -= this.dY;
        this.dY = 0;
      }
    }
  }
});
 
Crafty.c('Tree', {
  init: function() {
    this.requires('Actor, Color, Solid')
    .color('rgb(20, 125, 40)');
  }
});

Crafty.c('Human', {
  init: function() {
    this.requires('Character, Collision, Color')
      .color('rgb(255, 225, 170)')
      .stopOnSolids()
      .onHit('Zombie', this.ouch)
  }
});

Crafty.c('Zombie', {
  init: function() {
    this.requires('Character, Collision, Color')
      .color('rgb(100, 100, 255)')
      .stopOnSolids()
  }
});