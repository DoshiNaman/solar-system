// Doshi Naman
(function () {
  var TAU,
    isSpinning,
    illo,
    planets,
    k,
    planet,
    ref$,
    i$,
    to$,
    i,
    orbit,
    n,
    animate;
  TAU = Zdog.TAU;
  isSpinning = true;
  illo = new Zdog.Illustration({
    element: "#canvas",
    dragRotate: true,
    rotate: {
      y: TAU * 0.4,
      x: -TAU / 10,
    },
    resize: "fullscreen",
    onDragStart: function () {
      var isSpinning;
      isSpinning = false;
    },
    onResize: function () {
      this.zoom = innerWidth / 115;
      this.zoom <= 10 || (this.zoom = 10);
    },
  });
  planets = {
    sun: {
      diameter: 8,
      color: "#eb710b",
      orbitDiameter: 0,
      starLight: 1.2,
      starColor: "#eb710b66",
    },
    mercury: {
      diameter: 1,
      color: "#ada8a5",
      orbitDiameter: 12,
      orbitPeriod: 88 / 2,
      orbitTilt: -TAU * 0.019,
      orbitNode: -TAU * 0.314,
      satelliteOf: "sun",
    },
    venus: {
      diameter: 1.5,
      color: "#c18f17",
      orbitDiameter: 16,
      orbitPeriod: 225 / 3,
      orbitTilt: -TAU * 0.009,
      orbitNode: -TAU * 0.213,
      satelliteOf: "sun",
    },
    earth: {
      diameter: 2,
      color: "#4f4cb0",
      orbitDiameter: 21,
      orbitPeriod: 365 / 4,
      satelliteOf: "sun",
    },
    mars: {
      diameter: 1.25,
      color: "#bc420e",
      orbitDiameter: 26,
      orbitPeriod: 687 / 5,
      orbitTilt: -TAU * 0.005,
      orbitNode: -TAU * 0.138,
      satelliteOf: "sun",
    },
    jupiter: {
      diameter: 4,
      color: "#ad7b5a",
      orbitDiameter: 40,
      orbitPeriod: 4333 / 7,
      orbitTilt: -TAU * 0.004,
      orbitNode: -TAU * 0.279,
      satelliteOf: "sun",
    },
    saturn: {
      diameter: 3,
      color: "#a37c33",
      orbitDiameter: 56,
      orbitPeriod: 10759 / 9,
      orbitTilt: -TAU * 0.007,
      orbitNode: -TAU * 0.316,
      satelliteOf: "sun",
    },
    uranus: {
      diameter: 2.75,
      color: "#5dacde",
      orbitDiameter: 72,
      orbitPeriod: 30689 / 13,
      orbitTilt: -TAU * 0.002,
      orbitNode: -TAU * 0.206,
      satelliteOf: "sun",
    },
    neptune: {
      diameter: 2.5,
      color: "#3d52b5",
      orbitDiameter: 88,
      orbitPeriod: 60182 / 17,
      orbitTilt: -TAU * 0.005,
      orbitNode: -TAU * 0.366,
      satelliteOf: "sun",
    },
    pluto: {
      diameter: 0.5,
      color: "#826e57",
      orbitDiameter: 106,
      orbitPeriod: 90560 / 25,
      orbitTilt: -TAU * 0.048,
      orbitNode: -TAU * 0.306,
      orbitTranslateZ: -5,
      satelliteOf: "sun",
    },
    moon: {
      diameter: 0.5,
      color: "#d6d6d6",
      orbitDiameter: 3,
      orbitPeriod: 27 / 2,
      orbitTilt: -TAU * 0.065,
      orbitNode: -TAU * 0.347,
      satelliteOf: "earth",
    },
    io: {
      diameter: 0.5,
      color: "#eae565",
      orbitDiameter: 5,
      orbitPeriod: 1 * 20,
      orbitTilt: 0,
      satelliteOf: "jupiter",
    },
    europa: {
      diameter: 0.5,
      color: "#9c7e5c",
      orbitDiameter: 6.5,
      orbitPeriod: 4 * 8,
      orbitTilt: -TAU * 0.001,
      satelliteOf: "jupiter",
    },
    ganymede: {
      diameter: 0.75,
      color: "#a1907e",
      orbitDiameter: 8,
      orbitPeriod: 7 * 6,
      orbitTilt: -TAU * 0.001,
      satelliteOf: "jupiter",
    },
    callisto: {
      diameter: 0.5,
      color: "#4a4e4f",
      orbitDiameter: 10,
      orbitPeriod: 17 * 3,
      orbitTilt: -TAU * 0.01,
      satelliteOf: "jupiter",
    },
    ringSaturn: {
      color: "#edc98566",
      orbitDiameter: 4,
      orbitTilt: -TAU * 0.05,
      satelliteOf: "saturn",
      ring: 4,
    },
  };
  for (k in planets) {
    planet = planets[k];
    planet.ring == null && (planet.ring = 0);
    planet.anchor = new Zdog.Anchor({
      addTo:
        ((ref$ = planets[planet.satelliteOf]) != null ? ref$.planet : void 8) ||
        illo,
      translate: {
        z: planet.orbitTranslateZ,
      },
      rotate: {
        y: planet.orbitNode,
        z: planet.orbitTilt,
      },
    });
    planet.orbitAnchor = new Zdog.Anchor({
      addTo: planet.anchor,
    });
    planet.orbits = [];
    if (planet.orbitDiameter) {
      for (i$ = 0, to$ = planet.ring; i$ <= to$; ++i$) {
        i = i$;
        orbit = new Zdog.Ellipse({
          addTo: planet.orbitAnchor,
          diameter: planet.orbitDiameter + i * 0.3,
          quarters: 1,
          rotate: {
            x: TAU / 4,
          },
          stroke: 0.1,
          color: (planet.ring && planet.color) || "#fff3",
        });
        orbit.copy().rotate.z = TAU * 0.25;
        orbit.copy().rotate.z = TAU * 0.5;
        orbit.copy().rotate.z = TAU * 0.75;
        planet.orbits.push(orbit);
      }
    }
    if (!planet.ring) {
      planet.planet = new Zdog.Shape({
        addTo: planet.orbitAnchor,
        translate: {
          x: planet.orbitDiameter / 2,
        },
        stroke: planet.diameter,
        color: planet.color,
      });
      if (planet.starColor) {
        planet.light = new Zdog.Shape({
          addTo: planet.orbitAnchor,
          translate: {
            x: planet.orbitDiameter / 2,
          },
          stroke: planet.diameter + planet.starLight,
          color: planet.starColor,
        });
      }
    }
  }
  n = 0;
  (animate = function () {
    var k, ref$, planet;
    for (k in (ref$ = planets)) {
      planet = ref$[k];
      planet.orbitAnchor.rotate.y -= TAU / planet.orbitPeriod / 5;
      if (planet.satelliteOf && planet.satelliteOf !== "sun") {
        planet.anchor.rotate.y +=
          TAU / planets[planet.satelliteOf].orbitPeriod / 5;
      }
    }
    illo.updateRenderGraph();
    ++n;
    requestAnimationFrame(animate);
  })();
}.call(this));
