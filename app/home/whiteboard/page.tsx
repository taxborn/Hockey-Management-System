"use client";



import { AssetRecordType, DefaultActionsMenu, StateNode, TLComponents, Tldraw, TldrawUiMenuItem, track, useEditor } from '@tldraw/tldraw'
import './index.css'
import React from 'react'

class HockeyRinkTool extends StateNode {
  static override id = "hockeyrink";

  // This happens when the cursor enters the editor of TlDraw
	override onEnter = () => {
		this.editor.setCursor({ type: 'cross', rotation: 0 })
	}

  // This happens when the user clicks on the editor
	override onPointerDown = () => {
		const { currentPagePoint } = this.editor.inputs
    const assetId = AssetRecordType.createId();
    const image = "/Rink_Horizontal_Color.jpg"; // You could also use a base64 encoded string here;
    const width = 1000;
    const height = 1000;
    
    this.editor.createAssets([
      {
        id: assetId,
        type: 'image',
        typeName: 'asset',
        props: {
          name: 'tldraw.png',
          src: image,
          w: width,
          h: height,
          mimeType: 'image/png',
          isAnimated: false,
        },
        meta: {},
      },
    ]);

    // We thought we didn't need this, we do.
    this.editor.createShape({
			type: 'image',
			// Let's center the image in the editor
			x: currentPagePoint.x - width / 2,
			y: currentPagePoint.y - height / 2,
			props: {
				assetId,
				w: width,
				h: height,
			},
		});

    // We want to reset the tool to the select tool so we don't place multiple rinks
    this.editor.setCurrentTool('select');
	}
}

class VerticalHockeyRinkTool extends StateNode {
  static override id = "hockeyrink";

  // This happens when the cursor enters the editor of TlDraw
	override onEnter = () => {
		this.editor.setCursor({ type: 'cross', rotation: 0 })
	}

  // This happens when the user clicks on the editor
	override onPointerDown = () => {
		const { currentPagePoint } = this.editor.inputs
    const assetId = AssetRecordType.createId();
    const image = "/Rink_Horizontal_Color.jpg"; // You could also use a base64 encoded string here;
    const width = 1000;
    const height = 1000;
    
    this.editor.createAssets([
      {
        id: assetId,
        type: 'image',
        typeName: 'asset',
        props: {
          name: 'tldraw.png',
          src: image,
          w: width,
          h: height,
          mimeType: 'image/png',
          isAnimated: false,
        },
        meta: {},
      },
    ]);

    // We thought we didn't need this, we do.
    this.editor.createShape({
			type: 'image',
			// Let's center the image in the editor
			x: currentPagePoint.x - width / 2,
			y: currentPagePoint.y - height / 2,
			props: {
				assetId,
				w: width,
				h: height,
			},
		});

    // We want to reset the tool to the select tool so we don't place multiple rinks
    this.editor.setCurrentTool('select');
	}
}

class HalfRinkTool extends StateNode {
  static override id = "halfrink";

	override onEnter = () => {
		this.editor.setCursor({ type: 'cross', rotation: 0 })
	}

	override onPointerDown = () => {
		const { currentPagePoint } = this.editor.inputs
    const assetId = AssetRecordType.createId();
    const image = "/Rink_Half-Ice-Right_Color.jpg"; // You could also use a base64 encoded string here;
    const width = 1000;
    const height = 1000;
    
    this.editor.createAssets([
      {
        id: assetId,
        type: 'image',
        typeName: 'asset',
        props: {
          name: 'tldraw.png',
          src: image,
          w: width,
          h: height,
          mimeType: 'image/png',
          isAnimated: false,
        },
        meta: {},
      },
    ]);

    this.editor.createShape({
			type: 'image',
			// Let's center the image in the editor
			x: currentPagePoint.x - width / 2,
			y: currentPagePoint.y - height / 2,
			props: {
				assetId,
				w: width,
				h: height,
			},
		});

    this.editor.setCurrentTool('select');
	}
}

class GoalzoneTool extends StateNode {
  static override id = "Goalzone";

	override onEnter = () => {
		this.editor.setCursor({ type: 'cross', rotation: 0 })
	}

	override onPointerDown = () => {
		const { currentPagePoint } = this.editor.inputs
    const assetId = AssetRecordType.createId();
    const image = "/Rink_End-Zone-Left_Color.jpg"; // You could also use a base64 encoded string here;
    const width = 1000;
    const height = 1000;
    
    this.editor.createAssets([
      {
        id: assetId,
        type: 'image',
        typeName: 'asset',
        props: {
          name: 'tldraw.png',
          src: image,
          w: width,
          h: height,
          mimeType: 'image/png',
          isAnimated: false,
        },
        meta: {},
      },
    ]);

    this.editor.createShape({
			type: 'image',
			// Let's center the image in the editor
			x: currentPagePoint.x - width / 2,
			y: currentPagePoint.y - height / 2,
			props: {
				assetId,
				w: width,
				h: height,
			},
		});

    this.editor.setCurrentTool('select');
	}
}

class LeftHalfRinkTool extends StateNode {
  static override id = "lefthalfrink";

	override onEnter = () => {
		this.editor.setCursor({ type: 'cross', rotation: 0 })
	}

	override onPointerDown = () => {
		const { currentPagePoint } = this.editor.inputs
    const assetId = AssetRecordType.createId();
    const image = "/Rink_Half-Ice-Left_Color.jpg"; // You could also use a base64 encoded string here;
    const width = 1000;
    const height = 1000;
    
    this.editor.createAssets([
      {
        id: assetId,
        type: 'image',
        typeName: 'asset',
        props: {
          name: 'tldraw.png',
          src: image,
          w: width,
          h: height,
          mimeType: 'image/png',
          isAnimated: false,
        },
        meta: {},
      },
    ]);

    this.editor.createShape({
			type: 'image',
			// Let's center the image in the editor
			x: currentPagePoint.x - width / 2,
			y: currentPagePoint.y - height / 2,
			props: {
				assetId,
				w: width,
				h: height,
			},
		});

    this.editor.setCurrentTool('select');
	}
}
export const CustomActionsMenu = track(() => {
  const editor = useEditor();
	return (
		
			<DefaultActionsMenu>
				<div>
					<TldrawUiMenuItem
						id="hockey"
						label="Hockey Rink"
						icon="align-center-horizontal"
						readonlyOk
						onSelect={() => {
              editor.setCurrentTool("hockeyrink");
						}}
					/>
				</div>

        <div>
					<TldrawUiMenuItem
						id="half"
						label="Right Half Rink"
						icon="align-center-right"
						readonlyOk
						onSelect={() => {
              editor.setCurrentTool('halfrink');
						}}
					/>
				</div>

        <div>
					<TldrawUiMenuItem
						id="Goal"
						label="Left Half rink"
						icon="geo-arrow-left"
						readonlyOk
						onSelect={() => {
              editor.setCurrentTool('lefthalfrink');
						}}
					/>
				</div>

				<div >
					<TldrawUiMenuItem
						id="Goal"
						label="Goal Zone"
						icon="align-center-left"
						readonlyOk
						onSelect={() => {
              editor.setCurrentTool('Goalzone');
						}}
					/>
				</div>

        
				

				
			</DefaultActionsMenu>

	)
});

const components: TLComponents = {
	ActionsMenu: CustomActionsMenu,
}

const tools = [HockeyRinkTool, HalfRinkTool, GoalzoneTool, LeftHalfRinkTool];

export default function App() {
  return (
    <>
    <div className="h-full">
      <Tldraw tools={tools} components={components} />
    </div>
      </>
  );
}

