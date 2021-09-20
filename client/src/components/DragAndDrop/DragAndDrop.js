import { React, Component, createRef } from 'react';
import { event } from '@tauri-apps/api'
import { extractUnlistener } from '../../helpers/DragAndDrop/Unlistener'

class DragAndDrop extends Component {
    state = {
        dragging: false
    }

    unlisten1 = null;
    unlisten2 = null;
    unlisten3 = null;
    dragCounter = 0;

    dropRef = createRef();

    getValidPaths(paths) {
        let validPaths = [];
        for (const path of paths) {
            validPaths.push(path);
        }
        return validPaths;
    }

    componentDidMount() {

        this.unlisten1 = event.listen('tauri://file-drop-hover', (e) => {
            this.dragCounter++;
            const validPaths = this.getValidPaths(e.payload);
            if (validPaths.length > 0) {
                this.setState({ dragging: true })
            }
        });

        this.unlisten2 = event.listen('tauri://file-drop-cancelled', (e) => {
            this.dragCounter--;
            if (this.dragCounter === 0) {
                this.setState({ dragging: false });
            }
        });

        this.unlisten3 = event.listen('tauri://file-drop', (e) => {
            const validPaths = this.getValidPaths(e.payload);
            if (validPaths.length > 0) {
                this.setState({ dragging: false });
                this.props.handleDrop(e.payload);
                this.dragCounter = 0;
            }
        });

    }
    componentWillUnmount() {
        extractUnlistener(this.unlisten1);
        extractUnlistener(this.unlisten2);
        extractUnlistener(this.unlisten3);
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