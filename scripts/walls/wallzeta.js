const zetacolor=Color.valueOf("82ffe8");
const wallzeta = extendContent(Door, "wallzeta", {
 load(){
  this.super$load();
  this.region = Core.atlas.find(this.name);
 }, 
 draw(tile){
  Draw.shader(Shaders.blockbuild, true);
  Shaders.blockbuild.color = zetacolor;
  Shaders.blockbuild.region = this.region;
  Shaders.blockbuild.progress = tile.ent().scaled(tile.ent().open);
  Draw.rect(this.region, tile.drawx(), tile.drawy(), 0);
  Draw.flush();
  Draw.shader();
 },
 update(tile){
  var entity = tile.ent();
  if(entity.open && this.powered(tile)){ 
   tile.block().tapped(tile, null);
  }
  else if((!entity.open) && (!this.powered(tile))){
   tile.block().tapped(tile, null);
  }
 },
 tapped(tile, player){
  if(player != null){
   return;  
  }
  this.super$tapped(tile, player);
 },
  powered(tile){
    return tile.ent().power.status >= 0.99;
  }
});

wallzeta.entityType=prov(() => extendContent(Door.DoorEntity , wallzeta , {
  _scale:0,
  scaled(a){
    this._scale = Mathf.lerpDelta(this._scale, (a)?0:1, 0.1);
    return this._scale;
  }
}));

wallzeta.openfx=Fx.none;
wallzeta.closefx=Fx.none;
