import { React, Component, createRef } from 'react';
import { event } from '@tauri-apps/api'
import { extractUnlistener } from '../../helpers/DragAndDrop/Unlistener'
class DragAndDrop extends Component {
    state = {
        dragging: false,
    }

    dropHoverlisten = null;
    dropListen = null;
    unlisten = null;
    dragCounter = 0;
    dropRef = createRef();

    componentDidMount() {
        let div = this.dropRef.current
        console.log('calling functions')
        this.dropHoverlisten = event.listen('tauri://file-drop-hover', (e) => {
            this.dragCounter++;
            console.log(e.dataTransfer.items);
            if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
                this.setState({ dragging: true })
            }
        })
        // div.addEventListener('dragenter', this.handleDragIn)

        this.dropListen = event.listen('tauri://file-drop', (e) => {
            e.preventDefault()
            e.stopPropagation()
            this.setState({ dragging: false })
            if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
                this.props.handleDrop(e.dataTransfer.files)
                e.dataTransfer.clearData()
                this.dragCounter = 0
            }
        });

        this.unlisten = event.listen('tauri://file-drop-cancelled', (e) => {
            this.setState({ dragging: false })
        })

        // div.addEventListener('dragleave', this.handleDragOut)

        // div.addEventListener('dragover', this.handleDrag)
        // div.addEventListener('drop', this.handleDrop)
    }
    componentWillUnmount() {
        extractUnlistener(this.dropHoverlisten)
        extractUnlistener(this.dropListen)
        extractUnlistener(this.unlisten)
    }
    render() {
        return (
            <div
                style={{ display: 'inline-block', position: 'relative' }}
                ref={this.dropRef}
            >
                {this.state.dragging &&
                    <div
                        style={{
                            border: 'dashed grey 4px',
                            backgroundColor: 'rgba(255,255,255,.8)',
                            position: 'absolute',
                            top: 0,
                            bottom: 30,
                            left: 0,
                            right: 0,
                            zIndex: 9999
                        }}
                    >
                        <div
                            style={{
                                position: 'absolute',
                                top: '50%',
                                right: 0,
                                left: 0,
                                textAlign: 'center',
                                color: 'grey',
                                fontSize: 36
                            }}
                        >
                            <div style={{ color: 'black' }}>drop here :)</div>
                        </div>
                    </div>
                }
                {this.props.children}
            </div>
        )
    }
}
export default DragAndDrop