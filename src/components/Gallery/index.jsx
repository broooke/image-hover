import React, { useContext, useEffect, useRef, useState } from 'react'
import './style.scss'
import cn from 'classnames'
import { CursorContext } from '../../CustomCursor/CursorManager'

const images = [
    "https://images.prismic.io/studiomalvah/53cca805-a8ec-4ece-a7a3-8a21c2040d5d_Hero_Gravvity%401.5x.jpg?auto=compress,format",
    "https://images.prismic.io/studiomalvah/e4bd36dc-f5fe-4998-b299-7060d4b925e8_Hero_Pantheone%401.5x.jpg?auto=compress,format",
    "https://images.prismic.io/studiomalvah/7f2aeb4b-b4ca-4a85-bfb2-2ce9b1234578_Hero_TheLot%401.5x.jpg?auto=compress,format"
]

function GalleryItem({src}) {
    const ref = useRef(null)
    const mouseContext = useContext(CursorContext)
    const [clipMaskRadius, setClipMaskRadius] = useState(0)
    const [clipMask, setClipMask] = useState({x: 0, y:0})
    const [reveal, setReveal] = useState(false)

    useEffect(() => {
        setTimeout(() => {
            setReveal(true)
        }, 100)
    }, [])

    useEffect(() => {
        function getCoordinates(mouse) {
            const imagePosition = {
                posX : ref.current.offsetLeft,
                posY : ref.current.offsetTop
            }
            const posX = mouse.pageX - imagePosition.posX
            const posY = mouse.pageY - imagePosition.posY

            setClipMask({
                x: (posX / ref.current.clientWidth) * 100,
                y: (posY / ref.current.clientHeight) * 100
            })
        }


        ref.current.addEventListener('mousemove', (mouse) => {
            window.requestAnimationFrame(() => {
                getCoordinates(mouse)
            })
        })
    }, [])
    return (
        <div 
            className={cn("gallery-item-wrapper", {'is-reveal':reveal})}
            ref={ref}
            onMouseEnter={() => {
                setClipMaskRadius(25)
                mouseContext.setSize('hide')
            }}
            onMouseLeave={() => {
                setClipMaskRadius(0)
                mouseContext.setSize('small')
            }}
        >
            <div className="gallery-item">
                <div
                    className="gallery-item-image sepia"
                    style={{ backgroundImage: `url(${src})` }}
                ></div>

                <div
                    className="gallery-item-image masked"
                    style={{ backgroundImage: `url(${src})`, clipPath: `circle(${clipMaskRadius}% at ${clipMask.x}% ${clipMask.y}%)` }}
                ></div>
            </div>
        </div>
    )
}

function Gallery() {
    return (
        <div className="gallery">
            {images.map((src) => (
                <GalleryItem key={src} src={src} />
            ))}
        </div>
    )
}

export default Gallery
