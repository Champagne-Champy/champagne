/*

 A game by Flying Sheep Studios
 Visit https://flying-sheep.com

*/
var k;

function aa(a, b, d, e) {
	var f = {
			kd: {},
			materials: {}
		},
		g;
	for (g in b)
		if ("json" != g.slice(g.lastIndexOf(".") + 1).toLowerCase()) {
			var h;
			h = "pbr" == e ? new THREE.MeshStandardMaterial(d) : "phong" == e ? new THREE.MeshPhongMaterial(d) : "basic" == e ? new THREE.MeshBasicMaterial(d) : new THREE.MeshLambertMaterial(d);
			h.map = b[g];
			var l = g.slice(g.lastIndexOf("/") + 1),
				l = l.split(".");
			f.materials[l[0]] = h
		} else if ("json" == g.slice(g.lastIndexOf(".") + 1).toLowerCase())
		for (h = b[g], l = 0; l < h.children.length; l++) f.kd[h.children[l].name.split(".")[0]] = h.children[l];
	return this.create(a, f)
}
aa.prototype.create = function(a, b) {
	var d = {
		world: null,
		ye: null,
		rd: [],
		lights: [],
		clearColor: null,
		Vd: null,
		Ve: b
	};
	a.sceneProperties && (d.ye = a.sceneProperties);
	var e = new THREE.Object3D,
		f = a.objects,
		g = f.length,
		h = [];
	e.userData.id = "Root";
	for (var l = 1; l < g; l++) {
		var q = null,
			q = "Object3D" != f[l].type ? new THREE.Mesh(b.kd[f[l].source].geometry, b.materials[f[l].libraries.textures]) : new THREE.Object3D;
		q.name = f[l].id;
		q.D = f[l].customProperties;
		q.userData.id = f[l].id;
		q.userData.qd = f[l].parent;
		q.userData.name = f[l].name;
		q.userData.source =
			f[l].source;
		q.userData.Vb = {
			x: f[l].position.x,
			y: f[l].position.y,
			z: f[l].position.z
		};
		q.userData.Wb = {
			x: f[l].rotation.x,
			y: f[l].rotation.y,
			z: f[l].rotation.z
		};
		q.userData.Xb = {
			x: f[l].scale.x,
			y: f[l].scale.y,
			z: f[l].scale.z
		};
		e.add(q);
		h.push(q)
	}
	for (l = 0; l < h.length; l++) h[l] != e && "Root" != h[l].userData.qd && e.getObjectByName(h[l].userData.qd, !0).add(h[l]);
	e.traverse(function(a) {
		if (a != e) {
			var b = a.userData;
			a.position.set(b.Vb.x, b.Vb.y, b.Vb.z);
			a.scale.set(b.Xb.x, b.Xb.y, b.Xb.z);
			a.rotation.set(b.Wb.x, b.Wb.y, b.Wb.z)
		}
	}.bind(this));
	for (f = 0; f < a.paths.length; f++) g = {
		Nb: null,
		radius: a.paths[f].radius,
		D: a.paths[f].customProperties
	}, h = new THREE.CatmullRomCurve3(a.paths[f].pointsWorld), h.type = a.paths[f].type, h.tension = a.paths[f].tension, h.closed = a.paths[f].closed, g.Nb = h, d.rd.push(g);
	if (a.lights)
		for (f = 0; f < a.lights.length; f++) g = a.lights[f], "AmbientLight" == g.type ? d.lights.push(new THREE.AmbientLight(new THREE.Color(g.color.r, g.color.g, g.color.b), g.intensity)) : "DirectionalLight" == g.type && (d.lights.push(new THREE.DirectionalLight(new THREE.Color(g.color.r,
			g.color.g, g.color.b), g.intensity)), d.lights[d.lights.length - 1].position.set(g.position.x, g.position.y, g.position.z));
	a.clearColor && (d.clearColor = a.clearColor);
	a.clearColor && (d.clearColor = a.clearColor);
	a.collisionMap && (d.Vd = a.collisionMap);
	d.world = e;
	return d
};
var m = !0,
	n, p, r, t = null,
	u = null,
	ba = {
		0: {
			name: "facebook",
			gameKey: "b9582b852a8d49ed2579b7687ea50b0a",
			ud: "e573aa9af794617a1461a54d4d07a4662f9a47ce"
		},
		1: {
			name: "browser",
			gameKey: "db79ef8d8b8e9358ef45f7382ec688a0",
			ud: "dfedc7cb14bbf3867e42220866c489a5f53c6cb6"
		}
	},
	v, w, x, y, z;

function ca(a) {
	var b = A.L("env_atlas_01");
	b.wrapS = b.wrapT = THREE.RepeatWrapping;
	var d = {};
	Object.assign(d, THREE.UniformsLib.common, THREE.UniformsLib.aomap, THREE.UniformsLib.lightmap, THREE.UniformsLib.emissivemap, THREE.UniformsLib.fog, THREE.UniformsLib.lights, {
		emissive: {
			value: new THREE.Color(0)
		},
		map: {
			value: b
		},
		playerPos: {
			value: new THREE.Vector3(3, 0, 0)
		}
	});
	a = a ? new THREE.ShaderMaterial({
		uniforms: d,
		vertexShader: "varying vec4 vWorldPos;\nvarying vec3 vLightFront;\n#ifdef DOUBLE_SIDED\nvarying vec3 vLightBack;\n#endif\n#include <common>\n#include <uv_pars_vertex>\n#include <uv2_pars_vertex>\n#include <envmap_pars_vertex>\n#include <bsdfs>\n#include <lights_pars>\n#include <color_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n#include <uv_vertex>\n#include <uv2_vertex>\n#include <color_vertex>\n#include <beginnormal_vertex>\n#include <morphnormal_vertex>\n#include <skinbase_vertex>\n#include <skinnormal_vertex>\n#include <defaultnormal_vertex>\n#include <begin_vertex>\n#include <morphtarget_vertex>\n#include <skinning_vertex>\n#include <project_vertex>\n#include <logdepthbuf_vertex>\n#include <clipping_planes_vertex>\n#include <worldpos_vertex>\n#include <envmap_vertex>\n#include <lights_lambert_vertex>\n#include <shadowmap_vertex>\nvWorldPos = modelMatrix * vec4( transformed, 1.0 );\n}",
		fragmentShader: "uniform vec3 playerPos;\nvarying vec4 vWorldPos;\nuniform vec3 diffuse;\nuniform vec3 emissive;\nuniform float opacity;\nvarying vec3 vLightFront;\n#ifdef DOUBLE_SIDED\nvarying vec3 vLightBack;\n#endif\n#include <common>\n#include <packing>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <uv2_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <emissivemap_pars_fragment>\n#include <envmap_pars_fragment>\n#include <bsdfs>\n#include <lights_pars>\n#include <fog_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <shadowmask_pars_fragment>\n#include <specularmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n#include <clipping_planes_fragment>\nvec4 diffuseColor = vec4( diffuse, opacity );\nReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\nvec3 totalEmissiveRadiance = emissive;\n#include <logdepthbuf_fragment>\n#include <map_fragment>\n#include <color_fragment>\n#include <alphamap_fragment>\n#include <alphatest_fragment>\n#include <specularmap_fragment>\n#include <emissivemap_fragment>\nreflectedLight.indirectDiffuse = getAmbientLightIrradiance( ambientLightColor );\n#include <lightmap_fragment>\nreflectedLight.indirectDiffuse *= BRDF_Diffuse_Lambert( diffuseColor.rgb );\n#ifdef DOUBLE_SIDED\nreflectedLight.directDiffuse = ( gl_FrontFacing ) ? vLightFront : vLightBack;\n#else\nreflectedLight.directDiffuse = vLightFront;\n#endif\nreflectedLight.directDiffuse *= BRDF_Diffuse_Lambert( diffuseColor.rgb ) * getShadowMask();\n#include <aomap_fragment>\nvec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;\ngl_FragColor = vec4( outgoingLight, texelColor.w );\nif(vWorldPos.y < playerPos.y) {\nfloat dist = length(vec2(vWorldPos.x, vWorldPos.z) - vec2(playerPos.x, playerPos.z));\nif(dist < 2.0) {\nfloat fade = 0.5 + abs(vWorldPos.y - playerPos.y) * 0.02;\nif(fade > 1.0) fade = 1.0;\n\tgl_FragColor *= fade;\n}\n}\n#include <normal_flip>\n#include <envmap_fragment>\n#include <premultiplied_alpha_fragment>\n#include <tonemapping_fragment>\n#include <encodings_fragment>\n#include <fog_fragment>\n}",
		lights: !0,
		alphaTest: .4
	}) : new THREE.ShaderMaterial({
		uniforms: d,
		vertexShader: "varying vec4 vWorldPos;\nvarying vec3 vLightFront;\n#ifdef DOUBLE_SIDED\nvarying vec3 vLightBack;\n#endif\n#include <common>\n#include <uv_pars_vertex>\n#include <uv2_pars_vertex>\n#include <envmap_pars_vertex>\n#include <bsdfs>\n#include <lights_pars>\n#include <color_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n#include <uv_vertex>\n#include <uv2_vertex>\n#include <color_vertex>\n#include <beginnormal_vertex>\n#include <morphnormal_vertex>\n#include <skinbase_vertex>\n#include <skinnormal_vertex>\n#include <defaultnormal_vertex>\n#include <begin_vertex>\n#include <morphtarget_vertex>\n#include <skinning_vertex>\n#include <project_vertex>\n#include <logdepthbuf_vertex>\n#include <clipping_planes_vertex>\n#include <worldpos_vertex>\n#include <envmap_vertex>\n#include <lights_lambert_vertex>\n#include <shadowmap_vertex>\nvWorldPos = modelMatrix * vec4( transformed, 1.0 );\n}",
		fragmentShader: "uniform vec3 playerPos;\nvarying vec4 vWorldPos;\nuniform vec3 diffuse;\nuniform vec3 emissive;\nuniform float opacity;\nvarying vec3 vLightFront;\n#ifdef DOUBLE_SIDED\nvarying vec3 vLightBack;\n#endif\n#include <common>\n#include <packing>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <uv2_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <emissivemap_pars_fragment>\n#include <envmap_pars_fragment>\n#include <bsdfs>\n#include <lights_pars>\n#include <fog_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <shadowmask_pars_fragment>\n#include <specularmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n#include <clipping_planes_fragment>\nvec4 diffuseColor = vec4( diffuse, opacity );\nReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\nvec3 totalEmissiveRadiance = emissive;\n#include <logdepthbuf_fragment>\n#include <map_fragment>\n#include <color_fragment>\n#include <alphamap_fragment>\n#include <alphatest_fragment>\n#include <specularmap_fragment>\n#include <emissivemap_fragment>\nreflectedLight.indirectDiffuse = getAmbientLightIrradiance( ambientLightColor );\n#include <lightmap_fragment>\nreflectedLight.indirectDiffuse *= BRDF_Diffuse_Lambert( diffuseColor.rgb );\n#ifdef DOUBLE_SIDED\nreflectedLight.directDiffuse = ( gl_FrontFacing ) ? vLightFront : vLightBack;\n#else\nreflectedLight.directDiffuse = vLightFront;\n#endif\nreflectedLight.directDiffuse *= BRDF_Diffuse_Lambert( diffuseColor.rgb ) * getShadowMask();\n#include <aomap_fragment>\nvec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;\ngl_FragColor = vec4( outgoingLight, texelColor.w );\nif(vWorldPos.y < playerPos.y) {\nfloat dist = length(vec2(vWorldPos.x, vWorldPos.z) - vec2(playerPos.x, playerPos.z));\nif(dist < 2.0) {\nfloat fade = 0.5 + abs(vWorldPos.y - playerPos.y) * 0.02;\nif(fade > 1.0) fade = 1.0;\n\tgl_FragColor *= fade;\n}\n}\n#include <normal_flip>\n#include <envmap_fragment>\n#include <premultiplied_alpha_fragment>\n#include <tonemapping_fragment>\n#include <encodings_fragment>\n#include <fog_fragment>\n}",
		lights: !0
	});
	a.needsUpdate = !0;
	a.map = new THREE.Texture;
	return a
}

function B() {
	var a = {
		fade: {
			value: 1
		},
		useTexture: {
			value: !1
		},
		texture: {
			value: new THREE.Texture
		}
	};
	this.material = new THREE.ShaderMaterial({
		uniforms: a,
		vertexShader: "varying vec2 vUv;\nvoid main()\n{\nvUv = uv;\ngl_Position = modelMatrix * vec4( position, 1.0 );\n}",
		fragmentShader: "uniform float fade;\nuniform bool useTexture;\nuniform sampler2D texture;\nvarying vec2 vUv;\nvoid main( void )\n{\nif(!useTexture)\ngl_FragColor = vec4(0,0,0,fade);\nelse\n{\nvec4 color = texture2D(texture, vUv);\nif(color.x < fade)\ngl_FragColor = vec4(0.254, 0.501, 0.725,1);\nelse\ngl_FragColor = vec4(0.254, 0.501, 0.725,0);\n}\n}",
		transparent: !0,
		blending: THREE.NormalBlending,
		depthTest: !1,
		depthWrite: !1
	});
	a = new THREE.PlaneGeometry(2, 2);
	this.td = new THREE.Mesh(a, this.material);
	this.td.frustumCulled = !1;
	this.ia = new THREE.Scene;
	this.ia.add(this.td);
	this.length = this.ka = 0;
	this.Bb = {
		fadeIn: 1,
		fadeOut: 2
	};
	this.Ta = this.Ca = null
}
B.prototype.update = function(a) {
	if (this.Ca) switch (this.Ca) {
		case this.Bb.fadeIn:
			this.ka -= a;
			0 > this.ka ? (this.material.uniforms.fade.value = 0, this.Ca = null) : this.material.uniforms.fade.value = this.ka / this.length;
			break;
		case this.Bb.fadeOut:
			this.ka -= a;
			this.material.uniforms.fade.value = 0 > this.ka ? 1 : 1 - this.ka / this.length;
			break;
		default:
			this.material.uniforms.fade.value = 0, this.Ca = null
	}
};
B.prototype.fadeIn = function(a) {
	this.Ca = this.Bb.fadeIn;
	this.ka = this.length = a
};
B.prototype.fadeOut = function(a) {
	this.Ca = this.Bb.fadeOut;
	this.ka = this.length = a
};

function da(a, b) {
	a.wrapS = THREE.RepeatWrapping;
	a.wrapT = THREE.RepeatWrapping;
	b && (b.wrapS = THREE.ClampToEdgeWrapping, b.wrapT = THREE.ClampToEdgeWrapping);
	var d = {};
	Object.assign(d, THREE.UniformsLib.common, THREE.UniformsLib.fog, {
		baseTexutre: {
			value: a
		},
		tex_fogMap: {
			value: b
		},
		time: {
			value: 0
		},
		viewPosition: {
			value: new THREE.Vector3(0, 0, 1)
		},
		playerPosition: {
			value: new THREE.Vector3(0, 0, 0)
		},
		waterLevel: {
			value: 0
		},
		sunDirection: {
			value: (new THREE.Vector3(.25, 1, .5)).normalize().multiplyScalar(-1)
		}
	});
	this.material = new THREE.ShaderMaterial({
		uniforms: d,
		vertexShader: "varying vec2 vUv;\nvarying mat3 tbn;\nvarying vec3 vNormal;\nvarying vec3 vCameraToPixel;\nvarying float vDistance;\nuniform vec3 viewPosition;\nuniform vec3 playerPosition;\nuniform float time;\n#include <common>\nvoid main() {\nvec4 mPosition = modelMatrix * vec4(position, 1.0);\nvUv = vec2(position.x * 0.02, position.y * 0.02);\nvec3 n = mPosition.xyz;\nvCameraToPixel = n - viewPosition;\nvCameraToPixel = normalize(vCameraToPixel);\nvec3 distanceXZ = n - playerPosition;\ndistanceXZ.y = 0.0;\nvDistance = length(distanceXZ);\nfloat horizonEffect = pow(vDistance * 0.005, 4.0) * 1.0;\nmPosition.y -= horizonEffect;\ngl_Position = projectionMatrix * viewMatrix * mPosition;\n}",
		fragmentShader: "varying vec2 vUv;\nvarying vec3 vCameraToPixel;\nvarying float vDistance;\nuniform sampler2D tex_fogMap;\nuniform float time;\nuniform sampler2D baseTexutre;\nuniform sampler2D normalTexture;\nuniform vec3 sunDirection;\nvec4 fresnelColor = vec4(0.3, 0.3, 0.3, 1.0);\nvec3 normal = vec3(0.0, 1.0, 0.0);\n#include <common>\n#include <fog_pars_fragment>\nvoid main() {\nvec4 color = texture2D(baseTexutre, vUv * 0.5);\nfloat displace = time * 0.05 + color.a * 0.1;\ncolor = texture2D(baseTexutre, vec2(vUv.x + displace, vUv.y + displace));\nfloat fresnel  = 1.0 + (dot(normal, vCameraToPixel));\nfresnel = pow(fresnel, 2.0);\ncolor += fresnelColor * fresnel;\n#ifdef USE_FOG\n#ifdef USE_LOGDEPTHBUF_EXT\nfloat depth = gl_FragDepthEXT / gl_FragCoord.w;\n#else\nfloat depth = gl_FragCoord.z / gl_FragCoord.w;\n#endif\n#ifdef FOG_EXP2\nfloat fogFactor = whiteCompliment( exp2( - fogDensity * fogDensity * depth * depth * LOG2 ) );\n#else\nfloat fogFactor = smoothstep( fogNear, fogFar, depth );\n#endif\nvec4 fogMapColor = texture2D(tex_fogMap, vec2(fogFactor, 0));\ngl_FragColor.rgb = mix( color.rgb, fogMapColor.rgb, fogMapColor.a);\n#endif\n}",
		fog: !0
	});
	this.width = 2E3;
	this.Kc = 20;
	this.Mb = this.width / this.Kc;
	this.mesh = new THREE.Mesh(new THREE.PlaneGeometry(this.width, this.width, this.Kc, this.Kc), this.material);
	this.mesh.rotation.x = .5 * -Math.PI
}
da.prototype.update = function(a, b) {
	this.mesh.position.set(Math.floor(a.x / this.Mb) * this.Mb, b, Math.floor(a.z / this.Mb) * this.Mb)
};

function C(a, b, d) {
	this.Wc = 50;
	var e = new THREE.PlaneGeometry(this.Wc, this.Wc, 1, 1);
	this.material = new THREE.MeshBasicMaterial({
		map: b,
		blending: THREE.AdditiveBlending,
		transparent: !0,
		opacity: 1
	});
	this.mesh = new THREE.Mesh(e, this.material);
	this.mesh.rotation.x = .5 * -Math.PI;
	this.mesh.visible = !1;
	a.add(this.mesh);
	this.C = 3;
	this.mesh.C = -1;
	this.nb = d
}
C.prototype.trigger = function(a, b) {
	this.mesh.position.copy(a);
	this.mesh.position.y = b + 2;
	this.mesh.visible = !0;
	this.mesh.C = this.C;
	this.nb.position.copy(this.mesh.position);
	this.nb.visible = !0;
	this.nb.reset(!0);
	this.nb.material.depthTest = !1
};
C.prototype.update = function(a) {
	0 < this.mesh.C && (this.mesh.C -= a, 0 >= this.mesh.C ? this.mesh.visible = !1 : (a = 1 - this.mesh.C / this.C, this.mesh.scale.set(a, a, a), this.material.opacity = 1 - a))
};
C.prototype.reset = function() {
	this.mesh.visible = !1;
	this.nb.visible = !1
};

function D(a) {
	this.ca = a;
	a = A.Yc("char_goal");
	material = new THREE.MeshBasicMaterial({
		map: A.L("char_goal_tex"),
		skinning: !0,
		side: THREE.DoubleSide,
		alphaTest: .2
	});
	var b = !(E() && F());
	this.mesh = new THREE.SkinnedMesh(a, material, b);
	this.mesh.scale.set(.9, .9, .9);
	this.ca.add(this.mesh);
	this.aa = new THREE.AnimationMixer(this.mesh);
	for (a = 0; a < this.mesh.geometry.animations.length; ++a) this.aa.clipAction(this.mesh.geometry.animations[a]);
	this.Y = this.aa.clipAction("idle").reset().setEffectiveWeight(1).play();
	this.Xc = 2;
	this.fc = 0;
	this.Ic = !1
}
D.prototype.update = function(a) {
	this.Ic ? this.aa.update(a) : (this.fc++, this.fc >= this.Xc && (this.fc = 0, this.aa.update(a * this.Xc)))
};
D.prototype.trigger = function() {
	this.Ic = !0;
	this.S("saved", .3);
	this.Y.clampWhenFinished = !0;
	this.Y.repetitions = 0
};
D.prototype.reset = function() {
	this.Ic = !1;
	this.S("idle", .01)
};
D.prototype.S = function(a, b) {
	if (this.Y._clip.name != a) {
		this.aa.stopAllAction();
		var d = this.aa.clipAction(a);
		0 < b ? this.Y.crossFadeTo(d, b, !1).play() : d.reset().setEffectiveWeight(1).play();
		this.Y = d
	}
};
THREE.Ue = function(a, b, d, e, f) {
	a && (a.wrapS = THREE.RepeatWrapping, a.wrapT = THREE.RepeatWrapping);
	b && (b.wrapS = THREE.ClampToEdgeWrapping, b.wrapT = THREE.ClampToEdgeWrapping);
	var g = {},
		h;
	h = d ? new THREE.Color(1, 1, 1) : new THREE.Color(0, 0, 0);
	Object.assign(g, THREE.UniformsLib.common, THREE.UniformsLib.aomap, THREE.UniformsLib.lightmap, THREE.UniformsLib.fog, THREE.UniformsLib.lights, {
		emissive: {
			value: h
		},
		map: {
			value: a
		},
		tex_fogMap: {
			value: b
		},
		offsetRepeat: {
			value: null == f ? new THREE.Vector4(0, 0, 1, 1) : f
		}
	});
	d && (g.emissiveMap = {
		value: d
	});
	b = e ? new THREE.ShaderMaterial({
		uniforms: g,
		vertexShader: "#define LAMBERT\nvarying vec3 vLightFront;\n#ifdef DOUBLE_SIDED\nvarying vec3 vLightBack;\n#endif\n#include <common>\n#include <uv_pars_vertex>\n#include <uv2_pars_vertex>\n#include <envmap_pars_vertex>\n#include <bsdfs>\n#include <lights_pars>\n#include <color_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n#include <uv_vertex>\n#include <uv2_vertex>\n#include <color_vertex>\n#include <beginnormal_vertex>\n#include <morphnormal_vertex>\n#include <skinbase_vertex>\n#include <skinnormal_vertex>\n#include <defaultnormal_vertex>\n#include <begin_vertex>\n#include <morphtarget_vertex>\n#include <skinning_vertex>\n#include <project_vertex>\n#include <logdepthbuf_vertex>\n#include <clipping_planes_vertex>\n#include <worldpos_vertex>\n#include <envmap_vertex>\n#include <lights_lambert_vertex>\n#include <shadowmap_vertex>\n}",
		fragmentShader: "uniform float time;\nfloat water_speed = 0.03;\nfloat water_displace = 0.001;\nuniform sampler2D tex_fogMap;\nuniform vec3 diffuse;\nuniform vec3 emissive;\nuniform float opacity;\nvarying vec3 vLightFront;\n#ifdef DOUBLE_SIDED\nvarying vec3 vLightBack;\n#endif\n#include <common>\n#include <packing>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <uv2_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <emissivemap_pars_fragment>\n#include <envmap_pars_fragment>\n#include <bsdfs>\n#include <lights_pars>\n#include <fog_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <shadowmask_pars_fragment>\n#include <specularmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n#include <clipping_planes_fragment>\nvec4 diffuseColor = vec4( diffuse, opacity );\nReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\nvec3 totalEmissiveRadiance = emissive;\n#include <logdepthbuf_fragment>\n#include <map_fragment>\n#include <color_fragment>\n#include <alphamap_fragment>\n#include <alphatest_fragment>\n#include <specularmap_fragment>\n#include <emissivemap_fragment>\nvec3 postGlow = totalEmissiveRadiance;\ntotalEmissiveRadiance = vec3(0.0, 0.0, 0.0);\nreflectedLight.indirectDiffuse = getAmbientLightIrradiance( ambientLightColor );\n#include <lightmap_fragment>\nreflectedLight.indirectDiffuse *= BRDF_Diffuse_Lambert( diffuseColor.rgb );\n#ifdef DOUBLE_SIDED\nreflectedLight.directDiffuse = ( gl_FrontFacing ) ? vLightFront : vLightBack;\n#else\nreflectedLight.directDiffuse = vLightFront;\n#endif\nreflectedLight.directDiffuse *= BRDF_Diffuse_Lambert( diffuseColor.rgb ) * getShadowMask();\n#include <aomap_fragment>\nvec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;\n#include <normal_flip>\n#include <envmap_fragment>\ngl_FragColor = vec4( outgoingLight, diffuseColor.a );\n#include <premultiplied_alpha_fragment>\n#include <tonemapping_fragment>\n#include <encodings_fragment>\n#ifdef USE_FOG\n#ifdef USE_LOGDEPTHBUF_EXT\nfloat depth = gl_FragDepthEXT / gl_FragCoord.w;\n#else\nfloat depth = gl_FragCoord.z / gl_FragCoord.w;\n#endif\n#ifdef FOG_EXP2\nfloat fogFactor = whiteCompliment( exp2( - fogDensity * fogDensity * depth * depth * LOG2 ) );\n#else\nfloat fogFactor = smoothstep( fogNear, fogFar, depth );\n#endif\nvec4 fogMapColor = texture2D(tex_fogMap, vec2(fogFactor, 0));\ngl_FragColor.rgb = mix( gl_FragColor.rgb, fogMapColor.rgb, fogMapColor.a);\n#endif\ngl_FragColor.rgb += postGlow;\n}",
		transparent: !0,
		lights: !1,
		fog: !1,
		alphaTest: .1,
		depthWrite: !0
	}) : new THREE.ShaderMaterial({
		uniforms: g,
		vertexShader: "#define LAMBERT\nvarying vec3 vLightFront;\n#ifdef DOUBLE_SIDED\nvarying vec3 vLightBack;\n#endif\n#include <common>\n#include <uv_pars_vertex>\n#include <uv2_pars_vertex>\n#include <envmap_pars_vertex>\n#include <bsdfs>\n#include <lights_pars>\n#include <color_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n#include <uv_vertex>\n#include <uv2_vertex>\n#include <color_vertex>\n#include <beginnormal_vertex>\n#include <morphnormal_vertex>\n#include <skinbase_vertex>\n#include <skinnormal_vertex>\n#include <defaultnormal_vertex>\n#include <begin_vertex>\n#include <morphtarget_vertex>\n#include <skinning_vertex>\n#include <project_vertex>\n#include <logdepthbuf_vertex>\n#include <clipping_planes_vertex>\n#include <worldpos_vertex>\n#include <envmap_vertex>\n#include <lights_lambert_vertex>\n#include <shadowmap_vertex>\n}",
		fragmentShader: "uniform float time;\nfloat water_speed = 0.03;\nfloat water_displace = 0.001;\nuniform sampler2D tex_fogMap;\nuniform vec3 diffuse;\nuniform vec3 emissive;\nuniform float opacity;\nvarying vec3 vLightFront;\n#ifdef DOUBLE_SIDED\nvarying vec3 vLightBack;\n#endif\n#include <common>\n#include <packing>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <uv2_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <emissivemap_pars_fragment>\n#include <envmap_pars_fragment>\n#include <bsdfs>\n#include <lights_pars>\n#include <fog_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <shadowmask_pars_fragment>\n#include <specularmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n#include <clipping_planes_fragment>\nvec4 diffuseColor = vec4( diffuse, opacity );\nReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\nvec3 totalEmissiveRadiance = emissive;\n#include <logdepthbuf_fragment>\n#include <map_fragment>\n#include <color_fragment>\n#include <alphamap_fragment>\n#include <alphatest_fragment>\n#include <specularmap_fragment>\n#include <emissivemap_fragment>\nvec3 postGlow = totalEmissiveRadiance;\ntotalEmissiveRadiance = vec3(0.0, 0.0, 0.0);\nreflectedLight.indirectDiffuse = getAmbientLightIrradiance( ambientLightColor );\n#include <lightmap_fragment>\nreflectedLight.indirectDiffuse *= BRDF_Diffuse_Lambert( diffuseColor.rgb );\n#ifdef DOUBLE_SIDED\nreflectedLight.directDiffuse = ( gl_FrontFacing ) ? vLightFront : vLightBack;\n#else\nreflectedLight.directDiffuse = vLightFront;\n#endif\nreflectedLight.directDiffuse *= BRDF_Diffuse_Lambert( diffuseColor.rgb ) * getShadowMask();\n#include <aomap_fragment>\nvec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;\n#include <normal_flip>\n#include <envmap_fragment>\ngl_FragColor = vec4( outgoingLight, diffuseColor.a );\n#include <premultiplied_alpha_fragment>\n#include <tonemapping_fragment>\n#include <encodings_fragment>\n#ifdef USE_FOG\n#ifdef USE_LOGDEPTHBUF_EXT\nfloat depth = gl_FragDepthEXT / gl_FragCoord.w;\n#else\nfloat depth = gl_FragCoord.z / gl_FragCoord.w;\n#endif\n#ifdef FOG_EXP2\nfloat fogFactor = whiteCompliment( exp2( - fogDensity * fogDensity * depth * depth * LOG2 ) );\n#else\nfloat fogFactor = smoothstep( fogNear, fogFar, depth );\n#endif\nvec4 fogMapColor = texture2D(tex_fogMap, vec2(fogFactor, 0));\ngl_FragColor.rgb = mix( gl_FragColor.rgb, fogMapColor.rgb, fogMapColor.a);\n#endif\ngl_FragColor.rgb += postGlow;\n}",
		transparent: !1,
		lights: !0,
		fog: !0,
		alphaTest: .9
	});
	b.map = a;
	b.emissiveMap = d;
	return b
};
var A = {
	caches: {
		audio: {},
		json: {},
		text: {},
		threeObject: {},
		threeJson: {},
		threeTexture: {}
	},
	La: function(a, b) {
		return a in A.caches && b in A.caches[a] ? A.caches[a][b] : null
	},
	Ma: function(a, b, d) {
		if (a in A.caches) A.caches[a][b] = d;
		else throw "Invalid cache: " + a;
	},
	$d: function(a) {
		return A.La("threeObject", a)
	},
	Be: function(a, b) {
		A.Ma("threeObject", a, b)
	},
	Yc: function(a) {
		return A.La("threeJson", a)
	},
	wc: function(a, b) {
		A.Ma("threeJson", a, b)
	},
	L: function(a) {
		return A.La("threeTexture", a)
	},
	xd: function(a, b) {
		A.Ma("threeTexture", a,
			b)
	},
	qa: function(a) {
		return A.La("json", a)
	},
	ze: function(a, b) {
		A.Ma("json", a, b)
	},
	gc: function(a) {
		return A.La("text", a)
	},
	Ae: function(a, b) {
		A.Ma("text", a, b)
	},
	Da: function(a) {
		return A.La("audio", a)
	},
	wd: function(a, b) {
		A.Ma("audio", a, b)
	}
};

function ea(a, b) {
	this.tb = a;
	this.V = b ? window.sessionStorage : window.localStorage
}
Object.defineProperties(ea.prototype, {
	locked: {
		get: function() {
			var a;
			try {
				a = this.V.getItem(this.tb)
			} catch (b) {
				a = null
			}
			return a ? !1 : !0
		},
		set: function(a) {
			try {
				a ? this.V.removeItem(this.tb) : this.V.setItem(this.tb, this.tb)
			} catch (b) {}
		}
	}
});

function fa(a, b) {
	this.ub = a;
	this.V = null;
	this.vd = this.gd = !1;
	var d = "test_" + Math.round(1E6 * Math.random()).toString(),
		e = "value_" + Math.round(1E6 * Math.random()).toString(),
		f, g = this.V;
	this.V = window.localStorage;
	this.setItem(d, e);
	f = this.getItem(d);
	this.gd = f === e;
	this.V.removeItem(this.ub + d);
	this.V = window.sessionStorage;
	this.setItem(d, e);
	f = this.getItem(d);
	this.vd = f === e;
	this.V.removeItem(this.ub + d);
	this.V = g;
	this.V = !b && this.gd ? window.localStorage : this.vd ? window.sessionStorage : new ga
}
fa.prototype.getItem = function(a, b) {
	b = "undefined" === typeof b ? null : b;
	var d;
	try {
		d = this.V.getItem(this.ub + a), d = JSON.parse(d)
	} catch (e) {
		d = b
	}
	return null === d ? b : d
};
fa.prototype.setItem = function(a, b) {
	try {
		this.V.setItem(this.ub + a, JSON.stringify(b))
	} catch (d) {}
};

function ga() {
	this.Yb = {}
}
ga.prototype.getItem = function(a) {
	return a in this.Yb ? this.Yb[a] : null
};
ga.prototype.setItem = function(a, b) {
	this.Yb[a] = b.toString()
};

function F() {
	var a = !1,
		b = navigator.userAgent || navigator.vendor || window.opera;
	if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(b) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(b.substr(0,
			4))) a = !0;
	return a
}

function E() {
	return /iP[ao]d|iPhone/i.test(navigator.userAgent)
}

function ha(a) {
	var b = Math.floor(a % 60);
	a = Math.floor(1E3 * a / 6E4 % 60);
	10 > b && (b = "0" + b);
	b = a + ":" + b;
	10 <= a && (b = "9:59");
	return b
}

function G(a) {
	this.manager = void 0 !== a ? a : THREE.DefaultLoadingManager;
	this.withCredentials = !1
}
G.prototype.constructor = G;
G.prototype.load = function(a, b, d, e) {
	var f = new THREE.FileLoader(this.manager);
	f.setWithCredentials(this.withCredentials);
	f.load(a, function(a) {
		try {
			var d = JSON.parse(a)
		} catch (f) {
			if (e) e(f);
			else throw f;
		}
		b(d)
	}, d, e)
};

function H(a) {
	this.manager = void 0 !== a ? a : THREE.DefaultLoadingManager;
	this.withCredentials = !1
}
H.prototype.constructor = H;
H.prototype.load = function(a, b, d, e) {
	var f = new THREE.FileLoader(this.manager);
	f.setWithCredentials(this.withCredentials);
	f.load(a, function(a) {
		b(a)
	}, d, e)
};

function I(a) {
	this.manager = void 0 !== a ? a : THREE.DefaultLoadingManager;
	this.withCredentials = !1
}
I.prototype.constructor = I;
I.prototype.load = function(a, b, d, e) {
	var f = new THREE.FileLoader(this.manager);
	f.setWithCredentials(this.withCredentials);
	f.setResponseType("arraybuffer");
	f.load(a, function(a) {
		try {
			var d = msgpack.decode(a)
		} catch (f) {
			if (e) e(f);
			else throw f;
		}
		b(d)
	}, d, e)
};

function J() {
	this.manager = new THREE.LoadingManager;
	this.cache = A;
	this.Dd = new THREE.ObjectLoader(this.manager);
	this.Cd = new THREE.JSONLoader(this.manager);
	this.Ed = new THREE.TextureLoader(this.manager);
	/Edge\/\d./i.test(navigator.userAgent) || E() || /^((?!chrome|android).)*safari/i.test(navigator.userAgent) || this.Ed.setCrossOrigin("");
	this.Je = new THREE.CubeTextureLoader(this.manager);
	this.Hd = new THREE.FileLoader(this.manager);
	this.Hd.setResponseType("arraybuffer");
	this.fe = new G(this.manager);
	this.Ie = new H(this.manager);
	this.ld = new I(this.manager);
	this.manager.onLoad = function() {
		this.onLoad()
	}.bind(this);
	this.manager.onProgress = function(a, b, d) {
		this.onProgress(a, b, d)
	}.bind(this);
	this.manager.onError = function(a) {
		this.onError(a)
	}.bind(this)
}
J.prototype.constructor = J;
J.prototype.onProgress = function() {};
J.prototype.onLoad = function() {};
J.prototype.onError = function(a) {
	console.error("error loading " + a)
};

function ia(a, b, d) {
	ja(d) ? a.ld.load(d, function(a) {
		a = this.Dd.parse(a);
		this.cache.wc(b, a)
	}.bind(a)) : a.Dd.load(d, function(a) {
		this.cache.Be(b, a)
	}.bind(a))
}

function ka(a, b, d) {
	ja(d) ? a.ld.load(d, function(a) {
		a = this.Cd.parse(a);
		this.cache.wc(b, a.geometry)
	}.bind(a)) : a.Cd.load(d, function(a) {
		this.cache.wc(b, a)
	}.bind(a))
}

function la(a, b, d) {
	a.Ed.load(d, function(a) {
		this.cache.xd(b, a)
	}.bind(a))
}

function ma(a, b, d) {
	a.Hd.load(d, function(a) {
		this.cache.xd(b, a)
	}.bind(a))
}

function na(a, b, d) {
	a.Je.load(d, function(a) {
		this.cache.af(b, a)
	}.bind(a))
}

function oa(a, b, d) {
	a.fe.load(d, function(a) {
		this.cache.ze(b, a)
	}.bind(a))
}

function pa(a, b, d) {
	a.Ie.load(d, function(a) {
		this.cache.Ae(b, a)
	}.bind(a))
}

function qa(a, b, d) {
	a.manager.itemStart(d[0]);
	var e = new Howl({
		src: d,
		onload: function() {
			this.cache.wd(b, e);
			this.manager.itemEnd(d[0])
		}.bind(a),
		onloaderror: function() {
			console.log("error loading", b, d, arguments);
			this.cache.wd(b, e);
			this.manager.itemEnd(d[0])
		}.bind(a)
	})
}

function ra(a, b) {
	"audio threeObject threeJson threeTexture threeCubeTexture text json xhr".split(" ").forEach(function(a) {
		a in b && b[a].forEach(function(b) {
			if ("series" in b)
				for (var f = b.series.start; f < b.series.start + b.series.count; f++) {
					var g = ("00000000000000000" + f).substr(-b.series.pad),
						h = {};
					Object.getOwnPropertyNames(b).forEach(function(a) {
						"series" != a && ("string" == typeof b[a] ? h[a] = b[a].replace("%n", g) : Array.isArray(b[a]) ? (h[a] = [], b[a].forEach(function(b, d) {
							h[a][d] = b.replace("%n", g)
						})) : console.error("unsupported type " +
							typeof typeof b[a]))
					}, this);
					sa(this, a, h)
				} else sa(this, a, b)
		}, this)
	}, a)
}

function sa(a, b, d) {
	switch (b) {
		case "audio":
			qa(a, d.id, d.urls);
			break;
		case "threeObject":
			ia(a, d.id, d.url);
			break;
		case "threeJson":
			ka(a, d.id, d.url);
			break;
		case "threeTexture":
			la(a, d.id, d.url);
			break;
		case "threeCubeTexture":
			na(a, d.id, d.url);
			break;
		case "json":
			oa(a, d.id, d.url);
			break;
		case "text":
			pa(a, d.id, d.url);
			break;
		case "xhr":
			ma(a, d.id, d.url);
			break;
		default:
			console.warn("unsupported type :" + b)
	}
}

function ja(a) {
	a = a.split(".");
	return "pack" == a[a.length - 1]
}

function K() {}
k = K.prototype;
k.screen = null;
k.Oc = !1;
k.init = function() {};
k.show = function() {};
k.Zc = function() {};
k.update = function() {};
k.resize = function() {};

function L(a) {
	var b;
	b = b || a.screen.querySelector(".mute button");
	b.addEventListener("click", function() {
		b.classList.toggle("muted");
		b.classList.contains("muted") ? (Howler.mute(!0), w = !0) : (Howler.mute(!1), w = !1);
		GameAnalytics("addDesignEvent", "Mute:" + w)
	})
}

function M(a) {
	var b;
	b = b || a.screen.querySelector(".mute button");
	w ? b.classList.add("muted") : b.classList.remove("muted")
}

function N() {
	this.T = {};
	this.R = null;
	this.Te = document.getElementById("screens");
	this.ad = document.getElementById("conversionTarget");
	this.kc = F();
	window.addEventListener("resize", function() {
		this.resize()
	}.bind(this));
	this.Sc = this.update.bind(this);
	this.Vc = 0;
	this.Sc()
}
N.prototype.add = function(a, b) {
	var d = A.gc("tpl_" + a);
	d && (this.ad.innerHTML = d, this.Te.appendChild(this.ad.firstChild));
	this.T[a] = new b;
	this.T[a].screen = document.getElementById(a)
};
N.prototype.start = function(a) {
	var b = Array.prototype.splice.call(arguments, 1);
	if (this.T[a]) {
		for (var d = document.querySelectorAll("#screens .screen"), e = 0; e < d.length; e++) d[e].classList.remove("show");
		this.R && this.R.Zc();
		this.R = this.T[a];
		this.R.screen && (this.R.screen.classList.add("show"), this.resize(!0));
		this.R.Oc || (this.R.init(), this.R.Oc = !0);
		this.R.show.apply(this.R, b)
	} else console.warn('No state "' + a + '"')
};
N.prototype.update = function(a) {
	var b = a - this.Vc;
	this.Vc = a;
	this.R && this.R.update(b);
	window.requestAnimationFrame(this.Sc)
};
N.prototype.resize = function(a) {
	if (m) {
		for (var b = Math.min(1, window.innerWidth / 640, window.innerHeight / 960), d = document.querySelectorAll(".scale"), e = 0; e < d.length; e++) d[e].style.transform = "scale3d(" + b + ", " + b + ", 1)";
		b = !0;
		this.kc && ((b = window.innerWidth < window.innerHeight) ? document.getElementById("turnDevice").classList.add("hide") : document.getElementById("turnDevice").classList.remove("hide"));
		!a && this.R && this.R.resize(window.innerWidth, window.innerHeight, b)
	}
};

function O() {}
O.prototype = Object.create(K.prototype);
O.prototype.constructor = O;
O.prototype.show = function(a, b) {
	var d = Array.prototype.splice.call(arguments, 1);
	this.screen.querySelector(".percent").innerHTML = "0%";
	this.mc = new J;
	this.mc.onLoad = function() {
		if ("string" == typeof b) x.start.apply(x, d);
		else if ("function" == typeof b) b();
		else throw "done with loading. do not know what to do next?";
	}.bind(this);
	this.mc.onProgress = function(a, b, d) {
		this.screen.querySelector(".percent").innerHTML = Math.round(b / d * 100) + "%"
	}.bind(this);
	var e = A.qa(a);
	if (!e) throw "no preload config with key " + a;
	ra(this.mc,
		e)
};

function P() {}
P.prototype = Object.create(K.prototype);
k = P.prototype;
k.constructor = P;
k.init = function() {
	this.bd = new ea("pufferball3dinstructions", !0);
	L(this);
	this.ua = this.screen.querySelector("button.play");
	this.ua.addEventListener("click", this.Ha.bind(this));
	this.gb = this.screen.querySelector("button.instructions");
	this.gb.addEventListener("click", this.Pb.bind(this));
	this.cb = this.screen.querySelector("button.credits");
	this.cb.addEventListener("click", this.Ee.bind(this))
};
k.show = function() {
	GameAnalytics("addDesignEvent", "Menu");
	M(this)
};
k.Ha = function() {
	n.play();
	this.bd.locked ? (this.bd.locked = !1, this.Pb()) : x.start("levelSelect")
};
k.Pb = function() {
	n.play();
	x.start("instructions")
};
k.Ob = function() {
	n.play();
	x.start("highscore")
};
k.Ee = function() {
	n.play();
	x.start("credits")
};

function Q() {}
Q.prototype = Object.create(K.prototype);
k = Q.prototype;
k.constructor = Q;
k.init = function() {
	L(this);
	this.ma = this.screen.querySelector(".frame");
	this.ac = this.screen.querySelector(".templates .entry");
	this.Va = this.screen.querySelector("button.back");
	this.Va.addEventListener("click", this.ob.bind(this))
};
k.back = function() {
	n.play();
	x.start("menu")
};
k.show = function(a) {
	GameAnalytics("addDesignEvent", "Highscore");
	M(this);
	for (this.$a = a || "menu"; this.ma.firstChild;) this.ma.removeChild(this.ma.firstChild);
	y.addOnceListener(FSToggoApi.event.LOADED, function(a) {
		for (var d = 100, e = v.getItem("name", null), f = v.getItem("score", 0), g = 0; g < a.length; g++) {
			var h = this.ac.cloneNode(!0);
			h.querySelector(".position").innerHTML = a[g].position + ".";
			h.querySelector(".score").innerHTML = a[g].score;
			h.querySelector(".name").innerHTML = a[g].nickName;
			a[g].nickName == e && a[g].score == f &&
				d > a[g].position && (d = a[g].position);
			10 > g && this.ma.appendChild(h)
		}
		100 > d ? (this.screen.querySelector(".yourScore .position").innerHTML = d + ".", this.screen.querySelector(".yourScore .score").innerHTML = f, this.screen.querySelector(".yourScore").classList.remove("hide")) : f ? (this.screen.querySelector(".yourScore .position").innerHTML = "99+", this.screen.querySelector(".yourScore .score").innerHTML = f, this.screen.querySelector(".yourScore").classList.remove("hide")) : this.screen.querySelector(".yourScore").classList.add("hide")
	}.bind(this));
	y.pullScores(99)
};
k.ob = function() {
	n.play();
	x.start(this.$a)
};

function R() {
	this.K = 0
}
R.prototype = Object.create(K.prototype);
k = R.prototype;
k.constructor = R;
k.init = function() {
	L(this);
	this.me = this.screen.querySelector("button.next");
	this.me.addEventListener("click", this.ne.bind(this));
	this.se = this.screen.querySelector("button.prev");
	this.se.addEventListener("click", this.te.bind(this));
	this.sc = this.screen.querySelector("button.play");
	this.sc.addEventListener("click", this.Ha.bind(this));
	this.Va = this.screen.querySelector("button.back");
	this.Va.addEventListener("click", this.ob.bind(this))
};
k.show = function(a) {
	GameAnalytics("addDesignEvent", "Instructions");
	M(this);
	p.fade(r, .5 * r, 500);
	this.$a = a || "menu";
	this.K = 0;
	this.data = z.instructions;
	this.B = null;
	ta(this, 0)
};
k.Zc = function() {
	p.fade(.5 * r, r, 500);
	this.screen.querySelector(".image").classList.remove(ua(this, this.K))
};
k.ne = function() {
	n.play();
	ta(this, 1)
};
k.te = function() {
	n.play();
	ta(this, -1)
};

function ta(a, b) {
	var d = a.screen.querySelector(".buttons"),
		e = a.K;
	a.K += b;
	0 > a.K ? a.K = 0 : a.K > a.data.length - 1 && (a.K = a.data.length - 1);
	var f = a.screen.querySelector(".image"),
		g = a.screen.querySelector(".text");
	a.B && a.B.stop();
	a.B = a.Da(a.K);
	a.B && a.B.play();
	f.classList.remove(ua(a, e));
	f.classList.add(ua(a, a.K));
	g.innerHTML = a.gc(a.K);
	d.classList.remove("first");
	d.classList.remove("last");
	a.sc.classList.remove("last");
	0 == a.K ? d.classList.add("first") : a.K == a.data.length - 1 && (d.classList.add("last"), a.sc.classList.add("last"));
	y.track("anleitung-" + (a.K + 1));
	GameAnalytics("addDesignEvent", "Instructions:" + (a.K + 1))
}
k.gc = function(a) {
	return "string" == typeof this.data[a].text ? this.data[a].text : F() ? this.data[a].text.mobile : this.data[a].text.desktop
};

function ua(a, b) {
	return "string" == typeof a.data[b]["class"] ? a.data[b]["class"] : F() ? a.data[b]["class"].mobile : a.data[b]["class"].desktop
}
k.Da = function(a) {
	return "audio" in this.data[a] ? "string" == typeof this.data[a].audio ? A.Da(this.data[a].audio) : F() ? A.Da(this.data[a].audio.mobile) : A.Da(this.data[a].audio.desktop) : null
};
k.Ha = function() {
	n.play();
	x.start("levelSelect")
};
k.ob = function() {
	n.play();
	x.start(this.$a)
};

function S() {
	this.hb = !1;
	this.score = 0
}
S.prototype = Object.create(K.prototype);
k = S.prototype;
k.constructor = S;
k.init = function() {
	L(this);
	this.ua = this.screen.querySelector("button.play");
	this.ua.addEventListener("click", this.Ha.bind(this));
	this.gb = this.screen.querySelector("button.instructions");
	this.gb.addEventListener("click", this.Pb.bind(this));
	this.cb = this.screen.querySelector("button.highscore");
	this.cb.addEventListener("click", this.Ob.bind(this));
	this.Pe = this.screen.querySelector("button.upload");
	this.Pe.addEventListener("click", this.Gd.bind(this));
	this.Qa = this.screen.querySelector("input.name");
	this.Qa.addEventListener("keypress",
		function(a) {
			13 === a.which && (n.play(), this.Qa.blur(), this.Gd())
		}.bind(this));
	this.Qa.addEventListener("focus", function() {
		m = !1
	}.bind(this));
	this.Qa.addEventListener("blur", function() {
		m = !0
	}.bind(this))
};
k.show = function(a) {
	GameAnalytics("addDesignEvent", "GameOver");
	this.hb = !1;
	M(this);
	document.getElementById("vjoybase").style.opacity = "0";
	document.getElementById("vjoystick").style.opacity = "0";
	a ? (this.score = a, a = !0) : "undefined" == typeof a ? (this.score = v.getItem("score", 0), a = v.getItem("uploadEnabled", !0) && 0 < this.score, y.track("ergebnis")) : (this.score = 0, a = !1);
	v.setItem("uploadEnabled", a);
	v.setItem("score", this.score);
	a ? this.screen.classList.remove("noNameEntry") : this.screen.classList.add("noNameEntry");
	this.screen.querySelector("p.score").innerHTML =
		this.score
};
k.Ha = function() {
	n.play();
	x.start("game")
};
k.Pb = function() {
	n.play();
	x.start("instructions", "gameOver")
};
k.Ob = function() {
	n.play();
	x.start("highscore", "gameOver")
};
k.Gd = function() {
	n.play();
	var a = this.Qa.value.trim();
	1 > a.length ? this.Qa.value = "" : this.hb || (this.hb = !0, v.setItem("name", a), y.addOnceListener(FSToggoApi.event.ADDED, function() {
		v.setItem("uploadEnabled", !1);
		this.Ob()
	}.bind(this)), y.addOnceListener(FSToggoApi.event.ERROR_BADWORD, function() {
		this.screen.querySelector(".nameEntryScreen input.name").value = "";
		this.hb = !1
	}.bind(this)), y.pushScore(a, this.score))
};

function T() {
	String.prototype.contains = function(a) {
		return -1 != this.indexOf(a)
	};
	this.kc = F();
	this.xa = new THREE.Vector3(0, 1, 0);
	this.time = 0;
	this.Hb = null;
	this.paused = !1;
	this.renderer = null;
	this.materials = {
		Ua: null,
		Pc: null
	};
	this.xc = this.ia = this.da = null;
	this.debug = {
		stats: null,
		$e: null,
		camera: null,
		controls: null
	};
	this.ga = this.A = this.u = this.map = this.input = this.O = null;
	this.m = {
		N: null,
		I: null,
		H: null,
		cf: null
	};
	this.ra = new THREE.Vector3;
	this.pc = !1;
	this.pa = new THREE.Vector3;
	this.Zd = 1;
	this.Za = 0;
	this.B = {
		Aa: null,
		Xa: null,
		Wa: null,
		P: null,
		Ya: null
	};
	this.De = 200;
	this.sd = new THREE.Vector3;
	this.uc = this.tc = !0;
	this.Sb = -1;
	this.Oe = .05
}
T.prototype = Object.create(K.prototype);
k = T.prototype;
k.constructor = T;
k.init = function() {
	this.lb = this.screen.querySelector(".wrapper-settings");
	this.Ce = this.screen.querySelector(".settings button");
	this.Ce.addEventListener("click", this.Le.bind(this));
	this.ue = this.lb.querySelector("button.restart");
	this.ue.addEventListener("click", function() {
		va(this)
	}.bind(this));
	this.mb = this.lb.querySelector("button.sound");
	this.mb.addEventListener("click", this.Me.bind(this));
	this.je = this.lb.querySelector("button.levelSelect");
	this.je.addEventListener("click", this.Fe.bind(this));
	this.vc =
		this.screen.querySelector(".score");
	this.Dc = this.screen.querySelector(".timer");
	this.Gb = this.screen.querySelector(".wrapper-popup");
	this.jc = !1;
	wa(this);
	this.input = new xa(this);
	this.u = new ya;
	this.ia = new THREE.Scene;
	new THREE.Scene;
	this.ta = new THREE.Scene;
	this.ia.fog = new THREE.Fog(this.renderer.getClearColor(), 1, 350);
	this.Db = new THREE.Object3D;
	this.Db.matrixAutoUpdate = !1;
	this.Eb = new THREE.Object3D;
	this.Eb.matrixAutoUpdate = !1;
	this.Db.add(this.Eb);
	this.ta.add(this.Db);
	za(this);
	this.A = new Aa(this.ia, this.u,
		this.input);
	this.ab = new D(this.ia);
	this.O = new Ba(this.A);
	this.Sa = new da(A.L("water_01"), A.L("fogmap_01"));
	this.ga = new SheepFX;
	this.ga.setParticleSize(window.innerHeight * window.devicePixelRatio);
	this.m.N = this.ga.effectFromJson(A.qa("fx_spark"), A.L("particle_tex_spark"));
	this.m.N.visible = !1;
	this.m.N.Ja = 2;
	this.m.N.C = -1;
	this.m.N.frustumCulled = !1;
	this.ta.add(this.m.N);
	this.m.I = this.ga.effectFromJson(A.qa("fx_firework"), A.L("particle_tex_firework"));
	this.m.I.visible = !1;
	this.m.I.Ja = 2;
	this.m.I.C = -1;
	this.m.I.frustumCulled = !1;
	this.ta.add(this.m.I);
	this.m.H = this.ga.effectFromJson(A.qa("fx_glitter_trail"), A.L("particle_tex_glitter"));
	this.m.H.visible = !1;
	this.m.H.Ja = 2;
	this.m.H.C = -1;
	this.m.H.frustumCulled = !1;
	this.m.H.material.depthTest = !1;
	this.ta.add(this.m.H);
	this.m.W = this.ga.effectFromJson(A.qa("fx_goal_splash"), A.L("particle_tex_smoke"));
	this.m.W.visible = !1;
	this.m.W.Ja = 2;
	this.m.W.C = -1;
	this.ta.add(this.m.W);
	this.m.kb = this.ga.effectFromJson(A.qa("fx_ocean_splash"), A.L("particle_tex_firework"));
	this.m.kb.visible = !1;
	this.m.kb.Ja =
		2;
	this.m.kb.C = -1;
	this.ta.add(this.m.kb);
	this.m.Ne = this.ga.effectFromJson(A.qa("fx_torch"), A.L("particle_tex_smoke"));
	this.Hc = [];
	this.Lc = new C(this.ta, A.L("ripples"), this.m.kb);
	this.B.Aa = A.caches.audio.ball_roll;
	this.B.Aa._loop = !0;
	this.B.Aa.volume(0);
	this.B.Aa.play();
	this.B.Xa = A.caches.audio.ball_collision;
	this.B.Wa = A.caches.audio.ball_bounce;
	this.B.P = A.caches.audio.bumper;
	this.B.Ya = A.caches.audio.character_collision;
	Ca(this)
};

function wa(a) {
	a.renderer = new THREE.WebGLRenderer({
		canvas: a.screen.querySelector("#renderer"),
		antialias: !F()
	});
	a.renderer.autoClear = !1;
	a.renderer.setPixelRatio(window.devicePixelRatio);
	a.renderer.setSize(window.innerWidth, window.innerHeight);
	a.renderer.setClearColor("#33b0e5");
	a.materials.Ua = ca(!1);
	a.materials.Pc = new THREE.MeshLambertMaterial({
		map: A.L("env_atlas_01"),
		transparent: !0
	});
	a.materials.vb = ca(!0);
	a.materials.vb.side = THREE.DoubleSide;
	a.materials.Td = new THREE.MeshBasicMaterial({
		map: A.L("env_atlas_01"),
		fog: !1
	});
	a.fade = new B;
	a.bc = [];
	for (var b in A.caches.threeTexture) A.caches.threeTexture.hasOwnProperty(b) && b.contains("fade_") && a.bc.push(A.caches.threeTexture[b])
}

function Da(a) {
	var b = a.bc.length,
		b = Math.floor(b * Math.random()),
		d = a.fade;
	a = a.bc[b];
	a ? d.Ta && d.Ta == a.uuid || (d.Ta = a.uuid, d.material.uniforms.useTexture.value = !0, d.material.uniforms.texture.value = a) : d.Ta && (d.Ta = null, d.material.uniforms.ef.value = !1)
}

function za(a) {
	for (var b = "xp xn yp yn zp zn".split(" "), d = [], e = 0; 6 > e; e++) d.push(new THREE.MeshBasicMaterial({
		map: A.L("sky_01_" + b[e]),
		side: THREE.BackSide,
		fog: !1
	}));
	b = new THREE.CubeGeometry(4500, 4500, 4500);
	d = new THREE.MeshFaceMaterial(d);
	a.xc = new THREE.Mesh(b, d);
	a.ia.add(a.xc)
}

function Ca(a) {
	a.Hb = [];
	for (var b = 1; 100 > b; b++) {
		var d = "track_",
			d = d + (10 > b ? "0" + b.toString() : b.toString());
		A.caches.json[d] && a.Hb.push(A.caches.json[d])
	}
}
k.update = function(a) {
	33 < a && (a = 33);
	a *= .001;
	this.Sb -= a;
	if (0 > this.Sb) {
		this.Sb = this.Oe;
		this.input && Ea(this.input);
		this.vc.textContent != this.map.na && (this.vc.textContent = this.map.na);
		var b = ha(this.map.time);
		this.Dc.textContent != b && (this.Dc.textContent = b)
	}
	if (!this.paused) {
		this.time += a;
		this.da = this.O.camera;
		this.input.update(this.da, a);
		this.map.update(a, this.time);
		b = this.A;
		if (b.alive) {
			b.X && (b.u.linearDamping = b.Se, b.Tb += b.Re * a, b.zb.set(0, b.Tb, 0), b.u.applyForce(b.zb, b.u.position));
			var d, e = 0;
			b.bb = !1;
			for (var f =
					0; f < b.J.world.contacts.length; f++)
				if (d = b.J.world.contacts[f], d.bi === b.u) {
					var g = -1 * d.ni.dot(b.xa);
					e < g && (e = g, .2 < e && (b.bb = !0, b.fb ? b.fb = !1 : b.Pa = !1, d.bj.material == b.J.M.la && (b._input.ib = !0, b.xb = !0)))
				}
			b.Fa ? b._input.ib = !1 : (0 < b._input.Fb.length() && (b.Cb.copy(b._input.Fb).multiplyScalar(b.Id), b.zb.set(b.Cb.x, b.Cb.y, b.Cb.z), b.u.applyForce(b.zb, b.u.position)), b._input.ib && (b._input.ib = !1, b.bb && (b.Pa = !0, b.fb = !0, b.jb = b.ge, d = .015 * b.he * e, b.u.velocity.y < d && (b.u.velocity.y = d))))
		}
		this.u.update(a);
		b = this.A;
		d = this.da;
		e = b.u.angularVelocity.length();
		b.Ka = !1;
		b.X ? (b.S("win", 1), b.sa.copy(d.position), b.sa.x -= b.u.position.x, b.sa.z -= b.u.position.z, b.sa.y = 0, 0 < b.sa.length() && (b.Qc.lookAt(b.sa), b.oa.quaternion.slerp(b.Qc.quaternion, 5 * a))) : (b.alive ? (b.eb -= a, b.$c && (b.Pa || b.fb || (b.eb = .2), b.$c = null), b.jb -= a, 2.5 > e ? 0 > b.eb && (b.bb || !b.Pa ? "run_extrem" == b.Y._clip.name ? b.S("idle", .3) : b.S("idle", .7) : 0 < b.jb ? b.S("jump", .1) : b.S("run_extrem", .1)) : b.rb && e < b.Kd || !b.rb && e < b.Ld ? 0 > b.eb && (b.bb || !b.Pa ? ("run_extrem" == b.Y._clip.name ? b.S("run", .3) :
			b.S("run", .7), b.Y.timeScale = Math.min(e / 12, 1.5)) : 0 < b.jb ? b.S("jump", .1) : b.S("run_extrem", .1)) : (b.Ka = !0, b.S("run_extrem", .3))) : (b.S("run_extrem", .2), b.Ka = !1), b.oa.quaternion.copy(b.u.quaternion), b.rb != b.Ka && b.Ka && (b.Jc = !0), b.rb = b.Ka);
		b.oa.position.copy(b.u.position);
		b.aa.update(a);
		this.ab.update(a);
		this.O.update(a);
		Fa(this);
		this.A.alive && !this.A.X && this.A.u.position.y < this.map.Oa && Ga(this);
		if (this.A.X) this.uc && (this.uc = !1, A.caches.audio.character_victory.play()), this.B.Aa.volume(0);
		else {
			b = this.da.position.distanceTo(this.A.u.position);
			b = Math.min(1, b / this.De);
			b = 1 - b;
			d = this.A.u.angularVelocity.length();
			this.B.Aa.rate(Math.min(d / 25, 2.5));
			this.B.Aa.volume(b);
			this.A.wb -= a;
			d = this.sd.distanceTo(this.A.u.velocity) * a;
			if (.4 < d || this.A.xb) {
				f = e = !1;
				this.A.xb && (e = !0, this.A.xb = !1);
				for (g = 0; g < this.u.world.contacts.length; g++) c = this.u.world.contacts[g], c.bi === this.A.u && (c.bj.material == this.u.M.P ? f = e = !0 : c.bj.material == this.u.M.la && (e = !0));
				e && (this.A.wb = this.A.Ud);
				f ? this.B.P.isPlaying || (this.B.P.rate(Math.max(.5, Math.min(.6 * d - .25, 1.5))), this.B.P.volume(b),
					this.B.P.play()) : e ? this.B.Wa.isPlaying || (this.B.Wa.rate(Math.max(.5, Math.min(.6 * d - .25, 1.5))), this.B.Wa.volume(b), this.B.Wa.play()) : (this.B.Xa.rate(Math.min(1.2 * d - .25, 1.5)), this.B.Xa.volume(Math.min(this.B.Xa._rate, 1) * b), this.B.Xa.play(), 1 < d && this.O.state == this.O.T.ec && 0 > this.A.wb && !this.B.Ya.isPlaying && (this.B.Ya.rate(.8 + .4 * Math.random()), this.B.Ya.volume(.5 * b), this.B.Ya.play()))
			}
			.4 < d && (this.pc = !0);
			this.sd.copy(this.A.u.velocity);
			this.tc && this.O.state != this.O.T.ic && (this.tc = !1, A.caches.audio.character_start.play());
			this.A.Jc && (this.A.Jc = !1)
		}
		this.Db.matrix.copy(this.map.Ia.matrix);
		this.Eb.matrix.copy(this.map.wa.matrix);
		if (this.pc && 0 == this.A.Pa && 0 == this.A.fb)
			for (this.pc = !1, b = 0; b < this.u.world.contacts.length; b++) c = this.u.world.contacts[b], c.bi === this.A.u && (this.ra.copy(this.A.u.position), this.ra.x += .7 * c.ri.x, this.ra.y += .7 * c.ri.y, this.ra.z += .7 * c.ri.z, this.m.N.position.copy(this.ra), this.m.N.reset(), this.m.N.C = this.m.N.Ja, this.m.N.visible = !0);
		this.A.X || 50 < this.A.u.velocity.length() ? (this.m.H.visible = !0, this.m.H.frustumCulled =
			this.A.X, this.m.H.emitters[0].alive = !0, this.m.H.C = this.m.H.Ja, this.m.H.emitters[0].setPositionLocalv3(this.A.u.position)) : this.m.H.emitters[0].alive = !1;
		this.A.X && (this.m.I.visible = !0, this.m.I.C = this.m.I.Ja, this.Za -= a, 0 > this.Za && (this.Za = this.Zd, this.pa.copy(this.A.u.position), this.pa.x += 10 * (Math.random() - .5), this.pa.y += 10 + 10 * Math.random(), this.pa.z += 10 * (Math.random() - .5), this.m.I.position.copy(this.pa), this.m.I.reset(), this.m.I.lookAt(this.da.position)));
		this.A.nd && this.m.bf.emitters[0].setPositionLocalv3(this.A.u.position);
		0 < this.m.N.C && (this.m.N.C -= a, 0 >= this.m.N.C && (this.m.N.visible = !1));
		0 < this.m.I.C && (this.m.I.C -= a, 0 >= this.m.I.C && (this.m.I.visible = !1));
		0 < this.m.H.C && (this.m.H.C -= a, 0 >= this.m.H.C && (this.m.H.visible = !1));
		0 < this.m.W.C && (this.m.W.C -= a, 0 >= this.m.W.C && (this.m.W.visible = !1));
		this.ga.update(a);
		this.Lc.update(a);
		this.materials.Ua && (this.materials.Ua.uniforms.playerPos.value = this.A.u.position);
		this.materials.vb && (this.materials.vb.uniforms.playerPos.value = this.A.u.position);
		this.fade && this.fade.update(a);
		this.Sa &&
			(this.Sa.material.uniforms.time.value = this.time, this.Sa.material.uniforms.viewPosition.value = this.da.position, this.Sa.material.uniforms.playerPosition.value = this.A.za.position);
		this.Sa.update(this.da.position, this.map.Oa);
		this.xc.position.copy(this.da.position);
		this.renderer.clear();
		this.renderer.render(this.ia, this.da);
		this.renderer.render(this.ta, this.da);
		a = this.fade;
		a.Ca && this.renderer.render(a.ia, this.da);
		this.jc || this.O.state != this.O.T.ec || (this.jc = !0, this.Gb.classList.remove("hide"), this.Gb.classList.add("fadeOut"))
	}
};

function va(a, b) {
	b ? (GameAnalytics("addProgressionEvent", "Fail", "Level", U()), GameAnalytics("addProgressionEvent", "Fail", "Time", U(), Math.floor(a.map.time))) : GameAnalytics("addProgressionEvent", "Start", "Level", U());
	a.paused = !1;
	a.A.Fa = !0;
	a.map.reset();
	a.A.reset(a.map.Ad, a.map.yc);
	Da(a);
	a.fade.fadeIn(1);
	var d = a.O;
	d.camera.up.set(0, 1, 0);
	d.state = d.T.ic;
	var e = d.G.oa.getWorldDirection();
	b ? (d.camera.position.copy(e), d.camera.position.multiplyScalar(-d.ve), d.camera.position.add(d.G.u.position), d.camera.position.y +=
		d.we, d.Ea = d.xe) : (e.cross(d.xa), d.camera.position.copy(e), d.camera.position.multiplyScalar(d.cd), d.camera.position.add(d.G.u.position), d.camera.position.y += d.dd, d.Ea = d.ed);
	a.ab.reset();
	a.Lc.reset();
	a.Za = 0;
	a.tc = !0;
	a.uc = !0;
	a.lb.classList.add("hide");
	a.Gb.classList.add("hide");
	a.Gb.classList.remove("fadeOut");
	a.jc = !1;
	Ha(a.input)
}

function U() {
	var a = "Level-";
	10 > t + 1 && (a += "0");
	return a += t + 1
}

function Fa(a) {
	if (!a.A.X && a.A.alive && a.map.ea) {
		var b = !1;
		if (a.map.ea.body)
			for (var d = 0; d < a.u.world.contacts.length; d++) c = a.u.world.contacts[d], c.bi === a.A.u && c.bj.fd && (b = !0);
		else 10 > a.A.u.position.distanceTo(a.map.ea.position) && (b = !0);
		a.input.Tc && (a.input.Tc = !1, b = !0);
		b && (a.ab.trigger(), a.m.W.C = 2, a.m.W.visible = !0, a.m.W.position.copy(a.map.ea.position), a.m.W.reset(!0), a.A.X = !0, a.A.Fa = !0, a.O.state = a.O.T.zc, b = {
			stars: Ia(a),
			score: Ja(a)
		}, (d = v.getItem(u[t], null)) ? b.score > d.score && v.setItem(u[t], b) : v.setItem(u[t],
			b), GameAnalytics("addProgressionEvent", "Complete", U(), "Stars", Ia(a).toString()), GameAnalytics("addProgressionEvent", "Complete", U(), "Time", "", Math.floor(a.map.time)), GameAnalytics("addProgressionEvent", "Complete", U(), "PickupsCollected", a.map.na.toString()), setTimeout(function() {
			Da(this);
			this.fade.fadeOut(1)
		}.bind(a), 1750), setTimeout(function() {
			this.A.X && x.start("inbetween", Ja(this), Ia(this), this.map.na, this.map.fa.length, this.map.time, this.map.Ra)
		}.bind(a), 3E3))
	}
}

function Ga(a) {
	a.A.alive && (setTimeout(function() {
		this.fade.fadeOut(1)
	}.bind(a), 1900), a.Lc.trigger(a.A.u.position, a.map.Oa), A.caches.audio.character_scream.play(), a.A.alive = !1, a.A.Fa = !0, a.O.state = a.O.T.zc, setTimeout(function() {
		0 == this.A.alive && va(this, !0)
	}.bind(a), 3E3))
}
k.resize = function(a, b) {
	this.O.resize(a, b);
	this.renderer.setSize(a, b)
};
k.show = function() {
	this.score = 0;
	this.vc.textContent = 0;
	this.Dc.textContent = "0:00";
	var a = t;
	if (0 > a || a >= this.Hb.length) console.log("Map load index out of range");
	else {
		if (this.map) {
			var b = this.map;
			b.ca.remove(b.He);
			b.ca.remove(b.Ia);
			for (b.ca.remove(b.cc); 0 < b.qc.length;) b.J.world.remove(b.qc.pop());
			for (; 0 < b.lights.length;) b.ca.remove(b.lights.pop())
		}
		t = a;
		this.map = new Ka(this.Hb[a], this.ia, this.u, this.A, this.input, this.materials);
		this.map.wa.add(this.ab.mesh);
		a = this.ab;
		b = this.map.ea;
		a.mesh.position.copy(b.position);
		var d = new THREE.Vector3(0, -1, 0);
		d.applyQuaternion(b.quaternion);
		a.mesh.lookAt(d.add(a.mesh.position));
		for (this.map.wa.add(this.Sa.mesh); 0 < this.Hc.length;) a = this.Hc.pop(), a.parent && a.parent.remove(a), this.ga.remove(a);
		for (a = 0; a < this.map.Gc.length; a++) b = this.ga.copyFX(this.m.Ne, A.L("particle_tex_smoke")), b.position.copy(this.map.Gc[a]), this.Eb.add(b), this.Hc.push(b)
	}
	va(this)
};

function Ia(a) {
	var b = 1;
	a.map && (a.map.na >= a.map.fa.length && b++, a.map.time <= a.map.Ra && b++);
	return b
}

function Ja(a) {
	var b = a.map.time;
	1 > b && (b = 1);
	var d = 100;
	b < 2 * a.map.Ra && (d += 2E3 * (1 - b / (2 * a.map.Ra)));
	b <= a.map.Ra && (d += 500);
	a.map.fa && 0 < a.map.fa.length && (d += a.map.na / a.map.fa.length * 2E3, a.map.na >= a.map.fa.length && (d += 500));
	return d = parseInt(d)
}
k.Le = function() {
	if (!this.A.X && this.A.alive) {
		var a = !this.lb.classList.toggle("hide");
		(this.paused = a) ? (y.track("pause"), GameAnalytics("addDesignEvent", "Game:Paused"), w ? this.mb.classList.add("muted") : this.mb.classList.remove("muted")) : (console.log("exec"), y.track("weiterspielen"), GameAnalytics("addDesignEvent", "Game:UnPaused"))
	}
};
k.Me = function() {
	this.mb.classList.toggle("muted");
	this.mb.classList.contains("muted") ? (Howler.mute(!0), w = !0) : (Howler.mute(!1), w = !1)
};
k.Fe = function() {
	x.start("levelSelect")
};

function V() {}
V.prototype = Object.create(K.prototype);
V.prototype.constructor = V;
V.prototype.init = function() {
	L(this);
	this.Ga = this.screen.querySelector(".hideScroll");
	this.ma = this.screen.querySelector(".entries");
	this.ac = this.screen.querySelector(".templates .entry");
	this.jd = this.Ga.scrollHeight - this.Ga.clientHeight;
	this.le = this.screen.querySelector("button.back");
	this.le.addEventListener("click", function() {
		x.start("menu")
	});
	La(this)
};
V.prototype.show = function() {
	GameAnalytics("addDesignEvent", "LevelSelect");
	for (M(this); this.ma.firstChild;) this.ma.removeChild(this.ma.firstChild);
	var a = u.reduce(function(a, b, d) {
		return v.getItem(b, null) && d > a ? d : a
	}.bind(this), 0);
	a < u.length - 1 && v.getItem(u[a], null) && a++;
	for (var b = null, d = 0; d < u.length; d++) {
		var e = this.ac.cloneNode(!0),
			f = (d + 1).toString(),
			g = v.getItem(u[d], null),
			h;
		g ? (h = g.stars, g = g.score) : (h = null, g = 0);
		h || 0 != d && !v.getItem(u[d - 1], null) || (g = h = 0);
		var l = !0;
		switch (h) {
			case 0:
				e.classList.add("unlocked");
				e.querySelector(".num").innerHTML = f;
				e.querySelector(".score").innerHTML = g;
				break;
			case 1:
				e.classList.add("stars-1");
				e.querySelector(".num").innerHTML = f;
				e.querySelector(".score").innerHTML = g;
				break;
			case 2:
				e.classList.add("stars-2");
				e.querySelector(".num").innerHTML = f;
				e.querySelector(".score").innerHTML = g;
				break;
			case 3:
				e.classList.add("stars-3");
				e.querySelector(".num").innerHTML = f;
				e.querySelector(".score").innerHTML = g;
				break;
			case null:
				l = !1
		}
		a == d && (e.classList.add("lastUnlocked"), b = e);
		l && function() {
			var a =
				d;
			e.addEventListener("click", function() {
				Ma(a)
			}.bind(this))
		}.call(this);
		this.ma.appendChild(e)
	}
	this.jd = this.Ga.scrollHeight - this.Ga.clientHeight;
	this.Ga.scrollTop = 0 === a ? this.jd : b.offsetTop + b.clientHeight - this.Ga.clientHeight / 2
};

function Ma(a) {
	x.start("preloader", "preload_game", function() {
		t = a;
		x.start("game")
	})
}
V.prototype.Ob = function() {
	x.start("highscore")
};

function La(a) {
	function b() {
		f.removeEventListener(h ? "touchmove" : "mousemove", d);
		f.removeEventListener(h ? "touchend" : "mouseup", b);
		h || f.removeEventListener("mouseleave", b)
	}

	function d(a) {
		var b = h ? a.touches[0].screenY : a.clientY;
		f.scrollTop -= -g + b;
		g = b;
		a.preventDefault()
	}

	function e(a) {
		g = (h = "touches" in a) ? a.touches[0].screenY : a.clientY;
		f.addEventListener(h ? "touchmove" : "mousemove", d);
		f.addEventListener(h ? "touchend" : "mouseup", b);
		h || f.addEventListener("mouseleave", b)
	}
	var f = a.Ga,
		g = 0,
		h = !1;
	f.addEventListener("touchstart",
		e);
	f.addEventListener("mousedown", e)
}

function Y() {
	this.hb = !1;
	this.score = 0
}
Y.prototype = Object.create(K.prototype);
k = Y.prototype;
k.constructor = Y;
k.init = function() {
	L(this);
	this.Mc = this.screen.querySelector(".wrapper-main");
	this.Nc = this.screen.querySelector(".wrapper-popup");
	this.ua = this.screen.querySelector("button.next");
	this.ua.addEventListener("click", this.Ha.bind(this));
	this.ua.classList.remove("submit");
	this.ua.classList.remove("hide");
	this.gb = this.screen.querySelector("button.map");
	this.gb.addEventListener("click", this.Ge.bind(this));
	this.cb = this.screen.querySelector("button.again");
	this.cb.addEventListener("click", this.qe.bind(this));
	this.re = this.screen.querySelector("button.okay");
	this.re.addEventListener("click", this.be.bind(this))
};
k.show = function(a, b, d, e, f, g) {
	GameAnalytics("addDesignEvent", "GameOver");
	M(this);
	var h;
	if (!(h = t >= u.length - 1)) {
		h = !0;
		for (var l = 0; l < u.length; l++) v.getItem(u[l], null) || (h = !1)
	}
	h && this.ua.classList.add("hide");
	document.getElementById("vjoybase").style.opacity = "0";
	document.getElementById("vjoystick").style.opacity = "0";
	this.screen.querySelector(".star1").classList.remove("unlocked");
	this.screen.querySelector(".star2").classList.remove("unlocked");
	this.screen.querySelector(".star3").classList.remove("unlocked");
	0 < b && this.screen.querySelector(".star1").classList.add("unlocked");
	1 < b && this.screen.querySelector(".star2").classList.add("unlocked");
	2 < b && (this.screen.querySelector(".star3").classList.add("unlocked"), A.caches.audio.win_3_stars.play());
	this.screen.querySelector("p.score").innerHTML = a;
	this.screen.querySelector(".pickups").innerHTML = d + "/" + e;
	this.screen.querySelector(".time").innerHTML = ha(f) + "/" + ha(g);
	this.Mc.classList.remove("hide");
	this.Nc.classList.add("hide");
	t >= u.length - 1 && (this.Mc.classList.add("hide"),
		this.Nc.classList.remove("hide"))
};
k.Ha = function() {
	n.play();
	x.start("preloader", "preload_game", function() {
		t++;
		x.start("game")
	})
};
k.Ge = function() {
	n.play();
	x.start("levelSelect")
};
k.qe = function() {
	n.play();
	x.start("preloader", "preload_game", function() {
		x.start("game")
	})
};
k.be = function() {
	this.Mc.classList.remove("hide");
	this.Nc.classList.add("hide")
};

function Z() {}
Z.prototype = Object.create(K.prototype);
Z.prototype.constructor = Z;
Z.prototype.init = function() {
	L(this);
	this.Va = this.screen.querySelector("button.back");
	this.Va.addEventListener("click", this.ob.bind(this))
};
Z.prototype.show = function(a) {
	GameAnalytics("addDesignEvent", "Credits");
	M(this);
	p.fade(r, .5 * r, 500);
	this.$a = a || "menu";
	this.B = null
};
Z.prototype.ob = function() {
	n.play();
	x.start(this.$a)
};

function Ba(a) {
	this.G = a;
	this.xa = new THREE.Vector3(0, 1, 0);
	this.camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, .1, 4E3);
	this.camera.position.set(20, 20, 20);
	this.resize(window.innerWidth, window.innerHeight);
	this.camera.lookAt(new THREE.Vector3);
	this.ba = new THREE.Vector3;
	this.ke = new THREE.Vector3(0, 4, 0);
	this.va = new THREE.Vector3;
	this.distance = 20;
	this.height = 15;
	this.Bd = 0;
	this.ie = 7;
	this.Qe = .2;
	this.sb = new THREE.Vector3;
	this.hd = new THREE.Vector3;
	this.T = {
		ic: 0,
		ec: 1,
		zc: 2
	};
	this.state =
		this.T.ic;
	this.cd = 200;
	this.dd = 100;
	this.ed = 3.1;
	this.Ea = 0;
	this.we = this.ve = 50;
	this.xe = 2;
	this.Yd = 50
}
Ba.prototype.update = function(a) {
	var b = this.distance,
		d = this.height,
		e = this.ie;
	if (0 < this.Ea) {
		this.Ea -= a;
		var f = this.Ea / this.ed,
			b = b + this.cd * f,
			d = d + this.dd * f;
		0 >= this.Ea && (this.state = this.T.ec, this.G.Fa = !1)
	} else 0 > this.G.u.velocity.y && (f = this.G.u.velocity.y, -10 > f && (f = -10), d -= f / 3, b += f / 3);
	this.ba.copy(this.G.u.position);
	this.ba.x -= this.camera.position.x;
	this.ba.y -= this.camera.position.y;
	this.ba.z -= this.camera.position.z;
	this.ba.y = 0;
	this.ba.normalize();
	.1 < this.G.u.velocity.length() && (this.sb.copy(this.G.u.velocity),
		this.sb.normalize(), this.sb.y = 0);
	this.sb.normalize().multiplyScalar(this.Qe);
	this.ba.add(this.sb);
	this.ba.normalize();
	this.Bd = d;
	this.state != this.T.zc ? (this.va.copy(this.ba), this.va.multiplyScalar(-b), this.va.add(this.G.u.position), this.va.y += this.Bd) : 0 == this.G.alive && (this.va.y += this.Yd * a);
	this.camera.position.lerp(this.va, e * a);
	this.hd.copy(this.ke).add(this.G.u.position);
	this.camera.lookAt(this.hd)
};
Ba.prototype.resize = function(a, b) {
	this.camera.aspect = a / b;
	this.camera.updateProjectionMatrix()
};

function Ka(a, b, d, e, f, g) {
	this.time = 0;
	this.ca = b;
	this.J = d;
	this.G = e;
	this._input = f;
	this.qc = [];
	this.wa = this.Ia = null;
	this.Ke = 4;
	this.qb = .6;
	this.Oa = this.ea = this.yc = this.Ad = null;
	this.lights = [];
	this.Gc = [];
	this.oc = [];
	this.dc = [];
	this.Ra = 60;
	this.fa = [];
	this.rc = .2;
	this.na = 0;
	this.He = new THREE.Object3D;
	this.cc = new THREE.Object3D;
	this.Ub = 100;
	this.ae = new THREE.MeshBasicMaterial({
		color: new THREE.Color(1, 0, 1),
		wireframe: !1,
		transparent: !0,
		opacity: .2
	});
	this.ja = new aa(a, {
		"env_atlas_01.json": A.$d("env_atlas_01"),
		env_atlas_01: g.Ua,
		env_atlas_01_transparent: null
	}, {
		alphaTest: .55,
		transparent: !0
	});
	this.lights.push(new THREE.AmbientLight(new THREE.Color(.6, .6, .8), 1));
	this.lights.push(new THREE.DirectionalLight(new THREE.Color(1, 1, .5), .6));
	this.lights[this.lights.length - 1].position.set(.25, 1, .5).normalize();
	for (a = 0; a < this.lights.length; a++) this.ca.add(this.lights[a]);
	this.Ia = new THREE.Object3D;
	this.wa = new THREE.Object3D;
	this.$b = new THREE.Object3D;
	Na(this, this.ja.world);
	Oa(this, this.ja.world, this.$b);
	a = this.ja.world;
	e = {
		max: new THREE.Vector3,
		min: new THREE.Vector3
	};
	Pa(this, a, e);
	e.max.x++;
	e.max.y++;
	e.max.z++;
	e.min.x--;
	e.min.y--;
	e.min.z--;
	d = new THREE.Vector3;
	d.x = Math.abs(e.max.x - e.min.x);
	d.y = Math.abs(e.max.y - e.min.y);
	d.z = Math.abs(e.max.z - e.min.z);
	b = new THREE.Vector3(Math.floor(d.x / this.Ub + 1), Math.floor(d.y / this.Ub + 1), Math.floor(d.z / this.Ub + 1));
	e.hc = new THREE.Vector3(d.x / b.x, d.y / b.y, d.z / b.z);
	d = Array(b.x);
	for (f = 0; f < b.x; f++) {
		d[f] = Array(b.y);
		for (var h = 0; h < b.y; h++) d[f][h] = Array(b.z)
	}
	f = [];
	Qa(this, a, e, d, f);
	for (h = 0; h < f.length; h++) e = f[h], e.parent &&
		e.parent.remove(e);
	for (f = 0; f < b.x; f++)
		for (h = 0; h < b.y; h++)
			for (var l = 0; l < b.z; l++) d[f][h][l] && (e = new THREE.Mesh(d[f][h][l], this.ae), a.add(e));
	Ra(this, this.ja.world);
	this.ea.body || console.warn("No physics body attached to goal");
	if (!this.Oa) {
		if (this.J && this.J.world.bodies && this.J.world.bodies[0]) {
			a = this.J.world.bodies;
			b = a[0].position.y;
			for (d = 1; d < a.length; d++) b > a[d].position.y && (b = a[d].position.y);
			a = b
		} else a = 0;
		this.Oa = a
	}
	Sa(this, this.ja.world, this.ja.rd);
	Ta(this, this.ja.world);
	Ua(this, this.ja.world, g);
	Va(this,
		this.ja.world);
	this.ca.add(this.cc);
	this.wa.add(this.ja.world);
	this.wa.add(this.$b);
	this.$b.visible = !1;
	this.ca.add(this.Ia);
	this.Ia.add(this.wa);
	this.Lb = new THREE.Quaternion;
	this.Kb = new THREE.Quaternion
}
Ka.prototype.update = function(a) {
	this.G.Fa || (this.time += a);
	this.Ia.position.copy(this.G.u.position);
	this.wa.position.copy(this.G.u.position).multiplyScalar(-1);
	this.Kb.set(0, 0, 0, 1);
	this.G.Fa || (this.Lb.setFromAxisAngle(this._input.Na, this._input.F.x * this.qb), this.Kb.copy(this.Lb), this.Lb.setFromAxisAngle(this._input.yb, -this._input.F.y * this.qb * .8), this.Kb.multiply(this.Lb));
	this.Ia.quaternion.slerp(this.Kb, this.Ke * a);
	for (var b = 0; b < this.oc.length; b++) {
		var d = this.oc[b],
			e = d.Nb.getPointAt((this.time / d.zd +
				d.yd) % 1);
		d.mesh.position.copy(e);
		d.body.position.copy(e)
	}
	for (b = 0; b < this.dc.length; b++) d = this.dc[b], d.position.y = this.Xe(d.position), d.body.position.copy(d.position);
	for (b = 0; b < this.fa.length; b++) d = this.fa[b], d.visible && (d.Bc ? (e = d.pb / this.rc, d.scale.set(d.Jb.x * e, d.Jb.y * e, d.Jb.z * e), d.pb -= a, d.position.y += 8 * a, d.rotation.z += 6 * a, 0 > d.pb && (d.visible = !1)) : d.position.distanceTo(this.G.u.position) < d.oe && (d.Bc = !0, A.caches.audio.pickup.play(), this.na++), d.rotation.z += 2 * a);
	this.G.X && (this.ea.visible = !1);
	this.ea.rotation.z +=
		a
};
Ka.prototype.reset = function() {
	for (var a = this.na = this.time = 0; a < this.fa.length; a++) {
		var b = this.fa[a];
		b.visible = !0;
		b.Bc = !1;
		b.pb = this.rc;
		b.position.copy(b.pe);
		b.scale.copy(b.Jb)
	}
	this.ea.visible = !0
};

function Na(a, b) {
	if (b.D)
		for (var d, e = 0; e < b.D.length; e++) d = b.D[e], "fx" == d.name && "torch" == d.value && (b.ee = !0);
	for (e = 0; e < b.children.length; e++) d = b.children[e], Na(a, d), d.ee && (b.remove(d), a.Gc.push(d.position), e--)
}

function Ra(a, b) {
	if (b.D)
		for (var d, e = 0; e < b.D.length; e++) d = b.D[e], "start" == d.name ? (a.Ad = (new THREE.Vector3).copy(b.position), b.updateMatrixWorld(), a.yc = new THREE.Vector3(0, -1, 0), a.yc.applyQuaternion(b.quaternion), b.body && a.J.world.remove(b.body), b.parent && (b.visible = !1)) : "falloutheight" == d.name ? a.Oa = parseFloat(d.value) : "goal" == d.name ? (b.fd = !0, b.body && (b.body.fd = !0), a.ea = b) : "star_time" == d.name && (a.Ra = parseInt(d.value));
	for (e = 0; e < b.children.length; e++) Ra(a, b.children[e])
}

function Ta(a, b) {
	if ("Mesh" == b.type && b.D)
		for (var d, e = 0; e < b.D.length; e++) d = b.D[e], "pickup" == d.name && (b.Bc = !1, b.pb = a.rc, b.oe = parseFloat(d.value), b.pe = (new THREE.Vector3).copy(b.position), b.Jb = (new THREE.Vector3).copy(b.scale), b.rotation.z += 6 * Math.random(), a.fa.push(b), b.body && a.J.world.remove(b.body));
	for (e = 0; e < b.children.length; e++) Ta(a, b.children[e])
}

function Ua(a, b, d) {
	if ("Mesh" == b.type && !b.Ye) {
		var e = !1;
		if (b.D)
			for (var f = 0; f < b.D.length; f++)
				if (c = b.D[f], "transparent" == c.name) {
					b.material = d.Pc;
					e = !0;
					break
				} else if ("doubleside" == c.name) {
			b.material = d.vb;
			e = !0;
			break
		} else if ("pickup" == c.name) {
			b.material = d.Td;
			e = !0;
			break
		}
		0 == e && (b.material = d.Ua)
	}
	for (f = 0; f < b.children.length; f++) Ua(a, b.children[f], d)
}

function Oa(a, b, d) {
	if ("Mesh" == b.type) {
		var e = b.userData.source + ".phy";
		if (A.caches.json.layouts_phy[e]) {
			for (var f = null, g = !1, h, l = 0; l < b.D.length; l++) h = b.D[l], "phy" == h.name && ("bouncy" == h.value ? f = a.J.M.la : "bumper" == h.value ? f = a.J.M.P : "none" == h.value && (g = !0));
			if (!g) {
				e = A.caches.json.layouts_phy[e];
				f = f ? new CANNON.Body({
					mass: 0,
					material: f
				}) : new CANNON.Body({
					mass: 0
				});
				g = new THREE.Vector3(1, 1, 1);
				b && (g.x = parseFloat(b.scale.x), g.y = parseFloat(b.scale.y), g.z = parseFloat(b.scale.z));
				for (var l = new CANNON.Vec3, q = new CANNON.Vec3,
						W = new THREE.Quaternion, X = 0; X < e.shapes.length; X++) h = e.shapes[X], l.x = g.x * h.scale.x * .5, l.y = g.y * h.scale.y * .5, l.z = g.z * h.scale.z * .5, q.x = h.position.x * g.x, q.y = h.position.y * g.y, q.z = h.position.z * g.z, W.set(h.quaternion._x, h.quaternion._y, h.quaternion._z, h.quaternion._w), "cube" == h.phyType ? f.addShape(new CANNON.Box(new CANNON.Vec3(l.x, l.y, l.z)), q, W) : f.addShape(new CANNON.Sphere(l.x), q, W);
				b && (f.position.copy(b.position), f.quaternion.copy(b.quaternion));
				a.J.world.add(f);
				a.qc.push(f);
				b.body = f
			}
		}
	}
	for (l = 0; l < b.children.length; l++) Oa(a,
		b.children[l], d)
}

function Sa(a, b, d) {
	if ("Mesh" == b.type && b.D) {
		for (var e, f = null, g = 0; g < b.D.length; g++) {
			e = b.D[g];
			if ("spline" == e.name) {
				for (var h = 0; h < d.length; h++) d[h].D[0].value == e.value && (f = {
					mesh: b,
					Xd: b.Xd,
					Nb: d[h].Nb,
					yd: 0,
					zd: 5,
					body: b.body
				}, a.oc.push(f));
				if (f) break
			}
			if (f) break
		}
		if (f)
			for (g = 0; g < b.D.length; g++) e = b.D[g], "spline_offset" == e.name ? f.yd = parseFloat(e.value) : "spline_time" == e.name && (f.zd = parseFloat(e.value))
	}
	for (g = 0; g < b.children.length; g++) Sa(a, b.children[g], d)
}

function Va(a, b) {
	if (b.D)
		for (var d, e = 0; e < b.D.length; e++) d = b.D[e], "floating" == d.name && (b.de = !0, b.We = parseFloat(d.value));
	for (e = 0; e < b.children.length; e++) d = b.children[e], Va(a, d), d.de && (b.remove(d), a.cc.add(d), a.dc.push(d), e--)
}

function Pa(a, b, d) {
	"Mesh" == b.type && (b.position.x > d.max.x && (d.max.x = b.position.x), b.position.y > d.max.y && (d.max.y = b.position.y), b.position.z > d.max.z && (d.max.z = b.position.z), b.position.x < d.min.x && (d.min.x = b.position.x), b.position.y < d.min.y && (d.min.y = b.position.y), b.position.z < d.min.z && (d.min.z = b.position.z));
	for (var e = 0; e < b.children.length; e++) Pa(a, b.children[e], d)
}

function Qa(a, b, d, e, f) {
	if ("Mesh" == b.type) {
		for (var g = !1, h = 0; h < b.D.length; h++)
			if (c = b.D[h], "spline" == c.name || "pickup" == c.name || "floating" == c.name || "start" == c.name || "goal" == c.name || "static" == c.name || "transparent" == c.name || "doubleside" == c.name) {
				g = !0;
				break
			}
		g || (g = (new THREE.Vector3).copy(b.position), g.x -= d.min.x, g.y -= d.min.y, g.z -= d.min.z, g.x = Math.floor(g.x / d.hc.x), g.y = Math.floor(g.y / d.hc.y), g.z = Math.floor(g.z / d.hc.z), e[g.x][g.y][g.z] || (e[g.x][g.y][g.z] = new THREE.Geometry), b.updateMatrixWorld(), e[g.x][g.y][g.z].merge(b.geometry,
			b.matrixWorld), f.push(b))
	}
	for (h = 0; h < b.children.length; h++) Qa(a, b.children[h], d, e, f)
}

function Aa(a, b, d) {
	this.xa = new THREE.Vector3(0, 1, 0);
	this.ca = a;
	this.J = b;
	this._input = d;
	this.oa = this.za = this.u = null;
	this.Qc = new THREE.Object3D;
	new THREE.Quaternion;
	this.alive = !0;
	this.rb = this.Ka = this.nd = this.X = !1;
	this.Ld = 30;
	this.Kd = 20;
	new THREE.Quaternion;
	this.bb = !0;
	this.Jd = 1;
	this.Id = 100;
	this.Fa = !0;
	this.friction = .3;
	this.Se = .99;
	this.Tb = 500;
	this.Re = 0;
	this.he = 2500;
	this.Jc = this.xb = !1;
	this.wb = 0;
	this.Ud = .5;
	this.$c = null;
	this.eb = -1;
	this.fb = this.Pa = !1;
	this.jb = -1;
	this.ge = .5;
	this.u = new CANNON.Body({
		mass: this.Jd,
		material: this.J.M.A
	});
	this.u.addShape(new CANNON.Sphere(2));
	this.u.linearDamping = .2;
	this.u.angularDamping = .2;
	this.u.position.set(0, 0, 0);
	this.J.world.add(this.u);
	geometry = A.Yc("char_01");
	texture = A.L("char_01");
	texture.minFilter = THREE.NearestMipMapLinearFilter;
	texture.magFilter = THREE.NearestFilter;
	material = new THREE.MeshLambertMaterial({
		map: texture,
		skinning: !0,
		fog: !1
	});
	a = !(E() && F());
	this.za = new THREE.SkinnedMesh(geometry, material, a);
	this.za.position.set(0, 0, 0);
	this.oa = new THREE.Object3D;
	this.oa.add(this.za);
	this.ca.add(this.oa);
	this.aa = new THREE.AnimationMixer(this.za);
	for (a = 0; a < this.za.geometry.animations.length; ++a) this.aa.clipAction(this.za.geometry.animations[a]);
	this.Y = this.aa.clipAction("idle").reset().setEffectiveWeight(1).play();
	this.zb = new CANNON.Vec3;
	this.Cb = new THREE.Vector3;
	this.sa = new THREE.Vector3;
	new THREE.Vector3
}
Aa.prototype.reset = function(a, b) {
	this.alive = !0;
	this.nd = this.rb = this.Ka = this.X = !1;
	this.Tb = 0;
	this.u.linearDamping = this.friction;
	this.u.position.copy(a);
	this.u.velocity.copy(b);
	this.u.angularVelocity.set(0, 0, 0);
	var d = Math.atan2(b.x, b.z) - Math.atan2(0, 1),
		e = new THREE.Quaternion;
	e.setFromAxisAngle(this.xa, d);
	this.u.quaternion.copy(e);
	this.oa.quaternion.copy(e)
};
Aa.prototype.S = function(a, b) {
	if (this.Y._clip.name != a) {
		this.aa.stopAllAction();
		var d = this.aa.clipAction(a);
		0 < b ? this.Y.crossFadeTo(d, b, !1).play() : d.reset().setEffectiveWeight(1).play();
		this.Y = d
	}
};

function xa(a) {
	this.Md = a;
	this.F = new THREE.Vector2;
	this.Fb = new THREE.Vector3;
	this.kc = F();
	this.Na = new THREE.Vector3;
	this.yb = new THREE.Vector3;
	this.Tc = this.ib = !1;
	this.xa = new THREE.Vector3(0, 1, 0);
	this.ce = 1;
	this.j = {
		Ba: null,
		Z: 0,
		$: 0,
		Qb: 0,
		Rb: 0,
		radius: 75,
		Cc: 0,
		df: .1,
		Wd: .1,
		nc: !1,
		ya: null,
		needsUpdate: !0
	};
	this.U = {
		active: !1,
		Ze: null,
		Ab: null,
		Uc: null,
		Rc: 30,
		qb: 3
	};
	Wa(this);
	Xa(this, this.Md.renderer.domElement);
	this.Ec = new THREE.Vector3;
	this.Fc = new THREE.Vector3;
	this.Fd = new THREE.Vector2
}
xa.prototype.update = function(a, b) {
	if (a) {
		this.Na.copy(a.getWorldDirection());
		this.Na.y = 0;
		this.Na.normalize();
		this.yb.copy(this.Na).cross(this.xa);
		this.yb.normalize();
		this.F.copy(this.lc);
		this.j && (this.j.Cc += b, this.Fd.set(this.j.Z, this.j.$), this.Fd.length() > this.j.Wd && (this.F.x -= this.j.Z * this.j.Z * Math.sign(this.j.Z), this.F.y += this.j.$ * this.j.$ * Math.sign(this.j.$)));
		!this.U.active && this.U.Uc && 8 < this.U.Uc.getScreenAdjustedAcceleration().z && (this.U.active = !0, Ha(this));
		0 < this.F.length() && (this.U.active = !1);
		if (this.U.active && this.U.Ab) {
			var d = this.U.Ab.getScreenAdjustedEuler();
			d.beta -= this.U.Rc;
			d.gamma = Math.max(-90, Math.min(90, d.gamma));
			d.beta = Math.max(-90, Math.min(90, d.beta));
			d.gamma /= 90 / this.U.qb;
			d.beta /= 90 / this.U.qb;
			d.gamma = d.gamma * d.gamma * Math.sign(d.gamma);
			d.beta = d.beta * d.beta * Math.sign(d.beta);
			this.F.x += d.gamma;
			this.F.y -= d.beta
		}
		this.F.x = Math.max(-1, Math.min(1, this.F.x));
		this.F.y = Math.max(-1, Math.min(1, this.F.y));
		1 < this.F.length() && this.F.normalize();
		this.F.x *= this.ce;
		this.Ec.copy(this.Na);
		this.Fc.copy(this.yb);
		this.Ec.multiplyScalar(this.F.y);
		this.Fc.multiplyScalar(this.F.x);
		this.Fb.set(0, 0, 0).add(this.Ec).add(this.Fc)
	}
};

function Ha(a) {
	if (a.U.Ab) {
		var b = a.U.Ab.getScreenAdjustedEuler();
		a.U.Rc = b.beta
	}
}
xa.prototype.reset = function() {
	this.F.set(0, 0);
	this.Fb.set(0, 0, 0);
	this.ib = !1
};

function Wa(a) {
	a.lc = new THREE.Vector2;
	var b = !1,
		d = !1,
		e = !1,
		f = !1,
		g = function() {
			this.lc.y = b && d ? 0 : b ? 1 : d ? -1 : 0;
			this.lc.x = e && f ? 0 : e ? -1 : f ? 1 : 0
		}.bind(a);
	window.addEventListener("keydown", function(a) {
		switch (a.keyCode) {
			case 38:
				b = !0;
				a.preventDefault();
				break;
			case 40:
				d = !0;
				a.preventDefault();
				break;
			case 37:
				e = !0;
				a.preventDefault();
				break;
			case 39:
				f = !0;
				a.preventDefault();
				break;
			case 32:
				a.preventDefault()
		}
		g()
	}.bind(a), !1);
	window.addEventListener("keyup", function(a) {
		switch (a.keyCode) {
			case 38:
				b = !1;
				a.preventDefault();
				break;
			case 40:
				d = !1;
				a.preventDefault();
				break;
			case 37:
				e = !1;
				a.preventDefault();
				break;
			case 39:
				f = !1;
				a.preventDefault();
				break;
			case 32:
				a.preventDefault()
		}
		g()
	}.bind(a), !1)
}

function Xa(a, b) {
	a.j.Zb = document.getElementById("vjoybase");
	a.j.Ac = document.getElementById("vjoystick");
	a.j.Ba = b;
	a.j.Sd = function(a) {
		null === this.j.ya && (a.preventDefault(), a = a.changedTouches[0], this.j.ya = a.identifier, this.j.md(a.pageX, a.pageY))
	}.bind(a);
	a.j.Qd = function() {
		if (null !== this.ya) {
			for (var a = event.changedTouches, b = 0; b < a.length && a[b].identifier !== this.j.ya; b++);
			if (b !== a.length) return this.j.ya = null, event.preventDefault(), this.j.pd()
		}
	}.bind(a);
	a.j.Rd = function() {
		if (null !== this.ya) {
			for (var a = event.changedTouches,
					b = 0; b < a.length && a[b].identifier !== this.j.ya; b++);
			if (b !== a.length) return a = a[b], event.preventDefault(), this.j.od(a.pageX, a.pageY)
		}
	}.bind(a);
	a.j.Nd = function(a) {
		this.j.nc = !0;
		a.preventDefault();
		this.j.md(a.clientX, a.clientY)
	}.bind(a);
	a.j.Pd = function() {
		this.j.nc = !1;
		this.j.pd()
	}.bind(a);
	a.j.Od = function(a) {
		this.j.nc && this.j.od(a.clientX, a.clientY)
	}.bind(a);
	a.j.md = function(a, b) {
		this.j.Cc = 0;
		this.j.Qb = a;
		this.j.Rb = b;
		this.j.Z = this.j.$ = 0;
		this.j.Zb.style.opacity = "1";
		this.j.Ac.style.opacity = "1";
		this.j.needsUpdate = !0;
		Ea(this)
	}.bind(a);
	a.j.pd = function() {
		this.j.Zb.style.opacity = "0";
		this.j.Ac.style.opacity = "0";
		this.j.Z = this.j.$ = 0;
		this.j.needsUpdate = !0
	}.bind(a);
	a.j.od = function(a, b) {
		this.j.Z = (this.j.Qb - a) / this.j.radius;
		this.j.$ = (this.j.Rb - b) / this.j.radius;
		var f = Math.sqrt(this.j.Z * this.j.Z + this.j.$ * this.j.$);
		1 < f && (this.j.Z /= f, this.j.$ /= f);
		this.j.needsUpdate = !0
	}.bind(a);
	a.j.Ba.addEventListener("touchstart", a.j.Sd, !1);
	a.j.Ba.addEventListener("touchend", a.j.Qd, !1);
	a.j.Ba.addEventListener("touchmove", a.j.Rd, !1);
	a.j.Ba.addEventListener("mousedown",
		a.j.Nd, !1);
	a.j.Ba.addEventListener("mouseup", a.j.Pd, !1);
	a.j.Ba.addEventListener("mousemove", a.j.Od, !1)
}

function Ea(a) {
	a.j && a.j.needsUpdate && (a.j.needsUpdate = !1, a.j.Zb.style.transform = "translate(" + (a.j.Qb - 70) + "px, " + (a.j.Rb - 70) + "px)", a.j.Ac.style.transform = "translate(" + (a.j.Qb - 40 - a.j.Z * a.j.radius) + "px, " + (a.j.Rb - 40 - a.j.$ * a.j.radius) + "px)")
}

function ya() {
	this.world = null;
	this.M = {
		A: null,
		la: null,
		P: null
	};
	this.Ib = {
		la: null,
		P: null
	};
	this.world = new CANNON.World;
	this.world.quatNormalizeSkip = 0;
	this.world.quatNormalizeFast = !1;
	this.world.gravity.set(0, -100, 0);
	this.world.broadphase = new CANNON.NaiveBroadphase;
	var a = new CANNON.GSSolver;
	a.iterations = 2;
	a.tolerance = .1;
	this.world.solver = new CANNON.SplitSolver(a);
	this.world.defaultContactMaterial.friction = .01;
	this.M.A = new CANNON.Material;
	this.M.A.name = "player";
	this.M.la = new CANNON.Material;
	this.M.la.name =
		"bounce";
	this.M.P = new CANNON.Material;
	this.M.P.name = "bumper";
	this.Ib.la = new CANNON.ContactMaterial(this.M.A, this.M.la, {
		friction: .9,
		restitution: .9
	});
	this.world.addContactMaterial(this.Ib.la);
	this.Ib.P = new CANNON.ContactMaterial(this.M.A, this.M.P, {
		friction: .9,
		restitution: 1.5
	});
	this.world.addContactMaterial(this.Ib.P)
}
ya.prototype.update = function(a) {
	this.world.step(a)
};
window.addEventListener("load", function() {
	x = new N;
	y = new FSToggoApi("pufferball3d");
	v = new fa("pufferball3d", !1);
	var a = new J;
	a.onLoad = function() {
		x.add("preloader", O);
		x.start("preloader", "preload_base", function() {
			z = A.qa("config");
			console.log("version: " + z.version);
			GameAnalytics("configureBuild", z.version);
			GameAnalytics("initialize", ba[1].gameKey, ba[1].ud);
			for (var a = [], d = 1; 100 > d; d++)
				for (var e = "track_", e = e + (10 > d ? "0" + d.toString() : d.toString()), f = 0; f < A.caches.json.preload_game.json.length; f++)
					if (A.caches.json.preload_game.json[f].id ==
						e) {
						a.push(A.caches.json.preload_game.json[f].url);
						break
					}
			u = a;
			t = 0;
			p = A.Da("music");
			p.loop(!0);
			r = .3;
			p.volume(r);
			p.play();
			n = A.Da("click");
			x.add("menu", P);
			x.add("game", T);
			x.add("highscore", Q);
			x.add("instructions", R);
			x.add("gameOver", S);
			x.add("levelSelect", V);
			x.add("inbetween", Y);
			x.add("credits", Z);
			x.start("menu")
		})
	};
	pa(a, "tpl_preloader", "tpl/preloader.tpl");
	oa(a, "preload_base", "data/preload_base.json");
	la(a, "preloadImg", "assets/img/loading.png");
	la(a, "turnDeviceImg", "assets/img/turnDevice.png")
});