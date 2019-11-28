'use strict';

import React, { Component } from 'react';

import {StyleSheet} from 'react-native';

import {
  ViroARScene,
  ViroDirectionalLight,
  ViroBox,
  ViroConstants,
  ViroARTrackingTargets,
  ViroMaterials,
  ViroText,
  ViroImage,
  ViroFlexView,
  ViroARImageMarker,
  ViroARObjectMarker,
  ViroAmbientLight,
  ViroARPlane,
  ViroAnimatedImage,
  ViroAnimations,
  ViroNode,
  Viro3DObject,
  ViroQuad,
  ViroVideo,
  ViroARPlaneSelector,
  ViroButton
} from 'react-viro';

const width = 0.210;
const height = 0.158;

export default class HelloWorldSceneAR extends Component {

  state = {
    isTracking: false,
    initialized: false,
    runAnimation: false
  }

  getNoTrackingUI(){
    const { isTracking, initialized } = this.state;
    return (
      <ViroText text={
        initialized ? 'Initializing AR...'
          : "No Tracking"
      }/>
    )
  }



  getARScene() {
    return (
      <ViroNode>
        <ViroARImageMarker target={"book"}
          onAnchorFound={
            () => this.setState({
                runAnimation: true
            })}
            onAnchorRemoved={
            () => this.setState({
                runAnimation: false
            })}
        >
            <ViroNode
              rotation={[-90, 0, 0]}
              position={[0, 0, 0]}
              animation={{
                name:'animateImage',
                run: this.state.runAnimation
              }}
            >
                  <ViroImage
                    position={[0, 0, 0]}
                    height={height}
                    width={width}
                    style={styles.image}
                    source={require('./res/space.jpg')}
                    scale={[1, 1, 1]}
                  />
                  {/* <ViroVideo
                      source={require('./res/train.mp4')}
                      loop={true}
                      style={styles.image}
                      height={height}
                      width={width}
                      style={styles.image}
                  /> */}
            </ViroNode>
        </ViroARImageMarker>
      </ViroNode>
    )
  }

  render() {
    return (
      <ViroARScene onTrackingUpdated={this._onInitialized} >
        { this.state.isTracking ? this.getNoTrackingUI() : this.getARScene() }
      </ViroARScene>
    );
  }

  _onInitialized = (state, reason) => {
    if (state == ViroConstants.TRACKING_NORMAL) {
      isTracking: true
    } else if (state == ViroConstants.TRACKING_NONE) {
      isTracking: false
    }
  }
}

var styles = StyleSheet.create({
  image: {
    flex: 1,
  },
});

ViroARTrackingTargets.createTargets({
  "book" : {
    source : require('./res/6509018-1.jpg'),
    orientation : "Up",
    physicalWidth : width, // real world width in meters
    physicalHeight : height // real world width in meters
  }
});

ViroAnimations.registerAnimations({
  animateImage:{
    properties:{
      positionX: 0,
      opacity: 1.0
    },
      easing:"Bounce",
      duration: 500
  },
});

module.exports = HelloWorldSceneAR;
