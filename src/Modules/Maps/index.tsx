import React, {createRef, useState, Component, useRef, useEffect } from "react";
import { ViewBase } from "Gui/Layout/View/index";
import LayoutService from "Gui/Layout/service";
// import { ContextMenuTrigger, ContextMenu, ContextMenuItem, Submenu } from 'rctx-contextmenu';
import { locationLokeren, mapConfig ,Location,} from "./sampleData";
import {Layer, Map,Source,ViewState, MapRef ,Marker} from 'react-map-gl';
import bbox from '@turf/bbox';
import "./style.scss"
import { GraphqlHelper } from "src/Core/Base/graphql";
import { QUERY_OBJECT } from "../Database/graphql/object";
import { GeoJSON } from "geojson";
// import { Joystick } from 'react-joystick-component';
import Motor from './motor'
import {ContextMenu,ContextMenuItem } from 'Gui/component/ContentMenu'
const graphql = new GraphqlHelper()

// import mapboxgl from 'mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
 
// mapboxgl.accessToken = mapConfig.accessToken;
 
// function Maps(props:any) {
//   const {gps,positions} = props
//   const mapContainer = useRef(null);
//   const [maps, setMaps] = useState<mapboxgl.Map>();
//   const polygon:any = {
//     'type': 'geojson',
//     'data': {
//       'type': 'FeatureCollection',
//       'features': [
//           {
//               'type': 'Feature',
//               'geometry': {
//                   'type': 'Polygon',
//                   'coordinates': [positions]
//               },
//               "properties": {}
//           },
//       ]
//     }
//   }
//   useEffect(() => {
//     if (mapContainer.current && !maps) {
//       var data = new mapboxgl.Map({
//         container: mapContainer.current,
//         style: mapConfig.style,
//         // center: [gps.longitude, gps.latitude],
//         zoom: 5
//       });
//       setMaps(data)
        
//       // data.on('move', () => {
//       //   var lng = data.getCenter().lng
//       //   setLng(parseFloat(data.getCenter().lng.toFixed(4)));
//       //   setLat(parseFloat(data.getCenter().lat.toFixed(4)));
//       //   setZoom(parseFloat(data.getZoom().toFixed(2)));
//       // });

//       // const marker = new mapboxgl.Marker({
//       //   color: '#F84C4C' // color it red
//       // });
//       // marker.setLngLat([gps.longitude, gps.latitude]);
//       // marker.addTo(data);
//       data.on('load', () => {
      
//         data.addSource('national-park',polygon);

//         data.addLayer({
//           'id': 'park-boundary',
//           'type': 'fill',
//           'source': 'national-park',
//           'paint': {
//               'fill-color': '#888888',
//               'fill-opacity': 0.4
//           },
//           'filter': ['==', '$type', 'Polygon']
//         });

//       })
      

//     }
//   });
//   useEffect(() => {
//     if(maps){
//       const source = maps.getSource('national-park')
//       if(source){
//         // source.setData(polygon)
//         console.log(source)
//       }
//     }
//   },[positions]);
 
// return (
//   <div ref={mapContainer} className="map-container" />
// );
// }

export class MapBox extends ViewBase {
  // containerRef =  createRef();
  private containerRef: React.RefObject<HTMLInputElement>;
  private mapRef:React.RefObject<MapRef>;
  constructor(props: any) {
    super(props);
    this.containerRef = createRef();
    this.mapRef = createRef();
    this.state = {
      position:[],
      contentmenu:false,
      position_current:{
        log:105.21557063965588,
        lat:10.079797555328199
      }
    }
  }
  onVisibility(status: boolean) {
    // console.log("View3D status: ", status);
    if (status) {
    }
  }
  componentDidMount() {

  }
  onResize() {
    const current = this.mapRef.current
    if(current){
      current.resize();
      var map:any = current.getMap()
      if(map){
        // map._canvas.height = this.props.node._rect.height
        // map._canvas.width = this.props.node._rect.width
        // map._canvas.style.height = `${this.props.node._rect.height}px`
        // map._canvas.style.width = `${this.props.node._rect.width}px`
        // console.log(this.props.node._rect.width,this.props.node._rect.height)

      }
      
    }
    
  }
  fetch(){
    const config =  this.props.node._attributes.config;
    graphql.query(QUERY_OBJECT.GET_OBJECT_CHILDREN,{  
      "namedoc": config?.doc,
      "nameobject": config?.object
    }).then((data:any)=>{
      var gpss:any[] = []
      for (let index = 0; index < data.objectChildren.length; index++) {
        const element = data.objectChildren[index];
        const gps = element?.propertys?.find(x=>x.name == "Gps")
        if(gps){
          const val:any = gps.value
          gpss.push([val.log,val.lat])
        }
        
      }
      this.setState({position:gpss})
      
    })
  }
  onShowContentMenu(e){
    this.setState({"contentmenu":true})
  }
  onHideContentMenu(e){
    this.setState({"contentmenu":false})
  }
  onChangeGps(gps){
    // console.log(gps)
    this.setState({
      position_current:{
        log:gps.longitude,
        lat:gps.latitude
      }
    })
  }
  render() {
    const self = this
    var data:GeoJSON =  {
      type: "FeatureCollection",
      features: [
        {
          "geometry": {
            "coordinates": [this.state["position"]]
          ,
            "type": "Polygon"
          },
          "type": "Feature",
          "properties": {}
    
        }
      ]
    }
    return (
      <>
      <ContextMenu show={this.state["contentmenu"]} 
        onShow={self.onShowContentMenu.bind(self)} 
        onHide={self.onHideContentMenu.bind(self)}>
        <Map
        ref={this.mapRef}
        initialViewState={{
          longitude: locationLokeren.lng,
          latitude: locationLokeren.lat,
          zoom: 12
        }}
        // viewState={{width:100,height:100}}
        mapboxAccessToken={mapConfig.accessToken}
        mapStyle={mapConfig.style}
        // onLoad={()=>{
        //   this.onResize()
        // }}
        // style={{width:width,height:height}}
      >
        {
          
          this.state["position"].map((item,index)=>{
            return (
              <Marker key={index} latitude={item[1]} longitude={item[0]}>
                <img
                style={{width:"30px"}}
                  src="/assets/image/Select-595b40b75ba036ed117d58f7.svg"
                  alt="map icon"
                />
            </Marker>
            )
          })
        }
        <Marker key={0} 
          latitude={this.state["position_current"].lat} 
          longitude={this.state["position_current"].log}>
            <img
            style={{width:"30px"}}
              src="/assets/image/Select-595b40b75ba036ed117d58f7.svg"
              alt="map icon"
            />
        </Marker>
         <Source type="geojson" data={data}>
          <Layer
            type="line"
            source="my-data"
            layout={{
              "line-join": "round",
              "line-cap": "round"
            }}
            paint={{
              "line-color": "rgba(3, 170, 238, 0.5)",
              "line-width": 5
            }}
          />
        </Source>
        </Map>
        <ContextMenuItem onClick={()=>{
            const [minLng, minLat, maxLng, maxLat] = bbox(data);
            // self.mapRef.current?.flyTo({center: [minLng, minLat], duration: 2000});
            self.mapRef.current?.fitBounds(
                [
                  [minLng, minLat],
                  [maxLng, maxLat]
                ],
                {padding: 40, duration: 1000}
              );
        }}>Localtion current</ContextMenuItem>
        <ContextMenuItem onClick={()=>{
            const current = this.state["position_current"]
            self.mapRef.current?.fitBounds(
                [
                  [current.log, current.lat],
                  [current.log, current.lat],
                ],
                {padding: 40, duration: 1000}
              );
        }}>Localtion</ContextMenuItem>
        <ContextMenuItem>Add Localtion</ContextMenuItem>
        <ContextMenuItem onClick={self.fetch.bind(self)}>Refresh</ContextMenuItem>
      </ContextMenu>
      <Motor onChangeGps={self.onChangeGps.bind(self)}></Motor>
      </>
    )
    // return (
    //   <>
    // <ContextMenuTrigger 
      
    //     className="item-box" 
    //     id="1"
    //   >
    //   <Maps gps={this.state['position_current']}></Maps>
    //   </ContextMenuTrigger >
    //   <ContextMenu id="1" >
    //     <ContextMenuItem onClick={()=>{
    //         const [minLng, minLat, maxLng, maxLat] = bbox(data);
    //         // self.mapRef.current?.flyTo({center: [minLng, minLat], duration: 2000});
    //         self.mapRef.current?.fitBounds(
    //             [
    //               [minLng, minLat],
    //               [maxLng, maxLat]
    //             ],
    //             {padding: 40, duration: 1000}
    //           );
    //     }}>Localtion current</ContextMenuItem>
    //     <ContextMenuItem onClick={()=>{
    //         const current = this.state["position_current"]
    //         self.mapRef.current?.fitBounds(
    //             [
    //               [current.log, current.lat],
    //               [current.log, current.lat],
    //             ],
    //             {padding: 40, duration: 1000}
    //           );
    //     }}>Localtion</ContextMenuItem>
    //     <ContextMenuItem>Add Localtion</ContextMenuItem>
    //     <ContextMenuItem onClick={self.fetch.bind(self)}>Refresh</ContextMenuItem>
    //   </ContextMenu>
    //   <Motor onChangeGps={self.onChangeGps.bind(self)}></Motor>
    //   </>
    // )
    // // var data = this.props.node._attributes.config?.Object
    // // let height = this.props.node._rect.height
    // // let width = this.props.node._rect.width
    
    
    // return (
     
    //   <>
    //   <ContextMenuTrigger 
      
    //     className="item-box" 
    //     id="1"
    //   >
    //   <Map
    //     ref={this.mapRef}
    //     initialViewState={{
    //       longitude: locationLokeren.lng,
    //       latitude: locationLokeren.lat,
    //       zoom: 12
    //     }}
    //     // viewState={{width:100,height:100}}
    //     mapboxAccessToken={mapConfig.accessToken}
    //     mapStyle={mapConfig.style}
    //     // onLoad={()=>{
    //     //   this.onResize()
    //     // }}
    //     // style={{width:width,height:height}}
    //   >
    //     {
          
    //       this.state["position"].map((item,index)=>{
    //         return (
    //           <Marker key={index} latitude={item[1]} longitude={item[0]}>
    //             <img
    //             style={{width:"30px"}}
    //               src="/assets/image/Select-595b40b75ba036ed117d58f7.svg"
    //               alt="map icon"
    //             />
    //         </Marker>
    //         )
    //       })
    //     }
    //     <Marker key={0} 
    //       latitude={this.state["position_current"].lat} 
    //       longitude={this.state["position_current"].log}>
    //         <img
    //         style={{width:"30px"}}
    //           src="/assets/image/Select-595b40b75ba036ed117d58f7.svg"
    //           alt="map icon"
    //         />
    //     </Marker>
    //      <Source type="geojson" data={data}>
    //       <Layer
    //         type="line"
    //         source="my-data"
    //         layout={{
    //           "line-join": "round",
    //           "line-cap": "round"
    //         }}
    //         paint={{
    //           "line-color": "rgba(3, 170, 238, 0.5)",
    //           "line-width": 5
    //         }}
    //       />
    //     </Source>
    //   </Map>
    //   </ContextMenuTrigger >
    //   <ContextMenu id="1" >
    //     <ContextMenuItem onClick={()=>{
    //         const [minLng, minLat, maxLng, maxLat] = bbox(data);
    //         // self.mapRef.current?.flyTo({center: [minLng, minLat], duration: 2000});
    //         self.mapRef.current?.fitBounds(
    //             [
    //               [minLng, minLat],
    //               [maxLng, maxLat]
    //             ],
    //             {padding: 40, duration: 1000}
    //           );
    //     }}>Localtion current</ContextMenuItem>
    //     <ContextMenuItem onClick={()=>{
    //         const current = this.state["position_current"]
    //         self.mapRef.current?.fitBounds(
    //             [
    //               [current.log, current.lat],
    //               [current.log, current.lat],
    //             ],
    //             {padding: 40, duration: 1000}
    //           );
    //     }}>Localtion</ContextMenuItem>
    //     <ContextMenuItem>Add Localtion</ContextMenuItem>
    //     <ContextMenuItem onClick={self.fetch.bind(self)}>Refresh</ContextMenuItem>
    //   </ContextMenu>
    //   <Motor onChangeGps={self.onChangeGps.bind(self)}></Motor>
    //   </>
    // );
  }
}
LayoutService.addLayout("MapBox", MapBox);