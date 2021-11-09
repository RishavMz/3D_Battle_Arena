import * as THREE from 'three';

export class Player {
  constructor(scene, quadtree, chunk, posx, posz) {
    this.scene = scene;
    this.chunk = chunk;
    this.posx = posx;
    this.posz = posz;
    this.quadtree = quadtree;
    this.accz = -0.5;
    this.accx = -0.5;
    this.decn = 0.005;
    this.velz = 0;
    this.velx = 0;
    this.range = 128;
  }
  draw() {
    const player = new THREE.Mesh(new THREE.SphereGeometry(1, 100, 100), new THREE.MeshBasicMaterial({color: 0xffffff}));
    const playerrange = new THREE.Mesh(new THREE.BoxGeometry(this.range, 10, this.range, 5, 5, 5), new THREE.MeshBasicMaterial({color: 0x90EE90, wireframe: true}));
    this.data = player;
    this.playerrange = playerrange;
    player.position.x += this.posx;
    player.position.z += this.posz;
    this.scene.add(player, playerrange);
  }
  forward() {
    this.velz = this.accz;
  }
  backward() {
    this.velz = -this.accz;
  }
  left() {
    this.velx = this.accx;
  }
  right() {
    this.velx = -this.accx;

  }
  move() {
    if(this.chunk.contains(this.data.position.z + this.velz, this.data.position.x + this.velx)) {
      this.data.position.z += this.velz;
      this.data.position.x += this.velx;
      this.posx += this.velx;
      this.posz += this.velz;
      this.playerrange.position.z += this.velz;
      this.playerrange.position.x += this.velx;
      this.scene.position.z -= this.velz;
      this.scene.position.x -= this.velx;
      if(this.velz !== 0){
        this.velz += this.velz>0?-this.decn:this.decn;
      }
      if(this.velx !== 0){
        this.velx += this.velx>0?-this.decn:this.decn;
      }
    }
  }
  getNearPoints() {
    const data = this.quadtree.squareContains(this.posx, this.posz, this.range, []);
  }
}