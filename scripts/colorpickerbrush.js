var t=this;
//this.global.colors={};
this.global.colors.brushtype={};
this.global.colors.grid=false;
const brushes=["pencil","eraser","filter","spray","line","effect","fill","pipette","grid"];
const brushesname=["Pencil","Eraser","Brush: Thick","Brush: Spray","Line","Rectangle","Fill","Pick Color","Toggle Grid"];
const colorpickerbrush = extendContent(Block, "colorpickerbrush", {
  /*
  playerPlaced(tile){
    tile.configure(t.global.colors.brushcolor["U-"+Vars.player.name]);
  },
  */
  load(){
    this.super$load();
    this.region=Core.atlas.find(this.name);
    this.baseRegion=Core.atlas.find(this.name+"-base");
    this.topRegion=[];
    for(var i=0;i<brushes.length;i++){
      this.topRegion.push(Core.atlas.find(this.name+"-top-"+i));
    }
  },
  draw(tile){
  //super.draw(tile); LightEntity entity = tile.ent(); Draw.blend(Blending.additive); Draw.color(Tmp.c1.set(entity.color), entity.efficiency() * 0.3f); Draw.rect(reg(topRegion), tile.drawx(), tile.drawy()); Draw.color(); Draw.blend();
  //Tmp.c1.set(tile.ent().color)
  //use in draw
    if(!t.global.colors.brushtype.hasOwnProperty("U-"+Vars.player.name)) t.global.colors.brushtype["U-"+Vars.player.name]=0;
    if(!t.global.colors.brushcolor.hasOwnProperty("U-"+Vars.player.name)) t.global.colors.brushcolor["U-"+Vars.player.name]=Color.valueOf("000000").rgba();
    Draw.rect(this.baseRegion, tile.drawx(), tile.drawy());
    Draw.color(Tmp.c1.set(t.global.colors.brushcolor["U-"+Vars.player.name]));
    Draw.rect(this.topRegion[t.global.colors.brushtype["U-"+Vars.player.name]], tile.drawx(), tile.drawy());
    Draw.color();
  },
  buildConfiguration(tile, table){
    //var entity = tile.ent();
    //js-fy this at home
    table.addImageButton(Icon[brushes[0]],Styles.clearTransi, run(() => { tile.configure(0) })).size(40);
    table.addImageButton(Icon[brushes[1]],Styles.clearTransi, run(() => { tile.configure(1) })).size(40);
    table.addImageButton(Icon[brushes[2]],Styles.clearTransi, run(() => { tile.configure(2) })).size(40);
    table.addImageButton(Icon[brushes[3]],Styles.clearTransi, run(() => { tile.configure(3) })).size(40);
    //table.addImageButton(Icon[brushes[4]],Styles.clearTransi, run(() => { tile.configure(4) })).size(40);
    //table.addImageButton(Icon[brushes[5]],Styles.clearTransi, run(() => { tile.configure(5) })).size(40);
    table.addImageButton(Icon[brushes[6]],Styles.clearTransi, run(() => { tile.configure(6) })).size(40);
    table.addImageButton(Icon[brushes[7]],Styles.clearTransi, run(() => { tile.configure(7) })).size(40);
    table.addImageButton(Icon[brushes[8]],Styles.clearTransi, run(() => { tile.configure(8) })).size(40);
  },
  configured(tile, player, value){
    //tile.ent().color = value;
    if(value==8){
      t.global.colors.grid=!t.global.colors.grid;
      return;
    }
    if(player==null) return;
    t.global.colors.brushtype["U-"+player.name]=value;
    if(!Vars.headless) Vars.ui.showInfoToast(brushesname[value],1);
  }
  //save load brush
});
