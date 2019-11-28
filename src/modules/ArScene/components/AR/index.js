'use strict';

import React, { Component } from 'react';
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

import styles from './styles';

const width = 0.210;
const height = 0.158;

export default class HelloWorldSceneAR extends Component {
  constructor(props){
    super(props)
    this.state = {
      isTracking: false,
      initialized: false,
      runAnimation: false
    }
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
    const {sceneNavigator: {viroAppProps}} = this.props;
    const {type} = viroAppProps;

    return (
      <ViroNode>
        <ViroARImageMarker target={"book"}
          onAnchorFound={
            () => this.setState({
                runAnimation: true
            })}
            onAnchorRemoved={
            (eee) =>console.log('onAnchorRemoved', eee)}
        >
            <ViroNode
              rotation={[-90, 0, 0]}
              position={[0, 0, 0]}
              animation={{
                name:'animateImage',
                run: this.state.runAnimation
              }}
            >
                  {type==='image' ? (
                      <ViroImage
                        position={[0, 0, 0]}
                        height={height}
                        width={width}
                        style={styles.image}
                        source={require('./res/space.jpg')}
                        // source={{uri: 'https://img1.wbstatic.net/large/new/3510000/3510507-1.jpg'}}
                        scale={[1, 1, 1]}
                      />
                    ) : (
                      <ViroVideo
                          source={require('./res/train.mp4')}
                          loop={true}
                          style={styles.image}
                          height={height}
                          width={width}
                          style={styles.image}
                      />
                    )
                  }
            </ViroNode>
        </ViroARImageMarker>
      </ViroNode>
    )
  }

  _onInitialized = (state, reason) => {
    console.log('state', state, reason)
    if (state == ViroConstants.TRACKING_NORMAL) {
      isTracking: true
    } else if (state == ViroConstants.TRACKING_LIMITED) {
      isTracking: false
    }
  }

  render() {
    return (
      <ViroARScene onTrackingUpdated={this._onInitialized}>
        { this.state.isTracking ? this.getNoTrackingUI() : this.getARScene() }
      </ViroARScene>
    );
  }
}

ViroARTrackingTargets.createTargets({
  "book" : {
    // source : {uri: 'https://img3.labirint.ru/rc/468c84da10acf3ed5a551b7c0ecc2f70/220x340/books65/641645/cover.jpg?1564114187'}, 
    source : require('./res/book.jpg'),
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
