"use client";



import { AssetRecordType, DefaultActionsMenu, DefaultActionsMenuContent, StateNode, TLComponents, Tldraw, TldrawUiMenuItem, track, useEditor } from '@tldraw/tldraw'
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
    const image = "https://placehold.co/1000x1000.png"; // You could also use a base64 encoded string here;
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
    const image = "https://placehold.co/1000x500.png"; // You could also use a base64 encoded string here;
    const width = 1000;
    const height = 500;
    
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
		<div style={{ backgroundColor: 'thistle' }}>
			<DefaultActionsMenu>
				<div style={{ backgroundColor: 'thistle' }}>
					<TldrawUiMenuItem
						id="hockey"
						label="Full Hockey Rink"
						icon="external-link"
						readonlyOk
						onSelect={() => {
              editor.setCurrentTool('hockeyrink');
						}}
					/>
				</div>

				<div style={{ backgroundColor: 'thistle' }}>
					<TldrawUiMenuItem
						id="half"
						label="Half Hockey Rink"
						icon="external-link"
						readonlyOk
						onSelect={() => {
              editor.setCurrentTool('halfrink');
						}}
					/>
				</div>
				<DefaultActionsMenuContent />
			</DefaultActionsMenu>
		</div>
	)
});

const components: TLComponents = {
	ActionsMenu: CustomActionsMenu,
}

const tools = [HockeyRinkTool, HalfRinkTool];

export default function App() {
  return (
    <>
    <div className="h-full">
      <Tldraw tools={tools} components={components} />
    </div>
      </>
  );
}

