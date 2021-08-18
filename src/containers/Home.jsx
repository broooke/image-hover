import React, { useRef } from 'react'
import Gallery from '../components/Gallery'
import CustomCursor from '../CustomCursor'
import CursorManager from '../CustomCursor/CursorManager'
import '../styles/home.scss'

function Home() {
    const ref = useRef(null)

    if (typeof window === 'undefined' || !window.document) {
        return null
    }

    return (
        <>
            <CursorManager>
                <CustomCursor />
                    <div className="main-container" ref={ref}>
                        <Gallery />
                    </div>
            </CursorManager>
        </>
    )
}

export default Home
