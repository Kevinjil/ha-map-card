import FocusFollowConfig from "../../configs/FocusFollowConfig";
import EntitiesRenderService from "./EntitiesRenderService";
import { LatLng, latLng } from "leaflet";

describe("EntitiesRenderService", () => {
  describe("render", () => {
    it("should have a method", () => {
      expect(new EntitiesRenderService().render).toBeDefined();
    });
  });

  describe("setup", () => {
    it("should have a method", () => {
      expect(new EntitiesRenderService().setup).toBeDefined();
    });
  });

  describe("setInitialView", () => {
    it("With 2 Latlngs", () => {
      const map = {
        setView: jest.fn(),
        fitBounds: jest.fn(),
      };
      const hass = {};
      const entitiesRenderService = new EntitiesRenderService(map, [], hass, {}, {}, {}, true);
      
      // Test data
      const testData = [
        [1.1, 2.1],
        [ 2.1, 3.1],
        [ 1.7, -4.9]
      ];
      entitiesRenderService.entities = testDataToMarker(testData);

      entitiesRenderService.setInitialView();
      expect(map.fitBounds).toBeCalledWith({"_northEast": {"lat": 2.2, "lng": 3.9000000000000004}, "_southWest": {"lat": 1, "lng": -5.7}});
    });
  });

  describe("updateInitialView", () => {
    it("in case of no entities with focusOnFit", () => {
      const map = {
        setView: jest.fn(),
        fitBounds: jest.fn(),
        getBounds: jest.fn().mockReturnValue({contains: jest.fn().mockReturnValue(true)}),
      };
      const hass = {};
      const entitiesRenderService = new EntitiesRenderService(map, [], hass, {}, {}, {}, true);

      // Test data
      const testData = [
        [1.1, 2.1],
        [ 2.1, 3.1],
        [ 1.7, -4.9]
      ];

      entitiesRenderService.entities = testDataToMarker(testData, false);
      entitiesRenderService.updateInitialView();
      expect(map.fitBounds).not.toBeCalled();
      
  });

  it("in case of FocusFollow.isNone", () => {
    const map = {
      setView: jest.fn(),
      fitBounds: jest.fn(),
      getBounds: jest.fn().mockReturnValue({contains: jest.fn().mockReturnValue(true)}),
    };
    const focusFollow = new FocusFollowConfig("contains");
    const hass = {};
    const entitiesRenderService = new EntitiesRenderService(map, hass, focusFollow, {}, {}, {}, true);

    // Test data
    const testData = [
      [1.1, 2.1],
      [ 2.1, 3.1],
      [ 1.7, -4.9]
    ];

    entitiesRenderService.entities = testDataToMarker(testData);
    entitiesRenderService.updateInitialView();
    expect(map.fitBounds).not.toBeCalled();
  });

  it("in case of FocusFollow.isContains", () => {
    const map = {
      setView: jest.fn(),
      fitBounds: jest.fn(),
      getBounds: jest.fn().mockReturnValue({contains: jest.fn().mockReturnValue(true)}),
    };
    const focusFollow = new FocusFollowConfig("contains");
    const hass = {};
    const entitiesRenderService = new EntitiesRenderService(map, hass, focusFollow, {}, {}, {}, true);

    // Test data
    const testData = [
      [1.1, 2.1],
      [ 2.1, 3.1],
      [ 1.7, -4.9]
    ];

    entitiesRenderService.entities = testDataToMarker(testData);
    entitiesRenderService.updateInitialView();
    expect(map.fitBounds).not.toBeCalled();
  });

  it("in case of FocusFollow.isContains and bounds not contains", () => {
    const map = {
      setView: jest.fn(),
      fitBounds: jest.fn(),
      getBounds: jest.fn().mockReturnValue({contains: jest.fn().mockReturnValue(false)}),
    };
    const focusFollow = new FocusFollowConfig("contains");
    const hass = {};
    const entitiesRenderService = new EntitiesRenderService(map, hass, focusFollow, {}, {}, {}, true);

    // Test data
    const testData = [
      [1.1, 2.1],
      [ 2.1, 3.1],
      [ 1.7, -4.9]
    ];

    entitiesRenderService.entities = testDataToMarker(testData);
    entitiesRenderService.updateInitialView();
    expect(map.fitBounds).toBeCalled();
  });

  it("in case of FocusFollow.isRefocus", () => {
    const map = {
      setView: jest.fn(),
      fitBounds: jest.fn(),
      getBounds: jest.fn().mockReturnValue({contains: jest.fn().mockReturnValue(true)}),
    };
    const focusFollow = new FocusFollowConfig("refocus");
    const hass = {};
    const entitiesRenderService = new EntitiesRenderService(map, hass, focusFollow, {}, {}, {}, true);

    // Test data
    const testData = [
      [1.1, 2.1],
      [ 2.1, 3.1],
      [ 1.7, -4.9]
    ];

    entitiesRenderService.entities = testDataToMarker(testData);
    entitiesRenderService.updateInitialView();
    expect(map.fitBounds).toBeCalled();
  });

});

function testDataToMarker(testData, focusOnFit = true) {
  return testData.map((data) => {
    return {     
      latLng: new LatLng(data[0], data[1]),
      config: {
        focusOnFit: focusOnFit,
      },
    };
  });
}});