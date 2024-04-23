"use client";



import {  AssetRecordType, Editor, StateNode, TLComponents, Tldraw,TldrawImage } from '@tldraw/tldraw'
import './index.css'
import React, { useCallback, useState } from 'react'

let selected = "https://placehold.co/1000x1000.png";
let selected_x = 1000;
let selected_y = 1000;

function CustomActionsMenu() {
}

class HockeyRinkTool extends StateNode {
  static override id = "hockeyrink";
	// [a]
	override onEnter = () => {
		this.editor.setCursor({ type: 'cross', rotation: 0 })
	}

	// [b]
	override onPointerDown = () => {
		const { currentPagePoint } = this.editor.inputs
		// this.editor.createShape({
		// 	type: 'text',
		// 	x: currentPagePoint.x,
		// 	y: currentPagePoint.y,
		// 	props: { text: '❤️' },
		// })
    const assetId = AssetRecordType.createId();
    
    this.editor.createAssets([
      {
        id: assetId,
        type: 'image',
        typeName: 'asset',
        props: {
          name: 'tldraw.png',
          src: selected, // You could also use a base64 encoded string here
          w: selected_x,
          h: selected_y,
          mimeType: 'image/png',
          isAnimated: false,
        },
        meta: {},
      },
    ]);

    this.editor.createShape({
			type: 'image',
			// Let's center the image in the editor
			x: (currentPagePoint.x - selected_x) / 2,
			y: (currentPagePoint.y - selected_y) / 2,
			props: {
				assetId,
				w: selected_x,
				h: selected_y,
			},
		})
	}
}

// const components: TLComponents = {
//   ActionsMenu: CustomActionsMenu,
// };

const tools = [HockeyRinkTool];
export default function App() {
  return (
    <>
      <select
        name="image"
        // value={selected}
        onChange={(e) => {
          let data = e.currentTarget.value.split(',');
          selected = data[0];
          selected_x = parseInt(data[1]);
          selected_y = parseInt(data[2]);
          console.log(selected + " " + selected_x + " " + selected_y);
        }}
        className='z-50'
      >
        {/* <option value="">Select a templet</option> */}
        <option value="https://placehold.co/1000x1000.png,1000,1000">Full rink</option>
        <option value="https://placehold.co/1000x500.png,1000,500">Half rink</option>
        <option value="https://placehold.co/375x150.png,375,150">Goal zone</option>
      </select>
      
    <div className="h-full">
      <Tldraw tools={tools} initialState='hockeyrink' />
    </div>
      </>
  );
}

