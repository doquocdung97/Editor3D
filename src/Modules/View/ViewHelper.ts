import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

export default class ViewHelper {
  element: any;
  mesh: any;
  renderer: any;
  camera: any;
  scene: any;
  isloading = false;
  controls: any;
  frustumSize = 300;
  line: any;
  guiOption: any;
  isGrid = true;
  grid: any;
  colorDefaul = "#ffffff";
  raycaster: any;
  viewHelper: any;
  clock: any;
  pointer;
  pointerOld;
  STATE;
  state;
  delta;
  isView3D: boolean = true;
  THREE = THREE;
  OPTION_GEAR = {
    MODULES: [0.25, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
    ANGLES: [14.5, 20]
  };
  constructor() {}
  init(element: any) {
    // const container = new UIPanel();
    // container.setId("viewport");
    // container.setStyle("height", ["100%"]);
    // element.appendChild(container.dom);
    // // container.add(div_container)
    // this.element = container.dom;
    this.element = element;
    let div_container = this.element;

    let sizecanvas = this.getSizeCanvas();
    const aspect = sizecanvas.width / sizecanvas.height;
    this.camera = new THREE.OrthographicCamera(
      (this.frustumSize * aspect) / -2,
      (this.frustumSize * aspect) / 2,
      this.frustumSize / 2,
      this.frustumSize / -2,
      1,
      100000
    );
    this.camera.position.set(0, 0, 2000);
    this.camera.up.set(0, 0, 1);

    // this.camera.add( new THREE.PointLight( 0xffffff, 0.8 ) );

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x999999);
    this.scene.add(new THREE.AmbientLight(0x999999));
    // this.scene.fog = new THREE.Fog(0xa0a0a0, 200, 10000);

    //const geometry = new THREE.BoxGeometry( 0.2, 0.2, 0.2 );
    // const material = new THREE.MeshNormalMaterial();
    // this.mesh = new THREE.Mesh( geometry, material );
    // this.scene.add( this.mesh );
    var light = new THREE.DirectionalLight(0xffffff);
    light.position.set(0, 1, 1).normalize();
    this.scene.add(light);

    this.grid = new THREE.GridHelper(50, 50, 0xffffff, 0x555555);
    this.grid.rotateOnAxis(new THREE.Vector3(1, 0, 0), 90 * (Math.PI / 180));
    this.grid.visible = this.isGrid;
    this.scene.add(this.grid);

    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(
      div_container.offsetWidth,
      div_container.offsetHeight
    );
    this.element.appendChild(this.renderer.domElement);
    let animation = this.animation.bind(this);
    this.renderer.setAnimationLoop(animation);
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableRotate = this.isView3D;
    this.controls.update();

    // container.setPosition( 'absolute' );

    // container.setPosition( 'absolute' );
    // this.viewHelper = new ViewHelpertest(this.camera, container);
    // this.viewHelper.controls = this.controls;
    // this.viewHelper =  new ViewHelper(this.camera,this.domReference.nativeElement);
    // this.viewHelper.controls = this.controls

    //this.controls.enableZoom = false;
    this.clock = new THREE.Clock();
    this.raycaster = new THREE.Raycaster();

    div_container.appendChild(this.renderer.domElement);
    let onWindowResize = this.onWindowResize.bind(this);
    window.addEventListener("resize", onWindowResize);
    // let self = this
    // window.addEventListener('pointerup', function(event){
    //   self.viewHelper.handleClick(event);
    // });
    let self = this;
    // this.controls.addEventListener('change',function(event){
    //   self.renderer.render(self.scene, self.camera);
    //   self.renderer.autoClear = false;
    //   self.viewHelper.render( self.renderer );
    //   self.renderer.autoClear = true;
    // })
    this.controls.center = new THREE.Vector3();
    // this.controls.addEventListener('change',function(event){
    //     console.log('focus',event)
    // })
    this.pointer = new THREE.Vector2();
    this.pointerOld = new THREE.Vector2();
    this.STATE = { NONE: -1, ROTATE: 0, ZOOM: 1, PAN: 2 };
    this.state = this.STATE.NONE;
    this.delta = new THREE.Vector3();
    div_container.addEventListener("pointerdown", this.onMouseMove.bind(this));
    div_container.addEventListener("pointermove", this.onMouseDown.bind(this));

    const geometry = new THREE.BoxGeometry(10, 10, 10);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    this.scene.add(cube);
  }
  setView3D(status) {
    this.isView3D = status;
    this.controls.enableRotate = this.isView3D;
    let camera = this.camera;
    this.controls.update();
    if (!this.isView3D) {
      let z = camera.position.z;
      this.camera.position.set(0, 0, z);
      this.camera.updateMatrix();
      this.controls.target.copy(new THREE.Vector3(0, 0, 0));
      this.controls.update();
    }
  }
  addScene(obj) {
    this.scene.add(obj);
  }
  onMouseDown(event) {
    if (event.button === 0) {
      this.state = this.STATE.ROTATE;
    } else if (event.button === 1) {
      this.state = this.STATE.ZOOM;
    } else if (event.button === 2) {
      this.state = this.STATE.PAN;
    }

    this.pointerOld.set(event.clientX, event.clientY);
  }
  onMouseMove(event) {
    this.pointer.set(event.clientX, event.clientY);

    var movementX = this.pointer.x - this.pointerOld.x;
    var movementY = this.pointer.y - this.pointerOld.y;

    if (this.state === this.STATE.ROTATE) {
      // this.rotate( this.delta.set( - movementX, - movementY, 0 ) );
    } else if (this.state === this.STATE.ZOOM) {
      // this.zoom( delta.set( 0, 0, movementY ) );
    } else if (this.state === this.STATE.PAN) {
      this.pan(this.delta.set(-movementX, movementY, 0));
    }

    this.pointerOld.set(event.clientX, event.clientY);
  }
  fitCameraTo() {
    if (!this.mesh) return;
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();
    const box = new THREE.Box3();
    box.makeEmpty();
    box.expandByObject(this.mesh);
    box.getSize(size);
    box.getCenter(center);
    let div_container = this.element;
    let e = Math.min(div_container.offsetHeight, div_container.offsetWidth);
    let a = Math.max(
      (box.max.x - box.min.x) / 0.8,
      (box.max.y - box.min.y) / 0.8,
      (box.max.z - box.min.z) / 0.8
    );
    this.camera.zoom = Math.min(e / a, e / a) * 0.4;
    this.camera.updateMatrix();
    this.controls.target.copy(center);
    this.controls.update();
  }
  get Factor() {
    let factor = 1;
    if (this.camera.isOrthographicCamera) {
      factor = (this.camera.top - this.camera.bottom) / this.camera.zoom;
      this.raycaster.params.Line.threshold = factor / 100;
    }
    return factor;
  }
  setGird() {
    this.isGrid = !this.isGrid;
    this.grid.visible = this.isGrid;
    // this.mesh.position.set(500,500,500)
  }
  resetGuiOption() {
    if (this.guiOption) {
      this.guiOption.domElement.remove();
    }
    this.guiOption = new GUI();
  }
  animation(time: any) {
    // this.mesh.rotation.x = time / 2000;
    // this.mesh.rotation.y = time / 1000;
    // nodeFrame.update()
    this.controls.update();
    this.camera.updateProjectionMatrix();
    this.renderer.render(this.scene, this.camera);
    const delta = this.clock.getDelta();
    if (!this.isView3D) return;
    // if (this.viewHelper.animating === true) {
    //   this.viewHelper.update(delta);
    // }
    // this.renderer.autoClear = false;
    // this.viewHelper.render(this.renderer);
    // this.renderer.autoClear = true;
  }
  getSizeCanvas() {
    let canvas = this.element;
    return {
      width: canvas.offsetWidth,
      height: canvas.offsetHeight
    };
  }
  exportObject() {
    if (this.mesh) {
      var exporter = new STLExporter();
      var str = exporter.parse(this.mesh); // Export the scene
      var blob = new Blob([str], { type: "text/plain" }); // Generate Blob from the string
      //saveAs( blob, 'file.stl' ); //Save the Blob to file.stl

      //Following code will help you to save the file without FileSaver.js
      var link = document.createElement("a");
      link.style.display = "none";
      document.body.appendChild(link);
      link.href = URL.createObjectURL(blob);
      link.download = "gear.stl";
      link.click();
    }
  }
  onWindowResize() {
    let sizecanvas = this.getSizeCanvas();
    const aspect = sizecanvas.width / sizecanvas.height;
    this.camera.left = (-this.frustumSize * aspect) / 2;
    this.camera.right = (this.frustumSize * aspect) / 2;
    this.camera.top = this.frustumSize / 2;
    this.camera.bottom = -this.frustumSize / 2;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(sizecanvas.width, sizecanvas.height);
  }
}
